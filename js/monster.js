import SpriteImage from './sprite_image';
import Position from './position';

export default class Monster {
  constructor(data) {
    this.name = data.name;
    this.arenaPosition = new Position(30, 30);
    this.image = new SpriteImage(this.getSprite(), data.sx, data.sy);
    this.maxHP = data.maxHP;
    this.currentHP = this.maxHP;
    this.width = 32;
    this.height = 32;
  }

  getSprite() {
    var image = new Image(32, 32);
    image.src = 'build/assets/monsters-32x32.png';
    return image;
  }
}
