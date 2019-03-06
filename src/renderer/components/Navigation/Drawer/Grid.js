import React from 'react'
import styled from 'styled-components'
import analyzeGridItem from '../../../utils/analyzeGridItem'

const GridStyles = styled.div`
  height: calc(100vh - 35rem);
  border-top: 1px solid ${props => props.theme.grey[2]};
  border-bottom: 1px solid ${props => props.theme.grey[2]};
  .legend {
    height: 3rem;
    display: flex;
    justify-content: center;
    align-items: center;
    .item {
      display: flex;
      align-items: center;
      margin-right: 1rem;
      & > :first-child {
        width: 1rem;
        height: 1rem;
        margin-right: 0.25rem;
      }
      & > :last-child {
        font: 0.9rem 'Open Sans';
      }
    }
    .complete {
      background: ${props => props.theme.primary};
    }
    .bookmarked {
      background: ${props => props.theme.secondary};
    }
    .incomplete {
      background: ${props => props.theme.grey[2]};
    }
  }
  .grid {
    height: calc(100vh - 40rem);
    display: flex;
    flex-wrap: wrap;
    align-content: flex-start;
    padding: 1rem;
    overflow-y: auto;
  }
`

const GridItem = styled.div`
  width: 4.5rem;
  height: 4.5rem;
  display: grid;
  justify-items: center;
  align-items: center;
  margin-right: 0.5rem;
  margin-bottom: 0.5rem;
  background: ${props => props.background};
  border: 1px solid ${props => props.theme.grey[3]};
  font: 1rem 'Open Sans';
  font-weight: 700;
  outline: 2px solid ${props => (props.selected ? props.theme.primary : 'transparent')};
  cursor: pointer;
`

export default ({ open, length, question, answers, fillIns, orders, marked, setQuestion }) => {
  if (open) {
    return (
      <GridStyles>
        <div className="legend">
          <div className="item">
            <div className="complete" />
            <div>Complete</div>
          </div>
          <div className="item">
            <div className="bookmarked" />
            <div>Bookmarked</div>
          </div>
          <div className="item">
            <div className="incomplete" />
            <div>Incomplete</div>
          </div>
        </div>
        <div className="grid">
          {Array(length)
            .fill(null)
            .map((el, i) => {
              const background = analyzeGridItem(i, answers, fillIns, orders, marked)
              return (
                <GridItem
                  key={i}
                  background={background}
                  selected={i === question}
                  onClick={() => setQuestion(i, 'grid')}
                >
                  {i + 1}
                </GridItem>
              )
            })}
        </div>
      </GridStyles>
    )
  } else {
    return null
  }
}