import Position from './position';
import SpriteImage from './sprite_image';
import Equipment from './equipment';
import Character from './character';
import Traits from './traits';
import AttackManager from './attack_manager';

import Shout from './attacks/shout';
import Slash from './attacks/slash';
import Laser from './attacks/laser';

class Player extends Character {
  constructor(name, x, y, traitsData) {
    let width = 32;
    let height = 32;
    super(width, height, new Position.random(200, 200));

    this.name = name;
    this.image = new SpriteImage(this.getSprite(), 0, 5);
    this.position = new Position(x, y);
    this.map = 'demo_island';
    this.equipment = new Equipment();
    this.traits = new Traits(traitsData);
    this.attackManager = new AttackManager([Laser, Shout]);
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

  attack(ctx, attackType, targetPosition) {
    return this.attackManager.performAttack(ctx, attackType, this.arenaCenterPosition(), targetPosition);
  }

  draw(ctx) {
    this.image.draw(ctx, this.arenaPosition.x, this.arenaPosition.y);
    this.drawCollisionBox(ctx);
  }

  arenaCenterPosition() {
    return this.arenaPosition.offset(this.width / 2, this.height / 2);
  }
}

export default Player
