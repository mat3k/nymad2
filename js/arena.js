import KB from './key_codes';

export default class Arena {
  constructor(ctx, player, controller, opponents) {
    this.ctx = ctx;
    this.player = player;
    this.controller = controller;
    this.state = 'none';
    this.opponents = opponents;
  }

  draw() {
    this.drawBoard();
    this.drawPlayer();
    this.drawOpponents();

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
      this.player.x -= 2;
    if (this.controller.isKeyPressed(KB.RIGHT) || this.controller.isKeyPressed(KB.D))
      this.player.x += 2;
    if (this.controller.isKeyPressed(KB.UP) || this.controller.isKeyPressed(KB.W))
      this.player.y -= 2;
    if (this.controller.isKeyPressed(KB.DOWN) || this.controller.isKeyPressed(KB.S))
      this.player.y += 2;

    if (this.controller.isButtonPressed()) {
      if (this.state == 'none')
        this.state = 'attack'
    }
  }

  drawBoard() {
    this.ctx.fillStyle = '#000000';
    this.ctx.rect(0, 0, 250, 250);
    this.ctx.fill();
  }

  drawPlayer() {
    this.player.image.draw(this.ctx, this.player.x, this.player.y);
    this.drawHPBar(this.player);
  }

  drawPlayerAttack() {
    let length = 1.5;
    this.ctx.strokeStyle = '#FFFFFF';
    this.ctx.beginPath();
    this.ctx.arc(this.player.x + 16, this.player.y + 16, 25, 1.25 * Math.PI, length * Math.PI);
    this.ctx.stroke();
    this.attack = false;
  }

  drawOpponents() {
    this.opponents.forEach((opponent) => {
      opponent.image.draw(this.ctx, opponent.x, opponent.y);
      this.drawHPBar(opponent);
    });
  }

  drawHPBar(character) {
    let maxHPLength = 32;
    let yOffset = 5;
    let currentHPLength = character.currentHP / character.maxHP * maxHPLength;

    this.ctx.fillStyle = '#FF0000';
    this.ctx.fillRect(character.x, character.y - yOffset, maxHPLength, 2);

    this.ctx.fillStyle = '#00FF00';
    this.ctx.fillRect(character.x, character.y - yOffset, currentHPLength, 2);
  }


}
