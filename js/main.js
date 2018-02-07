import Game from './game';

let game = new Game;

window.game = game;

let images = ['assets/monsters-32x32.png', 'assets/wiptiles.png'];

game.preloadImages(images);

window.onload = () => game.start();
window.addEventListener('keydown', (e) => game.controller.addKey(e.keyCode));
window.addEventListener('keyup', (e) => game.controller.removeKey(e.keyCode));
window.addEventListener('mouseup', (e) => game.controller.removeButton(e));
window.addEventListener('mousedown', (e) => game.controller.addButton(e));
