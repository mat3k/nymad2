import Attack from './attack';
import MathExt from '../math_ext';
import CanvasExt from '../canvas_ext';
import Line from '../line';

class Laser extends Attack {
  constructor(ctx, sourcePosition, targetPosition) {
    super(ctx, sourcePosition, targetPosition);

    this.coolDown = 0;
    this.dead = false;
    this.damagedCharacters = {};
    this.active = 0;
    this.damage = MathExt.randomInt(5, 15);

    setTimeout(() => { this.dead = true; }, 50);
  }

  update() {}

  draw() {
    this.ctx.lineWidth = 3;
    this.ctx.strokeStyle = '#FF0000';
    CanvasExt.line(this.ctx, this.sourcePosition, this.targetPosition)

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
    return [new Line(this.sourcePosition, this.targetPosition)];
  }
}

export default Laser
