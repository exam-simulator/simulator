import React from 'react'
import styled from 'styled-components'
import { BLUE_LOGO_PATH } from '../../../utils/filepaths'
import { InnerHeader } from './MainHeader'

const ExamHeader = styled(InnerHeader)`
  grid-template-columns: 6rem 1fr;
`

export default ({ exam }) => {
  return (
    <ExamHeader>
      <img className="image" src={exam.image || BLUE_LOGO_PATH} />
      <div className="title">{exam.title}</div>
    </ExamHeader>
  )
}
