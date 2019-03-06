import React from 'react'
import styled from 'styled-components'
import { darken } from 'polished'
import { Like } from 'styled-icons/boxicons-solid/Like'
import { Dislike } from 'styled-icons/boxicons-solid/Dislike'
import { Delete } from 'styled-icons/material/Delete'
import { ChevronDown } from 'styled-icons/boxicons-regular/ChevronDown'
import createHistoryGroups from '../../../utils/createHistoryGroups'
import { BLUE_LOGO_PATH } from '../../../utils/filepaths'
import formatDate from '../../../utils/formatDate'

const HistoryStyles = styled.div`
  width: 100%;
`

const HistoryGroup = styled.div`
  width: 100%;
  border: 1px solid ${props => props.theme.grey[2]};
  border-radius: ${props => props.theme.borderRadius};
  margin-bottom: 3rem;
  .group-data {
    height: 5rem;
    display: grid;
    grid-template-columns: 4rem 30rem 30rem 1fr 4rem;
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
      color: ${props => props.theme.black};
    }
    .time {
      display: flex;
      align-items: center;
      font: 1.25rem 'Open Sans';
      font-weight: 600;
    }
    .expand {
      width: 4rem;
      justify-self: center;
      color: ${props => props.theme.black};
      cursor: pointer;
    }
  }
  .items {
    padding: 1rem;
  }
`

const HistoryItem = styled.div`
  width: 100%;
  height: 5rem;
  display: grid;
  grid-template-columns: 8rem 4rem 6rem 20rem 1fr 4rem;
  align-items: center;
  justify-items: center;
  border: 1px solid ${props => props.theme.grey[2]};
  margin-bottom: 1rem;
  cursor: pointer;
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
    color: ${props => darken(0.1, props.theme.tertiary)};
  }
  .fail {
    color: ${props => props.theme.secondary};
  }
  .score {
    font: 1.5rem 'Open Sans';
    font-weight: 700;
    color: ${props => props.theme.black};
  }
  .delete {
    color: ${props => props.theme.black};
  }
`

const Bar = styled.div`
  display: flex;
  align-items: center;
  .bar {
    position: relative;
    width: 10rem;
    height: 1.25rem;
    background: ${props => props.theme.grey[4]};
    margin-left: 1rem;
    margin-right: 1rem;
    .fill {
      position: absolute;
      top: 0;
      left: 0;
      width: ${props => props.width}%;
      height: 1.25rem;
      background: ${props =>
        (props.type === 'score' && props.width >= props.threshold) ||
        (props.type === 'time' && props.width < props.threshold)
          ? props.theme.tertiary
          : props.theme.secondary};
    }
  }
  & > :first-child,
  & > :last-child {
    font: 1.25rem 'Open Sans';
    font-weight: 600;
    color: ${props => props.theme.black};
  }
`

export default ({ history, setIndexHistory }) => {
  const onOpenConfirmReview = i => {
    setIndexHistory(i)
  }

  if (history.length) {
    const [groupedByFilename, uniqueFilenames, averageScores, averageTimes] = createHistoryGroups(
      history
    )
    return (
      <HistoryStyles>
        {uniqueFilenames.map((uf, i) => {
          const key = groupedByFilename[uf][0]
          const time = Math.round(averageTimes[i] / key.time)
          return (
            <HistoryGroup key={`i${i}`}>
              <div className="group-data">
                <img src={key.image || BLUE_LOGO_PATH} />
                <div className="title">{key.title}</div>
                <Bar type="score" width={averageScores[i]} threshold={key.pass}>
                  <div>Average Score:</div>
                  <div className="bar">
                    <div className="fill" />
                  </div>
                  <div>{averageScores[i]}%</div>
                </Bar>
                <Bar type="time" width={time} threshold={90}>
                  <div>Average Time:</div>
                  <div className="bar">
                    <div className="fill" />
                  </div>
                  <div>{Math.round(averageTimes[i] / 60)} Min</div>
                </Bar>
                <div className="expand">
                  <ChevronDown size={20} />
                </div>
              </div>
              <div className="items">
                {groupedByFilename[uf].map((gbf, j) => (
                  <HistoryItem key={`j${j}`} onClick={() => onOpenConfirmReview(gbf.indexHistory)}>
                    <div className="date">{formatDate(gbf.date)}</div>
                    {gbf.status ? (
                      <Like className="pass" size={20} />
                    ) : (
                      <Dislike className="fail" size={20} />
                    )}
                    {gbf.status ? (
                      <div className="status pass">pass</div>
                    ) : (
                      <div className="status fail">fail</div>
                    )}
                    <Bar type="score" width={gbf.score} threshold={key.pass}>
                      <div>Score:</div>
                      <div className="bar">
                        <div className="fill" />
                      </div>
                      <div>{gbf.score}%</div>
                    </Bar>
                    <div />
                    <div
                      className="delete"
                      onClick={e => {
                        e.stopPropagation()
                        // open delete confirm
                      }}
                    >
                      <Delete size={20} />
                    </div>
                  </HistoryItem>
                ))}
              </div>
            </HistoryGroup>
          )
        })}
      </HistoryStyles>
    )
  } else {
    return <div>no history</div>
  }
}
