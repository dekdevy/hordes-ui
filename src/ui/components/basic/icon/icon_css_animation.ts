import {createIcon} from 'ui/components/basic/icon/icon_utils.js'
import {element} from 'ui/utils.js'

export const create = createIcon

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
      left: 20%;
      z-index: 10;
      font-size: 13px;
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
    progressRight.removeEventListener('animationstart', animationStart)
    progressLeft.removeEventListener('animationend', animationEnd)
    cooldownOverlay.remove()
  }
  progressLeft.addEventListener('animationstart', animationStart)
  progressRight.addEventListener('animationend', animationEnd)

  if(document.getElementsByName('cooldownStyle').length === 0)
    document.head.append(cooldownStyle)

}