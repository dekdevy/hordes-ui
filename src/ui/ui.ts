import * as bar from 'ui/components/basic/bar/bar.js'
import * as icon from 'ui/components/basic/icon/icon_canvas_update_hook.js'
import * as panel from 'ui/components/basic/panel/panel.js'

// just a little more testing
const maxHp = 300
const maxMp = 100

const health = bar.create(document.body, 50, screen.height - 300, 300, 30)
const mana = bar.create(document.body, screen.width - 350, screen.height - 300, 300, 30)

// setup some header and content elements for the panel
const panelHeader = document.createElement('div')
panelHeader.innerHTML = '<h4>Peter\'s Character</h4>'
panelHeader.style.width = '100%'
panelHeader.style.border = '1px outset black'
const panelContent = document.createElement('div')
panelContent.innerHTML = `<table><tr>HP</tr><tr>MP</tr><td>${maxHp}</td><td>${maxMp}</td>`

// Draggable, resizable, closable panel
panel.create(document.body, 0, 0, 300, 300, panelHeader, panelContent, true, true, true)

// Draggable panel
const skillHeader = document.createElement('div')
skillHeader.innerText = 'SKILL PANEL'
skillHeader.style.textAlign = 'center'
const skillPanel =
  panel.create(document.body, 300, 50, 1600, 100, skillHeader, document.createElement('div'), true, false, false)
skillPanel.elements.inner.style.textAlign = 'center'

// Generate some skill icons
const iconList: Icon[] = []
for (const key of Array(10).keys()) {
  const skillImage = document.createElement('img')
  skillImage.setAttribute('src', `https://hordes.io/assets/ui/skills/${key}.webp?v=4652922`)
  const skillIcon = icon.create(skillPanel.elements.inner, 40, 40, skillImage, true)
  icon.cooldown(skillIcon, 20000)
  iconList.push(skillIcon)
}

// Resizable panel
const resizeHeader = document.createElement('div')
resizeHeader.innerText = 'RESIZE ME!'
panel.create(document.body, 800, 400, 300, 200, resizeHeader, document.createElement('div'), false, true, false)

// Closable panel
const closeHeader = document.createElement('div')
closeHeader.innerText = 'CLOSE ME!'
panel.create(document.body, 300, 400, 250, 200, closeHeader, document.createElement('div'), false, false, true)

// tick every frame
const test = (time: number): void => {

  // calculate some moving hp/mp numbers
  const hp = Math.round(maxHp * (Math.sin(time / 1000) * 0.5 + 0.5))
  const mp = Math.round(maxMp * (Math.sin(time / 1000) * 0.5 + 0.5))

  // update bar's
  bar.set(health, hp / maxHp, 'Peter\'s HP', `${hp}/${maxHp}`)
  bar.set(mana, mp / maxMp, 'Peter\'s MP', `${mp}/${maxMp}`)

  // simulate an updating content element
  panelContent.innerHTML =
    `<table><tr>HP</tr><tr>MP</tr><td>${hp}/${maxHp}</td><td>${mp}/${maxMp}</td></table> `

  requestAnimationFrame(test)
}
test(0)
