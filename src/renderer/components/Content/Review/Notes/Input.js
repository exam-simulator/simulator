import React from 'react'
import styled from 'styled-components'

const InputStyles = styled.div`
  position: relative;
  width: ${props => (props.width ? `${props.width}px` : '200px')};
  margin-bottom: 4rem;
  input,
  textarea {
    width: 100%;
    border: 0;
    outline: 0;
    font: 1.3rem 'Open Sans';
    color: ${props => props.theme.black};
    resize: none;
    overflow: hidden;
    padding: 0;
    padding-bottom: 0.1rem;
    margin: 0;
  }
  .underline {
    position: relative;
    height: 2px;
    background: ${props => props.theme.grey[5]};
  }
`

const Label = styled.span.attrs(props => ({
  style: {
    top: props.focus || props.value ? '-2rem' : '-.3rem',
    font: props.focus || props.value ? '1.1rem "Open Sans"' : '1.5rem "Open Sans"',
    fontWeight: props.focus || props.value ? '600' : '400',
    color: props.focus ? props.theme.black : props.theme.grey[5]
  }
}))`
  position: absolute;
  transition: all 0.2s;
`

const Underline = styled.div.attrs(props => ({
  style: {
    width: props.focus ? '100%' : '0%',
    height: '2px'
  }
}))`
  position: absolute;
  background: ${props => props.theme.black};
  transition: 0.1s;
`

const Hint = styled.div.attrs(props => ({
  style: {
    display: props.show ? 'block' : 'none',
    color: props.focus ? props.theme.black : props.theme.grey[5]
  }
}))`
  position: absolute;
  bottom: -1.3rem;
  left: 0;
  font: 0.9rem 'Open Sans';
  font-weight: 600;
`

const Length = styled.div.attrs(props => ({
  style: {
    display: props.show ? 'block' : 'none',
    color: props.focus ? props.theme.black : props.theme.grey[5]
  }
}))`
  position: absolute;
  bottom: -1.3rem;
  right: 0;
  font: 0.9rem 'Open Sans';
  font-weight: 600;
`

export default class Input extends React.Component {
  state = {
    focus: false
  }

  componentDidMount() {
    this.text.addEventListener('input', this.resize)
    if (this.text.scrollHeight > 20) {
      this.resize()
    }
  }

  componentDidUpdate(prevProps) {
    if (!prevProps.value && this.props.value && this.text.scrollHeight > 20) {
      this.resize()
    }
  }

  componentWillUnmount() {
    this.text.removeEventListener('input', this.resize)
  }

  resize = () => {
    this.text.style.height = 'auto'
    this.text.style.height =
      this.text.scrollHeight > 20
        ? this.text.scrollHeight + 2 + 'px'
        : this.text.scrollHeight + 'px'
  }

  onFocus = () => this.setState({ focus: true }, () => this.text.focus())

  onBlur = () => this.setState({ focus: false })

  render() {
    const {
      props: { type, width, value, label, hint, inputProps, onChange },
      state: { focus }
    } = this
    return (
      <InputStyles
        width={width}
        focus={focus}
        value={Boolean(value)}
        hint={Boolean(hint)}
        bottom={inputProps.hasOwnProperty('maxLength')}
      >
        <Label focus={focus} value={Boolean(value)} onClick={this.onFocus}>
          {label}
        </Label>
        {type === 'textarea' ? (
          <textarea
            ref={el => (this.text = el)}
            {...inputProps}
            rows={1}
            value={value}
            onChange={onChange}
            onFocus={this.onFocus}
            onBlur={this.onBlur}
          />
        ) : (
          <input
            type={type}
            ref={el => (this.text = el)}
            {...inputProps}
            value={value}
            onChange={onChange}
            onFocus={this.onFocus}
            onBlur={this.onBlur}
          />
        )}
        <div className="underline">
          <Underline focus={focus} />
        </div>
        <Hint show={Boolean(hint)} focus={focus}>
          {hint}
        </Hint>
        <Length show={inputProps && inputProps.hasOwnProperty('maxLength')} focus={focus}>
          {value ? value.length : 0}/{inputProps.maxLength || 0}
        </Length>
      </InputStyles>
    )
  }
}
