import SpriteImage from './sprite_image';
import Position from './position';
import Character from './character';
import Traits from './traits';
import AttackManager from './attack_manager';

import Slash from './attacks/slash';

class Monster extends Character {
  constructor(data) {
    let width = 32;
    let height = 32;
    super(width, height, new Position.random(200, 200));

    this.name = data.name;
    this.image = new SpriteImage(this.getSprite(), data.sx, data.sy);
    this.traits = new Traits(data.traits);
    this.attackManager = new AttackManager([Slash]);
  }

  getSprite() {
    var image = new Image(32, 32);
    image.src = 'assets/monsters-32x32.png';
    return image;
  }
}

export default Monster
