const PeopleService = require('../service/peopleService')

const peopleService = new PeopleService()

function getPersonByIndex(index, response) {
  const person = peopleService.getByIndex(index)
  if (!person) {
    const message = {
      message: 'Person not found'
    }
    const json = JSON.stringify(message)
    response.statusCode = 404
    return response.end(json)
  }
  const json = JSON.stringify({ person })
  return response.end(json)
}

function getAllPeople(response) {
  const people = peopleService.getAll()
  const json = JSON.stringify(people)
  return response.end(json)
}

module.exports = {
  getPersonByIndex,
  getAllPeople
}