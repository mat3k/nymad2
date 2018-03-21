class Attack {
  constructor(attacker, targetPosition) {
    this.attacker = attacker;
    this.targetPosition = targetPosition;
  }

  isCharacterAffectable() {
    throw new TypeError("Please implement .isCharacterAffectable");
  }

  damage() {
    throw new TypeError("Please implement .damage");
  }
}

export default Attack
