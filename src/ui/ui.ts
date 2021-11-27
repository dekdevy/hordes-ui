import * as bar from 'ui/components/basic/bar/bar.js'
import * as icon from 'ui/components/basic/icon/icon.js'
import * as panel from 'ui/components/basic/panel/panel.js'
import {element} from 'ui/utils.js'

// just a little more testing
const maxHp = 1900
const maxMp = 600

//[Tatsuya|15/11/2021] Vars to debug icons P{1.2}
let stacks = 0
let cd = 60

const skill = icon.create(document.body, 42, 42, 42, 42, false, true, false)
icon.set(skill, 'Invigorate', cd, stacks)
//STRESS TEST ICONS
const skill1 = icon.create(document.body, 42, 42, 42, 42, false, true, false)
icon.set(skill1, 'Invigorate', cd, stacks)
const skill2 = icon.create(document.body, 42, 42, 42, 42, false, true, false)
icon.set(skill2, 'Invigorate', cd, stacks)
const skill3 = icon.create(document.body, 42, 42, 42, 42, false, true, false)
icon.set(skill3, 'Invigorate', cd, stacks)
const skill4 = icon.create(document.body, 42, 42, 42, 42, false, true, false)
icon.set(skill4, 'Invigorate', cd, stacks)
const skill5 = icon.create(document.body, 42, 42, 42, 42, false, true, false)
icon.set(skill5, 'Invigorate', cd, stacks)
const skill6 = icon.create(document.body, 42, 42, 42, 42, false, true, false)
icon.set(skill6, 'Invigorate', cd, stacks)
const skill7 = icon.create(document.body, 42, 42, 42, 42, false, true, false)
icon.set(skill7, 'Invigorate', cd, stacks)
const skill8 = icon.create(document.body, 42, 42, 42, 42, false, true, false)
icon.set(skill8, 'Invigorate', cd, stacks)
const skill9 = icon.create(document.body, 42, 42, 42, 42, false, true, false)
icon.set(skill9, 'Invigorate', cd, stacks)
const skill10 = icon.create(document.body, 42, 42, 42, 42, false, true, false)
icon.set(skill10, 'Invigorate', cd, stacks)
const skill11 = icon.create(document.body, 42, 42, 42, 42, false, true, false)
icon.set(skill11, 'Invigorate', cd, stacks)
const skill12 = icon.create(document.body, 42, 42, 42, 42, false, true, false)
icon.set(skill12, 'Invigorate', cd, stacks)

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
dragHeader.innerText = '\n\nDRAG ME, carefully!'
panel.create(document.body, 600, 50, 300, 300, dragHeader, document.createElement('div'), true, false, true)

// Resizable panel
const resizeHeader = document.createElement('div')
resizeHeader.innerText = '\n\nRESIZE ME, but very very carefully!'
panel.create(document.body, 950, 50, 300, 200, resizeHeader, document.createElement('div'), false, true, true)

//Player object it's meant to fill this data:
const player = {
  name        : 'Blochflame',
  level       : 45,
  class       : 'Archer',
  faction     : 'Vanguard',
  prestige    : 8898,
  rating      : 1800,
  medals      : 999,
  strenght    : 10,
  stamina     : 999,
  dexterity   : 999,
  intelligence: 10,
  wisdom      : 10,
  luck        : 10,
  stat_points : 0,
  hp          : 1555,
  hp_reg      : 555,
  mp          : 555,
  mp_reg      : 555,
  defense     : 555,
  block       : 555,
  min         : 555,
  max         : 555,
  atk_speed   : 555,
  critical    : 555,
  haste       : 555,
  mov_speed   : 555,
  bag_slots   : 555,
  item_find   : 555,
  gear_score  : 555,
  pvp_lvl     : 555

}

