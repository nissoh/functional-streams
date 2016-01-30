/* eslint max-nested-callbacks: 0 */
/* global describe, it */
import assert from 'assert'

// completey modular
import {domEvent} from '../src/create/domEvent'
import {map} from '../src/operator/map'
import {filter} from '../src/operator/filter'
import {delay} from '../src/operator/delay'
import {merge} from '../src/operator/merge'
import {subscribe} from '../src/operator/subscribe'

function createRenderTarget(id = null) {
  let element = document.createElement(`div`)
  element.className = `cycletest`
  if (id) {
    element.id = id
  }
  document.body.appendChild(element)
  return element
}

describe('Basic Usage', () => {
  it('should allow for mapping and filtering a domEvent', () => {
    const clickEl = createRenderTarget('clickEl')
    const click = domEvent('click') // pre-curried
    const click$ = click(clickEl)

    const blurEl = createRenderTarget('blurEl')
    const blur = domEvent('blur')
    const blur$ = blur(blurEl, true)

    click$::merge(blur$)
      ::delay(10)
      ::filter(ev => ev.type !== 'blur')
      ::map(ev => ev.target.id)
      ::subscribe(id => assert.strictEqual(id, 'clickEl'))

    blurEl.focus()
    blurEl.blur()
    clickEl.click()
  })
})
