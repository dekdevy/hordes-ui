export const element = (parent:HTMLElement, tag: string, opts?: ElementCreationOptions ) : HTMLElement =>{
  const element = document.createElement(tag, opts)
  parent.appendChild(element)
  return element
}