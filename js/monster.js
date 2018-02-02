import SpriteImage from './sprite_image';

export default class Monster {
  constructor(data) {
    this.name = data.name;
    this.x = 30;
    this.y = 30;
    this.image = new SpriteImage(this.getSprite(), data.sx, data.sy);
    this.maxHP = data.maxHP;
    this.currentHP = this.maxHP;
  }

  getSprite() {
    var image = new Image(32, 32);
    image.src = 'build/assets/monsters-32x32.png';
    return image;
  }
}
