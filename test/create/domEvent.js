/* eslint max-nested-callbacks: 0 */
/* global describe, it */
import assert from 'assert'

import {domEvent} from '../../src'

function createRenderTarget(id = null) {
  let element = document.createElement(`div`)
  element.className = `cycletest`
  if (id) {
    element.id = id
  }
  document.body.appendChild(element)
  return element
}

describe('domEvent', () => {
  it('should be a function', () => {
    assert.strictEqual(typeof domEvent, 'function')
  })

  it('should return a function', () => {
    assert.strictEqual(typeof domEvent(), 'function')
  })

  it('should return unsubscribe function', () => {
    assert.strictEqual(
      typeof domEvent('click', createRenderTarget()).subscribe({}),
      'function'
    )
  })

  it('should be pre-curried', () => {
    const clicks = domEvent('click')
    assert.strictEqual(
      typeof clicks(createRenderTarget()).subscribe,
      'function'
    )
  })

  it('should forward events to observer', () => {
    const click = domEvent('click')
    const element = createRenderTarget()
    const click$ = click(element)
    click$.subscribe(ev => {
      assert.strictEqual(ev.type, 'click')
      assert.strictEqual(ev.target.tagName, 'DIV')
    })
    element.click()
  })

  it('should catch blur events with useCapture = true', () => {
    const blur = domEvent('blur')
    const element = createRenderTarget('blur')
    const blur$ = blur(element, true)

    blur$.subscribe(ev => {
      assert.strictEqual(ev.type, 'blur')
      assert.strictEqual(ev.target.id, 'blur')
    })

    element.focus()
    element.blur()
  })

  it('should not forward events to observer if unsubscribed', done => {
    const click = domEvent('click')
    const element = createRenderTarget()
    const click$ = click(element)
    const unsubscribe = click$.subscribe({next: assert.fail, complete: done})
    unsubscribe()
    element.click()
  })
})
