import isFunction from './isFunction'

const pass = x => x

export function createNext(observer) {
  if (isFunction(observer)) {
    return {next: observer}
  }

  return isFunction(observer.next) ?
    x => {observer.next(x)} : x => x
}

export function createError(observer, unsubscribe) {
  return isFunction(observer.error) ?
    x => {observer.error(x); unsubscribe()} : unsubscribe
}

export function createComplete(observer, unsubscribe) {
  return isFunction(observer.complete) ?
    x => {observer.complete(x); unsubscribe()} : unsubscribe
}

export default (observer, unsubscribe = pass) => {
  if (isFunction(observer)) {
    return {next: observer, error: unsubscribe, complete: unsubscribe}
  }

  const next = createNext(observer)
  const error = createError(observer, unsubscribe)
  const complete = createComplete(observer, unsubscribe)

  return {next, complete, error}
}
