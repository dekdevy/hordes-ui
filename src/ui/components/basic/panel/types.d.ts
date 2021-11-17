interface Panel {
  defaultX: number,
  defaultY: number,
  defaultWidth: number,
  defaultHeight: number
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