import Position from './position';
import SpriteImage from './sprite_image';
import Equipment from './equipment';
import Attack from './attack';
import Character from './character';

class Player extends Character {
  constructor(name, x, y) {
    let width = 32;
    let height = 32;
    super(width, height, new Position.random(200, 200));

    this.name = name;
    this.image = new SpriteImage(this.getSprite(), 0, 5);
    this.position = new Position(x, y);
    this.map = 'demo_island';
    this.abilities = {};
    this.maxHP = 50;
    this.hp = this.maxHP;
    this.canAttack = true;
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
    if (! this.canAttack)
      return null;

    this.canAttack = false;
    setTimeout(() => { this.canAttack = true; }, 250);
    return (new Attack(ctx, this.arenaCenterPosition(), attackPosition));
  }

  draw(ctx) {
    this.image.draw(ctx, this.arenaPosition.x, this.arenaPosition.y);
  }

  arenaCenterPosition() {
    return this.arenaPosition.offset(this.width / 2, this.height / 2);
  }
}

export default Player
