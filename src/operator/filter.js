import {lift} from 'util/lift'
import createObserver from 'util/createObserver'

const filterObserver = fn => _observer => {
  const {next: oldNext, error, complete} = createObserver(_observer)
  const next = x => {if (fn(x)) { oldNext(x) }}
  return {next, error, complete}
}

function filter(fn, stream) {
  const s = stream ? stream : this
  return lift(filterObserver(fn), s)
}

export {filter}
