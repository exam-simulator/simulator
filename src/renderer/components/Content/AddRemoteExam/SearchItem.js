import React, { useState } from 'react'
import { ChevronDown } from 'styled-icons/boxicons-regular/ChevronDown'
import { ChevronUp } from 'styled-icons/boxicons-regular/ChevronUp'
import { FileDownload } from 'styled-icons/material/FileDownload'
import { BLUE_LOGO_PATH } from '../../../utils/filepaths'
import formatCreatedAt from '../../../utils/formatCreatedAt'
import { ExamItemStyles } from '../Main/ExamItem'

export default ({ exam, onClick }) => {
  const [expand, setExpand] = useState(false)

  const toggleExpand = e => {
    e.stopPropagation()
    setExpand(!expand)
  }

  return (
    <ExamItemStyles expand={expand} onClick={onClick}>
      <div className="main">
        <img className="image" src={exam.image || BLUE_LOGO_PATH} alt={exam.title} />
        <div className="title">{exam.title}</div>
        <div className="stat">{exam.code ? `Code: ${exam.code}` : ''}</div>
        <div className="stat">Created {formatCreatedAt(exam.createdAt)} ago</div>
        <div className="actions more">
          <FileDownload size={20} />
        </div>
        <div className="actions more" onClick={toggleExpand}>
          {expand ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </div>
      </div>
      <div className="extra">
        <div className="description">{exam.description}</div>
        <div />
        <div className="stat">Time: {exam.time} Min</div>
        <div className="stat">Passing: {exam.pass}%</div>
        <div />
        <div />
      </div>
    </ExamItemStyles>
  )
}
