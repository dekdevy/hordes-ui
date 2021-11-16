import {element} from 'ui/utils.js'

export const create = (
  parent: HTMLElement,
  x: number,
  y: number,
  width: number,
  height: number,
  header: HTMLElement,
  inner: HTMLElement,
  draggable?: boolean,
  resizable?: boolean,
  closable?: boolean): Panel => {

  // create elements
  const outer = element(parent, 'div')

  // Inline styles, should go to CSS
  outer.style.position = 'absolute'
  outer.style.border = '2px inset black'
  outer.style.userSelect = 'none'
  outer.draggable = false

  // Keep on screen
  x = Math.max(0, Math.min(screen.width, x))
  y = Math.max(0, Math.min(screen.height, y))

  const panel: Panel = {
    defaultX: x,
    defaultY: y,
    defaultWidth: width,
    defaultHeight: height,
    state   : {
      x     : x,
      y     : y,
      width : width,
      height: height
    },
    elements: {
      outer,
      inner,
      header
    }
  }

  panel.elements.outer.style.left = x.toString()
  panel.elements.outer.style.top = y.toString()
  panel.elements.outer.style.width = width.toString()
  panel.elements.outer.style.height = height.toString()

  outer.append(header)
  outer.append(inner)

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

  const resetPositionButton = element(outer, 'div')
    // Stuff for CSS
  resetPositionButton.innerHTML = '&#x2716;'
  resetPositionButton.style.position = 'absolute'
  resetPositionButton.style.top = '20'
  resetPositionButton.style.right = '20'
  resetPositionButton.style.width = '20'
  resetPositionButton.style.height = '20'
  resetPositionButton.style.height = '20'
  resetPositionButton.style.textAlign = 'center'
  resetPositionButton.style.cursor = 'pointer'
  resetPositionButton.style.border = '1px inset black'
  resetPositionButton.addEventListener('mousedown', resetPosition(panel))

  const resetSizeButton = element(outer, 'div')
    // Stuff for CSS
  resetSizeButton.innerHTML = '&#x2716;'
  resetSizeButton.style.position = 'absolute'
  resetSizeButton.style.top = '40'
  resetSizeButton.style.right = '40'
  resetSizeButton.style.width = '20'
  resetSizeButton.style.height = '20'
  resetSizeButton.style.height = '20'
  resetSizeButton.style.textAlign = 'center'
  resetSizeButton.style.cursor = 'pointer'
  resetSizeButton.style.border = '1px inset black'
  resetSizeButton.addEventListener('mousedown', resetSize(panel))

  return panel
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
          panel.state.x += moveEvent.movementX
          panel.state.y += moveEvent.movementY
          element.style.left = panel.state.x.toString()
          element.style.top = panel.state.y.toString()
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
        panel.state.width += moveEvent.movementX
        element.style.width = panel.state.width.toString()
        panel.state.height += moveEvent.movementY
        element.style.height = panel.state.height.toString()
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

function resetPosition(panel: Panel) {

  return function (downEvent: MouseEvent) {
    if (downEvent.buttons & 1) {
      const element = (downEvent.target as HTMLElement).parentElement

      console.log("ResetPosition!" + "Default X: " + panel.defaultX + " Default Y: "+panel.defaultY)

      element.style.left = panel.defaultX.toString()
      element.style.top = panel.defaultY.toString()

      panel.state.x = panel.defaultX
      panel.state.y = panel.defaultY

      downEvent.stopImmediatePropagation()
    }
  }
}

function resetSize(panel: Panel) {

  return function (downEvent: MouseEvent) {
    if (downEvent.buttons & 1) {
      const element = (downEvent.target as HTMLElement).parentElement

      console.log("ResetSize!" + "Default width: " + panel.defaultWidth + " Default height: "+panel.defaultHeight)

        panel.state.width = panel.defaultWidth
        panel.state.height = panel.defaultHeight

        element.style.width = panel.state.width.toString()
        element.style.height = panel.state.height.toString()

      downEvent.stopImmediatePropagation()
    }
  }
}

