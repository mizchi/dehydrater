export default class Dehydrater {
  static create() {
    return new Dehydrater();
  }

  static transaction(_target, fn) {
    const d = new Dehydrater();
    const {next, promise} = d.startDehydrate(_target);
    fn(next);
    return promise;
  }

  constructor({emitter} = {}) {
    this.queue = [];
    this.updating = false;
    this.locking = false;
    this.emitter = emitter;

    this.maxCount = null;
    this.progressCount = null;
  }

  emit(...args) {
    if (this.emitter) {
      this.emitter.emit(...args)
    }
  }

  _finishUp() {
    this.queue.length = 0;
    this._updatingPromise = null;
    this.updating = false;
    this.maxCount = null;
    this.progressCount = null;
  }

  startDehydrate(_target) {
    // create callback to response.
    var defer;
    this._updatingPromise = new Promise(done => (defer = done));
    var p = this._updatingPromise;

    return {
      promise: this._updatingPromise,
      next: fn => {
        if (p !== this._updatingPromise) {
          throw new Error("Dehydrater: transaction ended");
        }

        if (this.updating) {
          this.maxCount = this.maxCount + 1;
          this.queue.push(fn);
          return this._updatingPromise;
        }

        // start async updating!
        this.updating = true;
        this.progressCount = 0;
        this.maxCount = 1;

        // start dehydrate
        this.queue.push(fn);
        this._dehydrateNext(t => {
          _finishUp();
          defer(t);
        }, _target);

        return p;
      }
    }
  }

  _dehydrateNext(finish, _target) {
    const next = this.queue.shift();
    if (next == null) {
      finish(_target);
      return;
    } else {
      return Promise.resolve(next(_target)).then(s => {
        this.progressCount = this.progressCount + 1;
        this._dehydrateNext(finish, s); // recursive loop
      });
    }
  }
}
