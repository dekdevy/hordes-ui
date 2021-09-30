interface Panel {
  defaultX: number,
  defaultY: number
  state: {
    x: number,
    y: number,
    width: number,
    height: number
  }
  elements: {
    outer: HTMLElement,
    header: HTMLElement
    inner: HTMLElement,
  }
}