import React, { useState } from 'react'
import styled from 'styled-components'
import { ChevronDown } from 'styled-icons/boxicons-regular/ChevronDown'
import { ChevronUp } from 'styled-icons/boxicons-regular/ChevronUp'
import HistoryItem from './HistoryItem'
import Bar from './Bar'
import { BLUE_LOGO_PATH } from '../../../utils/filepaths'

const HistoryGroupStyles = styled.div`
  width: calc(100% - 10px);
  overflow: hidden;
  border: 1px solid ${props => props.theme.grey[2]};
  border-radius: ${props => props.theme.borderRadius};
  margin-bottom: 3rem;
  transition: 0.3s;
  .group-data {
    height: 5rem;
    display: grid;
    grid-template-columns: 4rem 1fr 1fr 1fr 4rem;
    align-items: center;
    background: ${props => props.theme.grey[0]};
    img {
      justify-self: center;
      width: 2rem;
      height: 2rem;
    }
    .title {
      font: 2rem 'Open Sans';
      font-weight: 700;
      color: ${props => props.theme.grey[12]};
    }
    .expand {
      width: 4rem;
      justify-self: center;
      color: ${props => props.theme.black};
      cursor: pointer;
    }
  }
  .items {
    display: ${props => (props.expand ? 'block' : 'none')};
    padding: 1rem;
    user-select: none;
  }
`

export default ({ reports, averageScore, averageTime, onOpenConfirmReview, onDeleteClick }) => {
  const [expand, setExpand] = useState(false)
  return (
    <HistoryGroupStyles expand={expand}>
      <div className="group-data" onClick={() => setExpand(!expand)}>
        <img src={reports[0].image || BLUE_LOGO_PATH} />
        <div className="title">{reports[0].title}</div>
        <Bar
          type="score"
          value={averageScore}
          threshold={reports[0].pass}
          label1="Average Score:"
        />
        <Bar
          type="time"
          value={averageTime}
          threshold={90}
          label1="Average Time:"
          label2={`${Math.ceil(averageTime / 60)} Min`}
        />
        {expand ? (
          <div className="expand" onClick={() => setExpand(false)}>
            <ChevronUp size={20} />
          </div>
        ) : (
          <div className="expand" onClick={() => setExpand(true)}>
            <ChevronDown size={20} />
          </div>
        )}
      </div>
      <div className="items">
        {reports.map((el, i) => (
          <HistoryItem
            key={i}
            report={el}
            index={i}
            onOpenConfirmReview={onOpenConfirmReview}
            onDeleteClick={onDeleteClick}
          />
        ))}
      </div>
    </HistoryGroupStyles>
  )
}
