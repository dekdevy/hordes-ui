import { create, destroy, set } from 'ui/components/basic/bar/bar.js'

export const name = 'Bar'

export const parentStyle = {
  width : '300px',
  height: '50px'
}

let bar : Bar | undefined = undefined

export const onCreate = (parent: HTMLElement) : void => {
  // create dummy element
  bar = create(parent)
  set(bar, 50 / 100, 'Test Bar', `${50}/${100}`)
}

export const onDestroy = () : void => {
  // destroy dummy element
  destroy(bar)
}