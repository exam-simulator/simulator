import React, { useState } from 'react'
import styled from 'styled-components'
import { Delete } from 'styled-icons/material/Delete'
import { ChevronDown } from 'styled-icons/boxicons-regular/ChevronDown'
import { ChevronUp } from 'styled-icons/boxicons-regular/ChevronUp'
import { BLUE_LOGO_PATH } from '../../../utils/filepaths'
import formatCreatedAt from '../../../utils/formatCreatedAt'
import Media from '../../../styles/Media'

const ExamStyles = styled.div`
  width: 100%;
  height: calc(100vh - 14rem);
  overflow-x: hidden;
  overflow-y: auto;
`

const ExamItem = styled.div`
  min-width: 80rem;
  height: ${props => (props.show ? '12rem' : '6rem')};
  display: grid;
  grid-template-rows: ${props => (props.show ? '1fr 1fr' : '1fr')};
  border: 1px solid ${props => props.theme.grey[2]};
  border-radius: ${props => props.theme.borderRadius};
  cursor: pointer;
  margin-bottom: 2rem;
  transition: all 0.3s;
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
    display: ${props => (props.show ? 'grid' : 'none')};
    grid-template-columns: 50rem 1fr 10rem 14rem 6rem 6rem;
    justify-items: center;
    align-items: center;
    transition: all 0.3s;
    .description {
      font: 1rem 'Open Sans';
      text-align: justify;
      padding: 1rem;
    }
    .stat {
      justify-self: flex-start;
      font: 1.25rem 'Open Sans';
      font-weight: 600;
      color: ${props => props.theme.black};
    }
  }
`

export default ({ exams, setIndexExam, initExam }) => {
  const [show, setShow] = useState(null)

  const onDeleteClick = (e, i) => {
    e.stopPropagation()
    setIndexExam(i)
  }

  const toggleShow = (e, i) => {
    e.stopPropagation()
    setShow(show !== null ? null : i)
  }

  return (
    <ExamStyles rows={Math.ceil(exams.length / 2)}>
      {exams.map((el, i) => (
        <ExamItem key={i} show={show === i} onClick={() => initExam(i)}>
          <div className="main">
            <img className="image" src={el.image || BLUE_LOGO_PATH} alt={el.title} />
            <div className="title">{el.title}</div>
            <div className="stat">Questions: {el.test.length}</div>
            <div className="stat">Created {formatCreatedAt(el.createdAt)} ago</div>
            <div className="actions delete" onClick={e => onDeleteClick(e, i)}>
              <Delete size={20} />
            </div>
            <div className="actions more" onClick={e => toggleShow(e, i)}>
              {show === i ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
            </div>
          </div>
          <div className="extra">
            <div className="description">{el.description}</div>
            <div />
            <div className="stat">Time: {el.time} Min</div>
            <div className="stat">Passing Score: {el.pass}%</div>
            <div />
            <div />
          </div>
        </ExamItem>
      ))}
    </ExamStyles>
  )
}
