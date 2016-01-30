export default (fn, value) => {
  try {
    fn(value)
  } catch (e) {
    throw e
  }
}
