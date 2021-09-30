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
  outer.style.display = 'inline-block'
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
    const element = (this as HTMLElement)
    // Should go to CSS stuff
    element.style.cursor = 'grabbing'
    element.style.position = 'absolute'
    element.style.left = element.offsetLeft.toString()
    element.style.top = element.offsetTop.toString()

    const mouseMove = (moveEvent: MouseEvent) => {
      if (moveEvent.buttons & 1) {
        element.style.left = (parseInt(element.style.left.replace('px', '')) + moveEvent.movementX).toString()
        element.style.top = (parseInt(element.style.top.replace('px', '')) + moveEvent.movementY).toString()
      }
    }
    document.addEventListener('mousemove', mouseMove)

    const mouseUp = () => {
      document.removeEventListener('mousemove', mouseMove)
      document.removeEventListener('mouseup', mouseUp)

      element.style.cursor = null
      element.style.position = 'relative'
      element.style.left = null
      element.style.top = null
    }
    document.addEventListener('mouseup', mouseUp)
    downEvent.stopImmediatePropagation()
  }
}