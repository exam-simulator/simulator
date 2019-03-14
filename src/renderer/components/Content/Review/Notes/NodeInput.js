import React from 'react'
import styled from 'styled-components'
import { Image } from 'styled-icons/material/Image'
import { Title } from 'styled-icons/material/Title'
import { Delete } from 'styled-icons/material/Delete'
import Input from './Input'

const NodeInputStyles = styled.div`
  display: grid;
  grid-template-columns: 9rem 1fr 4rem;
  .variants {
    width: 7.5rem;
    height: 2rem;
    display: flex;
    border: 1px solid ${props => props.theme.grey[2]};
  }
  & > :last-child {
    justify-self: center;
    margin-top: 0.5rem;
    color: ${props => props.theme.grey[10]};
    transition: 0.3s;
    cursor: pointer;
    &:hover {
      color: ${props => props.theme.secondary};
    }
  }
`

const Option = styled.div`
  width: 3rem;
  display: grid;
  justify-items: center;
  align-items: center;
  background: ${props => (props.highlight ? props.theme.primary : props.theme.grey[0])};
  color: ${props => props.theme.grey[10]};
  transition: 0.3s;
  cursor: pointer;
  &:hover {
    background: ${props => props.theme.primary};
  }
  svg {
    color: inherit;
  }
`

export default class NodeInput extends React.Component {
  state = {
    variant: 1,
    text: ''
  }

  componentDidMount() {
    this.setNodeState()
  }

  setNodeState = () => {
    const { variant, text, href } = this.props
    this.setState({ variant, text, href })
  }

  onChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value })
    this.props.updateNodeText(this.props.index, value)
  }

  onClick = variant => {
    this.setState({ variant })
    this.props.updateNodeVariant(this.props.index, variant)
  }

  render() {
    const {
      props: { onDelete },
      state: { variant, text }
    } = this
    return (
      <NodeInputStyles>
        <div className="variants">
          <Option highlight={variant === 2} onClick={() => this.onClick(2)}>
            <Title size={20} />
          </Option>
          <Option highlight={variant === 1} onClick={() => this.onClick(1)}>
            <Title size={13} />
          </Option>
          <Option highlight={variant === 0} onClick={() => this.onClick(0)}>
            <Image size={15} />
          </Option>
        </div>
        <Input
          type="textarea"
          width={400}
          label={variant === 0 ? 'Source URL' : variant === 1 ? 'Normal Text' : 'Header Text'}
          value={text}
          onChange={this.onChange}
          inputProps={{ name: 'text', spellCheck: false }}
        />
        <Delete size={15} onClick={onDelete} />
      </NodeInputStyles>
    )
  }
}
