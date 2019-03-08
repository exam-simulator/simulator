import React from 'react'
import styled from 'styled-components'
import { darken } from 'polished'
import formatDate from '../../../utils/formatDate'
import formatTimer from '../../../utils/formatTimer'
import analyzeReviewGridItem from '../../../utils/analyzeReviewGridItem'

const SummaryStyles = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  .summary {
    justify-self: center;
    display: grid;
    grid-template-rows: 5rem repeat(10, 3rem);
    .row {
      display: grid;
      grid-template-columns: 10rem 20rem;
      align-items: center;
      & > :first-child {
        font: 1.2rem 'Open Sans';
        font-weight: 700;
        color: ${props => props.theme.grey[10]};
      }
      .image {
        width: 4rem;
        height: 4rem;
      }
      .data {
        font: 1.5rem 'Open Sans';
        font-weight: 700;
      }
      .status {
        color: ${props => (props.status ? props.theme.quatro : props.theme.secondary)};
      }
    }
  }
`

const Chart = styled.div`
  justify-self: center;
  width: 40rem;
  height: 40rem;
  overflow: auto;
  display: grid;
  grid-template-rows: ${props => `repeat(${props.items}, 1.2rem)`};
  grid-gap: 0.25rem;
  padding: 1rem;
  padding-top: 3rem;
  .row {
    display: flex;
    .label {
      width: 1.5rem;
      font: 1rem 'Open Sans';
      font-weight: 600;
      color: ${props => props.theme.grey[10]};
      margin-right: 0.25rem;
    }
  }
`

const ChartBar = styled.div`
  position: relative;
  width: ${props => props.width}px;
  height: 1.2rem;
  background: ${props => darken(0.2, props.background)};
  .tooltip {
    position: absolute;
    top: -2rem;
    left: 80%;
    z-index: 1;
    display: none;
    font: 1rem 'Open Sans';
    font-weight: 600;
    border: 1px solid ${props => props.theme.grey[5]};
    border-radius: ${props => props.theme.borderRadius};
    background: ${props => props.theme.grey[0]};
    padding: 0.25rem 0.5rem;
  }
  &:hover {
    outline: 1px solid ${props => props.theme.grey[10]};
  }
  &:hover .tooltip {
    display: block;
  }
`

export default ({ report }) => (
  <SummaryStyles status={report.status}>
    <div className="summary">
      <div className="row">
        <div>Logo</div>
        <img className="image" src={report.image} />
      </div>
      <div className="row">
        <div>Title</div>
        <div className="data">{report.title}</div>
      </div>
      <div className="row">
        <div>Code</div>
        <div className="data">{report.code || 'N/A'}</div>
      </div>
      <div className="row">
        <div>Status</div>
        <div className="data status">{report.status ? 'PASS' : 'FAIL'}</div>
      </div>
      <div className="row">
        <div>Score</div>
        <div className="data">{report.score} %</div>
      </div>
      <div className="row">
        <div>Passing</div>
        <div className="data">{report.pass} %</div>
      </div>
      <div className="row">
        <div>Correct</div>
        <div className="data">
          {report.correct.length}/{report.testLength}
        </div>
      </div>
      <div className="row">
        <div>Incorrect</div>
        <div className="data">
          {report.incorrect.length}/{report.testLength}
        </div>
      </div>
      <div className="row">
        <div>Incomplete</div>
        <div className="data">
          {report.incomplete.length}/{report.testLength}
        </div>
      </div>
      <div className="row">
        <div>Time</div>
        <div className="data">{formatTimer(report.elapsed)}</div>
      </div>
      <div className="row">
        <div>Date</div>
        <div className="data">{formatDate(report.date)}</div>
      </div>
    </div>
    <Chart items={report.testLength}>
      {report.intervals.map((el, i) => {
        const max = Math.max(...report.intervals)
        const ratio = 380 / max
        return (
          <div key={i} className="row">
            <div className="label">{i + 1}.</div>
            <ChartBar width={el * ratio} background={analyzeReviewGridItem(i, report)}>
              <div className="tooltip">{formatTimer(el)}</div>
            </ChartBar>
          </div>
        )
      })}
    </Chart>
  </SummaryStyles>
)
