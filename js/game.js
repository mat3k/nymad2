import Player from './player';

export default class Game {
  constructor() {
    this.context = this.init_drawing();
    this.board = [
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
    ];
    this.player = new Player('Zoltung', 0, 0)
  }

  update() {}

  draw() {
    this.draw_board();
  }

  draw_board() {
    this.context.lineWidth = 1;
    this.context.strokeStyle = "red";

    this.board.forEach((row, y) => {
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
