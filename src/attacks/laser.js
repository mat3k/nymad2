import Attack from './attack';
import MathExt from '../math_ext';
import CanvasExt from '../canvas_ext';
import Line from '../line';

class Laser extends Attack {
  constructor(attacker, targetPosition) {
    super(attacker, targetPosition);

    this.coolDown = 0;
    this.dead = false;
    this.damagedCharacters = {};
    this.active = 0;
    this.attackPosition = attacker.arenaCenterPosition();

    setTimeout(() => { this.dead = true; }, 50);
  }

  update() {}

  draw(ctx) {
    ctx.lineWidth = 3;
    ctx.strokeStyle = '#FF0000';
    CanvasExt.line(ctx, this.attackPosition, this.targetPosition)

    ctx.lineWidth = 1;
  }

  affects(character) {
    if (this.isCharacterDamaged(character))
      return false;

    if (! this.inRange(character))
      return false;

    this.setDamagedCharacter(character);
    return true;
  }

  damage() {
    return MathExt.randomInt(1, 1);
  }

  // private

  isCharacterAffectable(character) {
    return !isCharacterDamaged(character);
  }

  isCharacterDamaged(character) {
    return this.damagedCharacters[character.id] === true;
  }

  setDamagedCharacter(character) {
    this.damagedCharacters[character.id] = true;
  }

  inRange(character) {
    return this.collideLines().find((aLine) => {
      return character.collideLines().find((cLine) => {
        return MathExt.collisionLineLine(aLine, cLine);
      });
    });
  }

  collideLines() {
    return [new Line(this.attackPosition, this.targetPosition)];
  }
}

export default Laser
