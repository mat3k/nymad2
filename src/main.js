import Game from './game';


window.onload = () => {
  const gameElement = document.querySelector("#game");
  const game = new Game(gameElement);
  const images = ['assets/monsters-32x32.png', 'assets/wiptiles.png'];

  game.preloadImages(images);

  window.addEventListener('keydown', (e) => game.controller.addKey(e.keyCode));
  window.addEventListener('keyup', (e) => game.controller.removeKey(e.keyCode));
  window.addEventListener('mouseup', (e) => game.controller.removeButton(e));
  window.addEventListener('mousedown', (e) => game.controller.addButton(e));
  window.addEventListener('mousemove', (e) => game.controller.mouseMove(e));

  window.game = game;

  game.start()
}
