import KB from './key_codes';

class FightSummary {
  constructor(ctx, result, controller, eventDispatcher) {
    this.ctx = ctx;
    this.result = result;
    this.controller = controller;
    this.eventDispatcher = eventDispatcher;
    this.displayed = false;
  }

  update() {
    if (this.controller.isKeyPressed(KB.ENTER))
      return this.eventDispatcher({type: 'fight_summary_closed'});
  }

  draw() {
    if (this.displayed)
      return false;

    this.drawBackground();
    this.drawResult();
    this.drawHint();
    this.displayed = true;
  }

  // private

  drawBackground() {
    this.ctx.fillStyle = "rgba(0, 0, 0, 0.7)";
    this.ctx.fillRect(0, 0, 250, 250);
  }

  drawResult() {
    let x = 70;
    let y = 130;

    this.ctx.font = "22px Arial";
    this.ctx.fillStyle = 'white';
    if (this.result == -1)
      this.ctx.fillText('You lost !', x, y);
    else
      this.ctx.fillText('You win !', x, y);
  }

  drawHint() {
    this.ctx.font = "13px Arial";
    this.ctx.fillText('Enter to exit', 70, 150);
  }
}

export default FightSummary;