// setup some header and content elements for the panel
//I don't like to define the styles here, we should create types of panels and with the types set the properties of the obj in the type itself
const charPanelHeader = document.createElement('div')
charPanelHeader.innerHTML = `<h4>${player.name}'s Character</h4>`
charPanelHeader.style.width = '100%'
charPanelHeader.style.border = '1px outset black'
const charPanelContent = document.createElement('div')
charPanelContent.style.width = '60%'
charPanelContent.style.paddingLeft = '5%'
charPanelContent.style.paddingTop = '2%'
charPanelContent.style.display = 'contents'
//Here the plain act variables that we add to the panel content
const base_info_and_stats =`<div style="display:flex;">
  <table style="undefined;table-layout: fixed; width: 65%; border-style: double;">
    <colgroup>
      <col style="width: 101px">
      <col style="width: 32px">
      <col style="width: 200px">
    </colgroup>
    <tbody>
      <tr>
        <td>Name</td>
        <td></td>
        <td>${player.name}</td>
      </tr>
      <tr>
        <td>Level</td>
        <td></td>
        <td>${player.level}</td>
      </tr>
      <tr>
        <td>Class</td>
        <td><img src="https://hordes.io/assets/ui/classes/2.webp?v=4652922" width="20" height="20"></td>
        <td>${player.class}</td>
      </tr>
      <tr>
        <td>Faction</td>
        <td><img src="https://hordes.io/assets/ui/factions/0.webp?v=4652922" width="20" height="20"></td>
        <td>${player.faction}</td>
      </tr>
      <tr>
        <td>Prestige</td>
        <td><img src="https://hordes.io/assets/ui/currency/prestige.svg?v=4652922" width="20" height="20"></td>
        <td>${player.prestige}</td>
      </tr>
      <tr>
        <td>Rating</td>
        <td><img src="https://hordes.io/assets/ui/elo/2.svg?v=4652922" width="20" height="20"></td>
        <td>${player.rating}</td>
      </tr>
      <tr>
        <td>Medals</td>
        <td><img src="https://hordes.io/assets/ui/currency/medal.svg?v=4652922" width="20" height="20"></td>
        <td>${player.medals}</td>
      </tr>
    </tbody>
  </table>
  <table style="undefined;table-layout: fixed; width: 35%; border-style: double;">
    <colgroup>
      <col style="width: 200px">
      <col style="width: 35px">
    </colgroup>
    <tbody>
      <tr>
        <td>Strenght</td>
        <td>${player.strenght}</td>
      </tr>
      <tr>
        <td>Stamina</td>
        <td>${player.stamina}</td>
      </tr>
      <tr>
        <td>Dexterity</td>
        <td>${player.dexterity}</td>
      </tr>
      <tr>
        <td>Intelligence</td>
        <td>${player.intelligence}</td>
      </tr>
      <tr>
        <td>Wisdom</td>
        <td>${player.wisdom}</td>
      </tr>
      <tr>
        <td>Luck</td>
        <td>${player.luck}</td>
      </tr>
      <tr>
        <td>Stat Points</td>
        <td>${player.stat_points}</td>
      </tr>
    </tbody>
  </table>
</div>`
const skill_bar = '<div id="skill_bar_div" style="display:flex;"></div>'
const base_info_and_stats_2 = `<div style="display:flex;">
  <table style="undefined;table-layout: fixed; width: 65%; border-style: double;">
    <colgroup>
      <col style="width: 148px">
      <col style="width: 45px">
    </colgroup>
    <tbody>
      <tr>
        <td>HP</td>
        <td>${player.hp}</td>
      </tr>
      <tr>
        <td>HP Reg./5s</td>
        <td>${player.hp_reg}</td>
      </tr>
      <tr>
        <td>MP</td>
        <td>${player.mp}</td>
      </tr>
      <tr>
        <td>MP Reg./5s</td>
        <td>${player.mp_reg}</td>
      </tr>
      <tr>
        <td>Defense</td>
        <td>${player.defense}</td>
      </tr>
      <tr>
        <td>Block</td>
        <td>${player.block}%</td>
      </tr>
    </tbody>
  </table>
  <table style="undefined;table-layout: fixed; width: 60%; border-style: double;">
    <colgroup>
      <col style="width: 148px">
      <col style="width: 45px">
    </colgroup>
    <tbody>
      <tr>
        <td>Min Dmg.</td>
        <td>${player.min}</td>
      </tr>
      <tr>
        <td>Max Dmg.</td>
        <td>${player.max}</td>
      </tr>
      <tr>
        <td>Attack Spd.</td>
        <td>${player.atk_speed}</td>
      </tr>
      <tr>
        <td>Critical</td>
        <td>${player.critical}%</td>
      </tr>
      <tr>
        <td>Haste</td>
        <td>${player.haste}%</td>
      </tr>
    </tbody>
  </table>
  <table style="undefined;table-layout: fixed; width: 60%; border-style: double;">
    <colgroup>
      <col style="width: 90px">
      <col style="width: 90px">
    </colgroup>
    <tbody>
      <tr>
        <td>Move Spd.</td>
        <td>${player.mov_speed}</td>
      </tr>
      <tr>
        <td>Bag Slots </td>
        <td>${player.bag_slots}</td>
      </tr>
      <tr>
        <td>Item Find</td>
        <td>${player.item_find}%</td>
      </tr>
      <tr>
        <td>Gear Score</td>
        <td>${player.gear_score}</td>
      </tr>
      <tr>
        <td>PvP Level </td>
        <td>${player.pvp_lvl}</td>
      </tr>
    </tbody>
  </table>
</div>`
charPanelContent.innerHTML = base_info_and_stats + skill_bar + base_info_and_stats_2

