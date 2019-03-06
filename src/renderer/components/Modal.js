import React from 'react'
import styled, { keyframes } from 'styled-components'

const grow = keyframes`
  from {
    transform: scale(.25) translate(-50%, -50%);
  }
  to {
    transform: scale(1) translate(-50%, -50%);
  }
`

const ModalWindow = styled.div`
  display: ${props => (props.show ? 'block' : 'none')};
  position: fixed;
  top: 0;
  left: 0;
  z-index: 3;
  width: 100%;
  height: 100%;
  background: ${props =>
    props.color === 'light'
      ? 'rgba(255, 255, 255, 0.5)'
      : props.color === 'dark'
      ? 'rgba(0, 0, 0, 0.5)'
      : 'transparent'};
`

const ModalMain = styled.div`
  position: fixed;
  max-width: 100%;
  height: auto;
  top: 50%;
  left: 50%;
  z-index: 4;
  transform: translate(-50%, -50%);
  transform-origin: left center;
  animation: ${grow} 200ms ease;
`

export default class Modal extends React.Component {
  modal = React.createRef()

  componentDidUpdate(prevProps) {
    if (!prevProps.show && this.props.show) {
      document.body.addEventListener('click', this.onClickAway)
    }
  }

  componentWillUnmount() {
    document.body.removeEventListener('click', this.onClickAway)
  }

  onClickAway = e => {
    if (e.target === this.modal.current) {
      this.props.onClose()
    }
  }

  render() {
    const {
      props: { children, show, color }
    } = this
    return (
      <ModalWindow ref={this.modal} show={show} color={color}>
        <ModalMain>{children}</ModalMain>
      </ModalWindow>
    )
  }
}
