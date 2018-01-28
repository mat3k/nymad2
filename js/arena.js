import KB from './key_codes';

export default class Arena {
  constructor(ctx, player, controller) {
    this.ctx = ctx;
    this.player = player;
    this.x = 50;
    this.y = 50;
    this.controller = controller;
  }

  draw() {
    this.drawBoard();
    this.drawPlayer();
  }

  update() {
    if (this.controller.isKeyPressed(KB.LEFT) || this.controller.isKeyPressed(KB.A))
      this.x -= 2;
    if (this.controller.isKeyPressed(KB.RIGHT) || this.controller.isKeyPressed(KB.D))
      this.x += 2;
    if (this.controller.isKeyPressed(KB.UP) || this.controller.isKeyPressed(KB.W))
      this.y -= 2;
    if (this.controller.isKeyPressed(KB.DOWN) || this.controller.isKeyPressed(KB.S))
      this.y += 2;
  }

  drawBoard() {
    this.ctx.rect(0, 0, 250, 250);
    this.ctx.fill();
  }

  drawPlayer() {
    this.player.image.draw(this.ctx, this.x, this.y);
  }
}
