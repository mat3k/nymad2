import Player from './player';
import draw_sprite from './utils';
import Ticker from './ticker';
import Position from './position';
import mapsConfig from './db/maps';
import Map from './map';

const KB_LEFT = 37;
const KB_A = 65;

const KB_UP = 38;
const KB_W = 87;

const KB_RIGHT = 39;
const KB_D = 68;

const KB_DOWN = 40;
const KB_S = 83;


export default class Game {
  constructor() {
    this.maps = this.loadMaps(mapsConfig);
    this.player = new Player('Zoltung', 3, 3);

    this.ticker = new Ticker(() =>  { this.update() }, () =>  { this.draw() });

    this.keys = [];
    this.moveAnimation = false;

    this.state = 'world_map' // ['world_map', 'arena']
  }

  update() {
    if (this.state == 'world_map')
      this.updateWorldMap();
    else if (this.state == 'arena')
      this.updateArena();
  }

  draw() {
    if (this.state == 'world_map')
      this.drawWorldMap();
    else if (this.state == 'arena')
      this.drawArena();

  }

  updateWorldMap() {
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

  start() {
    this.ctx = this.getDrawingCtx();
    this.ticker.loop();
  }

  getDrawingCtx() {
    return document.getElementById("game").getContext('2d');
  }

  drawWorldMap() {
    this.drawMapBoard()
    this.drawMapPlayer();
  }

  drawMapBoard() {
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

  drawMapPlayer() {
    draw_sprite(this.ctx, this.player.sprites, 0, 5, 32 * 3, 32 * 3);
  }

  preloadImages(images) {
    images.forEach((imageUrl) => {
      let img = new Image;

      img.src = imageUrl;
      img.name = imageUrl;
    })
  }

  addKey(code) {
    this.keys[code] = true;
  }

  removeKey(code) {
    this.keys[code] = false;
  }

  isKeyPressed(code) {
    return this.keys[code];
  }

  loadMaps(mapsConfig) {
    let map = {};

    mapsConfig.forEach((mapConfig) => {
      map[mapConfig.id] = Map.fromJSON(mapConfig);
    });
    return map;
  }

  map() {
    return this.maps[this.player.map];
  }

  clearScreen() {
    this.ctx.clearRect(0, 0, 500, 500);
  }

  startFight() {}
}
