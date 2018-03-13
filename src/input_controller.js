class InputController {
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

  addButton(e) {
    this.mousePosition = {x: e.clientX, y: e.clientY};
    this.keys[this.buttonCode] = true;
  }

  removeButton() {
    this.mousePosition = {x: null, y: null};
    this.keys[this.buttonCode] = false;
  }

  isButtonPressed(e) {
    return this.keys[this.buttonCode];
  }

  mousePressPosition() {
    return this.mousePosition;
  }

  mouseMove(e) {
    if (! this.isButtonPressed(e))
      return;

    this.mousePosition = {x: e.clientX, y: e.clientY};
  }

  keysPressed() {
    return Object.keys(this.keys).filter((key) => this.keys[key] === true);
  }
}

export default InputController
