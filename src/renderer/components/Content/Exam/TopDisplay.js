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
    color: ${props => (props.bookmarked ? props.theme.tertiary : props.theme.grey[10])};
    transition: 0.3s;
    cursor: pointer;
    &:hover {
      color: ${props => props.theme.tertiary};
    }
  }
`

export default ({ question, length, marked, onBookmarkQuestion }) => {
  const bookmarked = marked.includes(question)
  return (
    <TopDisplayStyles bookmarked={bookmarked}>
      <div>
        Question {question + 1} of {length}
      </div>
      {bookmarked ? (
        <Bookmark size={40} onClick={() => onBookmarkQuestion(question, false)} />
      ) : (
        <BookmarkBorder size={40} onClick={() => onBookmarkQuestion(question, true)} />
      )}
    </TopDisplayStyles>
  )
}
