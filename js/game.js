import Player from './player';
import DemoIsland from './maps/demo_island';
import draw_sprite from './utils';

export default class Game {
  constructor() {
    this.map = new DemoIsland;
    this.player = new Player('Zoltung', 1, 1)
  }

  update() {}

  draw() {
    this.draw_world_map();
    this.draw_player();
  }

  start() {
    this.context = this.init_drawing();
    this.draw()
  }

  init_drawing() {
    return document.getElementById("game").getContext('2d')
  }

  draw_world_map() {
    let board = this.map.board();

    board.forEach((row, y) => {
      row.forEach((_, x) => {
        let sprite = this.map.board()[y][x];
        let sx = sprite[0];
        let sy = sprite[1];
        draw_sprite(this.context, this.map.sprites, sx, sy, x * 32, y * 32);
      });
    });
  }

  draw_player() {
    draw_sprite(this.context, this.player.sprites, 0, 5, 32, 32);
  }

  preloadImages(images) {
    images.forEach((imageUrl) => {
      let img = new Image

      img.src = imageUrl
      img.name = imageUrl
    })
  }
}
