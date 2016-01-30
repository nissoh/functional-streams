import {lift} from 'util/lift'
import createObserver from 'util/createObserver'

const chainSubscriber = (fn) => _observer => {
  const observer = createObserver(_observer)
  let spawnedDisposers = []

  const next = x => {
    spawnedDisposers.push(fn(x).subscribe(observer.next))
  }

  const error = e => {
    spawnedDisposers.forEach(d => d())
    observer.error(e)
  }
  const complete = x => {
    spawnedDisposers.forEach(d => d())
    observer.complete(x)
  }

  return {next, error, complete}
}

const chainLatestSubscriber = (fn) => _observer => {
  const observer = createObserver(_observer)
  let spawnedDisposer = () => {}

  const next = x => {
    spawnedDisposer()
    spawnedDisposer = fn(x).subscribe(observer.next)
  }

  const error = e => {
    try {
      spawnedDisposer()
    } catch (er) {
      observer.error(e)
    }
    observer.error(e)
  }
  const complete = x => {
    try {
      spawnedDisposer()
    } catch (er) {
      observer.error(er)
    }
    observer.complete(x)
  }

  return {next, error, complete}
}

function chain(fn, stream) {
  return lift(chainSubscriber(fn), stream ? stream : this)
}

export {chain}

function chainLatest(fn, stream) {
  return lift(chainLatestSubscriber(fn), stream ? stream : this)
}

export {chainLatest}
