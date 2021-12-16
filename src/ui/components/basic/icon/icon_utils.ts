import {element} from 'ui/utils'

export function drawArc(
  ctx: CanvasRenderingContext2D, x: number, y: number, radius: number, startAngle: number, endAngle: number, color: string): void {
  ctx.fillStyle = color
  ctx.beginPath()
  ctx.moveTo(x, y)
  ctx.arc(x, y, radius, startAngle, endAngle)
  ctx.closePath()
  ctx.fill()
}

export function drawText(ctx: CanvasRenderingContext2D, x: number, y: number, width: number, text: string, color: string): void {
  ctx.fillStyle = color
  ctx.textAlign = 'center'
  ctx.font = 'normal 1000 18px Unknown'
  ctx.fillText(text, x, y + 6, width)
}

export function dragIcon(downEvent: MouseEvent): void {
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

export function createIcon(
  parent: HTMLElement,
  width: number,
  height: number,
  image: HTMLElement,
  draggable?: boolean): Icon {

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

export function cooldown(icon: Icon, time: number): void {
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

  drawRect(icon.state.overlayCtx, 0, 0, width, height, 'rgba(0,0,0,0.7)')

  icon.elements.outer.append(overlayCanvas)
}

export function drawRect(ctx: CanvasRenderingContext2D, x: number, y: number, width: number, height: number, color: string): void {
  ctx.fillStyle = color
  ctx.fillRect(x, y, width, height)
}
