class Ticker {
  constructor(updateFn, drawFn) {
    this.lastFrameTimeMs = 0;
    this.maxFPS = 30;

    this.updateFn = updateFn;
    this.drawFn = drawFn;
  }

  loop(timestamp) {
    if (timestamp < this.lastFrameTimeMs + (1000 / this.maxFPS)) {
      requestAnimationFrame(() => { this.loop(); });
      return;
    }
    this.lastFrameTimeMs = timestamp;

    this.updateFn();
    this.drawFn();
    requestAnimationFrame(() => { this.loop(); });
  }
}

export default Ticker
