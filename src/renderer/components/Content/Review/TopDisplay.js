import React from 'react'
import styled from 'styled-components'

const TopDisplayStyles = styled.div`
  margin-bottom: 2rem;
  & > :first-child {
    font: 2.5rem 'Open Sans';
    font-weight: 700;
    color: ${props => props.theme.grey[10]};
  }
`

export default ({ exam, reviewQuestion }) => (
  <TopDisplayStyles>
    <div>
      Question {reviewQuestion + 1} of {exam.test.length}
    </div>
  </TopDisplayStyles>
)
