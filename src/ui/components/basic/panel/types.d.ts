interface Panel {
  x: number,
  y: number,
  width: number,
  height: number,
  title: string,

  elements: {
    outer: HTMLElement,
    header: HTMLElement
    inner: HTMLElement,
  }
}