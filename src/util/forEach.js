import tryCatch from './tryCatch'

export default (fn, iterable) => new Promise((resolve) => {
  for (let i = 0; i < iterable.length; ++i) {
    if (i === iterable.length - 1) {
      tryCatch(fn, iterable[i])
      resolve(iterable[i])
    } else {
      tryCatch(fn, iterable[i])
    }
  }
})
