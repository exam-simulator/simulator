import React from 'react'
import styled from 'styled-components'
import { Bookmark } from 'styled-icons/material/Bookmark'
import { BookmarkBorder } from 'styled-icons/material/BookmarkBorder'

const TopDisplayStyles = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 2rem;
  & > :first-child {
    font: 2.5rem 'Open Sans';
    font-weight: 700;
    color: ${props => props.theme.grey[10]};
  }
  & > :last-child {
    margin-right: 5rem;
    color: ${props => props.theme.grey[10]};
    cursor: pointer;
  }
`

export default ({ question, length }) => (
  <TopDisplayStyles>
    <div>
      Question {question + 1} of {length}
    </div>
    <BookmarkBorder size={40} />
  </TopDisplayStyles>
)
