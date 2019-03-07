import React from 'react'
import { findDOMNode } from 'react-dom'
import { DragSource, DropTarget } from 'react-dnd'
import { compose } from 'recompose'
import { lighten } from 'polished'

const ItemTypes = {
  DOC: 'drag-order-choice'
}

const choiceSource = {
  beginDrag(props) {
    return {
      id: props.label,
      index: props.index
    }
  },
  endDrag(props, monitor) {
    if (!monitor.didDrop()) {
      return
    }
    props.onDragEnd()
  }
}

const choiceTarget = {
  hover(props, monitor, component) {
    if (!component) {
      return null
    }

    const dragIndex = monitor.getItem().index
    const hoverIndex = props.index

    if (dragIndex === hoverIndex) {
      return
    }

    const hoverBoundingRect = findDOMNode(component).getBoundingClientRect()
    const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
    const clientOffset = monitor.getClientOffset()
    const hoverClientY = clientOffset.y - hoverBoundingRect.top

    if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
      return
    }

    if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
      return
    }

    props.moveAnswer(dragIndex, hoverIndex)
    monitor.getItem().index = hoverIndex
  }
}

class ListItem extends React.Component {
  render() {
    const { text, isDragging, connectDragSource, connectDropTarget } = this.props
    return (
      connectDragSource &&
      connectDropTarget &&
      connectDragSource(
        connectDropTarget(
          <div>
            <div
              css={`
                width: 50%;
                opacity: ${isDragging ? 0 : 1};
                padding: 1rem 1rem;
                margin-bottom: 1rem;
                background: ${props => lighten(0.2, props.theme.primary)};
                color: ${props => props.theme.grey[10]};
                border: 2px dashed ${props => props.theme.grey[5]};
                font: 1.25rem 'Open Sans';
                font-weight: 700;
                cursor: move;
              `}
            >
              {text}
            </div>
          </div>
        )
      )
    )
  }
}

function collectSource(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  }
}

function collectTarget(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget()
  }
}

export default compose(
  DragSource(ItemTypes.DOC, choiceSource, collectSource),
  DropTarget(ItemTypes.DOC, choiceTarget, collectTarget)
)(ListItem)
