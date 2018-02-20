import Position from './position';
import Line from './line';

export default class MathExt {
  static pointsAngleDegree(p1, p2) {
    return Math.atan2(p2.y - p1.y, p2.x - p1.x) * 180 / Math.PI;
  }

  static pointsAngleRadian(p1, p2) {
    return Math.atan2(p2.y - p1.y, p2.x - p1.x);
  }

  static lineEndPointAtAngle(startPoint, length, angle) {
    return new Position(
      startPoint.x + length * Math.cos(angle),
      startPoint.y + length * Math.sin(angle)
    );
  }

  // http://www.kevlindev.com/gui/math/intersection/Intersection.js
  static linesCollide(l1, l2) {
    let result;

    let ua_t = (l2.end.x - l2.start.x) * (l1.start.y - l2.start.y) - (l2.end.y - l2.start.y) * (l1.start.x - l2.start.x);
    let ub_t = (l1.end.x - l1.start.x) * (l1.start.y - l2.start.y) - (l1.end.y - l1.start.y) * (l1.start.x - l2.start.x);
    let u_b  = (l2.end.y - l2.start.y) * (l1.end.x - l1.start.x) - (l2.end.x - l2.start.x) * (l1.end.y - l1.start.y);

    if (u_b != 0) {
      let ua = ua_t / u_b;
      let ub = ub_t / u_b;

      if (0 <= ua && ua <= 1 && 0 <= ub && ub <= 1)
        return true;
      else
        return false;
    }
    else {
      if (ua_t == 0 || ub_t == 0)
        return true;
      else
        return true;
    }
    return result;
  };

  static randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
}
