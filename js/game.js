import Player from './player';
import DemoIsland from './maps/demo_island';

export default class Game {
  constructor() {
    this.context = this.init_drawing();
    this.map = DemoIsland;
    this.player = new Player('Zoltung', 0, 0)
  }

  update() {}

  draw() {
    this.draw_world_map();
  }

  draw_world_map() {
    let board = this.map.board;
    this.context.lineWidth = 1;
    this.context.strokeStyle = "red";

    board.forEach((row, y) => {
      row.forEach((_, x) => {
        this.context.rect(x*50, y*50, x*50+50, y*50+50);
        this.context.stroke();
      });
    });
  }

  init_drawing() {
    return document.getElementById("game").getContext('2d')
  }
}
