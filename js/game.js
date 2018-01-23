import Player from './player';
import draw_sprite from './utils';
import Ticker from './ticker';
import Position from './position';
import mapsConfig from './db/maps';
import Map from './map';
import WorldMap from './world_map';
import InputController from './input_controller';

export default class Game {
  constructor() {
    this.ctx = null;
    this.maps = this.loadMaps(mapsConfig);
    this.player = new Player('Zoltung', 3, 3);

    this.ticker = new Ticker(() =>  this.update(), () => this.draw());

    this.controller = new InputController();
  }

  update() {
    this.scene.update();
  }

  draw() {
    this.scene.draw();
  }

  start() {
    this.ctx = this.getDrawingCtx();
    this.scene = new WorldMap(this.ctx, this.maps, this.player, this.controller);
    this.ticker.loop();
  }

  getDrawingCtx() {
    return document.getElementById("game").getContext('2d');
  }

  preloadImages(images) {
    images.forEach((imageUrl) => {
      let img = new Image;

      img.src = imageUrl;
      img.name = imageUrl;
    })
  }

  loadMaps(mapsConfig) {
    let map = {};

    mapsConfig.forEach((mapConfig) => {
      map[mapConfig.id] = Map.fromJSON(mapConfig);
    });
    return map;
  }

  clearScreen() {
    this.ctx.clearRect(0, 0, 500, 500);
  }

  startFight() {
    this.scene = new Arena(this.ctx);
  }
}
