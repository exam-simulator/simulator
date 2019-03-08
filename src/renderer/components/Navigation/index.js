import React from 'react'
import Header from './Header'
import Drawer from './Drawer'
import Footer from './Footer'
import Confirm from '../Confirm'
import { Main } from '../../styles/Main'

export default class Navigation extends React.Component {
  state = {
    open: true,
    confirmBeginExam: false,
    confirmEndExam: false,
    confirmReviewExam: false,
    confirmSaveSession: false,
    confirmPauseTimer: false,
    confirmDeleteExam: false,
    confirmDeleteHistory: false
  }

  toggleOpen = () => this.setState(({ open }) => ({ open: !open }))

  setConfirmBeginExam = confirmBeginExam => this.setState({ confirmBeginExam })

  setConfirmEndExam = confirmEndExam => this.setState({ confirmEndExam })

  setConfirmReviewExam = confirmReviewExam => this.setState({ confirmReviewExam })

  setConfirmSaveSession = confirmSaveSession => this.setState({ confirmSaveSession })

  setConfirmDeleteExam = confirmDeleteExam => this.setState({ confirmDeleteExam })

  setConfirmDeleteHistory = confirmDeleteHistory => this.setState({ confirmDeleteHistory })

  startExam = () => {
    this.setConfirmBeginExam(false)
    this.props.initTimer()
    this.props.setMode(2)
  }

  endExam = () => {
    this.setConfirmEndExam(false)
    this.props.endExam()
  }

  reviewExam = () => {
    this.setConfirmReviewExam(false)
    this.props.initReview()
  }

  saveSession = () => {
    this.setConfirmSaveSession(false)
    this.props.saveSession()
  }

  pauseExam = () => {
    this.setState({ confirmPauseTimer: true })
    this.props.pauseTimer()
  }

  unPauseExam = () => {
    this.setState({ confirmPauseTimer: false })
    this.props.initTimer()
  }

  deleteExam = () => {
    this.setState({ confirmDeleteExam: false })
    this.props.deleteExam()
  }

  deleteHistory = () => {
    this.setState({ confirmDeleteHistory: false })
    this.props.deleteHistory()
  }

  render() {
    const {
      props: { children, onShowExplanation, ...rest },
      state: {
        open,
        confirmBeginExam,
        confirmEndExam,
        confirmReviewExam,
        confirmSaveSession,
        confirmPauseTimer,
        confirmDeleteExam,
        confirmDeleteHistory
      }
    } = this
    return (
      <>
        <Header open={open} {...rest} />
        <Drawer
          {...rest}
          open={open}
          toggleOpen={this.toggleOpen}
          onShowExplanation={onShowExplanation}
          setConfirmBeginExam={() => this.setConfirmBeginExam(true)}
          setConfirmEndExam={() => this.setConfirmEndExam(true)}
          setConfirmSaveSession={() => this.setConfirmSaveSession(true)}
          pauseExam={this.pauseExam}
        />
        <Main open={open}>
          {React.Children.map(children, child =>
            React.cloneElement(child, {
              open,
              setConfirmReviewExam: () => this.setConfirmReviewExam(true),
              setConfirmDeleteExam: () => this.setConfirmDeleteExam(true),
              setConfirmDeleteHistory: () => this.setConfirmDeleteHistory(true)
            })
          )}
        </Main>
        <Footer open={open} {...rest} />
        <Confirm
          show={confirmBeginExam}
          title="Start Exam"
          message={`Do you want to start ${rest.exam ? rest.exam.title : 'this exam'} ?`}
          buttons={['Start Exam', 'Cancel']}
          onConfirm={this.startExam}
          onClose={() => this.setConfirmBeginExam(false)}
        />
        <Confirm
          show={confirmEndExam}
          title="End Exam"
          message="Do you want to end exam ?"
          buttons={['End Exam', 'Cancel']}
          onConfirm={this.endExam}
          onClose={() => this.setConfirmEndExam(false)}
        />
        <Confirm
          show={confirmReviewExam}
          title="Review Exam"
          message="Do you want to review exam report ?"
          buttons={['Review Exam', 'Cancel']}
          onConfirm={this.reviewExam}
          onClose={() => this.setConfirmReviewExam(false)}
        />
        <Confirm
          show={confirmSaveSession}
          title="Save Session"
          message="Do you want to save current session and exit ?"
          buttons={['Save Session', 'Cancel']}
          onConfirm={this.saveSession}
          onClose={() => this.setConfirmSaveSession(false)}
        />
        <Confirm
          show={confirmPauseTimer}
          title="Exam Paused"
          message="Exam paused. Click to resume."
          buttons={['Resume Exam']}
          onConfirm={this.unPauseExam}
          onClose={() => {}}
        />
        <Confirm
          show={confirmDeleteExam}
          title="Delete Exam"
          message={`Do you want to delete ${rest.exam ? rest.exam.title : 'this exam'} ?`}
          buttons={['Delete Exam', 'Cancel']}
          onConfirm={this.deleteExam}
          onClose={() => this.setConfirmDeleteExam(false)}
        />
        <Confirm
          show={confirmDeleteHistory}
          title="Delete History"
          message={`Do you want to delete this exam history report ?`}
          buttons={['Delete History', 'Cancel']}
          onConfirm={this.deleteHistory}
          onClose={() => this.setConfirmDeleteHistory(false)}
        />
      </>
    )
  }
}
