import React from 'react'
import PropTypes from 'prop-types'
import Radium from 'radium'
import Slide from './Slide'
import Thumb from './Thumb/Thumb'
import ArrowPrev from './Arrows/ArrowPrev'
import ArrowNext from './Arrows/ArrowNext'

const Carousel = ({
  activeItem,
  transitionTime,
  multiply,
  onTouchStart,
  onTouchMove,
  onTouchEnd,
  toggleSlide,
  arrowPrev,
  arrowNext,
  items,
  thumb,
  color,
}) => {
  const styles = {
    wrapper: {
      position: 'relative',
      width: '100%',
      overflow: 'hidden',
    },
    slider: {
      display: 'flex',
      width: '100%',
      margin: 0,
      padding: 0,
      transform: `translate(-${activeItem * 100}%)`,
      transitionProperty: 'transform',
      transitionDuration: transitionTime,
    },
    slideToggleButton: {
      boxSizing: 'border-box',
      position: 'absolute',
      padding: '10px',
      top: 0,
      height: '100%',
      backgroundColor: 'transparent',
      color,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      opacity: 0.3,
      zIndex: 10,
      ':focus': {
        opacity: 1,
        backgroundColor: 'rgba(220,220,220,0.2)',
        cursor: 'pointer',
        outline: 'none',
      },
      ':hover': {
        opacity: 1,
        backgroundColor: 'rgba(220,220,220,0.2)',
        cursor: 'pointer',
      },
      '::before': {
        content: '',
        display: 'inline-block',
      },
      transitionProperty: 'opacity backgroundColor',
      transitionDuration: '1000ms',
    },
    status: {
      position: 'absolute',
      top: 0,
      right: 0,
      display: 'inline-block',
      zIndex: 9,
      color,
      textShadow: '1px 1px 1px rgba(0,0,0.9)',
      fontSize: '10px',
      padding: '5px',
    },
  }
  const createInitialArr = (multiplyDivider, currentItems) => {
    if (Array.isArray(currentItems)) {
      const itemsArr = []
      for (let i = 0; i < currentItems.length; i += multiplyDivider) {
        const item = currentItems.slice(i, i + multiplyDivider)
        item.id = i
        itemsArr.push(item)
      }
      return itemsArr
    }
    const item = []
    item.push({ ...currentItems })
    item.id = 1

    return [item]
  }
  const createCopyElement = (element) => {
    const copyElement = [...element]
    copyElement.id = `${element.id}copy`
    return copyElement
  }
  const createSlidesArr = (initialArr) => {
    const extendArr = [...initialArr]
    if (extendArr.length > 1) {
      extendArr.push(createCopyElement(initialArr[0]))
      extendArr.unshift(createCopyElement(initialArr[initialArr.length - 1]))
    } else {
      const copyElementBefore = createCopyElement(initialArr[0])
      copyElementBefore.id = 0
      const copyElementAfter = createCopyElement(initialArr[0])
      copyElementAfter.id = 2
      extendArr.push(copyElementAfter)
      extendArr.unshift(copyElementBefore)
    }
    const itemsArr = extendArr.map((item, index) => (
      <Slide
        key={item.id}
        id={index}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        {item}
      </Slide>
    ))
    return itemsArr
  }
  const slidesArr = createSlidesArr(createInitialArr(multiply, items))
  const activeStatusItem =
    activeItem === 0 || activeItem === slidesArr.length - 1 ? 1 : activeItem
  return (
    <div style={styles.wrapper}>
      <div style={styles.status}>
        <span>
          {' '}
          {activeStatusItem}
          &nbsp; of &nbsp;
          {slidesArr.length - 2}
        </span>
      </div>
      <div
        key="prev"
        style={[styles.slideToggleButton, { left: 0 }]}
        onClick={toggleSlide}
        name="prev"
        role="button"
        tabIndex={0}
        onKeyDown={toggleSlide}
      >
        {arrowPrev || <ArrowPrev color={color} />}
      </div>
      <ul style={styles.slider}>{slidesArr}</ul>
      <div
        key="next"
        style={[styles.slideToggleButton, { right: 0 }]}
        onClick={toggleSlide}
        name="next"
        role="button"
        tabIndex={0}
        onKeyDown={toggleSlide}
      >
        {arrowNext || <ArrowNext color={color} />}
      </div>
      <Thumb thumb={thumb} color={color} />
    </div>
  )
}
Carousel.propTypes = {
  activeItem: PropTypes.number.isRequired,
  items: PropTypes.arrayOf(PropTypes.element).isRequired,
  transitionTime: PropTypes.string.isRequired,
  multiply: PropTypes.number.isRequired,
  onTouchStart: PropTypes.func.isRequired,
  onTouchMove: PropTypes.func.isRequired,
  onTouchEnd: PropTypes.func.isRequired,
  toggleSlide: PropTypes.func.isRequired,
  color: PropTypes.string.isRequired,
  arrowPrev: PropTypes.node,
  arrowNext: PropTypes.node,
  thumb: PropTypes.exact({
    itemsNumber: PropTypes.number,
    activeItem: PropTypes.number,
    thumbItemHandler: PropTypes.func,
  }).isRequired,
}
Carousel.defaultProps = {
  arrowPrev: null,
  arrowNext: null,
}

export default Radium(Carousel)
