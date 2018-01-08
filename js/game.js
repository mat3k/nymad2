import Player from './player';
import DemoIsland from './maps/demo_island';
import draw_sprite from './utils';

export default class Game {
  constructor() {
    this.context = this.init_drawing();
    this.map = new DemoIsland;
    this.player = new Player('Zoltung', 0, 0)
  }

  update() {}

  draw() {
    this.draw_world_map();
  }

  draw_world_map() {
    let board = this.map.board();
    this.context.lineWidth = 1;
    this.context.strokeStyle = "red";

    board.forEach((row, y) => {
      row.forEach((_, x) => {
        let sprite = this.map.board()[y][x];
        let sx = sprite[0];
        let sy = sprite[1];
        draw_sprite(this.context, this.map.sprites, sx, sy, x * 32, y * 32);
      });
    });
  }

  init_drawing() {
    return document.getElementById("game").getContext('2d')
  }
}
