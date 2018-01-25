const KB_LEFT = 37;
const KB_A = 65;

const KB_UP = 38;
const KB_W = 87;

const KB_RIGHT = 39;
const KB_D = 68;

const KB_DOWN = 40;
const KB_S = 83;

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
    if (this.controller.isKeyPressed(KB_LEFT) || this.controller.isKeyPressed(KB_A))
      this.x -= 2;
    if (this.controller.isKeyPressed(KB_RIGHT) || this.controller.isKeyPressed(KB_D))
      this.x += 2;
    if (this.controller.isKeyPressed(KB_UP) || this.controller.isKeyPressed(KB_W))
      this.y -= 2;
    if (this.controller.isKeyPressed(KB_DOWN) || this.controller.isKeyPressed(KB_S))
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
