export default class Position {
  static fromObj(obj) {
    return new Position(obj.x, obj.y);
  }
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  left() {
    return new Position(this.x - 1, this.y);
  }

  right() {
    return new Position(this.x + 1, this.y);
  }

  up() {
    return new Position(this.x, this.y - 1);
  }

  down() {
    return new Position(this.x, this.y + 1);
  }

  offset(x, y) {
    return new Position(this.x + x, this.y + y);
  }

  offset(x, y) {
    return new Position(this.x + x, this.y + y);
  }

}
