/* global describe */
describe('Stream Creation', () => {
  require('./create/from')
  require('./create/domEvent')
})

describe('Operators', () => {
  require('./operator/map')
  require('./operator/tap')
  require('./operator/filter')
  require('./operator/delay')
  require('./operator/merge')
  require('./operator/chain')
  require('./operator/raf')
})

require('./basicUsage')
