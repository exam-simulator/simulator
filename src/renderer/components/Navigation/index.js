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
    confirmEndExam: false
  }

  toggleOpen = () => this.setState(({ open }) => ({ open: !open }))

  setConfirmBeginExam = confirmBeginExam => this.setState({ confirmBeginExam })

  setConfirmEndExam = confirmEndExam => this.setState({ confirmEndExam })

  startExam = () => {
    this.setConfirmBeginExam(false)
    this.props.initTimer()
    this.props.setMode(2)
  }

  endExam = () => {
    this.setConfirmEndExam(false)
    this.props.endExam()
  }

  render() {
    const {
      props: { children, onShowExplanation, ...rest },
      state: { open, confirmBeginExam, confirmEndExam }
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
        />
        <Main open={open}>
          {React.Children.map(children, child =>
            React.cloneElement(child, {
              open
            })
          )}
        </Main>
        <Footer open={open} {...rest} />
        <Confirm
          show={confirmBeginExam}
          title="Start Exam"
          message={`Do you want to start ${rest.exam ? rest.exam.title : ''} ?`}
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
      </>
    )
  }
}
