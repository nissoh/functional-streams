/* Basically a vessel for a subscriber function */
function Stream(subscriber) {
  this.subscriber = subscriber
}

import {subscribe} from 'operator/subscribe'
Stream.prototype.subscribe = subscribe

export {Stream}
