import React from 'react'
import styled from 'styled-components'

const SummaryStyles = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  align-items: flex-end;
  .chart {
    display: flex;
  }
`

export default ({ report }) => (
  <SummaryStyles>
    <div className="chart">
      {report.intervals.map((el, i) => (
        <div
          css={`
            width: 5rem;
            height: ${el}px;
            background: blue;
            margin-right: 1rem;
          `}
        />
      ))}
    </div>
  </SummaryStyles>
)
