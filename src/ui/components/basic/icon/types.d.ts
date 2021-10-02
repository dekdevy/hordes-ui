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
    cooldown?: number,
    progress?: number,
    progressAngle?: number
    lastTimer?:string
    overlayCtx?: CanvasRenderingContext2D
  }
  elements: {
    outer: HTMLElement,
    image: HTMLElement
  }
}