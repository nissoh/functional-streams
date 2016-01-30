import {lift} from 'util/lift'
import createObserver from 'util/createObserver'

const requestAnimationFrame =
  typeof window !== 'undefined' && window.requestAnimationFrame ?
    window.requestAnimationFrame : setTimeout

function rafSubscriber(observer) {
  const {next, error, complete} = createObserver(observer)
  return {
    next: x => requestAnimationFrame(() => {next(x)}),
    error,
    complete,
  }
}

function raf(stream) {
  return lift(rafSubscriber, stream ? stream : this)
}

export {raf}
