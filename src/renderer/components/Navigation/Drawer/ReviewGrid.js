import React from 'react'
import styled from 'styled-components'
import { GridStyles, GridItem } from './Grid'
import analyzeReviewGridItem from '../../../utils/analyzeReviewGridItem'

const ReviewGridStyles = styled(GridStyles)``

export default ({
  open,
  report,
  reviewQuestion,
  setReviewMode,
  setReviewType,
  setReviewQuestion
}) => {
  if (open) {
    return (
      <ReviewGridStyles>
        <div className="legend">
          <div className="item">
            <div className="correct" />
            <div>Correct</div>
          </div>
          <div className="item">
            <div className="incorrect" />
            <div>Incorrect</div>
          </div>
          <div className="item">
            <div className="incomplete" />
            <div>Incomplete</div>
          </div>
        </div>
        <div className="grid">
          {Array(report.testLength)
            .fill(null)
            .map((el, i) => {
              const background = analyzeReviewGridItem(i, report)
              return (
                <GridItem
                  key={i}
                  background={background}
                  selected={i === reviewQuestion}
                  onClick={() => {
                    setReviewMode(1)
                    setReviewType(0)
                    setReviewQuestion(i)
                  }}
                >
                  {i + 1}
                </GridItem>
              )
            })}
        </div>
      </ReviewGridStyles>
    )
  } else {
    return null
  }
}
