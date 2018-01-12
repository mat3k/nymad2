import Tile from '../tile';

export default class DemoIsland {
  constructor() {
    this.name = 'Demo Island';
    this.width = 6;
    this.height = 6;
    this.sprites = this.getSprites();
    this.board = this.getBoard();
  }

  getBoard() {
    return [
      [Tile.water(0, 2), Tile.water(1, 2), Tile.water(1, 2), Tile.water(1, 2), Tile.water(1, 2), Tile.water(2, 2)],
      [Tile.water(0, 3), Tile.sand(1, 3), Tile.sand(1, 3), Tile.sand(1, 3), Tile.sand(1, 3), Tile.water(2, 3)],
      [Tile.water(0, 3), Tile.sand(1, 3), Tile.sand(1, 3), Tile.sand(1, 3), Tile.sand(1, 3), Tile.water(2, 3)],
      [Tile.water(0, 3), Tile.sand(1, 3), Tile.sand(1, 3), Tile.sand(1, 3), Tile.sand(1, 3), Tile.water(2, 3)],
      [Tile.water(0, 3), Tile.sand(1, 3), Tile.sand(1, 3), Tile.sand(1, 3), Tile.sand(1, 3), Tile.water(2, 3)],
      [Tile.water(0, 4), Tile.water(1, 4), Tile.water(1, 4), Tile.water(1, 4), Tile.water(1, 4), Tile.water(2, 4)],
    ];
  }

  getSprites() {
    var image = new Image(32, 32);
    image.src = 'build/assets/wiptiles.png'
    return image;
  }

  getTile(x, y) {
    if (x < 0 || y < 0 || x > this.width - 1 || y > this.height - 1)
      return Tile.empty();
    else
      return this.board[y][x];
  }
};