// Draggable, resizable, closable panel
panel.create(document.body, 250, 500, 600, 450, charPanelHeader, charPanelContent, true, false, true)

//To review ((I'm sure there is a better way to do it that define the element and then search it))
const skill_bar_div = document.getElementById('skill_bar_div')

const equipement1 = icon.create(skill_bar_div, 0, 0, 42, 42, true, false, true)
icon.set(equipement1, 'Invigorate', cd, stacks)
const equipement2 = icon.create(skill_bar_div, 0, 0, 42, 42, true, false, true)
icon.set(equipement2, 'Invigorate', cd, stacks)
const equipement3 = icon.create(skill_bar_div, 0, 0, 42, 42, true, false, true)
icon.set(equipement3, 'Invigorate', cd, stacks)
const equipement4 = icon.create(skill_bar_div, 0, 0, 42, 42, true, false, true)
icon.set(equipement4, 'Invigorate', cd, stacks)
const equipement5 = icon.create(skill_bar_div, 0, 0, 42, 42, true, false, true)
icon.set(equipement5, 'Invigorate', cd, stacks)
const equipement6 = icon.create(skill_bar_div, 0, 0, 42, 42, true, false, false)
icon.set(equipement6, 'Invigorate', cd, stacks)
const equipement7 = icon.create(skill_bar_div, 0, 0, 42, 42, true, false, true)
icon.set(equipement7, 'Invigorate', cd, stacks)
const equipement8 = icon.create(skill_bar_div, 0, 0, 42, 42, true, false, true)
icon.set(equipement8, 'Invigorate', cd, stacks)
const equipement9 = icon.create(skill_bar_div, 0, 0, 42, 42, true, false, false)
icon.set(equipement9, 'Invigorate', cd, stacks)
const equipement10 = icon.create(skill_bar_div, 0, 0, 42, 42, true, false, true)
icon.set(equipement10, '', cd, stacks)
const equipement11 = icon.create(skill_bar_div, 0, 0, 42, 42, true, false, true)
icon.set(equipement11, '', cd, stacks)

const skillPanelHeader = document.createElement('div')
skillPanelHeader.innerHTML = `<h3>Skills</h3>`
skillPanelHeader.innerHTML += `<h4>Skill Points</h4>`
skillPanelHeader.style.width = '100%'
skillPanelHeader.style.border = '1px outset black'
const skillPanelContent = document.createElement('div')
skillPanelContent.innerHTML = '';

const resetSkillsButton = element(skillPanelHeader, 'div')
// Stuff for CSS
resetSkillsButton.innerHTML = 'Reset'
resetSkillsButton.style.position = 'absolute'
resetSkillsButton.style.top = '80'
resetSkillsButton.style.right = '60'
resetSkillsButton.style.width = '60'
resetSkillsButton.style.height = '20'
resetSkillsButton.style.height = '20'
resetSkillsButton.style.textAlign = 'center'
resetSkillsButton.style.cursor = 'pointer'
resetSkillsButton.style.border = '1px inset black'
resetSkillsButton.addEventListener('click', function () {
  (this as HTMLElement).parentElement.hidden = true
})

const applySkillsButton = element(skillPanelHeader, 'div')
// Stuff for CSS
applySkillsButton.innerHTML = 'Apply'
applySkillsButton.style.position = 'absolute'
applySkillsButton.style.top = '80'
applySkillsButton.style.right = '0'
applySkillsButton.style.width = '60'
applySkillsButton.style.height = '20'
applySkillsButton.style.height = '20'
applySkillsButton.style.textAlign = 'center'
applySkillsButton.style.cursor = 'pointer'
applySkillsButton.style.border = '1px inset black'
applySkillsButton.addEventListener('click', function () {
  (this as HTMLElement).parentElement.hidden = true
})

