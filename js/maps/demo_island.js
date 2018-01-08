export default class DemoIsland {
  constructor() {
    this.name = 'Demo Island';
    this.width = 6;
    this.height = 6;
    this.sprites = this.get_sprites();
  }

  board() {
    return [
      [[0, 2], [1, 2], [1, 2], [1, 2], [1, 2], [2, 2]],
      [[0, 3], [1, 3], [1, 3], [1, 3], [1, 3], [2, 3]],
      [[0, 3], [1, 3], [1, 3], [1, 3], [1, 3], [2, 3]],
      [[0, 3], [1, 3], [1, 3], [1, 3], [1, 3], [2, 3]],
      [[0, 3], [1, 3], [1, 3], [1, 3], [1, 3], [2, 3]],
      [[0, 4], [1, 4], [1, 4], [1, 4], [1, 4], [2, 4]],
    ]
  }

  get_sprites() {
    var image = new Image(32, 32);
    image.src = 'build/assets/wiptiles.png'
    return image;
  }

  sprites() {
    return this.sprites;
  }

};
