import React from 'react'
import { DragDropContext } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'
import ListOrderItem from './ListOrderItem'
import randomizeArray from '../../../utils/randomizeArray'
const update = require('immutability-helper')

class ListOrder extends React.Component {
  state = {
    choices: null
  }

  componentDidMount() {
    const { choices, order } = this.props
    let newChoices
    if (order) {
      newChoices = order.map(o => choices[o])
    } else {
      newChoices = randomizeArray(choices.slice(0))
    }
    this.setState({ choices: newChoices })
  }

  renderChoices = () => {
    const { choices } = this.state
    return (
      choices &&
      choices.map((c, i) => (
        <ListOrderItem
          key={c.label}
          index={i}
          id={c.label}
          text={c.text}
          moveAnswer={this.moveAnswer}
          onDragEnd={this.onDragEnd}
        />
      ))
    )
  }

  moveAnswer = (dragIndex, hoverIndex) => {
    const { choices } = this.state
    const dragChoice = choices[dragIndex]
    this.setState(
      update(this.state, {
        choices: {
          $splice: [[dragIndex, 1], [hoverIndex, 0, dragChoice]]
        }
      })
    )
  }

  onDragEnd = () => {
    const { index, onListOrder } = this.props
    const order = this.state.choices.map(c => c.label)
    onListOrder(order, index)
  }

  render() {
    return <div>{this.renderChoices()}</div>
  }
}

export default DragDropContext(HTML5Backend)(ListOrder)
