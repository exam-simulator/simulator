import React from 'react'
import styled from 'styled-components'
import { shell } from 'electron'
import { lighten } from 'polished'
import { Menu } from 'styled-icons/material/Menu'
import { ChevronLeft } from 'styled-icons/material/ChevronLeft'
import { PlaylistAdd } from 'styled-icons/material/PlaylistAdd'
import { CloudDownload } from 'styled-icons/material/CloudDownload'
import { Folder } from 'styled-icons/material/Folder'
import { History } from 'styled-icons/material/History'
import { Help } from 'styled-icons/material/Help'
import { Info } from 'styled-icons/material/Info'
import { ExitToApp } from 'styled-icons/material/ExitToApp'
import { Save } from 'styled-icons/material/Save'
import { BugReport } from 'styled-icons/material/BugReport'
import { Settings } from 'styled-icons/material/Settings'
import { PlayArrow } from 'styled-icons/material/PlayArrow'
import { ArrowBack } from 'styled-icons/material/ArrowBack'
import { FormatListNumbered } from 'styled-icons/material/FormatListNumbered'
import { Bookmark } from 'styled-icons/material/Bookmark'
import { Check } from 'styled-icons/material/Check'
import { Pause } from 'styled-icons/material/Pause'
import { Stop } from 'styled-icons/material/Stop'
import { Close } from 'styled-icons/material/Close'
import { QuestionMark } from 'styled-icons/boxicons-regular/QuestionMark'
import { Report } from 'styled-icons/boxicons-solid/Report'
import { Edit } from 'styled-icons/boxicons-solid/Edit'
import showAboutDialog from '../../../utils/showAboutDialog'
import Grid from './Grid'
import Stats from './Stats'
import ReviewGrid from './ReviewGrid'

const DrawerStyles = styled.div`
  position: fixed;
  left: 0;
  z-index: 1;
  width: 24rem;
  height: 100%;
  transition: 0.3s;
  background: ${props => props.theme.grey[0]};
`

const Control = styled.div`
  width: ${props => (props.open ? '24em' : '5rem')};
  height: 5rem;
  display: flex;
  justify-content: ${props => (props.open ? 'flex-end' : 'center')};
  align-items: center;
  border: 1px solid ${props => props.theme.grey[1]};
  border-left: 0;
  border-top: 0;
  transition: 0.3s;
  cursor: pointer;
  svg {
    color: ${props => props.theme.black};
  }
  .chevron {
    margin-right: 1rem;
  }
`

const MainMenu = styled.div`
  height: calc(100vh - 5rem);
  display: flex;
  flex-direction: column;
  border-right: 1px solid ${props => props.theme.grey[1]};
`

const MenuItem = styled.div`
  height: 5rem;
  display: grid;
  grid-template-columns: 5rem 1fr;
  align-items: center;
  justify-items: center;
  color: ${props => props.theme.black};
  cursor: pointer;
  &:hover {
    background: ${props => lighten(0.1, props.theme.primary)};
  }
  & > :first-child {
    color: inherit;
  }
  & > :last-child {
    justify-self: flex-start;
    font: 1.5rem 'Open Sans';
    font-weight: 600;
    padding-left: 2rem;
    color: inherit;
  }
`

const Spacer0 = styled.div`
  height: calc(100vh - 50grem);
  border-top: 1px solid ${props => props.theme.grey[2]};
  border-bottom: 1px solid ${props => props.theme.grey[2]};
`

