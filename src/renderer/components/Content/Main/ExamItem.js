import React, { useState } from 'react'
import styled from 'styled-components'
import { Delete } from 'styled-icons/material/Delete'
import { ChevronDown } from 'styled-icons/boxicons-regular/ChevronDown'
import { ChevronUp } from 'styled-icons/boxicons-regular/ChevronUp'
import { BLUE_LOGO_PATH } from '../../../utils/filepaths'
import formatCreatedAt from '../../../utils/formatCreatedAt'

const ExamItemStyles = styled.div`
  min-width: 80rem;
  height: ${props => (props.expand ? '12rem' : '6rem')};
  display: grid;
  grid-template-rows: ${props => (props.expand ? '1fr 1fr' : '1fr')};
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
    grid-template-columns: 8rem 1fr 10rem 14rem 6rem 6rem;
    justify-items: center;
    align-items: center;
    .image {
      justify-self: center;
      width: 4rem;
      cursor: pointer;
    }
    .title {
      justify-self: flex-start;
      font: 2rem 'Open Sans';
      font-weight: 700;
      color: ${props => props.theme.grey[12]};
    }
    .stat {
      justify-self: flex-start;
      font: 1.25rem 'Open Sans';
      font-weight: 600;
      color: ${props => props.theme.black};
    }
    .actions {
      display: grid;
      justify-items: center;
      align-items: center;
      width: 4rem;
      height: 100%;
    }
    .delete {
      transition: 0.3s;
      cursor: pointer;
      color: ${props => props.theme.grey[12]};
      &:hover {
        color: ${props => props.theme.secondary};
      }
    }
    .more {
      color: ${props => props.theme.grey[12]};
    }
  }
  .extra {
    display: ${props => (props.expand ? 'grid' : 'none')};
    grid-template-columns: 50rem 1fr 10rem 14rem 6rem 6rem;
    justify-items: center;
    align-items: center;
    transition: all 0.3s;
    .description {
      font: 1rem 'Open Sans';
      font-weight: 600;
      text-align: justify;
      padding: 1rem;
      color: ${props => props.theme.grey[10]};
    }
    .stat {
      justify-self: flex-start;
      font: 1.25rem 'Open Sans';
      font-weight: 600;
      color: ${props => props.theme.black};
    }
  }
`

export default ({ exam, setIndexExam, initExam, setConfirmDeleteExam }) => {
  const [expand, setExpand] = useState(false)

  const toggleExpand = e => {
    e.stopPropagation()
    setExpand(!expand)
  }

  const onDeleteClick = e => {
    e.stopPropagation()
    setConfirmDeleteExam()
    setIndexExam()
  }

  return (
    <ExamItemStyles expand={expand} onClick={initExam}>
      <div className="main">
        <img className="image" src={exam.image || BLUE_LOGO_PATH} alt={exam.title} />
        <div className="title">{exam.title}</div>
        <div className="stat">Questions: {exam.test.length}</div>
        <div className="stat">Created {formatCreatedAt(exam.createdAt)} ago</div>
        <div className="actions delete" onClick={onDeleteClick}>
          <Delete size={20} />
        </div>
        <div className="actions more" onClick={toggleExpand}>
          {expand ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </div>
      </div>
      <div className="extra">
        <div className="description">{exam.description}</div>
        <div />
        <div className="stat">Time: {exam.time} Min</div>
        <div className="stat">Passing Score: {exam.pass}%</div>
        <div />
        <div />
      </div>
    </ExamItemStyles>
  )
}
