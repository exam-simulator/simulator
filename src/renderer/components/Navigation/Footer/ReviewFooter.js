import React from 'react'
import styled from 'styled-components'
import { lighten } from 'polished'
import { SkipPrevious } from 'styled-icons/material/SkipPrevious'
import { KeyboardArrowRight } from 'styled-icons/material/KeyboardArrowRight'
import { KeyboardArrowLeft } from 'styled-icons/material/KeyboardArrowLeft'
import { SkipNext } from 'styled-icons/material/SkipNext'

const ReviewFooterStyles = styled.div`
  width: ${props => (props.open ? 'calc(100% - 24rem)' : 'calc(100% - 5rem)')};
  height: 100%;
  display: grid;
  grid-template-columns: 1fr;
  align-items: center;
  transition: 0.3s;
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

export default ({ open, onFirstQuestion, onPrevQuestion, onNextQuestion, onLastQuestion }) => (
  <ReviewFooterStyles open={open}>
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
  </ReviewFooterStyles>
)
