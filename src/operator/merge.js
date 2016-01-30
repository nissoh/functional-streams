import {Stream} from '../Stream'
import createObserver from 'util/createObserver'
import {subscribe} from 'operator/subscribe'

function createMergeObserver(streams, observer) {
  const {next, error, complete: oldComplete} = createObserver(observer)

  let disposedStreams = 1

  const complete = x => {
    disposedStreams++
    if (disposedStreams > streams.length) {
      oldComplete(x)
    }
  }

  return {next, error, complete}
}

const mergeSubscribers = streams => _observer => {
  const observer = createMergeObserver(streams, _observer)

  const disposables = streams.map(stream => {
    return subscribe(observer, stream)
  })

  return () => disposables.forEach(d => d())
}

function merge(...streams) {
  if (this instanceof Stream) {
    streams.push(this)
  }
  return new Stream(mergeSubscribers(streams))
}

export {merge}
