// Simple 'ticker' object.
// When running, invokes registered callbacks once per second.

export class Ticker {
  private handle;
  private callbacks = new Set<(number) => void>();

  private clear() {
    if (this.handle) {
      clearTimeout(this.handle);
      this.handle = 0;
    }
  }

  private sendTick(seconds: number = 1) {
    for (const cb of this.callbacks) {
      cb(seconds);
    }
  }

  start() {
    this.clear();

    let lastTick = Date.now();

    const tick = (timeout: number) => {
      this.handle = setTimeout(() => {
        const now = Date.now();
        let dt = now - lastTick - timeout;
        lastTick = now;

        if (dt > 1000) {
          const seconds = Math.floor(dt / 1000);

          dt = dt - seconds * 1000;
          this.sendTick(seconds);
          return tick(1000 - dt);
        }

        this.sendTick();
        tick(1000 - dt);
      }, timeout);
    };

    tick(1000);
  }
  stop() {}

  onTick(cb: (number) => void) {
    this.callbacks.add(cb);
  }

  clearOnTick(cb: (number) => void) {
    if (this.callbacks.has(cb)) {
      this.callbacks.delete(cb);
    }
  }
}
