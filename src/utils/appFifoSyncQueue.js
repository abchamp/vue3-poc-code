class AppFifoAsyncQueue {
  queuing = [];
  workingOnPromise = false;

  queue(promise, params, resolve, reject) {
    this.queuing.push({ promise, params, resolve, reject });
  }

  next() {
    this.dequeue();
  }

  clear() {
    this.queue = [];
    this.workingOnPromise = false;
  }

  afterPromise(item, resolve, data) {
    this.workingOnPromise = false;
    if (resolve) item.resolve(data);
    else item.reject(data);
  }

  dequeue() {
    if (this.workingOnPromise) {
      return false;
    }

    const item = this.queuing.shift();
    if (!item) {
      return false;
    }

    try {
      this.workingOnPromise = true;
      item
        .promise(item.params)
        .then((value) => this.afterPromise(item, true, value))
        .catch((errValue) => this.afterPromise(item, false, errValue));
    } catch (error) {
      this.afterPromise(item, false, error);
    }
    return true;
  }
}
