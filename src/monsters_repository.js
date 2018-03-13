import monsters from './db/monsters';
import Monster from './monster';

class MonsterRepository {
  static find(id) {
    let monster = monsters.find(function(monsterData) {
      if (monsterData.id == id) {
        return monsterData;
      }
    });

    return new Monster(monster);
  }
}

export default MonsterRepository
