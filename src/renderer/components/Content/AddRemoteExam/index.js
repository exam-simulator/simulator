import React, { useState, useRef } from 'react'
import styled from 'styled-components'
import axios from 'axios'
import { FillInStyles } from '../Exam/FillIn'
import { NoDataStyles } from '../Main/NoData'
import SearchItem from './SearchItem'
import Loading from '../../Loading'

const NoResultsStyles = styled(NoDataStyles)`
  margin-top: 0;
`

const AddRemoteExamStyles = styled.div`
  width: 100%;
  height: calc(100vh - 13rem);
  overflow-x: hidden;
  overflow-y: auto;
  display: grid;
  grid-template-rows: 15rem 1fr;
  .search {
    justify-self: center;
    align-self: center;
    display: flex;
    align-items: center;
    .search-button {
      color: white;
      background: ${props => props.theme.secondary};
      text-transform: uppercase;
      border-radius: ${props => props.theme.borderRadius};
      font: 1rem 'Open Sans';
      font-weight: 700;
      margin-left: 1rem;
      padding: 1.4rem 2rem;
      cursor: pointer;
    }
  }
  .no-results {
    display: grid;
    justify-items: center;
  }
`

export default ({ loadRemoteExam }) => {
  const inputRef = useRef(null)
  const [focus, setFocus] = useState(false)
  const [value, setValue] = useState('')
  const [loading, setLoading] = useState(false)
  const [exams, setExams] = useState([])

  const onChange = ({ target: { value } }) => setValue(value)

  const onKeyDown = ({ keyCode }) => {
    if (keyCode === 13) {
      this.onSearch()
    }
  }

  const onSearch = async () => {
    await setLoading(true)
    const res = await axios({
      method: 'GET',
      url: 'http://localhost:8081/api/search',
      params: {
        term: value
      }
    })
    const exams = res.data.exams
    if (exams && exams.length) {
      setExams(exams)
      setLoading(false)
    } else {
      setExams([])
      setLoading(false)
    }
  }

  const onExamClick = async id => {
    const res = await axios({
      method: 'GET',
      url: 'http://localhost:8081/api/download',
      params: {
        id
      }
    })
    const { filename, exam } = res.data
    await loadRemoteExam(filename, exam)
  }

  return (
    <AddRemoteExamStyles>
      <div className="search">
        <FillInStyles focus={focus}>
          <span>Enter Search Term</span>
          <input
            ref={inputRef}
            type="text"
            spellCheck={false}
            value={value}
            autoFocus
            onChange={onChange}
            onKeyDown={onKeyDown}
            onFocus={() => setFocus(true)}
            onBlur={() => setFocus(false)}
          />
        </FillInStyles>
        <div className="search-button" onClick={onSearch}>
          Search
        </div>
      </div>
      {loading ? (
        <Loading size={50} height={25} />
      ) : (
        <div>
          {exams.length ? (
            exams.map((el, i) => (
              <SearchItem key={el.id} exam={el} onClick={() => onExamClick(el.id)} />
            ))
          ) : (
            <div className="no-results">
              <NoResultsStyles>No Results</NoResultsStyles>
            </div>
          )}
        </div>
      )}
    </AddRemoteExamStyles>
  )
}
