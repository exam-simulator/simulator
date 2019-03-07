import React from 'react'
import styled from 'styled-components'
import Summary from './Summary'

const ReviewExamStyles = styled.div``

function ReviewExam() {
  return <ReviewExamStyles>exam</ReviewExamStyles>
}

export default class Review extends React.Component {
  render() {
    const {
      props: { reviewMode, report }
    } = this
    if (reviewMode === 0) {
      return <Summary report={report} />
    } else {
      return <ReviewExam />
    }
  }
}
