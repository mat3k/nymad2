import Line from './line';
import CanvasExt from './canvas_ext';

class Character {
  constructor(width, height, position) {
    this.width = width;
    this.height = height;
    this.arenaPosition = position;
  }

  arenaCenterPosition() {
    return this.arenaPosition.offset(this.width / 2, this.height / 2);
  }

  collideLines() {
    return [
      new Line(this.arenaPosition, this.arenaPosition.offset(this.width, 0)),
      new Line(this.arenaPosition.offset(this.width, 0), this.arenaPosition.offset(this.width, this.height)),
      new Line(this.arenaPosition.offset(this.width, this.height), this.arenaPosition.offset(0, this.height)),
      new Line(this.arenaPosition.offset(0, this.height), this.arenaPosition)
    ];
  }

  draw(ctx) {
    this.image.draw(ctx, this.arenaPosition.x, this.arenaPosition.y);
    this.drawCollisionBox(ctx);
  }

  drawCollisionBox(ctx) {
    ctx.strokeStyle = '#FFFF00';
    CanvasExt.line(ctx, this.collideLines()[0].start, this.collideLines()[0].end);
    CanvasExt.line(ctx, this.collideLines()[1].start, this.collideLines()[1].end);
    CanvasExt.line(ctx, this.collideLines()[2].start, this.collideLines()[2].end);
    CanvasExt.line(ctx, this.collideLines()[3].start, this.collideLines()[3].end);
  }

  takeDamage(value) {
    this.hp = this.hp - value;

    if (this.hp < 0) {
      this.hp = 0;
    }
  }

  isDead() {
    return this.hp == 0;
  }
}

export default Character
