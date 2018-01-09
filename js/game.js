import Player from './player';
import DemoIsland from './maps/demo_island';
import draw_sprite from './utils';

const KB_LEFT = 37;
const KB_UP = 38;
const KB_RIGHT = 39;
const KB_DOWN = 40;

export default class Game {
  constructor() {
    this.map = new DemoIsland;
    this.player = new Player('Zoltung', 1, 1)

    this.lastFrameTimeMs = 0;
    this.maxFPS = 30;

    this.keys = [];
    this.moveAnimation = false;
  }

  update() {
    if (this.moveAnimation) {
      return true;
    }

    if (this.isKeyPressed(KB_LEFT)) {
      this.player.moveLeft();
      this.moveAnimation = true;
      setTimeout(() => { this.moveAnimation = false; }, 250);
    }

    if (this.isKeyPressed(KB_RIGHT)) {
      this.player.moveRight();
      this.moveAnimation = true;
      setTimeout(() => { this.moveAnimation = false; }, 250);
    }

    if (this.isKeyPressed(KB_UP)) {
      this.player.moveUp();
      this.moveAnimation = true;
      setTimeout(() => { this.moveAnimation = false; }, 250);
    }

    if (this.isKeyPressed(KB_DOWN)) {
      this.player.moveDown();
      this.moveAnimation = true;
      setTimeout(() => { this.moveAnimation = false; }, 250);
    }
  }

  draw() {
    this.ctx.clearRect(0, 0, 500, 500);
    this.draw_world_map();
    this.draw_player();
  }

  start() {
    this.ctx = this.getDrawingCtx();
    this.loop()
  }

  loop(timestamp) {
    if (timestamp < this.lastFrameTimeMs + (1000 / this.maxFPS)) {
        requestAnimationFrame(() => { this.loop() });
        return;
    }
    this.lastFrameTimeMs = timestamp;

    this.update();
    this.draw();
    requestAnimationFrame(() => { this.loop() });
  }

  getDrawingCtx() {
    return document.getElementById("game").getContext('2d')
  }

  draw_world_map() {
    let board = this.map.board();

    board.forEach((row, y) => {
      row.forEach((_, x) => {
        let sprite = this.map.board()[y][x];
        let sx = sprite[0];
        let sy = sprite[1];
        draw_sprite(this.ctx, this.map.sprites, sx, sy, x * 32, y * 32);
      });
    });
  }

  draw_player() {
    draw_sprite(this.ctx, this.player.sprites, 0, 5,
     32 * this.player.position().x,
     32 * this.player.position().y);
  }

  preloadImages(images) {
    images.forEach((imageUrl) => {
      let img = new Image

      img.src = imageUrl
      img.name = imageUrl
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
}
