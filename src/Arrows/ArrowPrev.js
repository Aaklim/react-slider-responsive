import React from 'react'
import PropTypes from 'prop-types'

const ArrowPrev = ({ color }) => {
  const styles = {
    width: 0,
    height: 0,
    borderTop: '10px solid  transparent',
    borderRight: `10px solid ${color}`,
    borderBottom: '10px solid transparent',
  }
  return <div style={styles} />
}
ArrowPrev.propTypes = {
  color: PropTypes.string.isRequired,
}
export default ArrowPrev
