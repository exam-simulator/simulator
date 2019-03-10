import React from 'react'
import styled from 'styled-components'
import { lighten } from 'polished'
import { Timer } from 'styled-icons/material/Timer'
import { SkipPrevious } from 'styled-icons/material/SkipPrevious'
import { KeyboardArrowRight } from 'styled-icons/material/KeyboardArrowRight'
import { KeyboardArrowLeft } from 'styled-icons/material/KeyboardArrowLeft'
import { Calculator } from 'styled-icons/icomoon/Calculator'
import { SkipNext } from 'styled-icons/material/SkipNext'
import { execFile } from 'child_process'
import formatTimer from '../../../utils/formatTimer'

const ExamFooter = styled.div`
  width: ${props => (props.open ? 'calc(100% - 24rem)' : 'calc(100% - 5rem)')};
  height: 100%;
  display: grid;
  grid-template-columns: 10rem 1fr 5rem;
  align-items: center;
  transition: 0.3s;
  .timer {
    display: flex;
    align-items: center;
    justify-content: center;
    color: ${props => (props.warning ? props.theme.secondary : props.theme.black)};
    svg {
      color: inherit;
      margin-right: 0.5rem;
    }
    & > :last-child {
      font: 2rem 'Open Sans';
      font-weight: 700;
    }
  }
  .arrows {
    justify-self: center;
    display: grid;
    grid-template-columns: repeat(4, 5rem);
  }
  .arrow {
    height: 5rem;
    display: grid;
    justify-items: center;
    align-items: center;
    transition: 0.3s;
    cursor: pointer;
    &:hover {
      background: ${props => lighten(0.1, props.theme.primary)};
    }
    svg {
      color: ${props => props.theme.black};
    }
  }
`

const calculator = () => {
  if (process.platform === 'win32') {
    execFile(`C:/Windows/System32/calc.exe`)
  }
}

export default ({
  open,
  time,
  onFirstQuestion,
  onPrevQuestion,
  onNextQuestion,
  onLastQuestion
}) => (
  <ExamFooter open={open} warning={time < 120}>
    <div className="timer">
      <Timer size={30} />
      <div>{formatTimer(time)}</div>
    </div>
    <div className="arrows">
      <div className="arrow" onClick={onFirstQuestion}>
        <SkipPrevious size={30} />
      </div>
      <div className="arrow" onClick={onPrevQuestion}>
        <KeyboardArrowLeft size={30} />
      </div>
      <div className="arrow" onClick={onNextQuestion}>
        <KeyboardArrowRight size={30} />
      </div>
      <div className="arrow" onClick={onLastQuestion}>
        <SkipNext size={30} />
      </div>
    </div>
    <div className="arrow" onClick={calculator}>
      <Calculator size={30} />
    </div>
  </ExamFooter>
)
