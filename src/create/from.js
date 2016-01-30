import {Stream} from '../Stream'

import createObserver from 'util/createObserver'
import forEach from 'util/forEach'

const fromArray = values => new Stream((observer) => {
  const {next, error, complete} = createObserver(observer)
  forEach(next, values)
    .then(complete)
    .catch(error)
  return complete
})

export {fromArray as from}

const of = (...values) => fromArray(values)

export {of}
