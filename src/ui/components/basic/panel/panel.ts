import {element} from 'ui/utils'

export const create = (
  parent: HTMLElement,
  width: number,
  height: number,
  pos: { x: number, y: number },
  header: HTMLElement,
  inner: HTMLElement,
  draggable?: boolean,
  resizable?: boolean,
  closable?: boolean
): Panel => {

  // create elements
  const outer = element(parent, 'div')

  // Inline styles
  outer.style.position = 'absolute'
  outer.style.border = '2px inset black'
  outer.style.position = 'relative'

  const panel: Panel = {
    width : width,
    height: height,
    pos   : {
      x: 500,
      y: 500
    },
    defaultPos: {
      x: 500,
      y: 500
    },
    elements: {
      outer,
      inner,
      header
    }
  }

  // Keep on screen
  pos.x = Math.max(0, Math.min(screenX, pos.x))
  pos.y = Math.max(0, Math.min(screenY, pos.y))

  panel.defaultPos = pos
  panel.pos = pos

  panel.elements.outer.style.top = pos.toString()
  panel.elements.outer.style.left = pos.x.toString()
  panel.elements.outer.style.width = width.toString()
  panel.elements.outer.style.height = height.toString()

  panel.elements.header = header
  panel.elements.inner = inner

  outer.append(header)
  outer.append(inner)

  // detect changed states
  if (draggable) {
    // TODO: implement
  }
  if (resizable) {
    // TODO: implement
  }
  if (closable) {
    // TODO: implement
  }

  return panel
}