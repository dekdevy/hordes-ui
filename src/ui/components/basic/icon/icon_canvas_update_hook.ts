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

export const update = (icon: Icon, delta: number): boolean => {
  const cooldownTime = icon.state.cooldown
  const progress = icon.state.progress
  if (progress >= cooldownTime) return

  const newProgress = progress + delta

  const overlayCtx = icon.state.overlayCtx

  const width = icon.state.width
  const height = icon.state.height

  const elapsed = newProgress / cooldownTime
  if (newProgress < cooldownTime) {

    const newAngle = ((Math.PI * 2) * elapsed) - Math.PI / 2
    if(!icon.state.progressAngle)
      icon.state.progressAngle = -Math.PI / 2
    const lastAngle = icon.state.progressAngle
    if (newAngle - lastAngle > 0.01) {

      icon.state.progressAngle = newAngle
      const timer = ((cooldownTime - cooldownTime * elapsed) / 1000).toFixed(1)
      const lastTimer = icon.state.lastTimer
      if (timer !== lastTimer) {
        icon.state.lastTimer = timer
        overlayCtx.clearRect(0, 0, width, height)
        drawArc(overlayCtx, width / 2, height / 2, width * 0.7, -(Math.PI / 2), newAngle, 'rgba(0,0,0,0.5)')
        drawText(overlayCtx, width / 2, height / 2, width / 2, timer, 'rgba(255,255,0,1)')
      } else {
        drawArc(overlayCtx, width / 2, height / 2, width * 0.7, lastAngle, newAngle, 'rgba(0,0,0,0.5)')
      }
      // drawArcWithLines(drawingCtx, width, height, elapsed)
      // drawArc(drawingCtx, width / 2, height / 2, width * 0.7, lastAngle, newAngle, 'rgba(0,0,0,0.5)')
    }

  } else {
    overlayCtx.clearRect(0, 0, width, height)
    return true
  }

  icon.state.progress = newProgress

  return false
}

export const cooldown = (icon: Icon, time: number): void => {
  icon.state.cooldown = time
  icon.state.progress = 0
  icon.state.progressAngle = -Math.PI / 2

  const width = icon.state.width
  const height = icon.state.height

  const overlayCanvas = document.createElement('canvas')
  overlayCanvas.style.left = '0'
  overlayCanvas.style.top = '0'
  overlayCanvas.width = width
  overlayCanvas.height = height
  overlayCanvas.style.zIndex = '5'
  overlayCanvas.style.position = 'absolute'

  icon.state.overlayCtx = overlayCanvas.getContext('2d')

  icon.elements.outer.append(overlayCanvas)
}

function drawText(ctx: CanvasRenderingContext2D, x: number, y: number, width: number, text: string, color: string) {
  ctx.fillStyle = color
  ctx.textAlign = 'center'
  ctx.font = 'normal 1000 18px Unknown'
  ctx.fillText(text, x, y + 6, width)
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
  ctx.lineTo(width / 2 + Math.sin(progress * 2 * Math.PI - Math.PI) * width * -1, height / 2 + Math.cos(progress * 2 * Math.PI - Math.PI) * height)
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