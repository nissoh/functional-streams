'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Stream = undefined;

var _subscribe = require('./operator/subscribe');

/* Basically a vessel for a subscriber function */
function Stream(subscriber) {
  this.subscriber = subscriber;
}

Stream.prototype.subscribe = _subscribe.subscribe;

exports.Stream = Stream;