import {element} from 'ui/utils.js'

export const create = (
  parent: HTMLElement,
  x: number,
  y: number,
  width: number,
  height: number): Icon => {

  // create elements
  const outer = element(parent, 'div')
  const inner = element(outer, 'div')
  const cd_span = element(outer, 'span')
  const stacks_span = element(outer, 'span')

  outer.style.width = width.toString()
  outer.style.position = 'relative'
  outer.style.left = x.toString()
  outer.style.top = y.toString()
  inner.style.backgroundColor = '#97d7ea'
  inner.style.backgroundImage = "url('https://static.miraheze.org/hordesiowiki/d/d3/Invigorate.png')"
  inner.style.height = height.toString()

  //CD - TYPE:SPAN - Display the cooldown/remaining duration of the skill/buff/debuff
  cd_span.style.position = 'absolute'
  cd_span.style.fontSize = '20'
  cd_span.style.top = '50%'
  cd_span.style.left = '50%'
  cd_span.style.transform = 'translate(-50%, -50%)'
  cd_span.style.fontFamily = '"hordes", sans-serif'
  cd_span.style.color = '#F5C247'
  cd_span.style.textShadow = '1px 1px 0px #ff7600e6'
  //Stacks - TYPE:SPAN - Display the amount of stacks of a buff/debff
  stacks_span.style.position = 'absolute'
  stacks_span.style.bottom = '0'
  stacks_span.style.right = '0'
  stacks_span.style.fontFamily = '"hordes", sans-serif'
  stacks_span.style.color = '#FFFFFF'
  stacks_span.style.fontSize = '10'
  stacks_span.style.width = '25%'
  stacks_span.style.height = '25%'
  stacks_span.style.textAlign = 'center'
  stacks_span.style.backgroundColor = '#6495ed73'


   const icon: Icon = {
    name : "",
    stacks : 0,
    cd: 0,
    x: x,
    y: y,
    elements: {
      outer,
      inner,
      cd_span,
      stacks_span
    }
  }

  outer.addEventListener('mousedown', dragIcon(icon))

  return icon
}

export const set = (icon: Icon, name: string, cd: number, stacks: number): void => {

  icon.elements.cd_span.innerHTML = cd.toString();
  if(stacks > 1){
    icon.elements.stacks_span.innerHTML = stacks.toString() 
    icon.elements.stacks_span.style.display = ""  
  }else{
    icon.elements.stacks_span.innerHTML = stacks.toString() 
    icon.elements.stacks_span.style.display = "none" 
  }
}

function dragIcon(icon: Icon) {
  console.log("mouse down");
    return function (downEvent: MouseEvent) {
    const element = (this as HTMLElement)

    if (downEvent.buttons & 1) {
      // Should go to CSS stuff
      element.style.cursor = 'grabbing'
      const mouseMove = (moveEvent: MouseEvent) => {
        // Make sure mouse is still pressed
        if (moveEvent.buttons & 1) {
          icon.x += moveEvent.movementX
          icon.y += moveEvent.movementY
          element.style.left = icon.x.toString()
          element.style.top = icon.y.toString()
        }
      }
      document.addEventListener('mousemove', mouseMove)

      const mouseUp = () => {
        document.removeEventListener('mousemove', mouseMove)
        document.removeEventListener('mouseup', mouseUp)

        element.style.cursor = null
      }
      document.addEventListener('mouseup', mouseUp)
    }

    downEvent.stopImmediatePropagation()
  }
}