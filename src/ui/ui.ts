import * as bar from 'ui/components/basic/bar/bar.js'
import * as icon from 'ui/components/basic/icon/icon.js'
import * as panel from 'ui/components/basic/panel/panel.js'

// just a little more testing
const maxHp = 300
const maxMp = 100

//[Tatsuya|15/11/2021] Vars to debug icons P{1.2}
let stacks = 0
let cd = 60

const skill = icon.create(document.body, 42, 42, 42, 42)
icon.set(skill, "Invigorate", cd,stacks)

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
panel.create(document.body, 100, 100, 300, 300, panelHeader, panelContent, true, true, true)

// Draggable panel
const dragHeader = document.createElement('div')
dragHeader.innerText = 'DRAG ME, carefully!'
panel.create(document.body, 500, 100, 300, 300, dragHeader, document.createElement('div'), true, false, false)

// Resizable panel
const resizeHeader = document.createElement('div')
resizeHeader.innerText = 'RESIZE ME, but very very carefully!'
panel.create(document.body, 800, 400, 300, 200, resizeHeader, document.createElement('div'), false, true, false)

// Closable panel
const closeHeader = document.createElement('div')
closeHeader.innerText = 'CLOSE ME, as hard as you want!'
panel.create(document.body, 300, 700, 250, 200, closeHeader, document.createElement('div'), false, false, true)

let count = 0;
// tick every frame
const test = (time: number): void => {

  // calculate some moving hp/mp numbers
  const hp = Math.round(maxHp * (Math.sin(time / 1000) * 0.5 + 0.5))
  const mp = Math.round(maxMp * (Math.sin(time / 1000) * 0.5 + 0.5))

  if(count % 144 == 0){//Just to test, my monitor is 144hz so %144 I get second by second
  	if(stacks == 3){stacks = 0}else{stacks++}
  	cd--
  	icon.set(skill, "Invigorate", cd, stacks)
  }
  
  // update bar's
  bar.set(health, hp / maxHp, 'Peter\'s HP', `${hp}/${maxHp}`)
  bar.set(mana, mp / maxMp, 'Peter\'s MP', `${mp}/${maxMp}`)

  // simulate an updating content element
  panelContent.innerHTML = `<table><tr>HP</tr><tr>MP</tr><td>${hp}/${maxHp}</td><td>${mp}/${maxMp}</td>`

  requestAnimationFrame(test)
  count++;
}
test(0)
