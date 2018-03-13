class BlackSquare {
  draw(ctx, x, y) {
    ctx.fillStyle = '#000000';
    ctx.fillRect(x, y, x + 32, y + 32);
  }
}

export default BlackSquare
