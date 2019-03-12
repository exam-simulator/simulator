import React, { useState, useEffect } from 'react'
import { CheckBox } from 'styled-icons/material/CheckBox'
import { CheckBoxOutlineBlank } from 'styled-icons/material/CheckBoxOutlineBlank'
import { MultipleStyles } from './MultipleChoice'
import formatAnswerLabel from '../../../utils/formatAnswerLabel'

export default React.memo(({ review, question, answers, onMultipleAnswer }) => {
  const [values, setValues] = useState([])

  useEffect(() => {
    const values = []
    answers.forEach((el, i) => {
      if (!!el) {
        values.push(i)
      }
      setValues(values)
    })
  }, [])

  const onClick = i => {
    if (review) {
      return
    }
    let newValues
    if (values.includes(i)) {
      newValues = values.filter(el => el !== i)
    } else {
      newValues = values.concat(i)
    }
    const newAnswers = answers.map((el, i) => newValues.includes(i))
    setValues(newValues)
    onMultipleAnswer(newAnswers)
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
          {values.includes(i) ? <CheckBox size={20} /> : <CheckBoxOutlineBlank size={20} />}
          <div className="text">
            <div>{formatAnswerLabel(i)}.</div>
            <div>{el.text}</div>
          </div>
        </MultipleStyles>
      ))}
    </div>
  )
})