skillPanelContent.innerHTML = `<table style="width: 605px;">
<thead>
  <tr>
    <td rowspan="2"><img src="https://static.miraheze.org/hordesiowiki/d/d3/Invigorate.png" alt="Image" width="42" height="42"></td>
    <td>Skill name</td>
    <td>Skill Level</td>
    <td rowspan="2"><img src="https://static.miraheze.org/hordesiowiki/d/d3/Invigorate.png" alt="Image" width="42" height="42"></td>
    <td>Skill name</td>
    <td>Skill Level</td>
  </tr>
  <tr>
    <td style="
    display: flex;
"><div style="width: 20px; height: 20px; text-align: center; cursor: pointer; border: 1px inset black;">x</div><div style="width: 20px; height: 20px; text-align: center; cursor: pointer; border: 1px inset black;">x</div><div style="width: 20px; height: 20px; text-align: center; cursor: pointer; border: 1px inset black;">x</div><div style="width: 20px; height: 20px; text-align: center; cursor: pointer; border: 1px inset black;">x</div><div style="width: 20px; height: 20px; text-align: center; cursor: pointer; border: 1px inset black;">x</div></td>
    <td><div style="width: 20px;height: 20px;text-align: center;cursor: pointer;border: 1px inset black;float: left;">-</div> <div style="width: 20px;height: 20px;text-align: center;cursor: pointer;border: 1px inset black;float: left;">+</div></td>
        <td style="
    display: flex;
"><div style="width: 20px; height: 20px; text-align: center; cursor: pointer; border: 1px inset black;">x</div><div style="width: 20px; height: 20px; text-align: center; cursor: pointer; border: 1px inset black;">x</div><div style="width: 20px; height: 20px; text-align: center; cursor: pointer; border: 1px inset black;">x</div><div style="width: 20px; height: 20px; text-align: center; cursor: pointer; border: 1px inset black;">x</div><div style="width: 20px; height: 20px; text-align: center; cursor: pointer; border: 1px inset black;">x</div></td>
    <td><div style="width: 20px;height: 20px;text-align: center;cursor: pointer;border: 1px inset black;float: left;">-</div> <div style="width: 20px;height: 20px;text-align: center;cursor: pointer;border: 1px inset black;float: left;">+</div></td>
   <tr>
       <tr>
    <td rowspan="2"><img src="https://static.miraheze.org/hordesiowiki/d/d3/Invigorate.png" alt="Image" width="42" height="42"></td>
    <td>Skill name</td>
    <td>Skill Level</td>
    <td rowspan="2"><img src="https://static.miraheze.org/hordesiowiki/d/d3/Invigorate.png" alt="Image" width="42" height="42"></td>
    <td>Skill name</td>
    <td>Skill Level</td>
  </tr>
  <tr>
    <td style="
    display: flex;
"><div style="width: 20px; height: 20px; text-align: center; cursor: pointer; border: 1px inset black;">x</div><div style="width: 20px; height: 20px; text-align: center; cursor: pointer; border: 1px inset black;">x</div><div style="width: 20px; height: 20px; text-align: center; cursor: pointer; border: 1px inset black;">x</div><div style="width: 20px; height: 20px; text-align: center; cursor: pointer; border: 1px inset black;">x</div><div style="width: 20px; height: 20px; text-align: center; cursor: pointer; border: 1px inset black;">x</div></td>
    <td><div style="width: 20px;height: 20px;text-align: center;cursor: pointer;border: 1px inset black;float: left;">-</div> <div style="width: 20px;height: 20px;text-align: center;cursor: pointer;border: 1px inset black;float: left;">+</div></td>
        <td style="
    display: flex;
"><div style="width: 20px; height: 20px; text-align: center; cursor: pointer; border: 1px inset black;">x</div><div style="width: 20px; height: 20px; text-align: center; cursor: pointer; border: 1px inset black;">x</div><div style="width: 20px; height: 20px; text-align: center; cursor: pointer; border: 1px inset black;">x</div><div style="width: 20px; height: 20px; text-align: center; cursor: pointer; border: 1px inset black;">x</div><div style="width: 20px; height: 20px; text-align: center; cursor: pointer; border: 1px inset black;">x</div></td>
    <td><div style="width: 20px;height: 20px;text-align: center;cursor: pointer;border: 1px inset black;float: left;">-</div> <div style="width: 20px;height: 20px;text-align: center;cursor: pointer;border: 1px inset black;float: left;">+</div></td>
   <tr>
       <tr>
    <td rowspan="2"><img src="https://static.miraheze.org/hordesiowiki/d/d3/Invigorate.png" alt="Image" width="42" height="42"></td>
    <td>Skill name</td>
    <td>Skill Level</td>
    <td rowspan="2"><img src="https://static.miraheze.org/hordesiowiki/d/d3/Invigorate.png" alt="Image" width="42" height="42"></td>
    <td>Skill name</td>
    <td>Skill Level</td>
  </tr>
  <tr>
    <td style="
    display: flex;
"><div style="width: 20px; height: 20px; text-align: center; cursor: pointer; border: 1px inset black;">x</div><div style="width: 20px; height: 20px; text-align: center; cursor: pointer; border: 1px inset black;">x</div><div style="width: 20px; height: 20px; text-align: center; cursor: pointer; border: 1px inset black;">x</div><div style="width: 20px; height: 20px; text-align: center; cursor: pointer; border: 1px inset black;">x</div><div style="width: 20px; height: 20px; text-align: center; cursor: pointer; border: 1px inset black;">x</div></td>
    <td><div style="width: 20px;height: 20px;text-align: center;cursor: pointer;border: 1px inset black;float: left;">-</div> <div style="width: 20px;height: 20px;text-align: center;cursor: pointer;border: 1px inset black;float: left;">+</div></td>
        <td style="
    display: flex;
"><div style="width: 20px; height: 20px; text-align: center; cursor: pointer; border: 1px inset black;">x</div><div style="width: 20px; height: 20px; text-align: center; cursor: pointer; border: 1px inset black;">x</div><div style="width: 20px; height: 20px; text-align: center; cursor: pointer; border: 1px inset black;">x</div><div style="width: 20px; height: 20px; text-align: center; cursor: pointer; border: 1px inset black;">x</div><div style="width: 20px; height: 20px; text-align: center; cursor: pointer; border: 1px inset black;">x</div></td>
    <td><div style="width: 20px;height: 20px;text-align: center;cursor: pointer;border: 1px inset black;float: left;">-</div> <div style="width: 20px;height: 20px;text-align: center;cursor: pointer;border: 1px inset black;float: left;">+</div></td>
   <tr>
       <tr>
    <td rowspan="2"><img src="https://static.miraheze.org/hordesiowiki/d/d3/Invigorate.png" alt="Image" width="42" height="42"></td>
    <td>Skill name</td>
    <td>Skill Level</td>
    <td rowspan="2"><img src="https://static.miraheze.org/hordesiowiki/d/d3/Invigorate.png" alt="Image" width="42" height="42"></td>
    <td>Skill name</td>
    <td>Skill Level</td>
  </tr>
  <tr>
    <td style="
    display: flex;
"><div style="width: 20px; height: 20px; text-align: center; cursor: pointer; border: 1px inset black;">x</div><div style="width: 20px; height: 20px; text-align: center; cursor: pointer; border: 1px inset black;">x</div><div style="width: 20px; height: 20px; text-align: center; cursor: pointer; border: 1px inset black;">x</div><div style="width: 20px; height: 20px; text-align: center; cursor: pointer; border: 1px inset black;">x</div><div style="width: 20px; height: 20px; text-align: center; cursor: pointer; border: 1px inset black;">x</div></td>
    <td><div style="width: 20px;height: 20px;text-align: center;cursor: pointer;border: 1px inset black;float: left;">-</div> <div style="width: 20px;height: 20px;text-align: center;cursor: pointer;border: 1px inset black;float: left;">+</div></td>
        <td style="
    display: flex;
"><div style="width: 20px; height: 20px; text-align: center; cursor: pointer; border: 1px inset black;">x</div><div style="width: 20px; height: 20px; text-align: center; cursor: pointer; border: 1px inset black;">x</div><div style="width: 20px; height: 20px; text-align: center; cursor: pointer; border: 1px inset black;">x</div><div style="width: 20px; height: 20px; text-align: center; cursor: pointer; border: 1px inset black;">x</div><div style="width: 20px; height: 20px; text-align: center; cursor: pointer; border: 1px inset black;">x</div></td>
    <td><div style="width: 20px;height: 20px;text-align: center;cursor: pointer;border: 1px inset black;float: left;">-</div> <div style="width: 20px;height: 20px;text-align: center;cursor: pointer;border: 1px inset black;float: left;">+</div></td>
   <tr>
       <tr>
    <td rowspan="2"><img src="https://static.miraheze.org/hordesiowiki/d/d3/Invigorate.png" alt="Image" width="42" height="42"></td>
    <td>Skill name</td>
    <td>Skill Level</td>
    <td rowspan="2"><img src="https://static.miraheze.org/hordesiowiki/d/d3/Invigorate.png" alt="Image" width="42" height="42"></td>
    <td>Skill name</td>
    <td>Skill Level</td>
  </tr>
  <tr>
    <td style="
    display: flex;
"><div style="width: 20px; height: 20px; text-align: center; cursor: pointer; border: 1px inset black;">x</div><div style="width: 20px; height: 20px; text-align: center; cursor: pointer; border: 1px inset black;">x</div><div style="width: 20px; height: 20px; text-align: center; cursor: pointer; border: 1px inset black;">x</div><div style="width: 20px; height: 20px; text-align: center; cursor: pointer; border: 1px inset black;">x</div><div style="width: 20px; height: 20px; text-align: center; cursor: pointer; border: 1px inset black;">x</div></td>
    <td><div style="width: 20px;height: 20px;text-align: center;cursor: pointer;border: 1px inset black;float: left;">-</div> <div style="width: 20px;height: 20px;text-align: center;cursor: pointer;border: 1px inset black;float: left;">+</div></td>
        <td style="
    display: flex;
"><div style="width: 20px; height: 20px; text-align: center; cursor: pointer; border: 1px inset black;">x</div><div style="width: 20px; height: 20px; text-align: center; cursor: pointer; border: 1px inset black;">x</div><div style="width: 20px; height: 20px; text-align: center; cursor: pointer; border: 1px inset black;">x</div><div style="width: 20px; height: 20px; text-align: center; cursor: pointer; border: 1px inset black;">x</div><div style="width: 20px; height: 20px; text-align: center; cursor: pointer; border: 1px inset black;">x</div></td>
    <td><div style="width: 20px;height: 20px;text-align: center;cursor: pointer;border: 1px inset black;float: left;">-</div> <div style="width: 20px;height: 20px;text-align: center;cursor: pointer;border: 1px inset black;float: left;">+</div></td>
   <tr>
       <tr>
    <td rowspan="2"><img src="https://static.miraheze.org/hordesiowiki/d/d3/Invigorate.png" alt="Image" width="42" height="42"></td>
    <td>Skill name</td>
    <td>Skill Level</td>
    <td rowspan="2"><img src="https://static.miraheze.org/hordesiowiki/d/d3/Invigorate.png" alt="Image" width="42" height="42"></td>
    <td>Skill name</td>
    <td>Skill Level</td>
  </tr>
  <tr>
    <td style="
    display: flex;
"><div style="width: 20px; height: 20px; text-align: center; cursor: pointer; border: 1px inset black;">x</div><div style="width: 20px; height: 20px; text-align: center; cursor: pointer; border: 1px inset black;">x</div><div style="width: 20px; height: 20px; text-align: center; cursor: pointer; border: 1px inset black;">x</div><div style="width: 20px; height: 20px; text-align: center; cursor: pointer; border: 1px inset black;">x</div><div style="width: 20px; height: 20px; text-align: center; cursor: pointer; border: 1px inset black;">x</div></td>
    <td><div style="width: 20px;height: 20px;text-align: center;cursor: pointer;border: 1px inset black;float: left;">-</div> <div style="width: 20px;height: 20px;text-align: center;cursor: pointer;border: 1px inset black;float: left;">+</div></td>
        <td style="
    display: flex;
"><div style="width: 20px; height: 20px; text-align: center; cursor: pointer; border: 1px inset black;">x</div><div style="width: 20px; height: 20px; text-align: center; cursor: pointer; border: 1px inset black;">x</div><div style="width: 20px; height: 20px; text-align: center; cursor: pointer; border: 1px inset black;">x</div><div style="width: 20px; height: 20px; text-align: center; cursor: pointer; border: 1px inset black;">x</div><div style="width: 20px; height: 20px; text-align: center; cursor: pointer; border: 1px inset black;">x</div></td>
    <td><div style="width: 20px;height: 20px;text-align: center;cursor: pointer;border: 1px inset black;float: left;">-</div> <div style="width: 20px;height: 20px;text-align: center;cursor: pointer;border: 1px inset black;float: left;">+</div></td>
   <tr>
       <tr>
    <td rowspan="2"><img src="https://static.miraheze.org/hordesiowiki/d/d3/Invigorate.png" alt="Image" width="42" height="42"></td>
    <td>Skill name</td>
    <td>Skill Level</td>
    <td rowspan="2"><img src="https://static.miraheze.org/hordesiowiki/d/d3/Invigorate.png" alt="Image" width="42" height="42"></td>
    <td>Skill name</td>
    <td>Skill Level</td>
  </tr>
  <tr>
    <td style="
    display: flex;
"><div style="width: 20px; height: 20px; text-align: center; cursor: pointer; border: 1px inset black;">x</div><div style="width: 20px; height: 20px; text-align: center; cursor: pointer; border: 1px inset black;">x</div><div style="width: 20px; height: 20px; text-align: center; cursor: pointer; border: 1px inset black;">x</div><div style="width: 20px; height: 20px; text-align: center; cursor: pointer; border: 1px inset black;">x</div><div style="width: 20px; height: 20px; text-align: center; cursor: pointer; border: 1px inset black;">x</div></td>
    <td><div style="width: 20px;height: 20px;text-align: center;cursor: pointer;border: 1px inset black;float: left;">-</div> <div style="width: 20px;height: 20px;text-align: center;cursor: pointer;border: 1px inset black;float: left;">+</div></td>
        <td style="
    display: flex;
"><div style="width: 20px; height: 20px; text-align: center; cursor: pointer; border: 1px inset black;">x</div><div style="width: 20px; height: 20px; text-align: center; cursor: pointer; border: 1px inset black;">x</div><div style="width: 20px; height: 20px; text-align: center; cursor: pointer; border: 1px inset black;">x</div><div style="width: 20px; height: 20px; text-align: center; cursor: pointer; border: 1px inset black;">x</div><div style="width: 20px; height: 20px; text-align: center; cursor: pointer; border: 1px inset black;">x</div></td>
    <td><div style="width: 20px;height: 20px;text-align: center;cursor: pointer;border: 1px inset black;float: left;">-</div> <div style="width: 20px;height: 20px;text-align: center;cursor: pointer;border: 1px inset black;float: left;">+</div></td>
   <tr>
       <tr>
    <td rowspan="2"><img src="https://static.miraheze.org/hordesiowiki/d/d3/Invigorate.png" alt="Image" width="42" height="42"></td>
    <td>Skill name</td>
    <td>Skill Level</td>
    <td rowspan="2"><img src="https://static.miraheze.org/hordesiowiki/d/d3/Invigorate.png" alt="Image" width="42" height="42"></td>
    <td>Skill name</td>
    <td>Skill Level</td>
  </tr>
  <tr>
    <td style="
    display: flex;
"><div style="width: 20px; height: 20px; text-align: center; cursor: pointer; border: 1px inset black;">x</div><div style="width: 20px; height: 20px; text-align: center; cursor: pointer; border: 1px inset black;">x</div><div style="width: 20px; height: 20px; text-align: center; cursor: pointer; border: 1px inset black;">x</div><div style="width: 20px; height: 20px; text-align: center; cursor: pointer; border: 1px inset black;">x</div><div style="width: 20px; height: 20px; text-align: center; cursor: pointer; border: 1px inset black;">x</div></td>
    <td><div style="width: 20px;height: 20px;text-align: center;cursor: pointer;border: 1px inset black;float: left;">-</div> <div style="width: 20px;height: 20px;text-align: center;cursor: pointer;border: 1px inset black;float: left;">+</div></td>
        <td style="
    display: flex;
"><div style="width: 20px; height: 20px; text-align: center; cursor: pointer; border: 1px inset black;">x</div><div style="width: 20px; height: 20px; text-align: center; cursor: pointer; border: 1px inset black;">x</div><div style="width: 20px; height: 20px; text-align: center; cursor: pointer; border: 1px inset black;">x</div><div style="width: 20px; height: 20px; text-align: center; cursor: pointer; border: 1px inset black;">x</div><div style="width: 20px; height: 20px; text-align: center; cursor: pointer; border: 1px inset black;">x</div></td>
    <td><div style="width: 20px;height: 20px;text-align: center;cursor: pointer;border: 1px inset black;float: left;">-</div> <div style="width: 20px;height: 20px;text-align: center;cursor: pointer;border: 1px inset black;float: left;">+</div></td>
   <tr>
       <tr>
    <td rowspan="2"><img src="https://static.miraheze.org/hordesiowiki/d/d3/Invigorate.png" alt="Image" width="42" height="42"></td>
    <td>Skill name</td>
    <td>Skill Level</td>
    <td rowspan="2"><img src="https://static.miraheze.org/hordesiowiki/d/d3/Invigorate.png" alt="Image" width="42" height="42"></td>
    <td>Skill name</td>
    <td>Skill Level</td>
  </tr>
  <tr>
    <td style="
    display: flex;
"><div style="width: 20px; height: 20px; text-align: center; cursor: pointer; border: 1px inset black;">x</div><div style="width: 20px; height: 20px; text-align: center; cursor: pointer; border: 1px inset black;">x</div><div style="width: 20px; height: 20px; text-align: center; cursor: pointer; border: 1px inset black;">x</div><div style="width: 20px; height: 20px; text-align: center; cursor: pointer; border: 1px inset black;">x</div><div style="width: 20px; height: 20px; text-align: center; cursor: pointer; border: 1px inset black;">x</div></td>
    <td><div style="width: 20px;height: 20px;text-align: center;cursor: pointer;border: 1px inset black;float: left;">-</div> <div style="width: 20px;height: 20px;text-align: center;cursor: pointer;border: 1px inset black;float: left;">+</div></td>
        <td style="
    display: flex;
"><div style="width: 20px; height: 20px; text-align: center; cursor: pointer; border: 1px inset black;">x</div><div style="width: 20px; height: 20px; text-align: center; cursor: pointer; border: 1px inset black;">x</div><div style="width: 20px; height: 20px; text-align: center; cursor: pointer; border: 1px inset black;">x</div><div style="width: 20px; height: 20px; text-align: center; cursor: pointer; border: 1px inset black;">x</div><div style="width: 20px; height: 20px; text-align: center; cursor: pointer; border: 1px inset black;">x</div></td>
    <td><div style="width: 20px;height: 20px;text-align: center;cursor: pointer;border: 1px inset black;float: left;">-</div> <div style="width: 20px;height: 20px;text-align: center;cursor: pointer;border: 1px inset black;float: left;">+</div></td>
   <tr>


</thead>
</table>`
// Draggable, resizable, closable panel
panel.create(document.body, 900, 500, 600, 600, skillPanelHeader, skillPanelContent, true, false, true)

