export default class InputController {
  constructor() {
    this.keys = {};
  }

  addKey(keyCode) {
    this.keys[keyCode] = true;
  }

  removeKey(keyCode) {
    this.keys[keyCode] = false;
  }

  isKeyPressed(keyCode) {
    return this.keys[keyCode];
  }
}
