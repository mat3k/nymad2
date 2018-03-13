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

  if (inAttackDistance(character, target) && attackAvailable(character))
    'attack';

  return actions;
}

function inAttackDistance(character, target) {
  return true;
}

function attackAvailable(character) {
  return true;
}
