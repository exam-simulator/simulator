import React from 'react'
import styled from 'styled-components'

export const InnerHeader = styled.div`
  height: 5rem;
  display: grid;
  align-items: center;
  .title {
    font: 2rem 'Open Sans';
    font-weight: 700;
    color: ${props => props.theme.black};
    margin-left: 1rem;
  }
  .image {
    justify-self: center;
    width: 3rem;
    height: 3rem;
  }
  .subtitle {
    font: 1.1rem 'Open Sans';
    font-weight: 700;
    color: ${props => props.theme.grey[10]};
    margin-top: 0.5rem;
    margin-left: 1rem;
  }
`

export default ({ mainMode }) => {
  const title = mainMode === 0 ? 'Exams' : mainMode === 1 ? 'History' : 'Sessions'
  return (
    <InnerHeader>
      <div className="title">{title}</div>
    </InnerHeader>
  )
}
