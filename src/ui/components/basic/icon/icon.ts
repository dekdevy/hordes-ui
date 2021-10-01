import {element} from 'ui/utils.js'

export const create = (
  parent: HTMLElement,
  width: number,
  height: number,
  image: HTMLElement,
  draggable?: boolean): Icon => {

  // create elements
  const outer = element(parent, 'div')

  // Inline styles, should go to CSS
  outer.style.position = 'relative'
  outer.style.display = 'inline-block'
  outer.style.border = '2px inset black'
  outer.style.userSelect = 'none'

  const icon: Icon = {
    draggable: draggable,
    state    : {
      corners: {
        topLeft    : null,
        topRight   : null,
        bottomLeft : null,
        bottomRight: null
      },
      width   : width,
      height  : height,
      cooldown: null
    },
    elements: {
      outer: outer,
      image: image
    }
  }

  icon.elements.outer.style.width = width.toString()
  icon.elements.outer.style.height = height.toString()

  outer.append(image)

  outer.draggable = false
  image.draggable = false
  // if mouse down, drag the icon
  if (draggable)
    outer.addEventListener('mousedown', dragIcon)

  return icon
}

export const cooldown = (icon: Icon, time: number): void => {
  icon.state.cooldown = time

  const width = icon.state.width.toString()
  const height = icon.state.height.toString()
  // Incode CSS, should go to CSS when we have em :-P
  const cooldownStyle = document.createElement('style')
  cooldownStyle.setAttribute('name', 'cooldownStyle')

  cooldownStyle.innerText = `
    .cooldown {
      position: absolute;  
      top: 0px;
      left: 0px;
      background: rgba(255,255,255,0);
    }
    
    .cooldown .inner {
      position: absolute;
      z-index: 6;
      border-radius: 100%;
    }
    
    .cooldown .number {
      position: absolute;
      padding: 1px;
      top: 25%;
      left: 25%;
      z-index: 10;
      font-size: 15px;
      font-weight: 1000;
      background: rgba(0,0,0,0.5);
      color: rgba(255,255,0,1);
      text-align: center;
    }
    
    .cooldown .bar {
      position: absolute;
      height: 100%;
      width: 100%;
      background: rgba(255,255,255,0);
      border-radius: 100%;
    }
    
    .circle .bar .progress {
      position: absolute;
      height: 100%;
      width: 100%;
      border-radius: 100%;
      background: rgba(0,0,0,0.5);;
    }
 
    .circle .left .progress {
      z-index: 1;
    }
    
    @keyframes left {
      100% {
        transform: rotate(180deg);
      }
    }
    
    .circle .right {
      transform: rotate(180deg);
      z-index: 3;
    }
 
    @keyframes right{
      100%{
        transform: rotate(180deg);
      }
    }
  `

  const cooldownOverlay = element(icon.elements.outer, 'div')
  cooldownOverlay.className = 'cooldown'
  cooldownOverlay.style.width = width
  cooldownOverlay.style.height = height

  const inner = element(cooldownOverlay, 'div')
  inner.className = 'inner'
  inner.style.width = width
  inner.style.height = height

  const number = element(cooldownOverlay, 'div')
  number.className = 'number'
  // number.innerText = time.toString()

  const circle = element(inner, 'div')
  circle.className = 'circle'

  const barLeft = element(circle, 'div')
  barLeft.className = 'bar left'
  // TODO: Check how to use clip-path instead of clip
  barLeft.style.clip = `rect(0px, ${width}px, ${height}px, ${icon.state.width/2}px)`

  const progressLeft = element(barLeft, 'div')
  progressLeft.className = 'progress'
  progressLeft.style.animation = `left ${time/2}s linear both`
  progressLeft.style.clip = `rect(0px, ${icon.state.width/2}px, ${height}px, 0px)`

  const barRight = element(circle, 'div')
  barRight.className = 'bar right'
  barRight.style.clip = `rect(0px, ${width}px, ${height}px, ${icon.state.width/2}px)`

  const progressRight = element(barRight, 'div')
  progressRight.className = 'progress'
  progressRight.style.animation = `right ${time/2}s linear both`
  progressRight.style.animationDelay = `${time/2}s`
  progressRight.style.clip = `rect(0px, ${icon.state.width/2}px, ${height}px, 0px)`

  const animationStart = () => {
    console.log('start')
    let start: number
    const animationFrame = (timestamp: number) => {
      if(!start)
        start = timestamp
      const elapsed = timestamp - start
      number.innerText = (time - (elapsed / 1000)).toFixed(1)
      if(time * 1000 > elapsed) {
        window.requestAnimationFrame(animationFrame)
      } else {
        number.innerText = ''
      }
    }
    window.requestAnimationFrame(animationFrame)
  }

  const animationEnd = () => {
    console.log('end')
    progressRight.removeEventListener('animationstart', animationStart)
    progressLeft.removeEventListener('animationend', animationEnd)
    cooldownOverlay.remove()
  }
  progressLeft.addEventListener('animationstart', animationStart)
  progressRight.addEventListener('animationend', animationEnd)

  if(document.getElementsByName('cooldownStyle').length === 0)
    document.head.append(cooldownStyle)

}

function dragIcon(downEvent: MouseEvent) {
  if (downEvent.buttons & 1) {
    const element = (this as HTMLElement)
    // Should go to CSS stuff
    element.style.cursor = 'grabbing'
    element.style.position = 'absolute'
    element.style.left = element.offsetLeft.toString()
    element.style.top = element.offsetTop.toString()

    const mouseMove = (moveEvent: MouseEvent) => {
      if (moveEvent.buttons & 1) {
        element.style.left = (parseInt(element.style.left.replace('px', '')) + moveEvent.movementX).toString()
        element.style.top = (parseInt(element.style.top.replace('px', '')) + moveEvent.movementY).toString()
      }
    }
    document.addEventListener('mousemove', mouseMove)

    const mouseUp = () => {
      document.removeEventListener('mousemove', mouseMove)
      document.removeEventListener('mouseup', mouseUp)

      element.style.cursor = null
      element.style.position = 'relative'
      element.style.left = null
      element.style.top = null
    }
    document.addEventListener('mouseup', mouseUp)
    downEvent.stopImmediatePropagation()
  }
}