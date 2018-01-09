import Player from './player';
import DemoIsland from './maps/demo_island';
import draw_sprite from './utils';

export default class Game {
  constructor() {
    this.map = new DemoIsland;
    this.player = new Player('Zoltung', 1, 1)

    this.lastFrameTimeMs = 0;
    this.maxFPS = 30;
  }

  update() {
    this.player.moveRight();
  }

  draw() {
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
}
