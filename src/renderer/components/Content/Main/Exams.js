import React from 'react'
import styled from 'styled-components'
import ExamItem from './ExamItem'

const ExamStyles = styled.div`
  width: 100%;
  height: calc(100vh - 14rem);
  overflow-x: hidden;
  overflow-y: auto;
`

export default ({ exams, setIndexExam, initExam, setConfirmDeleteExam }) => {
  return (
    <ExamStyles rows={Math.ceil(exams.length / 2)}>
      {exams.map((el, i) => (
        <ExamItem
          key={i}
          exam={el}
          index={i}
          initExam={() => initExam(i)}
          setIndexExam={() => setIndexExam(i)}
          setConfirmDeleteExam={setConfirmDeleteExam}
        />
      ))}
    </ExamStyles>
  )
}
