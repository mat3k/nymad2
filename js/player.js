import Position from './position';
import SpriteImage from './sprite_image';

export default class Player {
  constructor(name, x, y) {
    this.name = name;
    this.image = new SpriteImage(this.getSprite(), 0, 5);
    this.position = new Position(x, y);
    this.map = 'demo_island';
    this.abilities = {};
    this.maxHP = 50;
    this.currentHP = 20;
    this.x = 200;
    this.y = 200;
  }

  getSprite() {
    var image = new Image(32, 32);
    image.src = 'build/assets/monsters-32x32.png';
    return image;
  }

  position() {
    return this.position;
  }

  hasAbility(name) {
    return this.abilities === true;
  }

  moveTo(destinationPosition) {
    this.position.setTo(destinationPosition);
  }

  moveToMap(mapId) {
    this.map = mapId;
  }
}
