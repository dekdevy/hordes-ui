import * as bar from 'ui/components/basic/bar/bar.js'
import * as panel from 'ui/components/basic/panel/panel.js'

// just a little testing
const maxHp = 300
const maxMp = 100

const health = bar.create(document.body, 300, 30, {x: 50, y: screen.height - 300})
const mana = bar.create(document.body, 300, 30, {x: screen.width - 350, y: screen.height - 300})

const panelHeader = document.createElement('div')
panelHeader.innerHTML = '<h4>Peter\'s Character</h4>'
panelHeader.style.width = '100%'
panelHeader.style.border = '1px outset black'
const panelContent = document.createElement('div')
panelContent.innerHTML = `<table><tr>HP</tr><tr>MP</tr><td>${maxHp}</td><td>${maxMp}</td>`

panel.create(
  document.body,
  300,
  300,
  {x: 100, y: 500},
  panelHeader,
  panelContent,
  true,
  true,
  true,
)

// tick every frame
const test = (time: number): void => {

  // calculate some moving hp numbers
  const hp = Math.round(maxHp * (Math.sin(time / 1000) * 0.5 + 0.5))
  const mp = Math.round(maxMp * (Math.sin(time / 1000) * 0.5 + 0.5))

  // update bar's
  bar.set(health, hp / maxHp, 'Peter\'s HP', `${hp}/${maxHp}`)
  bar.set(mana, mp / maxMp, 'Peter\'s MP', `${mp}/${maxMp}`)

  panelContent.innerHTML = `<table><tr>HP</tr><tr>MP</tr><td>${hp}/${maxHp}</td><td>${mp}/${maxMp}</td>`

  requestAnimationFrame(test)
}
test(0)
