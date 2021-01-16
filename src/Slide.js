import React from 'react'
import PropTypes from 'prop-types'
import Radium from 'radium'
import classes from './Slide.module.css'

const Slide = ({ id, onTouchStart, onTouchMove, onTouchEnd, children }) => {
  const styles = {
    width: '100%',
    flexShrink: 0,
    listStyle: 'none',
    backgroundColor: '#eeeeee',
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'row',
  }
  return (
    <li
      style={styles}
      id={id}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
      className={classes.item}
    >
      {children}
    </li>
  )
}

Slide.propTypes = {
  id: PropTypes.number.isRequired,
  onTouchStart: PropTypes.func.isRequired,
  onTouchMove: PropTypes.func.isRequired,
  onTouchEnd: PropTypes.func.isRequired,
  children: PropTypes.objectOf(PropTypes.element).isRequired,
}

export default Radium(Slide)
