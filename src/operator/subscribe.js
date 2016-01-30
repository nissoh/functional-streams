function subscribe(observer, stream) {
  const subscriber = stream ? stream.subscriber : this.subscriber
  return subscriber(observer)
}

export {subscribe}
