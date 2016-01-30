import {lift} from 'util/lift'
import createObserver from 'util/createObserver'

const mapObserver = fn => _observer => {
  const {next, error, complete} = createObserver(_observer)
  return {
    next: x => next(fn(x)),
    error,
    complete,
  }
}

function map(fn, stream) {
  return lift(mapObserver(fn), stream ? stream : this)
}

export {map}
