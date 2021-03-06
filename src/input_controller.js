class InputController {
  constructor(xOffset, yOffset) {
    this.keys = {};
    this.buttonCode = 255;
    this.mousePosition = {x: null, y: null};
    this.xOffset = xOffset;
    this.yOffset = yOffset;
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
    this.mousePosition = this.getEventPosition(e);
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

    this.mousePosition = this.getEventPosition(e);
  }

  keysPressed() {
    return Object.keys(this.keys).filter((key) => this.keys[key] === true);
  }

  // private
  getEventPosition(event) {
    return {
      x: event.clientX - this.xOffset,
      y: event.clientY - this.yOffset
    };
  }
}

export default InputController
