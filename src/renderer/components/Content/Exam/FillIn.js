import React, { useState, useEffect, useRef } from 'react'
import styled from 'styled-components'

export const FillInStyles = styled.div`
  position: relative;
  width: 40rem;
  padding: 1rem;
  border: 2px solid ${props => (props.focus ? props.theme.grey[10] : props.theme.grey[3])};
  border-radius: ${props => props.theme.borderRadius};
  span {
    position: absolute;
    top: -1.2rem;
    left: 2rem;
    background: white;
    color: ${props => (props.focus ? props.theme.grey[10] : props.theme.grey[3])};
    font: 1rem 'Open Sans';
    font-weight: 600;
    padding: 0.25rem 0.35rem;
  }
  input {
    width: 40rem;
    outline: 0;
    border: 0;
    font: 1.4rem 'Open Sans';
  }
`

export default React.memo(({ review, fillIn, onFillIn }) => {
  const inputRef = useRef(null)
  const [focus, setFocus] = useState(false)
  const [value, setValue] = useState('')

  useEffect(() => {
    setValue(fillIn)
  }, [])

  useEffect(() => {
    if (review) {
      return
    }
    setTimeout(() => {
      inputRef.current.focus()
      setFocus(true)
    }, 500)
  }, [])

  const onChange = e => {
    if (review) {
      return
    }
    setValue(e.target.value)
    onFillIn(e.target.value)
  }

  return (
    <FillInStyles focus={focus}>
      <span>Fill In The Blank</span>
      <input
        ref={inputRef}
        type="text"
        spellCheck={false}
        value={value}
        onChange={onChange}
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
        readOnly={review}
      />
    </FillInStyles>
  )
})
