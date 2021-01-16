import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { StyleRoot } from 'radium'
import Carousel from './Carousel'

class CarouselContainer extends PureComponent {
  state = {
    itemsNumber: 0,
    activeItem: 1,
    transitionTime: '500ms',
    multiply: 1,
    interval: 2000,
    color: '#ffffff',
    setintervalId: null,
    touchStart: null,
    touchMove: null,
    sliderSensitivity: 50,
  }

  componentDidMount() {
    const { multiply, sensitivity, children, autoplay, color } = this.props
    const { interval } = this.state

    this.setState(() => ({
      multiply: typeof multiply === 'number' ? multiply : 1,
    }))

    this.setState(() => ({
      sliderSensitivity: typeof sensitivity === 'number' ? sensitivity : 50,
    }))
    if (typeof color === 'string') {
      this.setState(() => ({
        color,
      }))
    }

    this.setState(() => {
      if (Array.isArray(children)) {
        const itemsNumber =
          children.length % multiply !== 0
            ? Math.floor(children.length / multiply) + 1
            : children.length / multiply
        return {
          itemsNumber,
        }
      }
      return {
        itemsNumber: 1,
      }
    })
    if (autoplay) {
      this.setState(
        () => ({
          interval: typeof autoplay === 'number' ? autoplay : interval,
        }),
        () => this.setAutoplayMode(),
      )
    }
  }

  setAutoplayMode = () => {
    const { interval } = this.state
    const setintervalId = setInterval(
      () => this.toggleSlide('autoplay'),
      interval,
    )
    this.setState({ setintervalId })
  }

  toggleSlide = (e) => {
    const { activeItem, setintervalId, itemsNumber } = this.state
    let toggleValue = null
    if (typeof e === 'string') {
      toggleValue = e
    } else if (e.type === 'click') {
      toggleValue = e.currentTarget.attributes.name.value
    } else if (e.type === 'keydown' && e.keyCode === 37) {
      toggleValue = 'prev'
    } else if (e.type === 'keydown' && e.keyCode === 39) {
      toggleValue = 'next'
    }

    if (toggleValue === 'autoplay') {
      if (activeItem < itemsNumber) {
        this.setState(() => ({ transitionTime: '500ms' }))
        this.setState((state) => ({ activeItem: state.activeItem + 1 }))
      } else {
        this.setState(() => ({ transitionTime: '500ms' }))
        this.setState((state) => ({ activeItem: state.activeItem + 1 }))
        setTimeout(() => {
          this.setState(() => ({ transitionTime: '0.1ms' }))
          this.setState(() => ({ activeItem: 1 }))
        }, 500)
      }
    }
    if (toggleValue === 'prev') {
      clearInterval(setintervalId)
      if (activeItem > 1) {
        this.setState(() => ({ transitionTime: '500ms' }))
        this.setState((state) => ({ activeItem: state.activeItem - 1 }))
      } else {
        this.setState({ activeItem: activeItem - 1 })
        setTimeout(() => {
          this.setState(() => ({ transitionTime: '0.1ms' }))
          this.setState((state) => ({ activeItem: state.itemsNumber }))
        }, 500)
      }
    }

    if (toggleValue === 'next') {
      clearInterval(setintervalId)
      if (activeItem < itemsNumber) {
        this.setState(() => ({ transitionTime: '500ms' }))
        this.setState((state) => ({ activeItem: state.activeItem + 1 }))
      } else {
        this.setState(() => ({ transitionTime: '500ms' }))
        this.setState((state) => ({ activeItem: state.activeItem + 1 }))
        setTimeout(() => {
          this.setState(() => ({ transitionTime: '0.1ms' }))
          this.setState(() => ({ activeItem: 1 }))
        }, 500)
      }
    }
  }

  onTouchStart = (e) => {
    this.setState(() => ({ touchStart: e.targetTouches[0].screenX }))
  }

  onTouchMove = (e) => {
    this.setState(() => ({ touchMove: e.targetTouches[0].screenX }))
  }

  onTouchEnd = () => {
    const { touchMove, touchStart, sliderSensitivity } = this.state
    if (touchMove !== null && touchMove - touchStart > sliderSensitivity) {
      this.toggleSlide('prev')
      this.setState(() => ({
        touchStart: null,
        touchMove: null,
      }))
    } else if (
      touchMove !== null &&
      touchStart - touchMove > sliderSensitivity
    ) {
      this.toggleSlide('next')
      this.setState(() => ({
        touchStart: null,
        touchMove: null,
      }))
    }
  }

  thumbItemHandler = (e, id) => {
    if (e.type === 'click') {
      const activeItem = Number(e.target.attributes.id.value)
      this.setState(() => ({ activeItem }))
    } else if (e.type === 'keydown' && e.keyCode === 13) {
      const activeItem = Number(id)
      this.setState(() => ({ activeItem }))
    }
  }

  render() {
    const { children, arrowPrev, arrowNext } = this.props
    const {
      itemsNumber,
      activeItem,
      transitionTime,
      multiply,
      color,
    } = this.state
    return (
      <StyleRoot>
        <Carousel
          items={children}
          thumb={{
            itemsNumber,
            activeItem,
            thumbItemHandler: this.thumbItemHandler,
          }}
          activeItem={activeItem}
          toggleSlide={this.toggleSlide}
          transitionTime={transitionTime}
          multiply={multiply}
          onTouchStart={this.onTouchStart}
          onTouchMove={this.onTouchMove}
          onTouchEnd={this.onTouchEnd}
          arrowPrev={arrowPrev}
          arrowNext={arrowNext}
          color={color}
        />
      </StyleRoot>
    )
  }
}

CarouselContainer.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.element),
    PropTypes.element,
  ]).isRequired,
  multiply: PropTypes.number,
  sensitivity: PropTypes.number,
  autoplay: PropTypes.oneOfType([PropTypes.number, PropTypes.bool]),
  arrowPrev: PropTypes.node,
  arrowNext: PropTypes.node,
  color: PropTypes.string,
}
CarouselContainer.defaultProps = {
  multiply: 1,
  sensitivity: null,
  arrowPrev: null,
  arrowNext: null,
  autoplay: null,
  color: null,
}

export default CarouselContainer
