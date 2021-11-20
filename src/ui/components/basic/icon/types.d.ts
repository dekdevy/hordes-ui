
interface Icon {
  name: string,
  stacks: number,
  cd: number,
  x: number,
  y: number,
  is_item: boolean,
  is_skill: boolean,
  empty: boolean,

  elements: {
    outer: HTMLElement,
    inner: HTMLElement,
    cd_span: HTMLElement,
    stacks_span: HTMLElement
  }
}

