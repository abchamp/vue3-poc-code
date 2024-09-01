class AppFifoAsyncQueue {
  _queuing = [];
  _working = false;
  _autoNext = false;
  _cId = "";

  constructor(runAuto) {
    this._autoNext = runAuto;
  }

  status() {
    return {
      run: this._working,
      count: this._queuing.length,
      _cId: this._cId,
    };
  }

  enqueue(promise, params, resolve, reject) {
    this._queuing.push({ promise, params, resolve, reject });
  }

  next() {
    if (this._working) {
      return !this._working;
    }

    this.dequeue();
  }

  clear() {
    this._queuing = [];
    this._working = false;
  }

  afterPromiseHandler(item, resolve, data) {
    this._working = false;
    if (resolve) item.resolve(data);
    else item.reject(data);
    if (this._autoNext) {
      this.dequeue();
    }
  }

  dequeue() {
    if (this._working) {
      return false;
    }

    const item = this._queuing.shift();
    if (!item) {
      return false;
    }

    try {
      this._working = true;
      this._cId = item.params["id"];
      item
        .promise(item.params)
        .then((value) => this.afterPromiseHandler(item, true, value))
        .catch((errValue) => this.afterPromiseHandler(item, false, errValue));
    } catch (error) {
      this.afterPromiseHandler(item, false, error);
    }
    return true;
  }
}

export default AppFifoAsyncQueue;
