import React from 'react'
import styled from 'styled-components'

const StatsStyles = styled.div`
  height: calc(100vh - 17rem);
  border-top: 1px solid ${props => props.theme.grey[2]};
  border-bottom: 1px solid ${props => props.theme.grey[2]};
  padding: 1rem;
  & > * {
    font: 1.25rem 'Open Sans';
  }
`

export default ({ open, exam }) => <StatsStyles />
