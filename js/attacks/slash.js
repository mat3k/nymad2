import Position from '../position';
import Line from '../line';
import MathExt from '../math_ext';
import CanvasExt from '../canvas_ext';
import Attack from './attack';

class Slash extends Attack {
  constructor(ctx, sourcePosition, targetPosition) {
    super(ctx, sourcePosition, targetPosition);

    this.coolDown = 200;
    this.dead = false;
    this.length = 50;
    this.damage = 70 + MathExt.randomInt(1, 10);
    this.collisionType = null;
    this.animAngle = 0;
    this.damagedCharacters = {};

    let pointsAngle = MathExt.pointsAngleRadian(this.sourcePosition, this.targetPosition);
    this.points = [
      this.sourcePosition,
      MathExt.lineEndPointAtAngle(this.sourcePosition, this.length, pointsAngle + 0.5),
      MathExt.lineEndPointAtAngle(this.sourcePosition, this.length, pointsAngle - 0.5)
    ];

    setTimeout(() => { this.dead = true; }, 150);
    setTimeout(() => { this.collisionType = 'Swing'; }, 75);
  }

  update(opponnets) {
    this.animAngle += 0.13;
    if (!this.collisionType)
      return false;
  }

  draw() {
    this.drawCollisionHitBox();
    this.drawAttack();
  }

  affects(character) {
    if (this.dead)
      return false;

    if (this.isCharacterDamaged(character))
      return false;

    if (! this.inRange(character))
      return false;

    this.setDamagedCharacter(character);

    return true;
  }

  // private

  drawCollisionHitBox() {
    this.ctx.strokeStyle = "#FF00FF";
    CanvasExt.line(this.ctx, this.points[0], this.points[1]);
    CanvasExt.line(this.ctx, this.points[1], this.points[2]);
    CanvasExt.line(this.ctx, this.points[2], this.points[0]);
  }

  isCharacterDamaged(character) {
    return this.damagedCharacters[character.id] === true;
  }

  setDamagedCharacter(character) {
    this.damagedCharacters[character.id] = true;
  }

  drawAttack() {}

  collideLines() {
    return [
      new Line(this.points[0], this.points[1]),
      new Line(this.points[1], this.points[2]),
      new Line(this.points[2], this.points[0])
    ];
  }

  inRange(character) {
    return this.collideLines().find((aLine) => {
      return character.collideLines().find((cLine) => {
        return MathExt.collisionLineLine(aLine, cLine);
      });
    });
  }

}

export default Slash
