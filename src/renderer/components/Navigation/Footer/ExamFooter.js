import React from 'react'
import styled from 'styled-components'
import { lighten } from 'polished'
import { Timer } from 'styled-icons/material/Timer'
import { SkipPrevious } from 'styled-icons/material/SkipPrevious'
import { KeyboardArrowRight } from 'styled-icons/material/KeyboardArrowRight'
import { KeyboardArrowLeft } from 'styled-icons/material/KeyboardArrowLeft'
import { SkipNext } from 'styled-icons/material/SkipNext'
import formatTimer from '../../../utils/formatTimer'

const ExamFooter = styled.div`
  width: ${props => (props.open ? 'calc(100% - 24rem)' : 'calc(100% - 5rem)')};
  height: 100%;
  display: grid;
  grid-template-columns: 15rem 1fr 15rem;
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
  }
`

export default ({ open, time, question, length, setQuestion }) => (
  <ExamFooter open={open} warning={time < 120}>
    <div className="timer">
      <Timer size={30} />
      <div>{formatTimer(time)}</div>
    </div>
    <div className="arrows">
      <div className="arrow" onClick={() => setQuestion(0, 0)}>
        <SkipPrevious size={30} />
      </div>
      <div className="arrow" onClick={() => setQuestion(question - 1, 1)}>
        <KeyboardArrowLeft size={30} />
      </div>
      <div className="arrow" onClick={() => setQuestion(question + 1, 2)}>
        <KeyboardArrowRight size={30} />
      </div>
      <div className="arrow" onClick={() => setQuestion(length - 1, 3)}>
        <SkipNext size={30} />
      </div>
    </div>
    <div />
  </ExamFooter>
)
