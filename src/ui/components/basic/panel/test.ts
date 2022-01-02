import { create, destroy, set, setTitle } from 'ui/components/basic/panel/panel.js'

export const name = 'Panel'

export const parentStyle = {
  width : 'unset',
  height: 'unset'
}

let panel : Panel | undefined = undefined

export const onCreate = (parent: HTMLElement) : void => {
  // create dummy element
  panel = create(parent, true, true, true)
  set(panel, 0, 0, 200, 200)
  setTitle(panel, 'Test Panel')
}

export const onDestroy = () : void => {
  // destroy dummy element
  destroy(panel)
}