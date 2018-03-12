export function performActions(opponent, player) {
  let actions = [];

  if (opponent.arenaPosition.x + opponent.width < player.arenaPosition.x)
    actions.push({ direction: 'right', type: 'move', source: opponent });
  if (opponent.arenaPosition.x > player.arenaPosition.x)
    actions.push({ direction: 'left', type: 'move', source: opponent });
  if (opponent.arenaPosition.y > player.arenaPosition.y)
    actions.push({ direction: 'up', type: 'move', source: opponent });
  if (opponent.arenaPosition.y < player.arenaPosition.y)
    actions.push({ direction: 'down', type: 'move', source: opponent });

  return actions;
}
