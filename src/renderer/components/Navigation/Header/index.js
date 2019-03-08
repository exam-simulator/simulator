import React from 'react'
import styled from 'styled-components'
import { BLUE_LOGO_PATH } from '../../../utils/filepaths'

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

const MainHeaderStyles = styled.div`
  height: 5rem;
  display: grid;
  align-items: center;
  .title {
    font: 2rem 'Open Sans';
    font-weight: 700;
    color: ${props => props.theme.black};
    margin-left: 1rem;
  }
`

function MainHeader({ mainMode }) {
  const title = mainMode === 0 ? 'Exam Files' : mainMode === 1 ? 'History' : 'Saved Sessions'
  return (
    <MainHeaderStyles>
      <div className="title">{title}</div>
    </MainHeaderStyles>
  )
}

const ExamHeaderStyles = styled.div`
  height: 5rem;
  display: grid;
  grid-template-columns: 6rem 1fr;
  align-items: center;
  .image {
    justify-self: center;
    width: 3rem;
    height: 3rem;
  }
  .title {
    font: 2rem 'Open Sans';
    font-weight: 700;
    color: ${props => props.theme.black};
  }
`

function ExamHeader({ exam }) {
  return (
    <ExamHeaderStyles>
      <img className="image" src={exam.image || BLUE_LOGO_PATH} />
      <div className="title">{exam.title}</div>
    </ExamHeaderStyles>
  )
}

const ReviewHeaderStyles = styled.div`
  height: 5rem;
  display: grid;
  grid-template-columns: 6rem auto 1fr;
  align-items: center;
  .image {
    justify-self: center;
    width: 3rem;
    height: 3rem;
  }
  .title {
    font: 2rem 'Open Sans';
    font-weight: 700;
    color: ${props => props.theme.black};
    margin-left: 1rem;
  }
  .subtitle {
    font: 1.35rem 'Open Sans';
    font-weight: 700;
    color: ${props => props.theme.grey[10]};
    margin-top: 0.5rem;
    margin-left: 1rem;
  }
`

function ReviewHeader({ exam, reviewMode }) {
  const title = reviewMode === 0 ? 'Review Summary' : 'Review Exam'
  return (
    <ReviewHeaderStyles>
      <img className="image" src={exam.image || BLUE_LOGO_PATH} />
      <div className="title">{exam.title}</div>
      <div className="subtitle">{title}</div>
    </ReviewHeaderStyles>
  )
}

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
