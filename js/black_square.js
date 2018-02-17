export default class BlackSquare {
  draw(ctx, x, y) {
    ctx.fillRect(x, y, x + 32, y + 32);
    ctx.fillStyle = '#000000';
    ctx.fill();
    ctx.stroke();
  }
}
