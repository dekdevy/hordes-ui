import { element } from 'ui/utils/html.js'

export const create = (
  parent: HTMLElement,
  draggable: boolean,
  resizable: boolean,
  closable: boolean): Panel => {

  // create elements
  const outer = element(parent, 'div')
  const header = element(outer, 'div')
  const inner = element(outer, 'div')

  // Inline styles, should go to CSS
  outer.style.position = 'absolute'
  outer.style.border = '2px inset black'
  outer.style.userSelect = 'none'
  outer.style.display = 'grid'
  outer.style.gridTemplateRows = 'auto 1fr'
  outer.draggable = false

  const panel: Panel = {
    title   : '',
    x       : 0,
    y       : 0,
    width   : 0,
    height  : 0,
    elements: {
      outer,
      inner,
      header
    }
  }

  if (draggable) outer.addEventListener('mousedown', dragPanel(panel))

  if (resizable) {
    const resizeButton = element(outer, 'div')
    // Stuff for CSS
    resizeButton.innerHTML = '&#129981;'
    resizeButton.style.position = 'absolute'
    resizeButton.style.bottom = '0'
    resizeButton.style.right = '0'
    resizeButton.style.width = '20'
    resizeButton.style.height = '20'
    resizeButton.style.height = '20'
    resizeButton.style.textAlign = 'right'
    resizeButton.style.cursor = 'pointer'
    resizeButton.addEventListener('mousedown', resizePanel(panel))
  }

  if (closable) {
    const closeButton = element(outer, 'div')
    // Stuff for CSS
    closeButton.innerHTML = '&#x2716;'
    closeButton.style.position = 'absolute'
    closeButton.style.top = '0'
    closeButton.style.right = '0'
    closeButton.style.width = '20'
    closeButton.style.height = '20'
    closeButton.style.height = '20'
    closeButton.style.textAlign = 'center'
    closeButton.style.cursor = 'pointer'
    closeButton.style.border = '1px inset black'
    closeButton.addEventListener('click', function () {
      (this as HTMLElement).parentElement.hidden = true
    })
  }

  return panel
}

export const destroy = (panel: Panel) => {
  panel.elements.outer.remove()
}

// if mouse down, move the panel
function dragPanel(panel: Panel) {
  // '&' is intended to check if first bit is set; mouseEvent.buttons will return a combined number
  // See: https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/buttons
  return function (downEvent: MouseEvent) {
    const element = (this as HTMLElement)

    if (downEvent.buttons & 1) {
      // Should go to CSS stuff
      element.style.cursor = 'grabbing'
      const mouseMove = (moveEvent: MouseEvent) => {
        // Make sure mouse is still pressed
        if (moveEvent.buttons & 1) {
          panel.x += moveEvent.movementX
          panel.y += moveEvent.movementY
          element.style.left = panel.x.toString()
          element.style.top = panel.y.toString()
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

function resizePanel(panel: Panel) {

  return function (downEvent: MouseEvent) {
    if (downEvent.buttons & 1) {
      const element = (downEvent.target as HTMLElement).parentElement
      element.style.cursor = 'grabbing'

      const mouseMove = (moveEvent: MouseEvent) => {
        panel.width += moveEvent.movementX
        element.style.width = panel.width.toString()
        panel.height += moveEvent.movementY
        element.style.height = panel.height.toString()
      }
      document.addEventListener('mousemove', mouseMove)

      const mouseUp = () => {
        document.removeEventListener('mousemove', mouseMove)
        document.removeEventListener('mouseup', mouseUp)

        element.style.cursor = null
      }
      document.addEventListener('mouseup', mouseUp)
      downEvent.stopImmediatePropagation()
    }
  }
}

export const setPos = (panel: Panel, x: number, y: number) : void => {
  if(panel.x !== x) {
    panel.x = x
    panel.elements.outer.style.left = `${x}px`
  }
  if(panel.y !== y) {
    panel.y = y
    panel.elements.outer.style.top = `${y}px`
  }
}

export const setSize = (panel: Panel, width: number, height: number) : void => {
  if(panel.width !== width) {
    panel.width = width
    panel.elements.outer.style.width = `${width}px`
  }
  if(panel.height !== height) {
    panel.height = height
    panel.elements.outer.style.height = `${height}px`
  }
}

export const set = (panel: Panel, x: number, y: number, width: number, height: number) : void => {
  setSize(panel, width, height)
  setPos(panel, x, y)
}

export const setTitle = (panel: Panel, title: string) : void => {
  if(panel.title !== title) {
    panel.title = title
    panel.elements.header.innerText = title
  }
}