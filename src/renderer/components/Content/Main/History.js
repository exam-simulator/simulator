import React from 'react'
import styled from 'styled-components'
import createHistoryGroups from '../../../utils/createHistoryGroups'
import HistoryGroup from './HistoryGroup'
import NoData from './NoData'

const HistoryStyles = styled.div`
  width: 100%;
  height: calc(100vh - 13rem);
  overflow-x: hidden;
  overflow-y: auto;
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
    return <NoData label="No History Files" />
  }
}
