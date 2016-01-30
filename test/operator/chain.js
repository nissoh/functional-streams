/* eslint max-nested-callbacks: 0 */
/* global describe, it */
import assert from 'assert'

import {of, delay, map, chain, flatMap,
    chainLatest, flatMapLatest} from '../../src'

describe('chain/flatMap', () => {
  it('should be a function', () => {
    assert.strictEqual(typeof chain, 'function')
    assert.strictEqual(typeof flatMap, 'function')
  })

  it('should allow subscribe to inner streams', () => {
    const stream = of(1, 2, 3)

    let called = 0

    stream::chain(x => {
      return of(x, x * 2, x * 5)
    })::map(x => x * 2).subscribe({
      next: x => {
        assert.strictEqual(typeof x, 'number')
        ++called
      },
      complete: x => {
        assert.strictEqual(x, 50)
        assert.strictEqual(called, 9)
      },
    })

    called = 0

    stream::flatMap(x => {
      return of(x, x * 2, x * 5)
    }).subscribe({
      next: x => {
        assert.strictEqual(typeof x, 'number')
        ++called
      },
      complete: x => {
        assert.strictEqual(x, 25)
        assert.strictEqual(called, 9)
      },
    })
  })
})

describe('chainLatest/flatMapLatest', () => {
  it('should be a function', () => {
    assert.strictEqual(typeof chainLatest, 'function')
    assert.strictEqual(typeof flatMapLatest, 'function')
  })

  it('should only subscribe to latest inner streams', () => {
    const stream = of(1, 2, 3)

    let called = 0

    stream::chainLatest(x => {
      const a = of(x, x * 2, x * 5)
      if (x < 3) {
        return a::delay(100)
      }
    }).subscribe({
      next: x => {
        assert.strictEqual(typeof x, 'number')
        ++called
      },
      complete: x => {
        assert.strictEqual(x, 25)
        assert.strictEqual(called, 3)
      },
    })

    called = 0

    stream::flatMapLatest(x => {
      const a = of(x, x * 2, x * 5)
      if (x < 3) {
        return a::delay(100)
      }
    }).subscribe({
      next: x => {
        assert.strictEqual(typeof x, 'number')
        ++called
      },
      complete: x => {
        assert.strictEqual(x, 25)
        assert.strictEqual(called, 3)
      },
    })
  })
})
