const people = require('../data/people.json')

class PeopleService {
  constructor () {
    this.people = people
  }

  getAll () {
    return this.people
  }

  getByIndex (index) {
    return this.people[index]
  }
}

module.exports = PeopleService