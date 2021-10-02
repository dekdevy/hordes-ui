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
      cooldown: null,
      progress: null
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

  const width = icon.state.width
  const height = icon.state.height

  const number = element(icon.elements.outer, 'div')
  number.style.position = 'absolute'
  number.style.padding = '1px'
  number.style.top = '25%'
  number.style.left = '25%'
  number.style.zIndex = '10'
  number.style.fontSize = '15px'
  number.style.fontWeight = '1000'
  number.style.background = 'rgba(0,0,0,0.5)'
  number.style.color = 'rgba(255,255,0,1)'
  number.style.textAlign = 'center'
  number.hidden = true

  const canvas = document.createElement('canvas')
  canvas.style.left = '0'
  canvas.style.top = '0'
  canvas.width = width
  canvas.height = height
  canvas.style.zIndex = '5'
  canvas.style.position = 'absolute'

  const drawingCtx = canvas.getContext('2d')
  let start: number
  let lastAngle = -(Math.PI / 2)
  const lastTimer = time.toFixed(1)
  let steps = 0
  const animationFrame = (timestamp: number) => {
    if (!start)
      start = timestamp
    const elapsed = (timestamp - start) / (time * 1000)
    if (elapsed < 1) {

      const newAngle = ((Math.PI * 2) * elapsed) - Math.PI / 2
      if (newAngle - lastAngle > 0.01) {
        steps++

        const timer = (time - time * elapsed).toFixed(1)
        if (timer !== lastTimer) {
          drawingCtx.clearRect(0, 0, width, height)
          drawArc(drawingCtx, width / 2, height / 2, width * 0.7, -(Math.PI / 2), newAngle, 'rgba(0,0,0,0.5)')
          drawText(drawingCtx, width / 2, height / 2, width / 2, timer, 'rgba(255,255,0,1)')
        } else {
          drawArc(drawingCtx, width / 2, height / 2, width * 0.7, lastAngle, newAngle, 'rgba(0,0,0,0.5)')
        }
        // drawingCtx.clearRect(0, 0, width, height)
        // drawArc(drawingCtx, width / 2, height / 2, width * 0.7, -(Math.PI / 2), newAngle, 'rgba(0,0,0,0.5)')
        // drawArc(drawingCtx, width / 2, height / 2, width * 0.7, lastAngle, newAngle, 'rgba(0,0,0,0.5)')
        // drawArcWithLines(drawingCtx, width, height, elapsed)
        lastAngle = newAngle
      }
      window.requestAnimationFrame(animationFrame)
    } else {
      console.log('Steps:', steps)
      canvas.remove()
      number.remove()
    }
  }
  window.requestAnimationFrame(animationFrame)

  icon.elements.outer.append(canvas)
}

function drawText(ctx: CanvasRenderingContext2D, x: number, y: number, width: number, text: string, color: string) {
  ctx.fillStyle = color
  ctx.textAlign = 'center'
  ctx.font = 'normal 1000 18px Unknown'
  ctx.fillText(text, x, y + 4, width)
}

function drawArcWithLines(ctx: CanvasRenderingContext2D, width: number, height: number, progress: number) {
  ctx.clearRect(0, 0, width, height)
  ctx.fillStyle = 'rgba(0,0,0,0.5)'
  ctx.beginPath()
  // move to center
  ctx.moveTo(width / 2, height / 2)
  // draw fan
  for (let i = 0; i < progress; i += 0.25) {
    ctx.lineTo(width / 2 + Math.sin(i * 2 * Math.PI - Math.PI) * width * -1, height / 2 + Math.cos(i * 2 * Math.PI - Math.PI) * height)
  }
  ctx.lineTo(width / 2 + Math.sin(progress * 2 * Math.PI - Math.PI) * width * -1, height / 2+ Math.cos(progress * 2 * Math.PI - Math.PI) * height)
  ctx.fill()

  ctx.beginPath()
  ctx.moveTo(width / 2, height / 2)
  ctx.lineTo(width / 2 + Math.sin(progress * 2 * Math.PI - Math.PI) * width * -1, height / 2 + Math.cos(progress * 2 * Math.PI - Math.PI) * height)
  ctx.stroke()
}

function drawArc(ctx: CanvasRenderingContext2D, x: number, y: number, radius: number, startAngle: number, endAngle: number, color: string) {
  ctx.fillStyle = color
  ctx.beginPath()
  ctx.moveTo(x, y)
  ctx.arc(x, y, radius, startAngle, endAngle)
  ctx.closePath()
  ctx.fill()

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