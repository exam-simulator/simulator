import React from 'react'
import styled from 'styled-components'
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
import { Calculator } from 'styled-icons/icomoon/Calculator'
import { Bookmark } from 'styled-icons/material/Bookmark'
import { Check } from 'styled-icons/material/Check'
import { Pause } from 'styled-icons/material/Pause'
import { Stop } from 'styled-icons/material/Stop'
import Grid from './Grid'
import Stats from './Stats'

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

export default ({
  open,
  mode,
  exam,
  question,
  answers,
  fillIns,
  orders,
  marked,
  toggleOpen,
  setMode,
  setMainMode,
  setQuestion,
  loadLocalExam,
  onShowExplanation,
  setConfirmBeginExam,
  setConfirmEndExam
}) => {
  // Main Menu show when mode === 0
  const menu0 = [
    {
      type: 'menu',
      text: 'Add Local Exam',
      icon: <PlaylistAdd size={20} />,
      onClick: loadLocalExam
    },
    { type: 'menu', text: 'Add Remote Exam', icon: <CloudDownload size={20} /> },
    { type: 'menu', text: 'Exams', icon: <Folder size={20} />, onClick: () => setMainMode(0) },
    { type: 'menu', text: 'History', icon: <History size={20} />, onClick: () => setMainMode(1) },
    { type: 'menu', text: 'Sessions', icon: <Save size={20} />, onClick: () => setMainMode(2) },
    { type: 'menu', text: 'Exam Maker', icon: <ExitToApp size={20} /> },
    { type: 'menu', text: 'Documentation', icon: <Help size={20} /> },
    { type: 'menu', text: 'About', icon: <Info size={20} /> },
    { type: 'menu', text: 'Report a Bug', icon: <BugReport size={20} /> },
    { type: 'menu', text: 'Settings', icon: <Settings size={20} /> }
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
    { type: 'menu', text: 'Back', icon: <ArrowBack size={20} />, onClick: () => setMode(0) }
  ]

  // Exam Menu show when mode === 2
  const menu2 = [
    { type: 'menu', text: 'All Questions', icon: <FormatListNumbered size={20} /> },
    { type: 'menu', text: 'Marked Questions', icon: <Bookmark size={20} /> },
    { type: 'menu', text: 'Calculator', icon: <Calculator size={20} /> },
    { type: 'grid' },
    { type: 'menu', text: 'Show Answer', icon: <Check size={20} />, onClick: onShowExplanation },
    { type: 'menu', text: 'Pause Exam', icon: <Pause size={20} /> },
    { type: 'menu', text: 'End Exam', icon: <Stop size={20} />, onClick: setConfirmEndExam }
  ]

  const menu = mode === 0 ? menu0 : mode === 1 ? menu1 : mode === 2 ? menu2 : []
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
          } else if (el.type === 'grid') {
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
          }
        })}
      </MainMenu>
    </DrawerStyles>
  )
}
