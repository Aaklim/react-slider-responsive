import React from 'react'
import PropTypes from 'prop-types'
import Radium from 'radium'

const ThumbItem = ({ id, thumbItemHandler, current, color }) => {
  const currentItem = Radium.keyframes({
    '0%': { opacity: 0.2 },
    '50%': { opacity: 0.5 },
    '100%': { opacity: 1 },
  })
  const styles = {
    main: {
      width: '10px',
      height: '10px',
      borderRadius: '50%',
      backgroundColor: color,
      margin: '1%',
      opacity: 0.2,
      boxShadow: ' 0 0 10px rgba(0,0,0,0.5)',
      ':hover': {
        cursor: 'pointer',
        opacity: 0.5,
      },
      ':focus': {
        cursor: 'pointer',
        opacity: 1,
        outline: 'none',
      },
    },
    current: {
      opacity: 1,
      animationName: currentItem,
      animationDuration: '1s',
      animationIterationCount: 1,
    },
  }
  return (
    <div
      style={[styles.main, current ? styles.current : null]}
      id={id}
      onClick={thumbItemHandler}
      role="button"
      aria-label="toggleThumb"
      tabIndex={0}
      onKeyDown={(e) => thumbItemHandler(e, id)}
    />
  )
}

ThumbItem.propTypes = {
  id: PropTypes.number.isRequired,
  thumbItemHandler: PropTypes.func.isRequired,
  current: PropTypes.bool.isRequired,
  color: PropTypes.string.isRequired,
}
export default Radium(ThumbItem)
