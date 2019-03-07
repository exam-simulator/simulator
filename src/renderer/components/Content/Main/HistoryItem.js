import React from 'react'
import styled from 'styled-components'
import { darken } from 'polished'
import { Like } from 'styled-icons/boxicons-solid/Like'
import { Dislike } from 'styled-icons/boxicons-solid/Dislike'
import { Delete } from 'styled-icons/material/Delete'
import { ArrowUp } from 'styled-icons/octicons/ArrowUp'
import { ArrowDown } from 'styled-icons/octicons/ArrowDown'
import formatDate from '../../../utils/formatDate'
import Bar from './Bar'

const HistoryItemStyles = styled.div`
  width: 100%;
  height: 5rem;
  display: grid;
  grid-template-columns: 8rem 4rem 6rem 25rem 25rem 1fr 4rem;
  align-items: center;
  justify-items: center;
  border: 1px solid ${props => props.theme.grey[2]};
  border-radius: ${props => props.theme.borderRadius};
  margin-bottom: 1rem;
  transition: 0.3s;
  cursor: pointer;
  &:hover {
    background: ${props => props.theme.grey[0]};
  }
  .date {
    font: 1rem 'Open Sans';
    font-weight: 700;
    color: ${props => props.theme.grey[10]};
  }
  .status {
    text-transform: uppercase;
    font: 1.5rem 'Open Sans';
    font-weight: 700;
  }
  .pass {
    color: ${props => darken(0.1, props.theme.quatro)};
  }
  .fail {
    color: ${props => props.theme.secondary};
  }
  .score {
    font: 1.5rem 'Open Sans';
    font-weight: 700;
    color: ${props => props.theme.black};
  }
  .stats {
    display: flex;
    align-items: center;
    .stat {
      display: flex;
      align-items: center;
      margin-right: 1rem;
      svg {
        margin-right: 0.2rem;
      }
      & > :last-child {
        font: 1.1rem 'Open Sans';
        font-weight: 700;
        color: ${props => props.theme.black};
      }
    }
  }
  .delete {
    color: ${props => props.theme.black};
    &:hover {
      color: ${props => props.theme.secondary};
    }
  }
`

export default ({ report, index, onOpenConfirmReview, onDeleteClick }) => {
  return (
    <HistoryItemStyles onClick={() => onOpenConfirmReview(report.indexHistory)}>
      <div className="date">{formatDate(report.date)}</div>
      {report.status ? <Like className="pass" size={20} /> : <Dislike className="fail" size={20} />}
      {report.status ? (
        <div className="status pass">pass</div>
      ) : (
        <div className="status fail">fail</div>
      )}
      <Bar type="score" value={report.score} threshold={report.pass} label1="Score:" />
      <Bar
        type="time"
        value={report.elapsed / report.time}
        threshold={90}
        label1="Time:"
        label2={`${Math.ceil(report.elapsed / 60)} Min`}
      />
      <div className="stats">
        <div className="stat">
          <ArrowUp className="pass" size={20} />
          <div>{report.correct.length}</div>
        </div>
        <div className="stat">
          <ArrowDown className="fail" size={20} />
          <div>{report.incorrect.length + report.incomplete.length}</div>
        </div>
      </div>
      <div className="delete" onClick={e => onDeleteClick(e, index)}>
        <Delete size={20} />
      </div>
    </HistoryItemStyles>
  )
}
