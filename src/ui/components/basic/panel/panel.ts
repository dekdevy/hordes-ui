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

  // size of border to resize panel
  const resizeBorderSize = 15

  // Inline styles, should go to CSS
  outer.style.position = 'absolute'
  outer.style.border = '2px inset black'
  outer.style.userSelect = 'none'

  // Keep on screen
  x = Math.max(0, Math.min(screen.width, x))
  y = Math.max(0, Math.min(screen.height, y))

  const panel: Panel = {
    defaultX: x,
    defaultY: y,
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

  const downHandlers: { (downEvent: MouseEvent): void; (downEvent: MouseEvent): void }[] = []

  if (draggable) {
    // Is by default false, but just to make sure it's intended to be false
    outer.draggable = false
    // if mouse down, move the panel
    downHandlers.push((downEvent: MouseEvent) => {
      // '&' is intended to check if first bit is set; mouseEvent.buttons will return a combined number
      // See: https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/buttons
      if (downEvent.buttons & 1 && (
        (downEvent.offsetX > resizeBorderSize ||
          downEvent.offsetX < (panel.state.width - resizeBorderSize)) ||
        (downEvent.offsetY > resizeBorderSize ||
          downEvent.offsetY < (panel.state.height - resizeBorderSize)))) {
        // Should go to CSS stuff
        outer.style.cursor = 'grabbing'
        outer.onmousemove = moveEvent => {
          // Make sure mouse is still pressed
          if (moveEvent.buttons & 1) {
            panel.state.x += moveEvent.movementX
            panel.state.y += moveEvent.movementY
            outer.style.left = panel.state.x.toString()
            outer.style.top = panel.state.y.toString()
          }
        }
      }
    })
  }

  // TODO: If you move the mouse too fast you loose control
  // Attaching to document mouseMove might solve it, but the each panel would affect the global handler
  if (resizable) {
    downHandlers.push((downEvent: MouseEvent) => {
      if (downEvent.buttons & 1) {
        outer.style.cursor = 'grabbing'

        let moveHandler = null
        if (downEvent.offsetX <= resizeBorderSize || downEvent.offsetX >= (panel.state.width - resizeBorderSize)) {
          moveHandler = (moveEvent: MouseEvent) => {
            // Make sure mouse is still pressed
            if (moveEvent.buttons & 1) {
              panel.state.width += moveEvent.movementX
              outer.style.width = panel.state.width.toString()
            }
          }
        } else if (downEvent.offsetY <= resizeBorderSize || downEvent.offsetY >= (panel.state.height - resizeBorderSize)) {
          moveHandler = (moveEvent: MouseEvent) => {
            // Make sure mouse is still pressed
            if (moveEvent.buttons & 1) {
              panel.state.height += moveEvent.movementY
              outer.style.height = panel.state.height.toString()
            }
          }
        }

        if (moveHandler) {
          outer.onmousemove = moveHandler
        }
      } else {
        outer.style.cursor = null
      }
    })
  }

  if (closable) {
    const closeButton = element(outer, 'div')
    // Stuff for CSS
    closeButton.style.position = 'absolute'
    closeButton.style.top = '0'
    closeButton.style.right = '0'
    closeButton.style.width = '20'
    closeButton.style.height = '20'
    closeButton.style.height = '20'
    closeButton.style.textAlign = 'center'
    closeButton.style.cursor = 'pointer'
    closeButton.style.border = '1px inset black'
    closeButton.innerHTML = '&#x2716;'
    closeButton.onclick = () => {
      outer.hidden = true
    }
  }

  // go through handlers and execute them
  outer.onmousedown = downEvent => {
    downHandlers.forEach(handler => {
      handler(downEvent)
    })
  }

  // if mouse is not pressed remove move handler
  outer.onmouseup = () => {
    outer.style.cursor = null
    outer.onmousemove = null
  }
  // // if mouse up is not fired, but mouse left panel, remove move handler
  // outer.onmouseleave = () => {
  //   outer.style.cursor = null
  //   outer.onmousemove = null
  // }

  return panel
}