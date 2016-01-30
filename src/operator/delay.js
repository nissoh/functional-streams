import {lift} from 'util/lift'
import createObserver from 'util/createObserver'

const delaySubscriber = period => _observer => {
  const {next, error, complete} = createObserver(_observer)
  return {
    next: x => {
      setTimeout(() => {
        next(x)
      }, period)
    },
    error,
    complete,
  }
}

function delay(period, stream) {
  const s = stream ? stream : this
  return lift(delaySubscriber(period), s)
}

export {delay}
