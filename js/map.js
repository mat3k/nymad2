import Tile from './tile';
import Position from './position';
import SpriteImage from './sprite_image';
import BlackSquare from './black_square';

export default class Map {
  static fromJSON(config) {
    return new Map(config.name, config.width, config.height, config.spriteUrl, config.board);
  }

  constructor(name, width, height, spriteURL, board) {
    this.name = name;
    this.width = width;
    this.height = height;
    this.sprite = this.loadSprite(spriteURL);
    this.board = this.buildBoard(board);

    this.walkableTypes = ['grass', 'sand', 'door', 'rocks']
  }

  loadSprite(url) {
    let image = new Image(32, 32);
    image.src = url;
    return image;
  }

  buildBoard(boardArray) {
    return boardArray.map((row) => {
      return row.map((tile) => {
        return new Tile(tile.type, new SpriteImage(this.sprite, tile.sx, tile.sy), tile.options || {});
      });
    });
  }

  getTile(position) {
    if (position.x < 0 || position.y < 0 || position.x > this.width - 1 || position.y > this.height - 1)
      return new Tile('empty', new BlackSquare());
    else
      return this.board[position.y][position.x];
  }

  isWalkablePosition(position) {
    return this.walkableTypes.includes(this.getTile(position).type);
  }

  isPassagePosition(position) {
    return this.getTile(position).type == 'door';
  }

  getPassageDestination(passagePosition) {
    let passage = this.getTile(passagePosition).options.destination;
    return {mapId: passage.id, position: new Position(passage.x, passage.y)}
  }
}
