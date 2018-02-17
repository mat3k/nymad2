import Equipment from '../js/equipment';

describe('Equipment', () => {
  describe('class', () => {
    test('is equipment a class', () => {
      let equipment = new Equipment();
      expect(equipment).toEqual({})
    });
  });
});
