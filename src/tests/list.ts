import * as barTest from 'ui/components/basic/bar/test.js'
import * as panelTest from 'ui/components/basic/panel/test.js'
import { element } from 'ui/utils/html.js'

// Array of tests, including interface
interface Test {
  name: string,
  onCreate : (parent: HTMLElement) => void,
  onDestroy : () => void,
  parentStyle : {
    width : string,
    height : string
  }
}
const tests : Test[] = [barTest, panelTest]

// a select element which lets us select each component
const testSelect = element(document.body, 'select')

tests.forEach( test => {
  const option = element(testSelect, 'option')
  option.innerHTML = test.name
})

testSelect.onchange = (e) => {
  // get index of selected option
  const s = e.target as HTMLSelectElement
  changeActiveTest(s.options.selectedIndex)
}

// function to change test, destroys active one if necessary
let selectedTestIndex = -1
const changeActiveTest = (index: number) => {
  // destroy active test if exists
  if(selectedTestIndex >= 0) {
    tests[selectedTestIndex].onDestroy()
  }

  // get new selected test
  selectedTestIndex = index
  const selectedTest = tests[selectedTestIndex]

  // set test style
  Object.assign(testContainer.style, selectedTest.parentStyle)

  // create active test
  selectedTest.onCreate(testContainer)
}

// test div which contains elements that are created during the tests
const testContainer = element(document.body, 'div')

// set initial test
changeActiveTest(0)