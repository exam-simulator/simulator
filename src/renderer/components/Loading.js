import React from 'react'
import styled, { keyframes } from 'styled-components'
import { Spinner2 as Spinner } from 'styled-icons/icomoon/Spinner2'
import { RED_LOGO_PATH } from '../utils/filepaths'

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
  height: ${props => props.height}vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: ${props => props.theme.grey[0]};
  .title {
    display: flex;
    justify-content: center;
    align-items: center;
    font: 6rem 'Open Sans';
    font-weight: 700;
    color: ${props => props.theme.black};
    margin-bottom: 5rem;
    img {
      width: 5rem;
      height: 5rem;
    }
  }
  svg {
    color: ${props => props.theme.secondary};
    animation: ${rotate} 1s infinite;
  }
`

export default ({ size, height }) => (
  <LoadingStyles height={height}>
    <div className="title">
      <span>Ex</span>
      <img src={RED_LOGO_PATH} />
      <span>m Simul</span>
      <img src={RED_LOGO_PATH} />
      <span>tor</span>
    </div>
    <Spinner size={size} />
  </LoadingStyles>
)
