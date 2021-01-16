import React from 'react'
import PropTypes from 'prop-types'
import Radium from 'radium'
import ThumbItem from './ThumbItem'

const Thumb = ({
  thumb: { itemsNumber, thumbItemHandler, activeItem },
  color,
}) => {
  const styles = {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    maxHeight: '40px',
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',
  }
  const createThumbItems = (Component, items, handler, currentItem) => {
    const thumbItems = []
    for (let i = 1; i <= items; i += 1) {
      thumbItems.push(
        <Component
          key={i}
          id={i}
          thumbItemHandler={handler}
          current={i === currentItem}
          color={color}
        />,
      )
    }
    return thumbItems
  }
  const thumbItems = createThumbItems(
    ThumbItem,
    itemsNumber,
    thumbItemHandler,
    activeItem,
  )
  return <div style={styles}>{thumbItems}</div>
}
Thumb.propTypes = {
  thumb: PropTypes.exact({
    itemsNumber: PropTypes.number,
    activeItem: PropTypes.number,
    thumbItemHandler: PropTypes.func,
  }).isRequired,
  color: PropTypes.string.isRequired,
}
export default Radium(Thumb)
