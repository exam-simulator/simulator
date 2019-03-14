import React from 'react'
import styled from 'styled-components'

const CoverStyles = styled.div`
  width: 50vw;
  height: calc(100vh - 14rem);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: ${props => props.theme.grey[0]};
  border: 1px solid ${props => props.theme.grey[2]};
`

const Image = styled.img`
  max-height: 40vh;
  margin-bottom: 0.5rem;
  border: 1px solid ${props => props.theme.grey[2]};
`

const NormalText = styled.div`
  font: 1.25rem 'Open Sans';
`

const BigText = styled.div`
  font: 3rem 'Open Sans';
  font-weight: 700;
  margin-bottom: 0.5rem;
  color: ${props => props.theme.black};
`

export default React.memo(({ cover }) => (
  <CoverStyles>
    {cover.map((el, i) => {
      if (el.variant === 0) {
        return (
          <React.Fragment key={i}>
            <Image src={el.text} />
            <br />
          </React.Fragment>
        )
      } else if (el.variant === 1) {
        return <NormalText key={i}>{el.text}</NormalText>
      } else if (el.variant === 2) {
        return <BigText key={i}>{el.text}</BigText>
      } else {
        return null
      }
    })}
  </CoverStyles>
))
