import {createIcon, drawRect} from 'ui/components/basic/icon/icon_utils.js'

export const create = createIcon

export const update = (icon: Icon, delta: number): boolean => {
  const cooldownTime = icon.state.cooldown
  const progress = icon.state.progress
  const newProgress = progress + delta

  const overlayCtx = icon.state.overlayCtx
  const width = icon.state.width
  const height = icon.state.height

  if (newProgress < cooldownTime) {
    const elapsed = newProgress / cooldownTime
    const newAngle = ((Math.PI * 2) * elapsed) - Math.PI / 2
    const lastAngle = icon.state.progressAngle
    if (newAngle - lastAngle > 0.01) {
      icon.state.progressAngle = newAngle
      drawArc(overlayCtx, width / 2, height / 2, width * 0.7, newAngle, newAngle)
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

  drawRect(icon.state.overlayCtx, 0, 0, width, height, 'rgba(0,0,0,0.7)')
  icon.state.overlayCtx.globalCompositeOperation = 'destination-out'

  icon.elements.outer.append(overlayCanvas)
}

function drawArc(ctx: CanvasRenderingContext2D, x: number, y: number, radius: number, startAngle: number, endAngle: number) {
  ctx.beginPath()
  ctx.moveTo(x, y)
  ctx.arc(x, y, radius, startAngle, endAngle)
  ctx.closePath()
  ctx.stroke()
}