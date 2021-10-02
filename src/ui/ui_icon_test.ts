import * as icon from 'ui/components/basic/icon/icon_canvas_update_hook_reverse_fast.js'
import * as panel from 'ui/components/basic/panel/panel.js'
import {element} from 'ui/utils.js'

// setup some header and content elements for the panel
const panelHeader = document.createElement('div')
panelHeader.innerHTML = '<h4>Performance Sheet</h4>'
panelHeader.style.width = '100%'
panelHeader.style.border = '1px outset black'
const performanceSheet = document.createElement('div')
const performanceData = element(performanceSheet, 'div')

const deltaSpan = element(performanceSheet, 'p')
const timeSpan = element(performanceSheet, 'p')
const stepsSpan = element(performanceSheet, 'p')

const iconAmount = (element(performanceSheet, 'input') as HTMLInputElement)
iconAmount.value = '10'

// Draggable, resizable, closable panel
panel.create(document.body, 0, 10, 300, 300, panelHeader, performanceSheet, true, true, true)

// Draggable panel
const iconHeader = document.createElement('div')
iconHeader.innerText = 'ICON CONTAINER'
iconHeader.style.textAlign = 'center'
const iconPanel =
  panel.create(document.body, 310, 10, screen.width - 320, screen.height - 150, iconHeader, document.createElement('div'), true, false, false)
iconPanel.elements.inner.style.textAlign = 'center'

// Icons to draw
let iconList: Icon[] = []

// tick every frame
let lastTimes: number[] = []
let lastTime = 0
const start = window.performance.now()
let steps = 0
const test = (time: number): void => {
  // Calculate delta
  const delta = time - lastTime
  lastTimes.push(delta)
  lastTimes = lastTimes.slice(-60)
  const averageTime = lastTimes.reduce((current, avg) => avg + current)

  steps++

  const targetIconAmount = parseInt(iconAmount.value)
  const iconListLength = iconList.length
  if(iconListLength < targetIconAmount) {
    for (let i = 0; i < targetIconAmount - iconListLength; i++) {
      const skillImage = document.createElement('img')
      // Skill image to make it look super pretty
      skillImage.setAttribute('src', `https://hordes.io/assets/ui/skills/${(Math.random() * 40).toFixed(0)}.webp?v=4652922`)
      const skillIcon = icon.create(iconPanel.elements.inner, 40, 40, skillImage, true)
      icon.cooldown(skillIcon, Math.random() * 120000)
      iconList.push(skillIcon)
    }
  } else if(iconListLength > targetIconAmount) {
    const overhead = iconList.length - targetIconAmount
    iconList.slice(0, overhead - 1).forEach(element => {
      element.elements.outer.remove()
      element.elements.image.remove()
    })
    iconList = iconList.slice(overhead - 1)
  }

  const random = Math.random() * 120000
  for(let i = 0; i < targetIconAmount; i++) {
    const element = iconList[i]
    if(icon.update(element, delta)) {
      icon.cooldown(element, random)
    }
  }

  // Update performance data
  deltaSpan.innerText = `Avg. delta: ${(averageTime / lastTimes.length).toFixed(4)}ms`
  timeSpan.innerText = `Time: ${(time - start).toFixed(0)}ms`
  stepsSpan.innerText = `Steps: ${steps}`

  lastTime = time
  requestAnimationFrame(test)
}
test(0)
