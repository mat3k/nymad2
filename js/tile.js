export default class Tile {
  constructor(type, sx, sy) {
    this.type = type;
    this.sprite = [sx, sy]
  }

  sprite() {
    return this.sprite;
  }

  isWalkable() {
    return this.type !== 'water' && this.type !== 'empty' ;
  }

  static water(sx, sy) {
    return new Tile('water', sx, sy);
  }

  static sand(sx, sy) {
    return new Tile('sand', sx, sy);
  }

  static empty() {
    return new Tile('empty', 0, 0);
  }
}