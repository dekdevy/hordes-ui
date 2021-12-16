import {createIcon} from 'ui/components/basic/icon/icon_utils.js'

export const create = createIcon

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
      drawArc(overlayCtx, width / 2, height / 2, width * 0.7, lastAngle, newAngle)
    }

  } else {
    overlayCtx.clearRect(0, 0, width, height)
    return true
  }

  icon.state.progress = newProgress

  return false
}

function drawArc(ctx: CanvasRenderingContext2D, x: number, y: number, radius: number, startAngle: number, endAngle: number) {
  ctx.globalCompositeOperation = 'destination-out'
  ctx.beginPath()
  ctx.moveTo(x, y)
  ctx.arc(x, y, radius, startAngle, endAngle)
  ctx.closePath()
  ctx.fill()

}