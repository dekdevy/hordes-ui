import {element} from 'ui/utils.js'

export const create = (
  parent: HTMLElement,
  width: number,
  height: number,
  image: HTMLElement,
  draggable?: boolean): Icon => {

  // create elements
  const outer = element(parent, 'div')

  // Inline styles, should go to CSS
  outer.style.position = 'relative'
  outer.style.border = '2px inset black'
  outer.style.userSelect = 'none'

  const icon: Icon = {
    draggable: draggable,
    state    : {
      corners: {
        topLeft    : null,
        topRight   : null,
        bottomLeft : null,
        bottomRight: null
      },
      width   : width,
      height  : height,
      cooldown: null
    },
    elements: {
      outer: outer,
      image: image
    }
  }

  icon.elements.outer.style.width = width.toString()
  icon.elements.outer.style.height = height.toString()

  outer.append(image)

  outer.draggable = false
  image.draggable = false
  // if mouse down, drag the icon
  if (draggable)
    outer.addEventListener('mousedown', dragIcon)

  return icon
}

function dragIcon(downEvent: MouseEvent) {
  if (downEvent.buttons & 1) {
    const element = (downEvent.target as HTMLElement)
    const outer = element.parentElement
    // Should go to CSS stuff
    outer.style.cursor = 'grabbing'
    outer.style.position = 'absolute'

    const mover = moveIcon(element)
    document.addEventListener('mousemove', mover)
    document.addEventListener('mouseup', () => {
      this.removeEventListener('mousemove', mover)
      this.removeEventListener('mouseup', arguments.callee)
    })
  }
}

function moveIcon(element: HTMLElement) {
  // Make sure mouse is still pressed
  return (moveEvent : MouseEvent) => {
    if (moveEvent.buttons & 1) {
      element.style.left += moveEvent.movementX
      element.style.top += moveEvent.movementY
    }
  }
}