import Player from './player';
import Ticker from './ticker';
import mapsConfig from './db/maps';
import Map from './map';
import WorldMap from './world_map';
import InputController from './input_controller';
import Arena from './arena';
import FightSummary from './fight_summary';
import ArenaOrganizer from './arena_organizer';
import FPSMeter from './fps_meter';
import Equipment from './scenes/equipment';

class Game {
  constructor(gameContainer) {
    this.ctx = null;
    this.maps = this.loadMaps(mapsConfig);
    this.player = this.generatePlayer();

    this.ticker = new Ticker(() =>  this.update(), () => this.draw());
    this.controller = new InputController(gameContainer.offsetLeft, gameContainer.offsetTop);
  }

  update() {
    this.scene.update();
  }

  draw() {
    this.scene.draw();
    this.fpsMeter.draw();
  }

  start() {
    this.ctx = this.getDrawingContext();
    this.fpsMeter = new FPSMeter(this.ctx);
    this.scene = new WorldMap(this.ctx, this.maps, this.player, this.controller, (args) => this.eventDispatcher(args));
    this.ticker.loop();
  }

  getDrawingContext() {
    return document.getElementById('game').getContext('2d', { alpha: false });
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
    let arenaOrganization = new ArenaOrganizer();
    let formation = arenaOrganization.generateFormation();

    this.player.setArenaPosition(formation.playerPosition);
    this.scene = new Arena(this.ctx, this.player, this.controller, formation.opponents, (args) => this.eventDispatcher(args));
  }

  showWorldMap(event) {
    this.scene = new WorldMap(this.ctx, this.maps, this.player, this.controller, (args) => this.eventDispatcher(args));
  }

  showFightSummary(event) {
    this.scene = new FightSummary(this.ctx, event.fightResult, this.controller, (args) => this.eventDispatcher(args));
  }

  showEquipment(event) {
   this.scene = new Equipment(this.ctx, this.player, this.controller, (args) => this.eventDispatcher(args));
  }

  eventDispatcher(event) {
    if (event.type == 'monster_encounter')
      this.showArena(event);
    if (event.type == 'fight_end')
      this.showFightSummary(event)
    if (event.type == 'world_map')
      this.showWorldMap(event)
    if (event.type == 'equipment')
      this.showEquipment(event)
  }

  generatePlayer() {
    return new Player('Zoltung', 3, 3,
      { hp: 300, dmg: [1, 2], def: 5, speed: 2 }
    );
  }
}

export default Game
