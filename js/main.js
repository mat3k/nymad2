import Game from './game';

let game = new Game;
let images = ['build/assets/monsters-32x32.png', 'build/assets/wiptiles.png']

game.preloadImages(images)

window.onload = function() {
  game.start();
}

window.addEventListener("keydown", (e) => {
  game.controller.addKey(e.keyCode);
});

window.addEventListener("keyup", (e) => {
  game.controller.removeKey(e.keyCode);
});
