import Position from './position';
import MonstersRepository from './monsters_repository';
import MathExt from './math_ext';


class ArenaOrganizer {
  constructor() {
  }

  generateFormation() {
    const formations = [
      this.crossFormation,
      this.sidesFormation,
      this.youAreFuckedFormation
    ];
    const randomFormationId = MathExt.randomInt(0, formations.length - 1);

    return formations[randomFormationId]();
  }

  // private
  crossFormation() {
    let enemyN = MonstersRepository.find('rat');
      enemyN.setArenaPosition(new Position(120, 10));
    let enemyE = MonstersRepository.find('rat');
      enemyE.setArenaPosition(new Position(240, 120));
    let enemyS = MonstersRepository.find('rat');
      enemyS.setArenaPosition(new Position(120, 240));
    let enemyW = MonstersRepository.find('rat');
      enemyW.setArenaPosition(new Position(10, 120));

    return {
      opponents: [enemyN, enemyE, enemyS, enemyW],
      playerPosition: new Position(120, 120)
    };
  }

  sidesFormation() {
    let opponents = [];

    for (let i = 0; i < 5; i++) {
      const enemy = MonstersRepository.find('rat');
      enemy.setArenaPosition(new Position(i * 50 + 15, 10));
      opponents.push(enemy);
    }

    return {
      opponents: opponents,
      playerPosition: new Position(120, 210)
    };
  }

  youAreFuckedFormation() {
    let opponents = [];
    for (let i = 0; i < 5; i++) {
      for (let j = 0; j < 5; j++) {
        const enemy = MonstersRepository.find('rat');
        enemy.setArenaPosition(new Position(i * 50 + 15, j * 50 + 15));
        if (j == 2 && i == 2)
          continue;
        opponents.push(enemy);
      }
    }

    return {
      opponents: opponents,
      playerPosition: new Position(115, 115)
    };
  }

}

export default ArenaOrganizer
