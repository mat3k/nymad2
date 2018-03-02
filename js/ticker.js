class Ticker {
  constructor(updateFn, drawFn) {
    this.last = window.performance.now();
    this.step = 1/60;
    this.dt = 0;

    this.updateFn = updateFn;
    this.drawFn = drawFn;
  }

  loop() {
    let now = window.performance.now();
    this.dt = this.dt + Math.min(1, (now - this.last) / 1000);
    while(this.dt > this.step) {
      this.dt = this.dt - this.step;
      this.updateFn();
    }
    this.drawFn();
    this.last = now;
    requestAnimationFrame(() => this.loop());
  }
}

export default Ticker
