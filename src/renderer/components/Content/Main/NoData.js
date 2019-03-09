import React from 'react'
import styled from 'styled-components'

const NoDataStyles = styled.div`
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

export default ({ label }) => <NoDataStyles>{label}</NoDataStyles>
