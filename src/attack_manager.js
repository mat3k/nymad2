class AttackManager {
  constructor(attacks) {
    this.attacksSlot = { attack1: attacks[0], attack2: attacks[1] };
    this.attacksCoolDown = { attack1: false, attack2: false };
  }

  performAttack(attacker, attackType, targetPosition) {
    if (! this.canAttack(attackType))
      return null;

    let attack = new this.attacksSlot[attackType](attacker, targetPosition);

    this.setAttackCoolDown(attackType);
    setTimeout(() => this.resetAttackCoolDown(attackType), attack.coolDown);

    return attack;
  }

  // private

  canAttack(attackType){
    if (this.isAttackOnCoolDown(attackType))
      return false;

    return true;
  }

  isAttackOnCoolDown(attackType) {
    return this.attacksCoolDown[attackType] === true;
  }

  setAttackCoolDown(attackType) {
    this.attacksCoolDown[attackType] = true;
  }

  resetAttackCoolDown(attackType) {
    this.attacksCoolDown[attackType] = false;
  }
}

export default AttackManager;
