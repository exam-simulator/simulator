import React from 'react'
import styled from 'styled-components'
import { Delete } from 'styled-icons/material/Delete'
import { BLUE_LOGO_PATH } from '../../../utils/filepaths'
import formatDate from '../../../utils/formatDate'
import formatTimer from '../../../utils/formatTimer'

const SessionItemStyles = styled.div`
  min-width: 80rem;
  height: 6rem;
  display: grid;
  border: 1px solid ${props => props.theme.grey[2]};
  border-radius: ${props => props.theme.borderRadius};
  cursor: pointer;
  margin-bottom: 2rem;
  user-select: none;
  &:hover {
    background: ${props => props.theme.grey[0]};
  }
  .main {
    display: grid;
    grid-template-columns: 6rem 1fr 8rem 12rem 12rem 4rem;
    justify-items: center;
    align-items: center;
    .image {
      width: 3rem;
      height: 3rem;
    }
    .title {
      justify-self: flex-start;
      font: 2rem 'Open Sans';
      font-weight: 700;
      color: ${props => props.theme.grey[12]};
    }
    .date {
      font: 1rem 'Open Sans';
      font-weight: 700;
      color: ${props => props.theme.grey[10]};
    }
    .stat {
      font: 1.1rem 'Open Sans';
      font-weight: 700;
      color: ${props => props.theme.black};
    }
    .delete {
      color: ${props => props.theme.black};
      &:hover {
        color: ${props => props.theme.secondary};
      }
    }
  }
`

export default ({ session, setIndexSession, setConfirmStartSession, setConfirmDeleteSession }) => {
  const onSessionClick = () => {
    setIndexSession()
    setConfirmStartSession()
  }

  const onDeleteClick = e => {
    e.stopPropagation()
    setIndexSession()
    setConfirmDeleteSession()
  }
  return (
    <SessionItemStyles onClick={onSessionClick}>
      <div className="main">
        <img className="image" src={session.image || BLUE_LOGO_PATH} />
        <div className="title">{session.title}</div>
        <div className="date">{formatDate(session.date)}</div>
        <div className="stat">Time Left: {formatTimer(session.time)}</div>
        <div className="stat">
          Completed: {session.completed}/{session.testLength}
        </div>
        <div className="delete" onClick={onDeleteClick}>
          <Delete size={20} />
        </div>
      </div>
    </SessionItemStyles>
  )
}
