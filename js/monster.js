import SpriteImage from './sprite_image';
import Position from './position';
import Character from './character';

class Monster extends Character {
  constructor(data) {
    let width = 32;
    let height = 32;
    super(width, height, new Position.random(200, 200));

    this.name = data.name;
    this.image = new SpriteImage(this.getSprite(), data.sx, data.sy);
    this.maxHP = data.maxHP;
    this.hp = this.maxHP;
  }

  getSprite() {
    var image = new Image(32, 32);
    image.src = 'assets/monsters-32x32.png';
    return image;
  }
}

export default Monster
