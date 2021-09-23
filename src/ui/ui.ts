import * as bar from 'ui/components/basic/bar/bar.js'

// just a little testing
const health = bar.create(document.body)

// tick every frame
const test = (time: number):void => {

  // calculate some moving hp numbers
  const maxHp = 300
  const hp = Math.round(maxHp*(Math.sin(time/1000)*0.5+0.5))

  // update bar
  bar.set(health, hp/maxHp, 'Peter', `${hp}/${maxHp}`)
  requestAnimationFrame(test)
}
test()
