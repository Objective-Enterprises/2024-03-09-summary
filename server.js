const http = require('http')
const url = require('url')
const PeopleService = require('./service/peopleService')

const peopleService = new PeopleService()

const account = {
  username: 'dorothy',
  password: 'parker'
}

const server = http.createServer((request, response) => {
  const parts = url.parse(request.url, true)
  response.setHeader('Content-Type', 'application/json')
  switch (parts.pathname) {
    case '/hello': {
      return response.end('hello!!!')
    }
    case '/goodbye': {
      return response.end('goodbye???')
    }
    case '/people': {
      if (parts.query.index) {
        const person = peopleService.getByIndex(parts.query.index)
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
      const people = peopleService.getAll()
      const json = JSON.stringify(people)
      return response.end(json)
    }
    case '/login': {
      let body = ''

      request.on('data', (chunk) => {
        body += chunk
      })

      request.on('end', () => {
        body = JSON.parse(body)
        if (body.username !== account.username || body.password !== account.password) {
          response.statusCode = 403
          const message = {
            message: 'Invalid login'
          }
          const json = JSON.stringify(message)
          return response.end(json)
        }
        const message = {
          message: 'Successful login'
        }
        const json = JSON.stringify(message)
        return response.end(json)
      })
      return
    }
    default: {
      const message = {
        message: 'Not found'
      }
      const json = JSON.stringify(message)
      response.statusCode = 404
      return response.end(json)
    }
  }
})

const PORT = 4000
server.listen(PORT, () => {
  console.log('Listening on port', PORT)
})

// http://localhost:4000/contact
// Protocol (language) - http://
// Domain (computer) - localhost (www.google.com)
// Port (program) - :4000 (:80)
// Path (file/section/category) - /contact