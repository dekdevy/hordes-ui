import * as bar from 'ui/components/basic/bar/bar.js'
// import * as icon from 'ui/components/basic/icon/icon.js'
import * as panel from 'ui/components/basic/panel/panel.js'

// Mock.ts creates a mockup game user interface and fills it dynamically
// This emulates a rough game client experience without actually needing to run the game

// Draggable panel
const panel2 = panel.create(document.body, true, false, false)
panel.set(panel2, 400, 100, 200, 200)
panel.setTitle(panel2, 'Draggable')

// Resizable panel
const panel3 = panel.create(document.body,  false, true, false)
panel.set(panel3, 700, 100, 200, 200)
panel.setTitle(panel3, 'Resizeable')

// closable panel
const panel4 = panel.create(document.body,  false, false, true)
panel.set(panel4, 100, 100, 200, 200)
panel.setTitle(panel4, 'Closable')

// Draggable, resizable, closable panel
const panel1 = panel.create(document.body, true, true, true)
panel.set(panel1, 100, 400, 200, 200)
panel.setTitle(panel1, 'Drag, Resize, Close')

// bar panel
const barPanel = panel.create(document.body,  false, false, false)
panel.set(barPanel, 500, 400, 200, 80)
panel.setTitle(barPanel, 'Bars')

// mock bars & panel
const maxHp = 1900
const maxMp = 600
const health = bar.create(barPanel.elements.inner)
const mana = bar.create(barPanel.elements.inner)
barPanel.elements.inner.style.display = 'grid'
barPanel.elements.inner.style.gridTemplateRows = '1fr 1fr'
barPanel.elements.inner.style.gridTemplateColumns = '1fr'

// tick every frame
const test = (time: number): void => {

  // calculate some moving hp/mp numbers
  const hp = Math.round(maxHp * (Math.sin(time / 1000) * 0.5 + 0.5))
  const mp = Math.round(maxMp * (Math.sin(time / 1000 + 0.5) * 0.5 + 0.5))

  // update bars
  bar.set(health, hp / maxHp, 'Peter\'s HP', `${hp}/${maxHp}`)
  bar.set(mana, mp / maxMp, 'Peter\'s MP', `${mp}/${maxMp}`)

  requestAnimationFrame(test)

}
test(0)
