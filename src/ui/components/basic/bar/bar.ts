import {element} from 'ui/utils.js'

export const create = (
  parent: HTMLElement,
  x: number,
  y: number,
  width: number,
  height: number): Bar => {

  // create elements
  const outer = element(parent, 'div')
  const inner = element(outer, 'div')
  const textLeft = element(outer, 'span')
  const textRight = element(outer, 'span')

  // for testing these are some basic hardcoded styles, we will replace it with css
  outer.style.backgroundColor = '#333'
  outer.style.width = width.toString()
  outer.style.position = 'relative'
  outer.style.left = x.toString()
  outer.style.top = y.toString()
  inner.style.backgroundColor = '#3F3'
  inner.style.height = height.toString()
  textLeft.style.position = 'absolute'
  textLeft.style.top = '0'
  textRight.style.position = 'absolute'
  textRight.style.top = '0'
  textRight.style.right = '0'
  outer.style.marginBottom = '20px'

  return {
    fraction : 1,
    textLeft : '',
    textRight: '',

    elements: {
      outer,
      inner,
      textRight,
      textLeft
    }
  }
}

export const set = (bar: Bar, fraction: number, textLeft: string, textRight: string): void => {

  // sanitize values
  fraction = Math.max(0, Math.min(1, fraction)) // clamp the fraction

  // detect changed states
  if (bar.fraction !== fraction) {
    bar.fraction = fraction
    bar.elements.inner.style.width = `${fraction * 100}%`
  }
  if (bar.textLeft !== textLeft) {
    bar.textLeft = textLeft
    bar.elements.textLeft.innerHTML = textLeft
  }
  if (bar.textRight !== textRight) {
    bar.textRight = textRight
    bar.elements.textRight.innerHTML = textRight
  }
}