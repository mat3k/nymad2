export default class Position {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  x() { this.x; }
  y() { this.y; }

  left() {
    return new Position(this.x - 1, this.y)
  }

  right() {
    return new Position(this.x + 1, this.y)
  }

  up() {
    return new Position(this.x, this.y - 1)
  }

  down() {
    return new Position(this.x, this.y + 1)
  }

  setTo(position) {
    this.x = position.x;
    this.y = position.y
  }

}
