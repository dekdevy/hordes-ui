import {createIcon, drawArc} from 'ui/components/basic/icon/icon_utils.js'
import {element} from 'ui/utils.js'

export const create = createIcon

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