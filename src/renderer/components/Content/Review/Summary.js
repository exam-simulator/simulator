import React from 'react'
import styled from 'styled-components'
import { darken } from 'polished'
import formatDate from '../../../utils/formatDate'
import formatTimer from '../../../utils/formatTimer'
import analyzeReviewGridItem from '../../../utils/analyzeReviewGridItem'

const SummaryStyles = styled.div`
  width: 100%;
  height: calc(100vh - 14rem);
  display: grid;
  grid-template-rows: 3rem 1.5fr 3rem 2fr;
  .title {
    justify-self: center;
    font: 2rem 'Open Sans';
    font-weight: 700;
    color: ${props => props.theme.black};
    transform: translateX(-3rem);
  }
  .summary {
    justify-self: center;
    display: grid;
    grid-template-columns: 1fr 1fr;
    .column {
      align-self: center;
      display: grid;
      grid-template-rows: repeat(4, 3rem);
      .row {
        display: grid;
        grid-template-columns: 10rem 10rem;
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
          font: 1.25rem 'Open Sans';
          font-weight: 700;
          color: ${props => props.theme.black};
        }
        .status {
          color: ${props => (props.status ? props.theme.quatro : props.theme.secondary)};
        }
      }
    }
  }
`

const Chart = styled.div`
  align-self: flex-end;
  justify-self: center;
  width: ${props => `calc(${props.items}rem + calc(${props.items * 0.2})rem)`};
  max-width: calc(100vw - 30rem);
  height: 20rem;
  overflow: auto;
  display: grid;
  grid-template-columns: ${props => `repeat(${props.items}, 1rem)`};
  grid-gap: 0.2rem;
  padding-right: 3rem;
  .row {
    align-self: flex-end;
    display: flex;
    flex-direction: column;
    align-items: center;
    .label {
      width: 1rem;
      height: 1.5rem;
      font: 0.7rem 'Open Sans';
      font-weight: 700;
      text-align: center;
      color: ${props => props.theme.grey[5]};
      margin-right: 0.2rem;
    }
  }
`

const ChartBar = styled.div`
  position: relative;
  width: 0.75rem;
  height: ${props => props.width}px;
  background: ${props => darken(0.2, props.background)};
  .tooltip {
    position: absolute;
    top: -2rem;
    left: 80%;
    z-index: 1;
    display: none;
    font: 1rem 'Open Sans';
    font-weight: 700;
    border: 1px solid ${props => props.theme.grey[5]};
    border-radius: ${props => props.theme.borderRadius};
    background: ${props => props.theme.grey[0]};
    color: ${props => props.theme.grey[5]};
    padding: 0.1rem 0.5rem;
  }
  &:hover {
    outline: 1px solid ${props => props.theme.grey[5]};
  }
  &:hover .tooltip {
    display: block;
  }
`

export default ({ report }) => (
  <SummaryStyles status={report.status}>
    <div className="title">Statistics</div>
    <div className="summary">
      <div className="column">
        <div className="row">
          <div>Status</div>
          <div className="data status">{report.status ? 'PASS' : 'FAIL'}</div>
        </div>
        <div className="row">
          <div>Passing</div>
          <div className="data">{report.pass} %</div>
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
      <div className="column">
        <div className="row">
          <div>Score</div>
          <div className="data">{report.score} %</div>
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
      </div>
    </div>
    <div className="title">Question Analysis</div>
    <Chart items={report.testLength}>
      {report.intervals.map((el, i) => {
        const max = Math.max(...report.intervals)
        const ratio = 150 / max
        return (
          <div key={i} className="row">
            <ChartBar width={el * ratio} background={analyzeReviewGridItem(i, report)}>
              <div className="tooltip">{formatTimer(el)}</div>
            </ChartBar>
            <div className="label">{i + 1}</div>
          </div>
        )
      })}
    </Chart>
  </SummaryStyles>
)
