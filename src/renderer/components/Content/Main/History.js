import React from 'react'
import styled from 'styled-components'
import createHistoryGroups from '../../../utils/createHistoryGroups'
import HistoryGroup from './HistoryGroup'

const HistoryStyles = styled.div`
  width: 100%;
  height: calc(100vh - 13rem);
  overflow-x: hidden;
  overflow-y: auto;
`

const NoHistory = styled.div`
  height: 5rem;
  display: grid;
  justify-items: center;
  align-items: center;
  font: 2.5rem 'Open Sans';
  font-weight: 700;
  color: ${props => props.theme.grey[10]};
  background: ${props => props.theme.grey[0]};
  border: 1px solid ${props => props.theme.grey[2]};
  border-radius: ${props => props.theme.borderRadius};
  padding: 0.5rem 2rem;
  margin-top: calc(50vh - 14rem);
`

export default ({ history, setIndexHistory, setConfirmReviewExam, setConfirmDeleteHistory }) => {
  const onOpenConfirmReview = i => {
    setIndexHistory(i)
    setConfirmReviewExam()
  }

  const onDeleteClick = (e, i) => {
    e.stopPropagation()
    setIndexHistory(i)
    setConfirmDeleteHistory()
  }

  if (history.length) {
    const [groupedByFilename, uniqueFilenames, averageScores, averageTimes] = createHistoryGroups(
      history
    )
    return (
      <HistoryStyles>
        {uniqueFilenames.map((uf, i) => {
          const reports = groupedByFilename[uf]
          const averageTime = Math.round(averageTimes[i] / reports[0].time)
          return (
            <HistoryGroup
              key={i}
              reports={reports}
              averageScore={averageScores[i]}
              averageTime={averageTime}
              onOpenConfirmReview={onOpenConfirmReview}
              onDeleteClick={onDeleteClick}
            />
          )
        })}
      </HistoryStyles>
    )
  } else {
    return <NoHistory>No History</NoHistory>
  }
}
