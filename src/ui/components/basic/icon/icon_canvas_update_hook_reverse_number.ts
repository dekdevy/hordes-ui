import {createIcon, iconCooldown} from 'ui/components/basic/icon/icon_utils.js'

export const create = createIcon

export const cooldown = iconCooldown

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

      const timer = (cooldownTime - cooldownTime * elapsed) / 1000
      overlayCtx.clearRect(0, 0, width, height)
      overlayCtx.globalCompositeOperation = 'source-over'
      drawRect(overlayCtx, 0, 0, width, height, 'rgba(0,0,0,0.7)')
      overlayCtx.globalCompositeOperation = 'destination-out'
      drawArc(overlayCtx, width / 2, height / 2, width * 0.7, -(Math.PI / 2), newAngle, 'rgba(0,0,0,1)')
      overlayCtx.globalCompositeOperation = 'source-over'
      drawArcStroke(overlayCtx, width / 2, height / 2, width * 0.7, newAngle, newAngle, 'rgba(255,255,255,0.5)')
      overlayCtx.globalCompositeOperation = 'source-over'
      drawText(overlayCtx, width / 2, height / 2, width / 2, timer.toFixed(0), 'rgba(255,255,0,1)')

    }

  } else {
    overlayCtx.clearRect(0, 0, width, height)
    return true
  }

  icon.state.progress = newProgress

  return false
}

function drawRect(ctx: CanvasRenderingContext2D, x: number, y: number, width: number, height: number, color: string) {
  ctx.fillStyle = color
  ctx.fillRect(x, y, width, height)
}

function drawText(ctx: CanvasRenderingContext2D, x: number, y: number, width: number, text: string, color: string) {
  ctx.fillStyle = color
  ctx.textAlign = 'center'
  ctx.font = 'normal 1000 18px Unknown'
  ctx.fillText(text, x, y + 6, width)
}

function drawArc(ctx: CanvasRenderingContext2D, x: number, y: number, radius: number, startAngle: number, endAngle: number, color: string) {
  ctx.fillStyle = color
  ctx.beginPath()
  ctx.moveTo(x, y)
  ctx.arc(x, y, radius, startAngle, endAngle)
  ctx.closePath()
  ctx.fill()
}

function drawArcStroke(ctx: CanvasRenderingContext2D, x: number, y: number, radius: number, startAngle: number, endAngle: number, color: string) {
  ctx.strokeStyle = color
  ctx.beginPath()
  ctx.moveTo(x, y)
  ctx.arc(x, y, radius, startAngle, endAngle)
  ctx.closePath()
  ctx.stroke()
}
