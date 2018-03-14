import MathExt from '../math_ext';

export function performActions(character, target) {
  let actions = [];

  if (character.arenaPosition.x + character.width < target.arenaPosition.x)
    actions.push({ direction: 'right', type: 'move', source: character });
  if (character.arenaPosition.x > target.arenaPosition.x)
    actions.push({ direction: 'left', type: 'move', source: character });
  if (character.arenaPosition.y > target.arenaPosition.y)
    actions.push({ direction: 'up', type: 'move', source: character });
  if (character.arenaPosition.y < target.arenaPosition.y)
    actions.push({ direction: 'down', type: 'move', source: character });

  if (inAttackDistance(character, target))
    actions.push({ skill: 'attack1', type: 'attack', source: character, cursorPosition: target.arenaCenterPosition()});

  return actions;
}

function inAttackDistance(character, target) {
  if (MathExt.pointsDistance(character.arenaPosition, target.arenaPosition) < 60)
    return true;
  else
    return false;
}
