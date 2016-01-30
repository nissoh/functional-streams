import {lift} from 'util/lift'
import createObserver from 'util/createObserver'

const tapObserver = fn => observer => {
  const {next: oldNext, error, complete} = createObserver(observer)
  const next = x => {fn(x); return oldNext(x)}
  return {next, error, complete}
}

function tap(fn, stream) {
  return lift(tapObserver(fn), stream ? stream : this)
}

export {tap}
