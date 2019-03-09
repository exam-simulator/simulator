import React from 'react'
import styled from 'styled-components'
import SessionItem from './SessionItem'
import NoData from './NoData'

const SessionStyles = styled.div`
  width: 100%;
  height: calc(100vh - 13rem);
  overflow-x: hidden;
  overflow-y: auto;
`

export default ({ sessions, setIndexSession }) => {
  if (sessions.length) {
    return (
      <SessionStyles>
        {sessions.map((el, i) => (
          <SessionItem key={i} session={el} setIndexSession={() => setIndexSession(i)} />
        ))}
      </SessionStyles>
    )
  } else {
    return <NoData label="No Session Files" />
  }
}
