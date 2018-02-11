import KB from './key_codes';
import Character from './character';

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
    this.drawAttacks();
  }

  update() {
    let destination = this.player.arenaPosition;

    if (this.controller.isKeyPressed(KB.LEFT) || this.controller.isKeyPressed(KB.A))
      destination = destination.left();
    if (this.controller.isKeyPressed(KB.RIGHT) || this.controller.isKeyPressed(KB.D))
      destination = destination.right();
    if (this.controller.isKeyPressed(KB.UP) || this.controller.isKeyPressed(KB.W))
      destination = destination.up();
    if (this.controller.isKeyPressed(KB.DOWN) || this.controller.isKeyPressed(KB.S))
      destination = destination.down();


    if (! this.collideWithOpponents(destination)) {
      this.player.arenaPosition = destination;
    }

    this.updateAttack();

    if (this.controller.isButtonPressed() && this.player.canAttack) {
      this.player.attack(this.ctx);
    }
  }

  drawBoard() {
    this.ctx.fillStyle = '#000000';
    this.ctx.rect(0, 0, 250, 250);
    this.ctx.fill();
  }

  drawPlayer() {
    this.player.image.draw(this.ctx, this.player.arenaPosition.x, this.player.arenaPosition.y);
    this.drawHPBar(this.player);
  }

  drawOpponents() {
    this.opponents.forEach((opponent) => {
      opponent.image.draw(this.ctx, opponent.arenaPosition.x, opponent.arenaPosition.y);
      this.drawHPBar(opponent);
    });
  }

  drawHPBar(character) {
    let maxHPLength = 32;
    let yOffset = 5;
    let currentHPLength = character.currentHP / character.maxHP * maxHPLength;

    this.ctx.fillStyle = '#FF0000';
    this.ctx.fillRect(character.arenaPosition.x, character.arenaPosition.y - yOffset, maxHPLength, 2);

    this.ctx.fillStyle = '#00FF00';
    this.ctx.fillRect(character.arenaPosition.x, character.arenaPosition.y - yOffset, currentHPLength, 2);
  }

  collideWithOpponents(position) {
    let player = new Character(this.player.width, this.player.height, position);
    return this.opponents.find((opponent) => {
      if (this.collide(player, opponent)) {
        return true;
      }
    });
  }

  collide(charA, charB) {
    return charA.arenaPosition.x < charB.arenaPosition.x + charB.width &&
       charA.arenaPosition.x + charA.width > charB.arenaPosition.x &&
       charA.arenaPosition.y < charB.arenaPosition.y + charB.height &&
       charA.height + charA.arenaPosition.y > charB.arenaPosition.y;
  }

  drawAttacks() {
    this.player.drawAttacks();
  }

  updateAttack() {
    this.player.updateAttacks();
  }

}
