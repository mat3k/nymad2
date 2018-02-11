import Position from './position';
import SpriteImage from './sprite_image';
import Attack from './attack';

export default class Player {
  constructor(name, x, y) {
    this.name = name;
    this.image = new SpriteImage(this.getSprite(), 0, 5);
    this.position = new Position(x, y);
    this.map = 'demo_island';
    this.abilities = {};
    this.maxHP = 50;
    this.currentHP = 20;
    this.arenaPosition = new Position(200, 200);
    this.width = 32;
    this.height = 32;
    this.canAttack = true;
    this.attacks = [];
  }

  getSprite() {
    var image = new Image(32, 32);
    image.src = 'build/assets/monsters-32x32.png';
    return image;
  }

  position() {
    return this.position;
  }

  moveTo(destinationPosition) {
    this.position.setTo(destinationPosition);
  }

  moveToMap(mapId) {
    this.map = mapId;
  }

  attack(ctx) {
    this.canAttack = false;
    this.attacks.push(new Attack(ctx, this.arenaPosition));
    setTimeout(() => { this.canAttack = true; }, 250);
  }

  updateAttacks() {
    this.attacks.forEach((attack) => {
      attack.update();
    });

    this.attacks = this.attacks.filter((attack) => {
      return !attack.finished;
    });
  }

  drawAttacks() {
    this.attacks.forEach((attack) => {
      attack.draw();
    });
  }
}
