import React, { useState } from 'react'
import styled from 'styled-components'
import { darken } from 'polished'
import { PlayCircleFilled } from 'styled-icons/material/PlayCircleFilled'
import { Delete } from 'styled-icons/material/Delete'
import { BLUE_LOGO_PATH } from '../../../utils/filepaths'
import formatCreatedAt from '../../../utils/formatCreatedAt'

const ExamStyles = styled.div`
  width: 100%;
`

const ExamItem = styled.div`
  width: 70rem;
  display: grid;
  grid-template-columns: 5rem 1fr 4rem;
  grid-gap: 2rem;
  align-items: center;
  padding: 1rem;
  border: 1px solid ${props => props.theme.grey[2]};
  border-radius: ${props => props.theme.borderRadius};
  margin-bottom: 2rem;
  .image {
    width: 4rem;
    cursor: pointer;
  }
  .main {
    cursor: pointer;
    .title {
      font: 2rem 'Open Sans';
      font-weight: 700;
      color: ${props => props.theme.grey[12]};
    }
    .description {
      font: 1.1rem 'Open Sans';
      text-align: justify;
      margin-bottom: 0.5rem;
    }
    .stat {
      font: 0.85rem 'Open Sans';
      font-weight: 600;
      text-transform: uppercase;
      color: ${props => props.theme.grey[10]};
      border: 1px solid ${props => props.theme.grey[2]};
      border-radius: ${props => props.theme.borderRadius};
      background: ${props => props.theme.grey[0]};
      padding: 0.1rem 0.25rem;
      margin-right: 0.5rem;
    }
    .meta {
      display: flex;
      align-items: center;
      font: 1rem 'Open Sans';
      font-weight: 600;
      color: ${props => props.theme.grey[8]};
      margin-top: 0.5rem;
      .avatar {
        width: 2rem;
        height: 2rem;
        border-radius: 50%;
      }
    }
  }
  .actions {
    display: flex;
    justify-content: space-between;
    align-items: center;
    svg {
      transition: 0.3s;
      cursor: pointer;
    }
    .play {
      color: ${props => props.theme.grey[12]};

      &:hover {
        color: ${props => darken(0.1, props.theme.tertiary)};
      }
    }
    .delete {
      color: ${props => props.theme.grey[12]};
      &:hover {
        color: ${props => props.theme.secondary};
      }
    }
  }
`

export default ({ exams, setIndexExam, initExam }) => {
  const [show, setShow] = useState(false)

  const onDeleteClick = i => {
    setShow(true)
    setIndexExam(i)
  }

  return (
    <ExamStyles>
      {exams.map((el, i) => (
        <ExamItem key={i}>
          <img
            className="image"
            src={el.image || BLUE_LOGO_PATH}
            alt={el.title}
            onClick={() => initExam(i)}
          />
          <div className="main" onClick={() => initExam(i)}>
            <div className="title">{el.title}</div>
            <div className="description">{el.description}</div>
            {el.code ? <span className="stat">code: {el.code}</span> : null}
            <span className="stat">questions: {el.test.length}</span>
            <span className="stat">time: {el.time} min</span>
            <span className="stat">passing: {el.pass}%</span>
            <div className="meta">
              <div>Created {formatCreatedAt(el.createdAt)} ago &nbsp;&bull;&nbsp;</div>
              <div>{el.author.name} &nbsp;&bull;&nbsp;</div>
              <img className="avatar" src={el.author.image} />
            </div>
          </div>
          <div className="actions">
            {/* <PlayCircleFilled className="play" size={20} onClick={() => initExam(i)} /> */}
            <Delete className="delete" size={20} onClick={() => onDeleteClick(i)} />
          </div>
        </ExamItem>
      ))}
    </ExamStyles>
  )
}
