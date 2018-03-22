import Attack from './attack';
import MathExt from '../math_ext';
import CanvasExt from '../canvas_ext';
import Line from '../line';

class BowShot extends Attack {
  constructor(attacker, targetPosition) {
    super(attacker, targetPosition);

    this.coolDown = 300;
    this.dead = false;
    this.attackPosition = attacker.arenaCenterPosition();
    this.damageModifier = 200;

    this.arrowAngle = MathExt.pointsAngleRadian(this.attackPosition, this.targetPosition);
    this.arrowLength = 20;
    this.arrowBegining = this.attackPosition;
    this.arrowEnd = MathExt.lineEndPointAtAngle(this.attackPosition, this.arrowLength, this.arrowAngle);

    setTimeout(() => { this.dead = true; }, 5000);
  }

  update() {
    this.arrowBegining = MathExt.lineEndPointAtAngle(this.arrowBegining, 3.5, this.arrowAngle);
    this.arrowEnd = MathExt.lineEndPointAtAngle(this.arrowBegining, this.arrowLength, this.arrowAngle);
  }

  draw(ctx) {
    if (this.dead)
      return false;

    ctx.strokeStyle = "#F0F0FF";
    ctx.lineWidth = 2;

    CanvasExt.line(ctx, this.arrowBegining, this.arrowEnd);
  }

  affects(character) {
    if (this.dead)
      return false;

    if (! this.inRange(character))
      return false;

    this.dead = true;
    return true;
  }

  isCharacterAffectable(character) {
    return !isCharacterDamaged(character);
  }

  damage() {
    const [min, max] = this.attacker.traits.dmg.map((dmg) => dmg * this.damageModifier / 100)
    return MathExt.randomInt(min, max);
  }

  // private


  inRange(character) {
    let arrowLine = new Line(this.arrowBegining, this.arrowEnd);

    return character.collideLines().find((cLine) => {
        return MathExt.collisionLineLine(arrowLine, cLine);
    });
  }
}

export default BowShot
