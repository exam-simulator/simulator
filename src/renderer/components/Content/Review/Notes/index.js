import React from 'react'
import styled from 'styled-components'
import { darken } from 'polished'
import Modal from '../../../Modal'
import { InnerModal } from '../../../../styles/InnerModal'
import { RED_LOGO_PATH } from '../../../../utils/filepaths'
import NodeInput from './NodeInput'

const NotesStyles = styled(InnerModal)`
  width: 60vw;
  height: 40rem;
  overflow: hidden;
  .add-note {
    max-height: 30rem;
    overflow: auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background: white;
    padding: 4rem 1rem;
  }
  .add {
    color: white;
    background: ${props => darken(0.2, props.theme.quatro)};
    &:hover {
      background: ${props => darken(0.3, props.theme.quatro)};
    }
  }
`

export default class Notes extends React.Component {
  state = {
    explanation: []
  }

  componentDidUpdate(prevProps) {
    if (!prevProps.show && this.props.show) {
      this.setExplanation()
    }
  }

  setExplanation = () => {
    const { test, reviewQuestion } = this.props
    this.setState({ explanation: test[reviewQuestion].explanation })
  }

  addNoteNode = () =>
    this.setState(({ explanation }) => ({
      explanation: explanation.concat({ variant: 1, text: '', href: '' })
    }))

  updateNodeText = (index, text) => {
    const { explanation } = this.state
    explanation[index].text = text
  }

  updateNodeVariant = (index, variant) => {
    const { explanation } = this.state
    explanation[index].variant = variant
  }

  deleteNode = index =>
    this.setState(({ explanation }) => ({
      explanation: explanation.filter((el, i) => i !== index)
    }))

  onSave = async () => {
    const { explanation } = this.state
    await this.props.setExamExplanation(explanation)
    this.props.onClose()
  }

  render() {
    const {
      props: { show, onClose },
      state: { explanation }
    } = this
    return (
      <Modal show={show} color="dark" onClose={onClose}>
        <NotesStyles>
          <div className="title">
            <img src={RED_LOGO_PATH} />
            <span>Add Notes</span>
          </div>
          <div className="add-note">
            {explanation &&
              explanation.map((el, i) => (
                <NodeInput
                  key={i}
                  index={i}
                  variant={el.variant}
                  text={el.text}
                  href={el.href}
                  updateNodeText={this.updateNodeText}
                  updateNodeVariant={this.updateNodeVariant}
                  onDelete={() => this.deleteNode(i)}
                />
              ))}
          </div>
          <div className="actions">
            <div className="action add" onClick={this.addNoteNode}>
              Add Note Node
            </div>
            <div className="action confirm" onClick={this.onSave}>
              Save Notes
            </div>
            <div className="action cancel" onClick={onClose}>
              Cancel
            </div>
          </div>
        </NotesStyles>
      </Modal>
    )
  }
}
