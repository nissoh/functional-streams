/* eslint max-nested-callbacks: 0 */
/* global describe, it */
import assert from 'assert'

import {of, from, filter, subscribe} from '../../src'

describe('map', () => {
  it('should be a function', () => {
    assert.strictEqual(typeof filter, 'function')
  })

  it('should apply a function to `next` values of a stream', () => {
    const stream = of(1, null, null, 3, null)
    const filteredStream = filter(x => x !== null, stream)
    filteredStream.subscribe({
      next: x => {
        assert.strictEqual(typeof x, 'number')
      },
      complete: x => {
        assert.strictEqual(x, 3)
      },
    })
  })

  it('should work with the function::bind syntax', () => {
    const stream = from([1, null, null, 3, null])
    const filteredStream = stream::filter(x => x !== null)
    filteredStream
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
