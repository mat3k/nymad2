import Position from '../position';
import Line from '../line';
import MathExt from '../math_ext';
import CanvasExt from '../canvas_ext';
import Attack from './attack';

class Slash extends Attack {
  constructor(attacker, targetPosition) {
    super(attacker, targetPosition);

    this.coolDown = 200;
    this.dead = false;
    this.length = 50;
    this.damage = 70 + MathExt.randomInt(1, 10);
    this.animAngle = 0;
    this.damagedCharacters = {};
    this.attackPosition = attacker.arenaCenterPosition();

    let pointsAngle = MathExt.pointsAngleRadian(this.attackPosition, this.targetPosition);
    this.points = [
      this.attackPosition,
      MathExt.lineEndPointAtAngle(this.attackPosition, this.length, pointsAngle + 0.5),
      MathExt.lineEndPointAtAngle(this.attackPosition, this.length, pointsAngle - 0.5)
    ];

    setTimeout(() => { this.dead = true; }, 150);
  }

  update(opponnets) {
    this.animAngle += 0.13;
  }

  draw(ctx) {
    this.drawCollisionHitBox(ctx);
    this.drawAttack(ctx);
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

  drawCollisionHitBox(ctx) {
    ctx.strokeStyle = "#FF00FF";
    CanvasExt.line(ctx, this.points[0], this.points[1]);
    CanvasExt.line(ctx, this.points[1], this.points[2]);
    CanvasExt.line(ctx, this.points[2], this.points[0]);
  }

  isCharacterDamaged(character) {
    return this.damagedCharacters[character.id] === true;
  }

  setDamagedCharacter(character) {
    this.damagedCharacters[character.id] = true;
  }

  drawAttack(ctx) {}

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
