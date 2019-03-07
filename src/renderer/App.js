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
import createSession from './utils/createSession'
import { DATA_DIR_PATH } from './utils/filepaths'
import Navigation from './components/Navigation'
import Content from './components/Content'
import bookmarkQuestion from './utils/bookmarkQuestion'

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
    examMode: 0,
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
    const errors = await showFileDialog(mainWin)
    if (!errors) {
      if (typeof errors === 'boolean') {
        this.setExams()
      } else if (typeof errors === 'object') {
        console.log(errors)
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
   * @param source {string|number} - 'grid' = direct question click | 0 = skip to start | 1 = prev | 2 = next | 3 = skip to end
   */
  setQuestion = (question, source) => {
    const {
      exam: { test },
      examMode,
      marked
    } = this.state
    // direct question click
    if (source === 'grid') {
      return this.setState({ question, explanation: false })
    }
    if (question < 0 || question > test.length - 1) {
      return
    }
    // buttons and sliders
    // all questions mode
    if (examMode === 0) {
      this.setState({ question, explanation: false })
      // bookmark mode
    } else {
      if (marked.length === 1) return
      const newQuestion = bookmarkQuestion(source, marked, question)
      if (!newQuestion) {
        return
      }
      this.setState({ question: newQuestion })
    }
  }

  /**
   * Set exam mode 0 - all questions | 1 - bookmarked questions
   * @param examMode {number} - the new mode
   */
  setExamMode = examMode => {
    if (examMode === 1) {
      const { marked } = this.state
      if (!marked.length) {
        return
      }
      this.setState({ question: marked[0], examMode })
    } else {
      this.setState({ examMode })
    }
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

  onBookmarkQuestion = (i, add) => {
    const { examMode, marked } = this.state
    let newMarked = marked.slice(0)
    if (add) {
      newMarked.push(i)
    } else {
      newMarked = marked.filter(el => el !== i)
      if (examMode === 1) {
        if (!newMarked.length) {
          this.setExamMode(0)
        } else {
          this.setState({ question: newMarked[0] })
        }
      }
    }
    newMarked.sort((a, b) => a - b)
    this.setState({ marked: newMarked })
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

  saveSession = () => {
    clearInterval(this.timer)
    const { sessions } = this.state
    const session = createSession(this.state)
    sessions.push(session)
    this.setState({ mode: 0, sessions, indexExam: null }, () => {
      writeData('session', sessions)
    })
  }

  /**
   * Initialize review mode and fetch report
   */
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
        setExamMode={this.setExamMode}
        initReview={this.initReview}
        setReviewMode={this.setReviewMode}
        setReviewType={this.setReviewType}
        setRevewQuestion={this.setReviewQuestion}
        saveSession={this.saveSession}
      >
        <Content
          {...rest}
          explanationRef={this.explanation}
          setMode={this.setMode}
          setIndexExam={this.setIndexExam}
          setIndexHistory={this.setIndexHistory}
          initExam={this.initExam}
          onBookmarkQuestion={this.onBookmarkQuestion}
          onMultipleChoice={this.onMultipleChoice}
          onMultipleAnswer={this.onMultipleAnswer}
          onFillIn={this.onFillIn}
          onListOrder={this.onListOrder}
        />
      </Navigation>
    )
  }
}
