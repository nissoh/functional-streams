/* eslint max-nested-callbacks: 0 */
/* global describe, it */
import assert from 'assert'

import {of, from, map, subscribe} from '../../src'

describe('map', () => {
  it('should be a function', () => {
    assert.strictEqual(typeof map, 'function')
  })

  it('should apply a function to `next` values of a stream', () => {
    const stream = of(1, 2, 3)
    const mappedStream = map(x => x * x, stream)
    mappedStream.subscribe({
      next: x => {
        assert.strictEqual(typeof x, 'number')
      },
      complete: x => {
        assert.strictEqual(x, 9)
      },
    })
  })

  it('should work with the function::bind syntax', () => {
    const stream = from([1, 2, 3])
    const mappedStream = stream::map(x => x * x)
    mappedStream
      ::subscribe({
        next: x => {
          assert.strictEqual(typeof x, 'number')
        },
        complete: x => {
          assert.strictEqual(x, 9)
        },
      })
  })
})
