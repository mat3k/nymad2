class FPSMeter {
  constructor(ctx) {
    this.ctx = ctx;
    this.frames = 0
    this.fpses = 0

    this.calculateFpses();
  }

  draw() {
    this.frames += 1;

    this.ctx.font = "16px Arial";
    this.ctx.fillStyle = "#FF0000";
    this.ctx.fillText(this.fpses, 7, 20);
  }

  calculateFpses() {
    this.fpses = this.frames;
    this.frames = 0;


    setTimeout(_ => this.calculateFpses(), 1000);
  }
}

export default FPSMeter
