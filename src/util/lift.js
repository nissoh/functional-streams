import {Stream} from '../Stream'

function lift(alterObserver, stream) {
  function subscriber(observer) {
    return stream.subscriber(alterObserver(observer))
  }
  return new Stream(subscriber)
}

export {lift}
