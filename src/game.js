import Player from './player';
import Ticker from './ticker';
import mapsConfig from './db/maps';
import Map from './map';
import WorldMap from './world_map';
import InputController from './input_controller';
import Arena from './arena';
import FightSummary from './fight_summary';

class Game {
  constructor() {
    this.ctx = null;
    this.maps = this.loadMaps(mapsConfig);
    this.player = this.generatePlayer();

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
    this.ctx = this.getDrawingContext();
    this.scene = new WorldMap(this.ctx, this.maps, this.player, this.controller, (args) => this.eventDispatcher(args));
    this.ticker.loop();
  }

  getDrawingContext() {
    return document.getElementById('game').getContext('2d');
  }

  preloadImages(images) {
    images.forEach((imageUrl) => {
      let img = new Image;

      img.src = imageUrl;
      img.name = imageUrl;
    });
  }

  loadMaps(mapsConfig) {
    let map = {};

    mapsConfig.forEach((mapConfig) => {
      map[mapConfig.id] = Map.fromJSON(mapConfig);
    });
    return map;
  }

  showArena(event) {
    this.scene = new Arena(this.ctx, this.player, this.controller, event.opponents, (args) => this.eventDispatcher(args));
  }

  showWorldMap(event) {
    this.scene = new WorldMap(this.ctx, this.maps, this.player, this.controller, (args) => this.eventDispatcher(args));
  }

  showFightSummary(event) {
    this.scene = new FightSummary(this.ctx, event.fightResult, this.controller, (args) => this.eventDispatcher(args));
  }

  eventDispatcher(event) {
    if (event.type == 'monster_encounter')
      this.showArena(event);
    if (event.type == 'fight_end')
      this.showFightSummary(event)
    if (event.type == 'fight_summary_closed')
      this.showWorldMap(event)
  }

  generatePlayer() {
    return new Player('Zoltung', 3, 3,
      { hp: 300, dmg: [5, 10], def: 5, speed: 1.8 }
    );
  }
}

export default Game