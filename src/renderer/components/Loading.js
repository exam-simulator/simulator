import React from 'react'
import { Spinner2 as Spinner } from 'styled-icons/icomoon/Spinner2'
import { LoadingStyles } from './LoadingMain'

export default ({ size, height }) => (
  <LoadingStyles color="white" height={height}>
    <Spinner size={size} />
  </LoadingStyles>
)
