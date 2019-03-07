import React from 'react'
import styled from 'styled-components'
import { Slide } from '../../../styles/Slide'
import TopDisplay from './TopDisplay'
import Question from './Question'
import MultipleChoice from './MultipleChoice'
import MultipleAnswer from './MultipleAnswer'
import FillIn from './FillIn'
import ListOrder from './ListOrder'
import Explanation from './Explanation'

const TestStyles = styled.div`
  width: 100%;
  height: calc(100vh - 14rem);
  overflow-x: hidden;
  overflow-y: auto;
`

export default ({
  explanationRef,
  explanation,
  exam,
  question,
  answers,
  fillIns,
  orders,
  marked,
  onBookmarkQuestion,
  onMultipleChoice,
  onMultipleAnswer,
  onFillIn,
  onListOrder
}) => {
  return (
    <TestStyles>
      <TopDisplay
        question={question}
        length={exam.test.length}
        marked={marked}
        onBookmarkQuestion={onBookmarkQuestion}
      />
      {exam.test.map((el, i) => {
        if (i === question) {
          const { variant } = el
          return (
            <Slide key={i} direction="right">
              <Question question={el.question} />
              {variant === 0 ? (
                <MultipleChoice
                  question={el}
                  answers={answers[i]}
                  onMultipleChoice={onMultipleChoice}
                />
              ) : variant === 1 ? (
                <MultipleAnswer
                  question={el}
                  answers={answers[i]}
                  onMultipleAnswer={onMultipleAnswer}
                />
              ) : variant === 2 ? (
                <FillIn fillIn={fillIns[question]} onFillIn={onFillIn} />
              ) : variant === 3 ? (
                <ListOrder
                  index={i}
                  choices={el.choices}
                  answers={answers[i]}
                  order={orders[i]}
                  onListOrder={onListOrder}
                />
              ) : null}
              {explanation ? (
                <Slide direction="bottom">
                  <Explanation explanationRef={explanationRef} question={el} answers={answers[i]} />
                </Slide>
              ) : null}
            </Slide>
          )
        }
      })}
    </TestStyles>
  )
}
