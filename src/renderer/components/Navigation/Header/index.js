import React from 'react'
import styled from 'styled-components'
import { BLUE_LOGO_PATH } from '../../../utils/filepaths'
import MainHeader from './MainHeader'
import ExamHeader from './ExamHeader'
import ReviewHeader from './ReviewHeader'

const HeaderStyles = styled.div`
  position: fixed;
  width: 100%;
  height: 5rem;
  top: 0;
  left: ${props => (props.open ? '24rem' : '5rem')};
  z-index: 2;
  transition: 0.3s;
  background: ${props => props.theme.primary};
`

export default ({ open, mode, mainMode, exam, reviewMode }) => (
  <HeaderStyles open={open}>
    {mode === 0 ? (
      <MainHeader mainMode={mainMode} />
    ) : mode === 2 ? (
      <ExamHeader exam={exam} />
    ) : mode === 3 ? (
      <ReviewHeader exam={exam} reviewMode={reviewMode} />
    ) : null}
  </HeaderStyles>
)
