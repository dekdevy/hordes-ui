
interface Icon {
  name: string,
  stacks: number,
  cd: number,
  x: number,
  y: number

  elements: {
    outer: HTMLElement,
    inner: HTMLElement,
    cd_span: HTMLElement,
    stacks_span: HTMLElement
  }
}



