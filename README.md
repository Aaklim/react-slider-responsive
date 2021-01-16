# React Slider Responsive
Carousel component for React apps.

### Features
- Responsive
- Mobile firendly
- Supports any HTML content
- Swipe to slide
- Scrolling to a selected slide
- Multiple slides
- Infinite loop
- Autoplay with custom interval
- Keyboard navigation
- Customizable arrows,thumbs, status indicators 

### Installing

`npm i react-slider-responsive`

### Usage

```javascript
import React from 'react'
import ReactDOM from 'react-dom'
import Carousel from 'react-slider-responsive'

const Demo = () => (
  <Carousel  >
    <div>
      <img src="img/img1.jpg" alt="test-slide" />
    </div>
    <div>
      <img src="img/img2.jpg" alt="test-slide" />
    </div>
    <div>
      <img src="img/img3.jpg" alt="test-slide" />
    </div>
    <div>
      <img src="img/img4.jpg" alt="test-slide" />
    </div>
  </Carousel>
)

ReactDOM.render(<Demo />, document.getElementById('root'))
```
Each slide content must be wrapped in <div>.
Each direct `<div>` child represent one slide.
In multiply mode , multiply={2} each slide consist of two `<div>` childs:
```javascript

const Demo = () => (
  <Carousel multiply={2} >

    <div>
      <img src="img/img1.jpg" alt="test-slide" />
    </div>
    <div>
      <img src="img/img2.jpg" alt="test-slide" />
    </div>


    <div>
      <img src="img/img3.jpg" alt="test-slide" />
    </div>
    <div>
      <img src="img/img4.jpg" alt="test-slide" />
    </div>

  </Carousel>
)
```
### Demo

### Props

- `autoplay` {number} : Autoplay mode is disabled by default .Adding prop `autoplay` to the `Carousel` component activates it with a default interval of 2000 ms.If you want to change interval , set value:number(ms)  to `autoplay={number}` prop .Autoplay mode will be active until the slide is changed manually.
  
- `multiply` {number} : Each slide contain one `<div>` child of Carousel component by default.This prop set number of `<div>` childs in one slide.For correct UI/UX ,  number of `<div>` children should divided by `multiply={number}` without remainder.
  
- `color` {string} : This props set custom color for arrows, thumbs and status.
  
- `arrowPrev`,`arrowNext` {React Component, any HTML} :  This props set custom component for Carousel arrows buttons.
  






