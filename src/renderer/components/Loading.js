import React from 'react'
import styled, { keyframes } from 'styled-components'
import { Spinner2 as Spinner } from 'styled-icons/icomoon/Spinner2'

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
transform: rotate(360deg);
  }
`

const LoadingStyles = styled.div`
  width: 100%;
  height: 100vh;
  display: grid;
  justify-items: center;
  align-items: center;
  svg {
    color: ${props => props.theme.secondary};
    animation: ${rotate} 1s infinite;
  }
`

export default ({ size }) => (
  <LoadingStyles>
    <Spinner size={size} />
  </LoadingStyles>
)
