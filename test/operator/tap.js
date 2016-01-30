/* eslint max-nested-callbacks: 0 */
/* global describe, it */
import assert from 'assert'

import {of, from, tap, subscribe} from '../../src'

describe('tap', () => {
  it('should be a function', () => {
    assert.strictEqual(typeof tap, 'function')
  })

  it('should apply a function to `next` values of a stream', () => {
    const stream = of(1, 2, 3)
    const tappedStream = tap(x => x * x, stream)
    tappedStream.subscribe({
      next: x => {
        assert.strictEqual(typeof x, 'number')
      },
      complete: x => {
        assert.strictEqual(x, 3)
      },
    })
  })

  it('should work with the function::bind syntax', () => {
    const stream = from([1, 2, 3])
    const tappedStream = stream::tap(x => x * x)
    tappedStream
      ::subscribe({
        next: x => {
          assert.strictEqual(typeof x, 'number')
        },
        complete: x => {
          assert.strictEqual(x, 3)
        },
      })
  })
})
