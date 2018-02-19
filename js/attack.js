import Position from './position';
import Line from './line';
import MathExt from './math_ext';
import CanvasExt from './canvas_ext';

export default class Attack {
  constructor(ctx, sourcePosition, targetPosition) {
    this.ctx = ctx;
    this.sourcePosition = sourcePosition;
    this.targetPosition = targetPosition;
    this.finished = false;
    this.length = 50;
    this.damageDealed = false;
    this.damage = 50;

    let pointsAngle = MathExt.pointsAngleRadian(this.sourcePosition, this.targetPosition);
    this.points = [
      this.sourcePosition,
      MathExt.lineEndPointAtAngle(this.sourcePosition, this.length, pointsAngle + 0.5),
      MathExt.lineEndPointAtAngle(this.sourcePosition, this.length, pointsAngle - 0.5)
    ];

    setTimeout(() => { this.finished = true; }, 150);
  }

  update(opponnets) {
    if (this.damageDealed) {
      return false;
    }

    opponnets.forEach((opponnet) => {
      if (this.collideWithCharacter(opponnet))
        opponnet.takeDamage(this.damage);
    });

    this.damageDealed = true;
  }

  draw() {
    this.ctx.strokeStyle = "#FF00FF";
    CanvasExt.line(this.ctx, this.points[0], this.points[1]);
    CanvasExt.line(this.ctx, this.points[1], this.points[2]);
    CanvasExt.line(this.ctx, this.points[2], this.points[0]);
  }

  collideLines() {
    return [
      new Line(this.points[0], this.points[1]),
      new Line(this.points[1], this.points[2]),
      new Line(this.points[2], this.points[0])
    ];
  }

  collideWithCharacter(character) {
    return this.collideLines().find((aLine) => {
      return character.collideLines().find((cLine) => {
        return MathExt.linesCollide(aLine, cLine);
      });
    });
  }
}
