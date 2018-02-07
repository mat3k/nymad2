import Position from '../js/position';

describe('Position', () => {
  describe('.left', () => {
    test('returns decreased x val', () => {
      let x = 0;
      let position = new Position(x, 0);

      expect(position.left().x).toEqual(x - 1);
    });
  });
});
