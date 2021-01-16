import React from 'react'
import PropTypes from 'prop-types'

const ArrowNext = ({ color }) => {
  const styles = {
    width: 0,
    height: 0,
    borderTop: '10px solid  transparent',
    borderLeft: `10px solid ${color}`,
    borderBottom: '10px solid transparent',
  }
  return <div style={styles} />
}
ArrowNext.propTypes = {
  color: PropTypes.string.isRequired,
}
export default ArrowNext
