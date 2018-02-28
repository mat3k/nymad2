import KB from './key_codes';
import Character from './character';
import DamageNumberEffect from './damage_number_effect';
import MathExt from './math_ext';

class Arena {
  constructor(ctx, player, controller, opponents, eventDispatcher) {
    this.ctx = ctx;
    this.player = player;
    this.controller = controller;
    this.opponents = opponents;
    this.attacks = [];
    this.effects = [];
    this.eventDispatcher = eventDispatcher;
  }

  draw() {
    this.drawBoard();
    this.drawPlayer();
    this.drawOpponents();
    this.drawAttacks();
    this.drawEffects();
  }

  update() {
    if (this.fightEnd())
      return this.eventDispatcher({type: 'fight_end', fightResult: this.fightResult()});

    this.updatePlayerPosition();
    this.updateOpponentsPosition();
    this.updateAttacks();
    this.affectAttacks()
    this.updateEffects();

    let attack = null;
    if (this.controller.isButtonPressed())
      attack = this.player.attack(this.ctx, 'attack1', this.controller.mousePressPosition());
    if (this.controller.isKeyPressed(KB.SPACEBAR))
      attack = this.player.attack(this.ctx, 'attack2', this.controller.mousePressPosition());

    if (attack)
      this.attacks.push(attack);
  }

  updatePlayerPosition() {
    let moveKeys = [KB.A, KB.D, KB.W, KB.S];
    let pressedMoveKeys = this.controller.keysPressed().filter((key) => moveKeys.includes(parseInt(key)));

    if (pressedMoveKeys.length === 0)
      return;

    this.applyPlayerMove(pressedMoveKeys);
  }

  applyPlayerMove(keys) {
    keys.forEach((key) => {
      let basePosition = this.player.arenaPosition;
      let destinationPosition = basePosition;

      if (key == KB.A)
        destinationPosition = basePosition.offset(-1, 0);
      if (key == KB.D)
        destinationPosition = basePosition.offset(1, 0);
      if (key == KB.W)
        destinationPosition = basePosition.offset(0, -1);
      if (key == KB.S)
        destinationPosition = basePosition.offset(0, 1);

      if (! this.collideWithOpponents(destinationPosition))
        this.player.arenaPosition = destinationPosition;
    });
  }

  updateOpponentsPosition() {}

  drawBoard() {
    this.ctx.fillStyle = '#000000';
    this.ctx.fillRect(0, 0, 250, 250);
  }

  drawPlayer() {
    this.player.draw(this.ctx);
    this.drawHPBar(this.player);
  }

  drawOpponents() {
    this.opponents.forEach((opponent) => {
      opponent.draw(this.ctx);
      this.drawHPBar(opponent);
    });
  }

  drawHPBar(character) {
    let maxHPLength = 32;
    let yOffset = 5;
    let currentHPLength = character.hp / character.maxHP * maxHPLength;

    this.ctx.fillStyle = '#FF0000';
    this.ctx.fillRect(character.arenaPosition.x, character.arenaPosition.y - yOffset, maxHPLength, 2);

    this.ctx.fillStyle = '#00FF00';
    this.ctx.fillRect(character.arenaPosition.x, character.arenaPosition.y - yOffset, currentHPLength, 2);
  }

  collideWithOpponents(position) {
    return this.opponents.find((opponent) => {
      return MathExt.collisionRectangleRectangle(
        this.player.arenaPosition, this.player.width, this.player.height,
        opponent.arenaPosition, opponent.width, opponent.height
      );
    });
  }

  drawAttacks() {
    this.attacks.forEach((attack) => attack.draw());
  }

  updateAttacks() {
    this.attacks.forEach((attack) => attack.update());
    this.attacks = this.attacks.filter((attack) => !attack.dead);
  }

  affectAttacks() {
    this.attacks.forEach((attack) => {
      this.opponents.forEach((opponent) => {
        if (attack.affects(opponent)) {
          let damageValue = opponent.takeDamage(attack.damage);
          this.effects.push(new DamageNumberEffect(this.ctx, opponent, attack.damage));
        }
      });
    });
  }

  drawEffects() {
    this.effects.forEach((effect) => effect.draw());
  }

  updateEffects() {
    this.effects.forEach((effect) => effect.update());
    this.effects = this.effects.filter((effect) => !effect.dead);
  }

  fightEnd() {
    if (this.player.isDead())
      return true;

    let allOpponentsDead = this.opponents.every((opponent) => opponent.isDead());
    if (allOpponentsDead)
      return true;

    return false;
  }

  // return false
  // return 1 : win
  // return -1 : lose
  fightResult() {
    if (this.player.isDead())
      return -1;

    let allOpponentsDead = this.opponents.every((opponent) => opponent.isDead());
    if (allOpponentsDead) {
      return 1;
    }

    return false;
  }
}

export default Arena
