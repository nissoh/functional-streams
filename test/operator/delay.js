/* eslint max-nested-callbacks: 0 */
/* global describe, it */
import assert from 'assert'

import {of, delay} from '../../src'

describe('delay', () => {
  it('should be a function', () => {
    assert.strictEqual(typeof delay, 'function')
  })

  it('should delay a stream by a given period', done => {
    const startTime = performance.now()
    of(1)::delay(100)
      .subscribe({
        next: () => {
          const endTime = performance.now()
          assert.strictEqual(endTime - startTime >= 100, true)
        },
        complete: () => done(),
      })
  })
})
