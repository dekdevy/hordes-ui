interface Panel {
  width: number,
  height: number,
  pos: {
    x: number,
    y: number
  },
  defaultPos: {
    x: number,
    y: number
  },
  elements: {
    outer: HTMLElement,
    header: HTMLElement
    inner: HTMLElement,
  }
}