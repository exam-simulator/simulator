import React from 'react'
import Modal from './Modal'
import { RED_LOGO_PATH } from '../utils/filepaths'
import { InnerModal } from '../styles/InnerModal'

const Confirm = ({ show, title, message, buttons, onConfirm, onClose }) => (
  <Modal show={show} color="dark" onClose={onClose}>
    <InnerModal>
      <div className="title">
        <img src={RED_LOGO_PATH} />
        <span>{title}</span>
      </div>
      <div className="message">{message}</div>
      <div className="actions">
        <div className="action confirm" onClick={onConfirm}>
          {buttons[0]}
        </div>
        {buttons.length === 2 ? (
          <div className="action cancel" onClick={onClose}>
            {buttons[1]}
          </div>
        ) : null}
      </div>
    </InnerModal>
  </Modal>
)

Confirm.defaultProps = {
  title: '',
  message: '',
  buttons: ['Okay', 'Cancel']
}

export default Confirm