let count = 0
// tick every frame
const test = (time: number): void => {

  // calculate some moving hp/mp numbers
  const hp = Math.round(maxHp * (Math.sin(time / 1000) * 0.5 + 0.5))
  const mp = Math.round(maxMp * (Math.sin(time / 1000) * 0.5 + 0.5))

  if(count % 144 == 0) { //Just to test, my monitor is 144hz so %144 I get second by second
    if(stacks == 3) {
      stacks = 0
    }else{
      stacks++
    }
    cd--
    //To review, we only need to reset the stats when we really need to update them, not when they're the same.
    //Also, may need to define default values on the type to avoid sending info that doesn't change
    icon.set(skill, 'Invigorate', cd, stacks)
    icon.set(skill1, 'Invigorate', cd, stacks)
    icon.set(skill2, 'Invigorate', cd, stacks)
    icon.set(skill3, 'Invigorate', cd, stacks)
    icon.set(skill4, 'Invigorate', cd, stacks)
    icon.set(skill5, 'Invigorate', cd, stacks)
    icon.set(skill6, 'Invigorate', cd, stacks)
    icon.set(skill7, 'Invigorate', cd, stacks)
    icon.set(skill8, 'Invigorate', cd, stacks)
    icon.set(skill9, 'Invigorate', cd, stacks)
    icon.set(skill10, 'Invigorate', cd, stacks)
    icon.set(skill11, 'Invigorate', cd, stacks)
    icon.set(skill12, 'Invigorate', cd, stacks)

  }

  // update bar's
  bar.set(health, hp / maxHp, 'Peter\'s HP', `${hp}/${maxHp}`)
  bar.set(mana, mp / maxMp, 'Peter\'s MP', `${mp}/${maxMp}`)

  // simulate an updating content element
  panelContent.innerHTML = `<table><tr>HP</tr><tr>MP</tr><td>${hp}/${maxHp}</td><td>${mp}/${maxMp}</td>`

  requestAnimationFrame(test)
  count++
}
test(0)
