import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { RadioButtonChecked } from 'styled-icons/material/RadioButtonChecked'
import { RadioButtonUnchecked } from 'styled-icons/material/RadioButtonUnchecked'

export const MultipleStyles = styled.div`
  .choice {
    display: grid;
    grid-template-columns: 3rem 1fr;
    margin-bottom: 0.5rem;
    cursor: pointer;
    svg {
      color: ${props => props.theme.grey[10]};
      margin-right: 0.5rem;
    }
    .text {
      display: flex;
      font: 1.4rem 'Open Sans';
      & > :first-child {
        font-weight: 600;
        margin-right: 0.5rem;
      }
    }
  }
`

export default ({ question, answers, onMultipleChoice }) => {
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
    setValue(i)
    onMultipleChoice(i)
  }

  return (
    <MultipleStyles>
      {question.choices.map((el, i) => (
        <div key={i} className="choice" onClick={() => onClick(i)}>
          {value === i ? <RadioButtonChecked size={20} /> : <RadioButtonUnchecked size={20} />}
          <div className="text">
            <div>{el.label}.</div>
            <div>{el.text}</div>
          </div>
        </div>
      ))}
    </MultipleStyles>
  )
}
