class Traits extends Object {
  constructor(traitsData) {
    traitsData['currentHP'] = traitsData['hp']
    super(traitsData);
  }
}

export default Traits
