export default class SpriteImage {
  constructor(image, offsetX, offsetY, width = 32, height = 32) {
    this.image = image;
    this.offsetX = offsetX;
    this.offsetY = offsetY;
    this.width = width;
    this.height = height;
  }

  draw(ctx, x, y) {
    ctx.drawImage(this.image,
      this.offsetX * this.width, this.offsetY * this.height,
      this.width, this.height,
      x, y, this.width, this.height);
  }
}
