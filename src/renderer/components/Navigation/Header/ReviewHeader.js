import React from 'react'
import styled from 'styled-components'
import { BLUE_LOGO_PATH } from '../../../utils/filepaths'
import { InnerHeader } from './MainHeader'

const ReviewHeader = styled(InnerHeader)`
  grid-template-columns: 6rem auto 1fr;
`

export default ({ exam, reviewMode }) => {
  const title = reviewMode === 0 ? 'Summary' : 'Review'
  return (
    <ReviewHeader>
      <img className="image" src={exam.image || BLUE_LOGO_PATH} />
      <div className="title">{exam.title}</div>
      <div className="subtitle">{title}</div>
    </ReviewHeader>
  )
}
