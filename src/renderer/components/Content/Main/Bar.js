import React from 'react'
import styled from 'styled-components'
import propTypes from 'prop-types'

const BarStyles = styled.div`
  display: flex;
  align-items: center;
  .bar {
    position: relative;
    width: 10rem;
    height: 1.25rem;
    background: ${props => props.theme.grey[4]};
    margin-left: 1rem;
    margin-right: 1rem;
    .fill {
      position: absolute;
      top: 0;
      left: 0;
      width: ${props => props.value}%;
      height: 1.25rem;
      background: ${props =>
        (props.type === 'score' && props.value >= props.threshold) ||
        (props.type === 'time' && props.value < props.threshold)
          ? props.theme.quatro
          : props.theme.secondary};
    }
  }
  & > :first-child,
  & > :last-child {
    font: 1.25rem 'Open Sans';
    font-weight: 600;
    color: ${props => props.theme.black};
  }
`

const Bar = ({ type, value, threshold, label1, label2 }) => {
  return (
    <BarStyles type={type} value={value} threshold={threshold}>
      <div>{label1}</div>
      <div className="bar">
        <div className="fill" />
      </div>
      <div>{type === 'score' ? `${value}%` : label2}</div>
    </BarStyles>
  )
}

Bar.propTypes = {
  type: propTypes.oneOf(['score', 'time']).isRequired,
  value: propTypes.number.isRequired,
  threshold: propTypes.number.isRequired,
  label1: propTypes.string.isRequired,
  label2: propTypes.string
}

export default Bar
