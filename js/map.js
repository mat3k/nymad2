import Tile from './tile';

export default class Map {
  static fromJSON(config) {
    return new Map(config.name, config.width, config.height, config.spritesUrl, config.board);
  }

  constructor(name, width, height, spritesURL, board) {
    this.name = name;
    this.width = width;
    this.height = height;
    this.sprites = this.loadSprites(spritesURL);
    this.board = this.buildBoard(board);
  }

  loadSprites(url) {
    let image = new Image(32, 32);
    image.src = 'build/assets/wiptiles.png'
    return image;
  }

  buildBoard(boardArray) {
    return boardArray.map((row) => {
      return row.map((tile) => {
        return new Tile(tile.type, tile.sx, tile.sy)
      })
    });
  }

  getTile(x, y) {
    if (x < 0 || y < 0 || x > this.width - 1 || y > this.height - 1)
      return Tile.empty();
    else
      return this.board[y][x];
  }
}
