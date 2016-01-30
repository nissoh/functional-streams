import curry from 'lodash.curry'

import {Stream} from '../Stream'
import createObserver from 'util/createObserver'

function addEventListener({eventType, node, useCapture, fn}) {
  if (node.length) {
    for (let i = 0; i <= node.length; ++i) {
      node[i].addEventListener(eventType, fn, useCapture)
    }
  } else {
    node.addEventListener(eventType, fn, useCapture)
  }
}

function removeEventListener({eventType, node, useCapture, fn}) {
  if (node.length) {
    for (let i = 0; i <= node.length; ++i) {
      node[i].removeEventListener(eventType, fn, useCapture)
    }
  } else {
    node.removeEventListener(eventType, fn, useCapture)
  }
}

const _domEvent = (eventType, node, useCapture = false) =>
  new Stream((observer) => {
    let unsubscribe

    const {next, complete} = createObserver(observer, unsubscribe)

    addEventListener({eventType, node, useCapture, fn: next})

    unsubscribe = () => {
      removeEventListener({eventType, node, useCapture, fn: next})
      complete()
    }
    return unsubscribe
  })

const domEvent = curry(_domEvent)
export {domEvent}
