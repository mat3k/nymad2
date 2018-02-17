export default class InputController {
  constructor() {
    this.keys = {};
    this.buttonCode = 255;
    this.mousePosition = {x: null, y: null};
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

  addButton() {
    this.mousePosition = {x: screenX, y: screenY};
    this.keys[this.buttonCode] = true;
  }

  removeButton() {
    this.mousePosition = {x: null, y: null};
    this.keys[this.buttonCode] = false;
  }

  isButtonPressed() {
    return this.keys[this.buttonCode];
  }

  mousePressPosition() {
    return this.mousePosition;
  }
}
