import Attack from './attack';
import MathExt from '../math_ext';

class Shout extends Attack {
  constructor(ctx, sourcePosition, targetPosition) {
    super(ctx, sourcePosition, targetPosition);

    this.coolDown = 600;
    this.maxRadius = 80;
    this.dead = false;
    this.damagedCharacters = {};
    this.radius = 5;
    this.counter = 0;
    this.damage = MathExt.randomInt(180, 250);
  }

  update() {
    if (this.dead)
      return;

    this.radius += 3.0;
    this.counter += 1;

    if (this.radius >= this.maxRadius) {
      this.dead = true;
    }
  }

  draw() {
    this.ctx.beginPath();
    this.ctx.lineWidth = 1;
    this.ctx.strokeStyle = 'rgb(76, ' + Math.floor(0 + 10 * this.counter) + ', 255)';
    this.ctx.arc(this.sourcePosition.x, this.sourcePosition.y, this.radius, 0, 2 * Math.PI);
    this.ctx.stroke();

    this.ctx.lineWidth = 1;
  }

  affects(character) {
    if (this.isCharacterDamaged(character))
      return false;

    if (! this.inRange(character))
      return false;

    this.setDamagedCharacter(character);
    return true;
  }

  isCharacterAffectable(character) {
    return !isCharacterDamaged(character);
  }

  // private

  isCharacterDamaged(character) {
    return this.damagedCharacters[character.id] === true;
  }

  setDamagedCharacter(character) {
    this.damagedCharacters[character.id] = true;
  }

  inRange(character) {
    return MathExt.collsionRectangleCircle(
      character.arenaPosition, character.width, character.height,
      this.sourcePosition, this.radius);
  }
}

export default Shout
