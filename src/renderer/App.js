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
import deleteExam from './utils/deleteExam'
import showFileDialog from './utils/showFileDialog'
import analyzeAnswers from './utils/analyzeAnswers'
import examDataStuctures from './utils/examDataStuctures'
import createSession from './utils/createSession'
import questionHelper from './utils/questionHelper'
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
    indexSession: null,
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
    const result = await showFileDialog(mainWin)
    if (result === true) {
      this.setExams()
    } else {
      console.log(result) // array of error messages
    }
  }

  deleteExam = async () => {
    const { exams, indexExam, sessions, history } = this.state
    const success = await deleteExam(exams, indexExam, sessions, history)
    if (success) {
      this.setExams()
      this.setHistory()
      this.setSessions()
    }
    this.setState({ indexExam: null })
  }

  deleteHistory = async () => {
    const { history, indexHistory } = this.state
    const newHistory = history.filter((el, i) => i !== indexHistory)
    await writeData('history', newHistory)
    this.setState({ history: newHistory, indexHistory: null })
  }

  setMode = mode => this.setState({ mode })

  setMainMode = mainMode => this.setState({ mainMode })

  setIndexExam = indexExam => this.setState({ indexExam })

  setIndexHistory = indexHistory => this.setState({ indexHistory })

  setIndexSession = indexSession => this.setState({ indexSession })

  /**
   * Sets the question index
   * @param question {integer} - index to set question to
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
    // parse question from subset
    // all questions mode
    if (examMode === 0) {
      this.setState({ question, explanation: false })
      // bookmark mode
    } else {
      if (marked.length === 1) return
      const newQuestion = questionHelper(source, marked, question)
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
    const [answers, fillIns, orders, intervals] = examDataStuctures(exam)
    const marked = []
    const time = exam.time * 60
    this.setState({
      mode: 1,
      question: 0,
      exam,
      answers,
      fillIns,
      orders,
      intervals,
      marked,
      time,
      indexExam: i
    })
  }

  initTimer = () => {
    this.timer = setInterval(() => {
      const { time } = this.state
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

  setIntervals = intervals => this.setState({ intervals })

  endExam = () => {
    this.pauseTimer()
    const { exam, answers, fillIns, orders, intervals, time, history } = this.state
    const report = analyzeAnswers(exam, answers, fillIns, orders, time, intervals)
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

  /**
   * Reveal answer and scroll to it
   */
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

  /**
   * Write exam state to disk to resume later
   */
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
    this.setState({ mode: 3, exam, report, reviewMode: 0, reviewType: 0, reviewQuestion: 0 })
  }

  /**
   * Set content of review screen - 0 = report summary | 1 = exam
   * @param reviewMode {number} - the new mode
   */
  setReviewMode = reviewMode => this.setState({ reviewMode })

  /**
   * Set type of review and first question of that type - 0 = all | 1 = incorrect | 2 = incomplete
   * @param reviewType {number} - the new type
   */
  setReviewType = reviewType => {
    const {
      report: { incomplete, incorrect }
    } = this.state
    if (reviewType === 0) {
      this.setState({ reviewType, reviewQuestion: 0 })
    } else if (reviewType === 1) {
      if (!incorrect.length) {
        return
      }
      this.setState({ reviewType, reviewQuestion: incorrect[0] })
    } else if (reviewType === 2) {
      if (!incomplete.length) {
        return
      }
      this.setState({ reviewType, reviewQuestion: incomplete[0] })
    }
  }

  /**
   * Sets the question index
   * @param reviewQuestion {integer} - index to set review question to
   * @param source {string|number} - 'grid' = direct review question click | 0 = skip to start | 1 = prev | 2 = next | 3 = skip to end
   */
  setReviewQuestion = (reviewQuestion, source) => {
    const {
      report: { incorrect, incomplete, testLength },
      reviewType
    } = this.state
    // direct question click
    if (source === 'grid') {
      return this.setState({ reviewQuestion })
    }
    if (reviewQuestion < 0 || reviewQuestion > testLength - 1) {
      return
    }
    // parse question from subset
    // all questions mode
    if (reviewType === 0) {
      this.setState({ reviewQuestion })
    } else if (reviewType === 1) {
      let newQuestion = questionHelper(source, incorrect, reviewQuestion)
      if (!newQuestion) {
        return
      }
      this.setState({ reviewQuestion: newQuestion })
    } else if (reviewType === 2) {
      let newQuestion = questionHelper(source, incomplete, reviewQuestion)
      if (!newQuestion) {
        return
      }
      this.setState({ reviewQuestion: newQuestion })
    }
  }

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
        pauseTimer={this.pauseTimer}
        loadLocalExam={this.loadLocalExam}
        onShowExplanation={this.onShowExplanation}
        endExam={this.endExam}
        setExamMode={this.setExamMode}
        initReview={this.initReview}
        setReviewMode={this.setReviewMode}
        setReviewType={this.setReviewType}
        setReviewQuestion={this.setReviewQuestion}
        saveSession={this.saveSession}
        deleteExam={this.deleteExam}
        deleteHistory={this.deleteHistory}
      >
        <Content
          {...rest}
          explanationRef={this.explanation}
          setMode={this.setMode}
          setIndexExam={this.setIndexExam}
          setIndexHistory={this.setIndexHistory}
          setIndexSession={this.setIndexSession}
          initExam={this.initExam}
          onBookmarkQuestion={this.onBookmarkQuestion}
          onMultipleChoice={this.onMultipleChoice}
          onMultipleAnswer={this.onMultipleAnswer}
          onFillIn={this.onFillIn}
          onListOrder={this.onListOrder}
          setIntervals={this.setIntervals}
        />
      </Navigation>
    )
  }
}
