import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { lighten } from 'polished'

const ListItem = styled.div`
  width: 50%;
  padding: 1rem 1rem;
  margin-bottom: 1rem;
  background: ${props =>
    props.correct ? lighten(0.2, props.theme.primary) : lighten(0.4, props.theme.secondary)};
  color: ${props => props.theme.grey[10]};
  border: 2px dashed ${props => props.theme.grey[5]};
  font: 1.25rem 'Open Sans';
  font-weight: 700;
`

export default ({ choices, order }) => {
  const [list, setList] = useState([])

  useEffect(() => {
    const initialList = []
    for (let i = 0; i < choices.length; i++) {
      let { text } = order ? choices[order[i]] : choices[i]
      let correct = order ? order[i] === i : false
      initialList.push({ text, correct })
    }
    setList(initialList)
  }, [])
  return (
    <div>
      {list.map((el, i) => (
        <ListItem key={i} correct={el.correct}>
          {el.text}
        </ListItem>
      ))}
    </div>
  )
}
