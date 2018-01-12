import Position from './position';

export default class Player {
  constructor(name, x, y) {
    this.name = name
    this.sprites = this.loadSprites();
    this.position = new Position(x, y)
    this.abilities = {};
  }

  sprites() {
    return this.sprites;
  }

  loadSprites() {
    var image = new Image(32, 32);
    image.src = 'build/assets/monsters-32x32.png'
    return image;
  }

  moveRight() {
    return this.x = this.x + 1;
  }

  moveLeft() {
    return this.x = this.x - 1;
  }

  moveUp() {
    return this.y = this.y - 1;
  }

  moveDown() {
    return this.y = this.y + 1;
  }

  position() {
    return this.position;
  }

  hasAbility(name) {
    return this.abilities === true;
  }
}
