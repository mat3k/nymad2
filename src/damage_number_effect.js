import Position from './position';

class DamageNumberEffect {
  constructor(ctx, character, damage) {
    this.ctx = ctx;
    this.character = character;
    this.damage = damage;
    this.position = new Position(character.arenaPosition.x, character.arenaPosition.y);
    this.dead = false;
    this.maxHeight = character.arenaPosition.y - 35;
  }

  draw() {
    this.ctx.font = "12px Arial";
    this.ctx.fillText(this.damage, this.position.x, this.position.y);
  }

  update() {
    this.position = this.position.offset(0, -2);

    if (this.position.y < this.maxHeight) {
      this.dead = true;
    }
  }
}

export default DamageNumberEffect
