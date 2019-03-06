import React from 'react'
import styled from 'styled-components'
import ExamFooter from './ExamFooter'

const FooterStyles = styled.div`
  position: fixed;
  width: 100%;
  height: 5rem;
  bottom: 0;
  left: ${props => (props.open ? '24rem' : '5rem')};
  z-index: 2;
  transition: 0.3s;
  background: ${props => props.theme.grey[0]};
  border-top: 1px solid ${props => props.theme.grey[1]};
`

export default ({ open, mode, exam, question, time, setQuestion }) => (
  <FooterStyles open={open}>
    {mode === 2 ? (
      <ExamFooter
        open={open}
        time={time}
        question={question}
        length={exam.test.length}
        setQuestion={setQuestion}
      />
    ) : null}
  </FooterStyles>
)
