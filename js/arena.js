import KB from './key_codes';
import Character from './character';
import DamageNumberEffect from './damage_number_effect';

class Arena {
  constructor(ctx, player, controller, opponents) {
    this.ctx = ctx;
    this.player = player;
    this.controller = controller;
    this.opponents = opponents;
    this.attacks = [];
    this.effects = [];
  }

  draw() {
    this.drawBoard();
    this.drawPlayer();
    this.drawOpponents();
    this.drawAttacks();
    this.drawEffects();
  }

  update() {
    this.updatePlayerPosition();
    this.updateOpponentsPosition();
    this.updateAttacks();
    this.collideWithAttack();
    this.updateEffects();

    if (this.controller.isButtonPressed()) {
      let attack = this.player.attack(this.ctx, this.controller.mousePressPosition());
      if (attack)
        this.attacks.push(attack);
    }
  }

  updatePlayerPosition() {
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
  }

  updateOpponentsPosition() {}

  drawBoard() {
    this.ctx.fillStyle = '#000000';
    this.ctx.rect(0, 0, 250, 250);
    this.ctx.fill();
  }

  drawPlayer() {
    this.player.draw(this.ctx);
    this.drawHPBar(this.player);
  }

  drawOpponents() {
    this.opponents.forEach((opponent) => {
      opponent.draw(this.ctx);
      this.drawHPBar(opponent);
    });
  }

  drawHPBar(character) {
    let maxHPLength = 32;
    let yOffset = 5;
    let currentHPLength = character.hp / character.maxHP * maxHPLength;

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
    this.attacks.forEach((attack) => attack.draw());
  }

  updateAttacks() {
    this.attacks.forEach((attack) => {
      attack.update();
    });

    this.attacks = this.attacks.filter((attack) => !attack.dead);
  }

  collideWithAttack() {
    let attacks = this.attacks.filter((attack) => !!attack.collisionType);

    attacks.forEach((attack) => {
      attack.dead = true;

      this.opponents.forEach((opponent) => {
        if (attack.collideWithCharacter(opponent)) {
          let damageValue = opponent.takeDamage(attack.damage);
          this.effects.push(new DamageNumberEffect(this.ctx, opponent, attack.damage))
        }
      });
    })
  }

  drawEffects() {
    this.effects.forEach((effect) => effect.draw());
  }

  updateEffects() {
    this.effects.forEach((effect) => effect.update());
    this.effects = this.effects.filter((effect) => !effect.dead);
  }
}

export default Arena
