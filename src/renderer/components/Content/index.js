import React from 'react'
import styled from 'styled-components'
import Exams from './Main/Exams'
import History from './Main/History'
import Sessions from './Main/Sessions'
import Cover from './Cover'
import Exam from './Exam'
import Review from './Review'

const ContentStyles = styled.div`
  display: grid;
  justify-items: center;
  align-items: center;
  padding: 2rem;
  padding-right: ${props => (props.open ? '28rem' : '7rem')};
  transition: 0.3s;
`

export default class Content extends React.Component {
  renderContent = () => {
    const p = this.props
    if (p.mode === 0) {
      if (p.mainMode === 0) {
        return (
          <Exams
            exams={p.exams}
            setIndexExam={p.setIndexExam}
            initExam={p.initExam}
            setConfirmDeleteExam={p.setConfirmDeleteExam}
          />
        )
      } else if (p.mainMode === 1) {
        return (
          <History
            history={p.history}
            setIndexHistory={p.setIndexHistory}
            setConfirmReviewExam={p.setConfirmReviewExam}
            setConfirmDeleteHistory={p.setConfirmDeleteHistory}
          />
        )
      } else if (p.mainMode === 2) {
        return <Sessions sessions={p.sessions} setIndexSession={p.setIndexSession} />
      }
    } else if (p.mode === 1) {
      return <Cover cover={p.exam.cover} />
    } else if (p.mode === 2) {
      return (
        <Exam
          explanationRef={p.explanationRef}
          explanation={p.explanation}
          examMode={p.examMode}
          exam={p.exam}
          question={p.question}
          answers={p.answers}
          fillIns={p.fillIns}
          orders={p.orders}
          intervals={p.intervals}
          marked={p.marked}
          onBookmarkQuestion={p.onBookmarkQuestion}
          onMultipleChoice={p.onMultipleChoice}
          onMultipleAnswer={p.onMultipleAnswer}
          onFillIn={p.onFillIn}
          onListOrder={p.onListOrder}
          setIntervals={p.setIntervals}
        />
      )
    } else if (p.mode === 3) {
      return (
        <Review
          exam={p.exam}
          reviewMode={p.reviewMode}
          reviewType={p.reviewType}
          reviewQuestion={p.reviewQuestion}
          report={p.report}
        />
      )
    } else {
      return null
    }
  }

  render() {
    const {
      props: { open }
    } = this
    return <ContentStyles open={open}>{this.renderContent()}</ContentStyles>
  }
}
