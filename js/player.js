export default class Player {
  constructor(name, x, y) {
    this.name = name
    this.sprites = this.loadSprites();
    this.x = x;
    this.y = y;
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

  }
}