export default ({
  open,
  mode,
  exam,
  question,
  answers,
  fillIns,
  orders,
  marked,
  report,
  reviewMode,
  reviewQuestion,
  toggleOpen,
  setMode,
  setMainMode,
  setQuestion,
  pauseExam,
  loadLocalExam,
  onShowExplanation,
  setExamMode,
  setReviewMode,
  setReviewType,
  setReviewQuestion,
  setConfirmBeginExam,
  setConfirmEndExam,
  setConfirmSaveSession
}) => {
  // Main Menu show when mode === 0
  const menu0 = [
    {
      type: 'menu',
      text: 'Add Local Exam',
      icon: <PlaylistAdd size={20} />,
      onClick: loadLocalExam
    },
    // {
    //   type: 'menu',
    //   text: 'Add Remote Exam',
    //   icon: <CloudDownload size={20} />,
    //   onClick: () => setMainMode(4)
    // },
    { type: 'menu', text: 'Exams', icon: <Folder size={20} />, onClick: () => setMainMode(0) },
    { type: 'menu', text: 'History', icon: <History size={20} />, onClick: () => setMainMode(1) },
    { type: 'menu', text: 'Sessions', icon: <Save size={20} />, onClick: () => setMainMode(2) },
    { type: 'spacer0' },
    {
      type: 'menu',
      text: 'Exam Maker',
      icon: <ExitToApp size={20} />,
      onClick: () => shell.openExternal('https://exam-maker.herokuapp.com/')
    },
    {
      type: 'menu',
      text: 'Documentation',
      icon: <Help size={20} />,
      onClick: () => shell.openExternal('https://exam-simulator.gitbook.io/exam-simulator/')
    },
    {
      type: 'menu',
      text: 'About',
      icon: <Info size={20} />,
      onClick: showAboutDialog
    },
    {
      type: 'menu',
      text: 'Report a Bug',
      icon: <BugReport size={20} />,
      onClick: () =>
        shell.openExternal(
          'https://github.com/exam-simulator/simulator/issues/new?assignees=&labels=&template=bug_report.md&title='
        )
    },
    {
      type: 'menu',
      text: 'Settings',
      icon: <Settings size={20} />,
      onClick: () => setMainMode(3)
    }
  ]

  // Cover Menu show when mode === 1
  const menu1 = [
    {
      type: 'menu',
      text: 'Start Exam',
      icon: <PlayArrow size={20} />,
      onClick: setConfirmBeginExam
    },
    { type: 'stats' },
    {
      type: 'menu',
      text: 'Back to Main',
      icon: <ArrowBack size={20} />,
      onClick: () => {
        setMode(0)
        setMainMode(0)
      }
    }
  ]

  // Exam Menu show when mode === 2
  const menu2 = [
    {
      type: 'menu',
      text: 'All Questions',
      icon: <FormatListNumbered size={20} />,
      onClick: () => setExamMode(0)
    },
    {
      type: 'menu',
      text: 'Marked Questions',
      icon: <Bookmark size={20} />,
      onClick: () => setExamMode(1)
    },
    { type: 'menu', text: 'Show Answer', icon: <Check size={20} />, onClick: onShowExplanation },
    { type: 'exam-grid' },
    {
      type: 'menu',
      text: 'Save Session',
      icon: <Save size={20} />,
      onClick: setConfirmSaveSession
    },
    { type: 'menu', text: 'Pause Exam', icon: <Pause size={20} />, onClick: pauseExam },
    { type: 'menu', text: 'End Exam', icon: <Stop size={20} />, onClick: setConfirmEndExam }
  ]

  // Review Menu show when mode === 3
  const menu3 = [
    {
      type: 'menu',
      text: 'All Questions',
      icon: <FormatListNumbered size={20} />,
      onClick: () => {
        setReviewMode(1)
        setReviewType(0)
      }
    },
    {
      type: 'menu',
      text: 'Incorrect Answers',
      icon: <Close size={20} />,
      onClick: () => {
        setReviewMode(1)
        setReviewType(1)
      }
    },
    {
      type: 'menu',
      text: 'Incomplete',
      icon: <QuestionMark size={20} />,
      onClick: () => {
        setReviewMode(1)
        setReviewType(2)
      }
    },
    { type: 'review-grid' },
    {
      type: 'menu',
      text: 'Report Summary',
      icon: <Report size={20} />,
      onClick: () => setReviewMode(0)
    },
    {
      type: 'menu',
      text: 'Add Notes',
      icon: <Edit size={20} />
    },
    {
      type: 'menu',
      text: 'Back to Main',
      icon: <ArrowBack size={20} />,
      onClick: () => {
        setMode(0)
        setMainMode(0)
      }
    }
  ]

  const menu =
    mode === 0 ? menu0 : mode === 1 ? menu1 : mode === 2 ? menu2 : mode === 3 ? menu3 : []
  return (
    <DrawerStyles>
      <Control open={open} onClick={toggleOpen}>
        {open ? <ChevronLeft className="chevron" size={20} /> : <Menu size={20} />}
      </Control>
      <MainMenu>
        {menu.map((el, i) => {
          if (el.type === 'menu') {
            return (
              <MenuItem key={el.text} onClick={el.onClick}>
                {el.icon}
                <div>{el.text}</div>
              </MenuItem>
            )
          } else if (el.type === 'stats') {
            return <Stats key={i} open={open} exam={exam} />
          } else if (el.type === 'exam-grid') {
            return (
              <Grid
                key={i}
                open={open}
                length={exam.test.length}
                question={question}
                answers={answers}
                fillIns={fillIns}
                orders={orders}
                marked={marked}
                setQuestion={setQuestion}
              />
            )
          } else if (el.type === 'review-grid') {
            return (
              <ReviewGrid
                key={i}
                open={open}
                report={report}
                reviewMode={reviewMode}
                reviewQuestion={reviewQuestion}
                setReviewMode={setReviewMode}
                setReviewType={setReviewType}
                setReviewQuestion={setReviewQuestion}
              />
            )
          } else if (el.type === 'spacer0') {
            return <Spacer0 key={i} />
          }
        })}
      </MainMenu>
    </DrawerStyles>
  )
}
