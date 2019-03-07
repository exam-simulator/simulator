import React from 'react'
import styled from 'styled-components'

const SummaryStyles = styled.div``

function Summary() {
  return <SummaryStyles>summary</SummaryStyles>
}

const ReviewExamStyles = styled.div``

function ReviewExam() {
  return <ReviewExamStyles>exam</ReviewExamStyles>
}

export default class Review extends React.Component {
  render() {
    const {
      props: { reviewMode }
    } = this
    if (reviewMode === 0) {
      return <Summary />
    } else {
      return <ReviewExam />
    }
  }
}
