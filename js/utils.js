export default function draw_sprite(ctx, image, sx, sy, dx, dy) {
  ctx.drawImage(image, sx * 32, sy * 32, 32, 32, dx, dy, 32, 32)
}
