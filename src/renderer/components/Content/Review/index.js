import React from 'react'
import Summary from './Summary'
import ReviewExam from './ReviewExam'

export default class Review extends React.Component {
  state = {}

  render() {
    const {
      props: { reviewMode, report, ...rest }
    } = this
    if (reviewMode === 0) {
      return <Summary report={report} />
    } else {
      return <ReviewExam report={report} {...rest} />
    }
  }
}
