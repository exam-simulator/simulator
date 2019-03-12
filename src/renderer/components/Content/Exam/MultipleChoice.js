import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { darken } from 'polished'
import { RadioButtonChecked } from 'styled-icons/material/RadioButtonChecked'
import { RadioButtonUnchecked } from 'styled-icons/material/RadioButtonUnchecked'
import formatAnswerLabel from '../../../utils/formatAnswerLabel'

export const MultipleStyles = styled.div`
  display: grid;
  grid-template-columns: 3rem 1fr;
  margin-bottom: 0.5rem;
  cursor: pointer;
  svg {
    color: ${props =>
      props.review && props.correct
        ? darken(0.3, props.theme.quatro)
        : props.review && !props.correct
        ? props.theme.grey[5]
        : props.theme.grey[10]};
    margin-right: 0.5rem;
  }
  .text {
    display: flex;
    font: 1.4rem 'Open Sans';
    color: ${props =>
      props.review && props.correct
        ? darken(0.3, props.theme.quatro)
        : props.review && !props.correct
        ? props.theme.grey[5]
        : props.theme.black};
    & > :first-child {
      font-weight: 600;
      margin-right: 0.5rem;
    }
  }
`

export default ({ review, question, answers, onMultipleChoice }) => {
  const [value, setValue] = useState(null)

  // sets value when component mounts only
  useEffect(() => {
    answers.forEach((el, i) => {
      if (!!el) {
        setValue(i)
      }
    })
  }, [])

  // sets value when user clicks choice
  const onClick = i => {
    if (review) {
      return
    }
    setValue(i)
    onMultipleChoice(i)
  }

  return (
    <div>
      {question.choices.map((el, i) => (
        <MultipleStyles
          key={i}
          review={review}
          correct={question.answer[i]}
          onClick={() => onClick(i)}
        >
          {value === i ? <RadioButtonChecked size={20} /> : <RadioButtonUnchecked size={20} />}
          <div className="text">
            <div>{formatAnswerLabel(i)}.</div>
            <div>{el.text}</div>
          </div>
        </MultipleStyles>
      ))}
    </div>
  )
}
