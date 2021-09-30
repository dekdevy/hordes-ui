interface Icon {
  draggable: boolean,
  state: {
    corners: {
      topLeft: number,
      topRight: number,
      bottomLeft: number,
      bottomRight: number
    }
    width: number,
    height: number,
    cooldown: number
  }
  elements: {
    outer: HTMLElement,
    image: HTMLElement
  }
}