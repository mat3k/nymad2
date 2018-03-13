class Traits extends Object {
  constructor(traitsData) {
    traitsData['currentHP'] = traitsData['hp']
    super(Object.assign({}, traitsData));
  }
}

export default Traits
