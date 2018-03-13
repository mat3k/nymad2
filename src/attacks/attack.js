class Attack {
  constructor(ctx, sourcePosition, targetPosition) {
    this.ctx = ctx;
    this.sourcePosition = sourcePosition;
    this.targetPosition = targetPosition;
  }

  isCharacterAffectable() {
    throw new TypeError("Please implement .isCharacterAffectable");
  }
}

export default Attack
