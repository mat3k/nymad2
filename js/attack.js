export default class Attack {
  constructor(ctx, position) {
    this.ctx = ctx;
    this.position = position;
    this.attacker = 'player';
    this.finished = false;

    setTimeout(() => { this.finished = true; }, 150);
  }

  update() {}

  draw() {
    let length = 1.75;

    this.ctx.strokeStyle = '#FFFFFF';
    this.ctx.beginPath();
    this.ctx.arc(this.position.x + 16, this.position.y + 16, 25, 1.25 * Math.PI, length * Math.PI);
    this.ctx.stroke();
  }

  colide() {

  }
}
