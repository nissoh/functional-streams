/* eslint max-nested-callbacks: 0 */
/* global describe, it */
import assert from 'assert'

import {domEvent, raf, tap} from '../../src'
import {style, keyframe} from 'easy-style'

const simpleStyle = style({
  backgroundColor: '#000000',
  height: '100px',
  width: '100px',
  margin: '5em',
})

const simpleAnimation = keyframe({
  from: {
    transform: 'rotateZ(0)',
  },
  to: {
    transform: 'rotateZ(720deg)',
  },
})

const animationStyle = style({
  animationName: simpleAnimation,
  animationDuration: '2000ms',
  animationIterationCount: 'infinite',
})

function createRenderTarget(id = null) {
  let element = document.createElement(`div`)
  element.className = `cycletest`
  if (id) {
    element.id = id
  }

  element.classList.add(simpleStyle)
  document.body.appendChild(element)
  return element
}

describe('raf', () => {
  it('should be a function', () => {
    assert.strictEqual(typeof raf, 'function')
  })

  it('should run an operation on requestAnimationFrame', () => {
    const element = createRenderTarget('animationTest')
    const click$ = domEvent('click', element, false)
    let startTime = performance.now()
    let endTime = null
    let unsubscribe = click$
      ::raf()
      .subscribe({
        next: () => {
          endTime = performance.now()
          element.classList.add(animationStyle)
        },
        complete: () => {
          element.classList.remove(animationStyle)
        },
      })
    element.click()
    requestAnimationFrame(() => {
      assert.notStrictEqual(endTime, null)
      assert.strictEqual(endTime - startTime > 4, true)
      unsubscribe()
    })
  })
})
