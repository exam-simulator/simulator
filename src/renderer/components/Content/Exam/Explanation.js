import React from 'react'
import styled from 'styled-components'
import { lighten, darken } from 'polished'
import isequal from 'lodash.isequal'
import createExplanation from '../../../utils/createExplanation'

const ExplanationStyles = styled.div`
  background: ${props => lighten(0.25, props.theme.tertiary)};
  border: 1px solid ${props => props.theme.grey[2]};
  margin-top: 5rem;
  padding: 1rem;
  font: 1.4rem 'Open Sans';
  .status {
    text-transform: uppercase;
    font-weight: 700;
    color: ${props => (props.status ? darken(0.1, props.theme.tertiary) : props.theme.secondary)};
  }
  .correct {
    font-weight: 700;
  }
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
    </ExplanationStyles>
  )
}
