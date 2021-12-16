import {createIcon, drawArc, drawText} from 'ui/components/basic/icon/icon_utils.js'

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
    if (!icon.state.progressAngle)
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