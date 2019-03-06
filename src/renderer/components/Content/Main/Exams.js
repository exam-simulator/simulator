import React, { useState } from 'react'
import styled from 'styled-components'
import { Delete } from 'styled-icons/material/Delete'
import { BLUE_LOGO_PATH } from '../../../utils/filepaths'
import formatCreatedAt from '../../../utils/formatCreatedAt'

const ExamStyles = styled.div`
  height: calc(100vh - 14rem);
  display: grid;
  grid-template-columns: 50% 50%;
  grid-template-rows: ${props => `repeat(${props.rows}, 20rem)`};
  overflow-x: hidden;
  overflow-y: auto;
`

const ExamItem = styled.div`
  display: grid;
  grid-template-columns: 6rem 1fr 4rem;
  grid-gap: 2rem;
  align-items: center;
  padding: 1rem;
  border: 1px solid ${props => props.theme.grey[2]};
  border-radius: ${props => props.theme.borderRadius};
  margin-right: 2rem;
  margin-bottom: 2rem;
  &:hover {
    background: ${props => props.theme.grey[0]};
  }
  .image {
    justify-self: center;
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
      font: 1rem 'Open Sans';
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
    justify-self: center;
    .delete {
      transition: 0.3s;
      cursor: pointer;
      color: ${props => props.theme.grey[12]};
      &:hover {
        color: ${props => props.theme.secondary};
      }
    }
  }
`

export default ({ exams, setIndexExam, initExam }) => {
  const onDeleteClick = (e, i) => {
    e.stopPropagation()
    setIndexExam(i)
  }

  return (
    <ExamStyles rows={Math.ceil(exams.length / 2)}>
      {exams.map((el, i) => (
        <ExamItem key={i} onClick={() => initExam(i)}>
          <img className="image" src={el.image || BLUE_LOGO_PATH} alt={el.title} />
          <div className="main">
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
            <Delete className="delete" size={20} onClick={e => onDeleteClick(e, i)} />
          </div>
        </ExamItem>
      ))}
    </ExamStyles>
  )
}
