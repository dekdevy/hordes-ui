import * as bar from 'ui/components/basic/bar/bar.js'
import * as icon from 'ui/components/basic/icon/icon.js'
import * as panel from 'ui/components/basic/panel/panel.js'

// just a little more testing
const maxHp = 1900
const maxMp = 600

const health = bar.create(document.body, 50, 500, 300, 30)
const mana = bar.create(document.body, 50, 500, 300, 30)

// setup some header and content elements for the panel
const panelHeader = document.createElement('div')
panelHeader.innerHTML = '<h4>Character</h4>'
panelHeader.style.width = '100%'
panelHeader.style.border = '1px outset black'
const panelContent = document.createElement('div')
panelContent.innerHTML = `<table><tr>HP</tr><tr>MP</tr><td>${maxHp}</td><td>${maxMp}</td>`

// Draggable, resizable, closable panel
panel.create(document.body, 250, 50, 300, 300, panelHeader, panelContent, true, true, true)

// Draggable panel
const dragHeader = document.createElement('div')
dragHeader.innerText = 'DRAG ME, carefully!'
panel.create(document.body, 600, 50, 300, 300, dragHeader, document.createElement('div'), true, false, true)

// Resizable panel
const resizeHeader = document.createElement('div')
resizeHeader.innerText = 'RESIZE ME, but very very carefully!'
panel.create(document.body, 950, 50, 300, 200, resizeHeader, document.createElement('div'), false, true, true)

// tick every frame
const test = (time: number): void => {

  // calculate some moving hp/mp numbers
  const hp = Math.round(maxHp * (Math.sin(time / 1000) * 0.5 + 0.5))
  const mp = Math.round(maxMp * (Math.sin(time / 1000) * 0.5 + 0.5))

  // update bars
  bar.set(health, hp / maxHp, 'Peter\'s HP', `${hp}/${maxHp}`)
  bar.set(mana, mp / maxMp, 'Peter\'s MP', `${mp}/${maxMp}`)

  // simulate an updating content element
  panelContent.innerHTML = `<table><tr>HP</tr><tr>MP</tr><td>${hp}/${maxHp}</td><td>${mp}/${maxMp}</td>`

  requestAnimationFrame(test)

}
test(0)
