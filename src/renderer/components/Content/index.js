import React from 'react'
import styled from 'styled-components'
import Exams from './Main/Exams'
import History from './Main/History'
import Cover from './Cover'
import Exam from './Exam'

const ContentStyles = styled.div`
  display: grid;
  justify-items: center;
  align-items: center;
  padding: 2rem;
  padding-right: ${props => (props.open ? '28rem' : '7rem')};
  transition: 0.3s;
`

const ReviewStyles = styled.div``

function Review({ report }) {
  return <ReviewStyles>{JSON.stringify(report)}</ReviewStyles>
}

export default class Content extends React.Component {
  renderContent = () => {
    const p = this.props
    if (p.mode === 0) {
      if (p.mainMode === 0) {
        return <Exams exams={p.exams} setIndexExam={p.setIndexExam} initExam={p.initExam} />
      } else if (p.mainMode === 1) {
        return (
          <History
            history={p.history}
            setIndexHistory={p.setIndexHistory}
            initReview={p.initReview}
          />
        )
      }
    } else if (p.mode === 1) {
      return <Cover cover={p.exam.cover} />
    } else if (p.mode === 2) {
      return (
        <Exam
          explanationRef={p.explanationRef}
          explanation={p.explanation}
          exam={p.exam}
          question={p.question}
          answers={p.answers}
          fillIns={p.fillIns}
          onMultipleChoice={p.onMultipleChoice}
          onMultipleAnswer={p.onMultipleAnswer}
          onFillIn={p.onFillIn}
        />
      )
    } else if (p.mode === 3) {
      return <Review report={p.report} />
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
