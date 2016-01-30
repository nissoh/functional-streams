/* eslint max-nested-callbacks: 0 */
/* global describe, it */
import assert from 'assert'

import {from} from '../../src'

describe('from', () => {
  it('should be a function', () => {
    assert.strictEqual(typeof from, 'function')
  })

  it('should return a object', () => {
    assert.strictEqual(typeof from(), 'object')
  })

  it('should return unsubscribe function', () => {
    assert.strictEqual(typeof from([1, 2]).subscribe({}), 'function')
  })

  it('should accept any value', () => {
    assert.doesNotThrow(() => {
      from([null, 1, 'string', true, {}, () => {}])
    })
  })

  it('should accept a function as an observer', () => {
    let called = 0
    assert.doesNotThrow(() => {
      const s = from([1, 2, 3])
      s.subscribe(value => {
        assert.strictEqual(typeof value, 'number')
        assert.strictEqual(value < 4, true)
        ++called
      })
    })
    assert.strictEqual(called, 3)
  })

  it('should accept an observer', done => {
    let called = 0
    assert.doesNotThrow(() => {
      const s = from([1, 2, 3])
      s.subscribe({
        next: value => {
          assert.strictEqual(typeof value, 'number')
          assert.strictEqual(value < 4, true)
          ++called
        },
        error: assert.fail,
        complete: x => {
          assert.strictEqual(x, 3)
          ++called
        },
      })
    })
    setTimeout(() => {
      assert.strictEqual(called, 4)
      done()
    }, 1)
  })

  it('should accept an observer with only `next` method', () => {
    let called = 0
    assert.doesNotThrow(() => {
      const s = from([1, 2, 3])
      s.subscribe({next: value => {
        assert.strictEqual(typeof value, 'number')
        assert.strictEqual(value < 4, true)
        ++called
      }})
    })
    assert.strictEqual(called, 3)
  })
})
