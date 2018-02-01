import KB from './key_codes';

export default class Arena {
  constructor(ctx, player, controller) {
    this.ctx = ctx;
    this.player = player;
    this.x = 50;
    this.y = 50;
    this.controller = controller;
    this.state = 'none';
  }

  draw() {
    this.drawBoard();
    this.drawPlayer();
    if (this.state == 'attack') {
      this.drawPlayerAttack();
    }
  }

  update() {
    if (this.state == 'attack') {
       this.state = 'recovery';
      setTimeout(() => { this.state = 'none' }, 1000);
    }

    if (this.controller.isKeyPressed(KB.LEFT) || this.controller.isKeyPressed(KB.A))
      this.x -= 2;
    if (this.controller.isKeyPressed(KB.RIGHT) || this.controller.isKeyPressed(KB.D))
      this.x += 2;
    if (this.controller.isKeyPressed(KB.UP) || this.controller.isKeyPressed(KB.W))
      this.y -= 2;
    if (this.controller.isKeyPressed(KB.DOWN) || this.controller.isKeyPressed(KB.S))
      this.y += 2;

    if (this.controller.isButtonPressed()) {
      if (this.state == 'none')
        this.state = 'attack'
    }
  }

  drawBoard() {
    this.ctx.rect(0, 0, 250, 250);
    this.ctx.fill();
  }

  drawPlayer() {
    this.player.image.draw(this.ctx, this.x, this.y);
  }

  drawPlayerAttack() {
    let length = 0.5;
    this.ctx.strokeStyle = '#FFFFFF';
    this.ctx.beginPath();
    this.ctx.arc(this.x + 16, this.y + 16, 25, 1.25 * Math.PI, 1.75 * Math.PI);
    this.ctx.stroke();
    this.attack = false;
  }
}
