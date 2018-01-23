import Position from './position';
import draw_sprite from './utils';

const KB_LEFT = 37;
const KB_A = 65;

const KB_UP = 38;
const KB_W = 87;

const KB_RIGHT = 39;
const KB_D = 68;

const KB_DOWN = 40;
const KB_S = 83;

export default class WorldMap {
  constructor(ctx, maps, player, keys) {
    this.ctx = ctx;
    this.maps = maps;
    this.player = player;
    this.keys = keys;

    this.moveAnimation = false;
  }

  draw() {
    this.drawBoard();
    this.drawPlayer();
  }

  update() {
    this.updatePlayerPosition();
  }

  drawBoard() {
    for (let y = -3; y <= 3; y++) {
      for (let x = -3; x <= 3; x++) {
        let position = new Position(this.player.position.x + x, this.player.position.y + y);
        let tile = this.map().getTile(position);
        let sx = tile.sprite[0];
        let sy = tile.sprite[1];
        draw_sprite(this.ctx, this.map().sprites, sx, sy, (x + 3) * 32, (y + 3) * 32);
      }
    }
  }

  drawPlayer() {
    draw_sprite(this.ctx, this.player.sprites, 0, 5, 32 * 3, 32 * 3);
  }

  map() {
    return this.maps[this.player.map];
  }

  updatePlayerPosition() {
    if (this.moveAnimation)
      return true;

    let destinationPosition = null;
    if (this.isKeyPressed(KB_LEFT) || this.isKeyPressed(KB_A))
      destinationPosition = this.player.position.left();
    if (this.isKeyPressed(KB_RIGHT) || this.isKeyPressed(KB_D))
      destinationPosition = this.player.position.right();
    if (this.isKeyPressed(KB_UP) || this.isKeyPressed(KB_W))
      destinationPosition = this.player.position.up();
    if (this.isKeyPressed(KB_DOWN) || this.isKeyPressed(KB_S))
      destinationPosition = this.player.position.down();

    if (!destinationPosition)
      return true

    if (this.map().isWalkablePosition(destinationPosition)) {

      if (this.map().isPassagePosition(destinationPosition)) {
        let destination = this.map().getPassageDestination(destinationPosition);

        this.player.moveTo(destination.position);
        this.player.moveToMap(destination.mapId);
      }
      else {
        this.player.moveTo(destinationPosition);
      }

      this.moveAnimation = true;
      setTimeout(() => { this.moveAnimation = false; }, 250);
    }
  }

  isKeyPressed(code) {
    return this.keys[code];
  }
}
