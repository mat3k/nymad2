import KB from '../key_codes';
import Settings from '../settings'

class Equipment {
  constructor(ctx, player, controller, eventDispatcher) {
    this.ctx = ctx;
    this.player = player;
    this.controller = controller;
    this.eventDispatcher = eventDispatcher;
  }

  update() {
    if (this.controller.isKeyPressed(KB.ESC))
      return this.eventDispatcher({type: 'world_map'});
  }

  draw() {
    this.drawBackground();
    this.drawBackpack();

    this.drawArmor();
    this.drawHead();
    this.drawLeftHand();
    this.drawRightHand();
    this.drawBoots();
  }

  // private

  drawBackground() {
    this.ctx.fillStyle = '#999';
    this.ctx.fillRect(Settings.WIDTH / 2, 0, Settings.WIDTH, Settings.HEIGHT);
  }

  drawItemBox(x, y) {
    const item = this.player.equipment.getItemBySlot(this.positionToSlotId(x, y));
    item.image.draw(this.ctx, x, y)
  }

  drawBackpack() {
    let yOffset = 184;
    let xOffset = 245;

    for (let i = 0; i < 7; i++) {
      for (let j = 0; j <= 3; j++) {
        this.drawItemBox(
          xOffset + i * 32 + i,
          yOffset + j * 32 + j
        );
      }
    }
  }

  drawHead() {
    this.drawItemBox(342, 36);
  }


  drawArmor() {
    this.drawItemBox(342, 70);
  }

  drawLeftHand() {
    this.drawItemBox(308, 70);
  }

  drawRightHand() {
    this.drawItemBox(376, 70);
  }

  drawBoots() {
    this.drawItemBox(342, 104);
  }

  positionToSlotId(x, y) {
    return y * 7 + x;
  }
}

export default Equipment;
