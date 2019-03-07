import React from 'react'
import { remote } from 'electron'
import isequal from 'lodash.isequal'
import fs from 'fs'
import createFileSystem from './utils/createFileSystem'
import readExamsDir from './utils/readExamsDir'
import readHistoryFile from './utils/readHistoryFile'
import readSessionsFile from './utils/readSessionsFile'
import readOptionsFile from './utils/readOptionsFile'
import writeData from './utils/writeData'
import showFileDialog from './utils/showFileDialog'
import analyzeAnswers from './utils/analyzeAnswers'
import examDataStuctures from './utils/examDataStuctures'
import { DATA_DIR_PATH } from './utils/filepaths'
import Navigation from './components/Navigation'
import Content from './components/Content'

const mainWin = remote.BrowserWindow.fromId(1)

export default class App extends React.Component {
  state = {
    loading: true,
    mode: 0,
    mainMode: 0,
    exams: [],
    history: [],
    sessions: [],
    options: null,
    indexExam: null,
    indexHistory: null,
    exam: null,
    answers: [],
    fillIns: [],
    orders: [],
    marked: [],
    question: 0,
    time: 0,
    explanation: false,
    report: null,
    reviewMode: 0,
    reviewType: 0,
    reviewQuestion: 0
  }

  explanation = React.createRef()

  componentDidMount() {
    this.createOrLoadApplicationData()
  }

  createOrLoadApplicationData = async () => {
    if (fs.existsSync(DATA_DIR_PATH)) {
      this.setExams()
      this.setHistory()
      this.setSessions()
      this.setOptions()
    } else {
      await createFileSystem()
      this.setExams()
      this.setHistory()
      this.setSessions()
      this.setOptions()
    }
  }

  setExams = async () => this.setState({ loading: false, exams: await readExamsDir() })

  setHistory = async () => this.setState({ history: await readHistoryFile() })

  setSessions = async () => this.setState({ sessions: await readSessionsFile() })

  setOptions = async () => this.setState({ options: await readOptionsFile() })

  loadLocalExam = async () => {
    const success = await showFileDialog(mainWin)
    if (success) {
      if (typeof success === 'boolean') {
        this.setExams()
      } else if (typeof success === 'object') {
        // do something with error
      }
    }
  }

  setMode = mode => this.setState({ mode })

  setMainMode = mainMode => this.setState({ mainMode })

  setIndexExam = indexExam => this.setState({ indexExam })

  setIndexHistory = indexHistory => this.setState({ indexHistory })

  /**
   * Sets the question index
   * @param newQuestion {integer} - index to set question to
   * @param source {string|number} - the source of the function call
   */
  setQuestion = (question, source) => {
    const {
      exam: { test }
    } = this.state
    if (source === 'grid') {
      return this.setState({ question, explanation: false })
    }
    if (question < 0 || question > test.length - 1) {
      return
    }
    this.setState({ question, explanation: false })
  }

  /**
   * Prepare data structures for exam, shows cover screen
   * @param i {number} - index of exam
   */
  initExam = i => {
    const exam = this.state.exams[i]
    const [answers, fillIns, orders] = examDataStuctures(exam)
    const marked = []
    const time = exam.time * 60
    this.setState({
      mode: 1,
      question: 0,
      exam,
      answers,
      fillIns,
      orders,
      marked,
      time,
      indexExam: i
    })
  }

  initTimer = () => {
    this.timer = setInterval(() => {
      const time = this.state.time
      if (time === 0) {
        clearInterval(this.timer)
        return
      }
      this.setState({ time: time - 1 })
    }, 1000)
  }

  pauseTimer = () => {
    clearInterval(this.timer)
  }

  endExam = () => {
    this.pauseTimer()
    const { exam, answers, fillIns, orders, time, history } = this.state
    const report = analyzeAnswers(exam, answers, fillIns, orders, time)
    history.push(report)
    this.setState(
      {
        mode: 3,
        reviewMode: 0,
        question: 0,
        indexExam: null,
        history,
        report
      },
      () => writeData('history', history)
    )
  }

  onMultipleChoice = answer => {
    let { question, answers } = this.state
    answers[question] = answers[question].map((el, i) => i === answer)
    this.setState({ answers })
  }

  onMultipleAnswer = answer => {
    let { question, answers } = this.state
    answers[question] = answer
    this.setState({ answers })
  }

  onFillIn = answer => {
    let { exam, question, answers, fillIns } = this.state
    const correct = exam.test[question].choices.reduce((acc, val) => {
      acc.push(val.text.toLowerCase())
      return acc
    }, [])
    if (correct.indexOf(answer) !== -1) {
      answers[question] = [true]
    } else {
      answers[question] = [false]
    }
    fillIns[question] = answer
    this.setState({ answers, fillIns })
  }

  onListOrder = (order, i) => {
    let { answers, orders } = this.state
    const correct = order.map((el, j) => j)
    answers[i] = [isequal(correct, order)]
    orders[i] = order
    this.setState({ answers, orders })
  }

  onShowExplanation = () => {
    this.setState(
      ({ explanation }) => ({ explanation: !explanation }),
      () => {
        if (this.state.explanation) {
          setTimeout(() => {
            this.explanation.current.scrollIntoView({
              behavior: 'smooth',
              block: 'start',
              inline: 'end'
            })
          }, 500)
        }
      }
    )
  }

  initReview = () => {
    const { exams, history, indexHistory } = this.state
    const report = history[indexHistory]
    const exam = exams.find(el => el.filename === report.filename)
    this.setState({ mode: 3, exam, report })
  }

  /**
   * Set content of review screen 0 - report summary | 1 - exam
   * @param reviewMode {number} - the new mode
   */
  setReviewMode = reviewMode => this.setState({ reviewMode })

  setReviewType = reviewType => this.setState({ reviewType })

  setRevewQuestion = reviewQuestion => this.setState({ reviewQuestion })

  render() {
    const { loading, ...rest } = this.state
    if (loading) {
      return <div>loading</div>
    }
    return (
      <Navigation
        {...rest}
        setMode={this.setMode}
        setMainMode={this.setMainMode}
        setQuestion={this.setQuestion}
        initTimer={this.initTimer}
        loadLocalExam={this.loadLocalExam}
        onShowExplanation={this.onShowExplanation}
        endExam={this.endExam}
        initReview={this.initReview}
        setReviewMode={this.setReviewMode}
        setReviewType={this.setReviewType}
        setRevewQuestion={this.setReviewQuestion}
      >
        <Content
          {...rest}
          explanationRef={this.explanation}
          setMode={this.setMode}
          setIndexExam={this.setIndexExam}
          setIndexHistory={this.setIndexHistory}
          initExam={this.initExam}
          onMultipleChoice={this.onMultipleChoice}
          onMultipleAnswer={this.onMultipleAnswer}
          onFillIn={this.onFillIn}
          onListOrder={this.onListOrder}
        />
      </Navigation>
    )
  }
}
