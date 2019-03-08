import React from 'react'
import styled from 'styled-components'
import { lighten, darken } from 'polished'
import isequal from 'lodash.isequal'
import createExplanation from '../../../utils/createExplanation'

const ExplanationStyles = styled.div`
  background: ${props => lighten(0.25, props.theme.quatro)};
  border: 1px solid ${props => props.theme.grey[2]};
  margin-top: 5rem;
  padding: 1rem;
  font: 1.4rem 'Open Sans';
  .status {
    text-transform: uppercase;
    font-weight: 700;
    color: ${props => (props.status ? darken(0.1, props.theme.quatro) : props.theme.secondary)};
  }
  .correct {
    font-weight: 700;
  }
  .explanation {
    font-weight: 700;
    margin-top: 1rem;
  }
`

const Image = styled.img`
  max-width: 75vw;
  max-height: 60vh;
  margin-top: 1rem;
  margin-bottom: 1rem;
  border: 1px solid ${props => props.theme.grey[1]};
`

const NormalText = styled.div`
  font: 1.4rem 'Open Sans';
  margin-bottom: 0.5rem;
`

const BigText = styled.div`
  font: 3rem 'Open Sans';
  font-weight: 700;
  margin-bottom: 0.5rem;
  color: ${props => props.theme.black};
`

export default ({ explanationRef, question, answers }) => {
  const variant = question.variant
  const correctAnswers = variant === 0 || variant === 1 ? question.answer : question.choices
  const status = variant === 0 || variant === 1 ? isequal(answers, question.answer) : answers[0]
  return (
    <ExplanationStyles ref={explanationRef} status={status}>
      <div>
        Your answer is <span className="status">{status ? 'correct' : 'incorrect'}</span>
      </div>
      <div>
        The correct answer is{' '}
        <span className="correct">{createExplanation(variant, correctAnswers)}</span>
      </div>
      <div className="explanation">
        <div>Explanation</div>
        <div>
          {question.explanation.map((el, i) => {
            if (el.variant === 0) {
              return <Image key={i} src={el.text} />
            } else if (el.variant === 1) {
              return <NormalText key={i}>{el.text}</NormalText>
            } else if (el.variant === 2) {
              return <BigText key={i}>{el.text}</BigText>
            } else {
              return null
            }
          })}
        </div>
      </div>
    </ExplanationStyles>
  )
}
