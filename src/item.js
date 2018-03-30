import SpriteImage from './sprite_image';

class Item {
  static getSprite() {
    const image = new Image(32, 32);
    image.src = 'assets/items.png';
    return image;
  }

  constructor() {
    this.type = 'generic'
    this.value = 1;
    this.image = new SpriteImage(Item.getSprite(), 0, 0);
  }
}

export default Item
