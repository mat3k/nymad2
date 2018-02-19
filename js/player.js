import Position from './position';
import SpriteImage from './sprite_image';
import Equipment from './equipment';
import Attack from './attack';
import Character from './character';

export default class Player extends Character{
  constructor(name, x, y) {
    let width = 32;
    let height = 32;
    let arenaPosition = new Position(200, 200);
    super(width, height, arenaPosition)

    this.name = name;
    this.image = new SpriteImage(this.getSprite(), 0, 5);
    this.position = new Position(x, y);
    this.map = 'demo_island';
    this.abilities = {};
    this.maxHP = 50;
    this.hp = this.maxHP;
    this.canAttack = true;
    this.attacks = [];
    this.equipment = new Equipment();
  }

  getSprite() {
    var image = new Image(32, 32);
    image.src = 'assets/monsters-32x32.png';
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

  attack(ctx, attackPosition) {
    this.canAttack = false  ;
    this.attacks.push(new Attack(ctx, this.arenaCenterPosition(), attackPosition));
    setTimeout(() => { this.canAttack = true; }, 250);
  }

  updateAttacks(opponnents) {
    this.attacks.forEach((attack) => {
      attack.update(opponnents);
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
