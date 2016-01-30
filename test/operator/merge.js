/* eslint max-nested-callbacks: 0 */
/* global describe, it */
import assert from 'assert'

import {of, from, merge, filter, map} from '../../src'

describe('merge', () => {
  it('should be a function', () => {
    assert.strictEqual(typeof merge, 'function')
  })

  it('should merge 2 streams into 1', done => {
    const a = of(1, 3, 5)
    const b = from([2, 4, 6])
    const c = merge(a, b)
    let called = 0
    c.subscribe({
      next: x => {
        assert.strictEqual(typeof x, 'number')
        ++called
      },
      complete: x => {
        assert.strictEqual(x, 6)
        assert.strictEqual(called, 6)
        setTimeout(done, 1)
      },
    })
  })

  it('should merge `n` number of streams', done => {
    const a = of(1, 3, 5)
    const b = from([2, 4, 6])
    const c = of(1, 99, 100)
    const d = of('1', '2', '3', 4)::filter(x => typeof x === 'number')
    const e = of(100)
    const f = merge(a, a, b, b, c, d, e, a)
    let called = 0
    f.subscribe({
      next: x => {
        assert.strictEqual(typeof x, 'number')
        ++called
      },
      complete: () => {
        assert.strictEqual(called, 20)
        setTimeout(done, 1)
      },
    })
  })

  it('should work with other operators as expected', done => {
    const a = of(1, 3, 5)
    const b = of(2, 4, 6)
    a::merge(b)::map(() => 100).subscribe({
      next: x => {
        assert.strictEqual(x, 100)
      },
      complete: () => done(),
    })
  })
})
