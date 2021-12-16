import {createIcon} from 'ui/components/basic/icon/icon_utils'
import {element} from 'ui/utils.js'

export const create = createIcon

export const cooldown = (icon: Icon, time: number): void => {
  icon.state.cooldown = time

  const multiplier = 1
  const width = icon.state.width * multiplier
  const height = icon.state.height * multiplier
  // Incode CSS, should go to CSS when we have em :-P
  const cooldownStyle = document.createElement('style')
  cooldownStyle.setAttribute('name', 'cooldownStyle')

  cooldownStyle.innerText = `
    .cooldown {
      position: absolute;
      top: 0;
      left: 0;
      background: rgba(0,0,0,0.8);
      mix-blend-mode: multiply;
    }

    .cooldown .inner {
      position: absolute;
      z-index: 6;
      border-radius: 100%;
    }

    .number {
      position: absolute;
      padding: 1px;
      top: 25%;
      left: 25%;
      z-index: 10;
      font-size: 15px;
      font-weight: 1000;
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
      background: rgba(255,255,255,1);
      mix-blend-mode: multiply;
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

  const cooldownContainer = element(icon.elements.outer, 'div')
  const cooldownOverlay = element(cooldownContainer, 'div')
  cooldownOverlay.className = 'cooldown'
  cooldownOverlay.style.width = width.toString()
  cooldownOverlay.style.height = height.toString()

  const inner = element(cooldownOverlay, 'div')
  inner.className = 'inner'
  inner.style.width = width.toString()
  inner.style.height = height.toString()

  const number = element(cooldownContainer, 'div')
  number.className = 'number'
  // number.innerText = time.toString()

  const circle = element(inner, 'div')
  circle.className = 'circle'

  const barLeft = element(circle, 'div')
  barLeft.className = 'bar left'
  barLeft.style.clip = `rect(0px, ${width}px, ${height}px, ${width /2}px)`

  const progressLeft = element(barLeft, 'div')
  progressLeft.className = 'progress'
  progressLeft.style.animation = `left ${time/2}s linear both`
  progressLeft.style.clip = `rect(0px, ${width / 2}px, ${height}px, 0px)`

  const barRight = element(circle, 'div')
  barRight.className = 'bar right'
  barRight.style.clip = `rect(0px, ${width}px, ${height}px, ${width /2}px)`

  const progressRight = element(barRight, 'div')
  progressRight.className = 'progress'
  progressRight.style.animation = `right ${time/2}s linear both`
  progressRight.style.animationDelay = `${time/2}s`
  progressRight.style.clip = `rect(0px, ${width/2}px, ${height}px, 0px)`

  const reverseAnimationStart = () => {
    let start: number
    const animationFrame = (timestamp: number) => {
      if(!start)
        start = timestamp
      const elapsed = timestamp - start
      number.innerText = (time - (elapsed / 1000)).toFixed(1)
      if(elapsed < time * 1000) {
        window.requestAnimationFrame(animationFrame)
      } else {
        number.innerText = ''
      }
    }
    window.requestAnimationFrame(animationFrame)
  }

  const animationEnd = () => {
    progressRight.removeEventListener('animationstart', reverseAnimationStart)
    progressLeft.removeEventListener('animationend', animationEnd)
    cooldownOverlay.remove()
  }
  progressLeft.addEventListener('animationstart', reverseAnimationStart)
  progressRight.addEventListener('animationend', animationEnd)

  if(document.getElementsByName('cooldownStyle').length === 0)
    document.head.append(cooldownStyle)

}