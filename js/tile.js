class Tile {
  constructor(type, spriteImage, options = {}) {
    this.type = type;
    this.image = spriteImage;
    this.options = options;
  }

  isWalkable() {
    return this.type !== 'water' && this.type !== 'empty';
  }
}

export default Tile
