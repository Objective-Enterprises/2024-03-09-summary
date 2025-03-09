const http = require('http')
const url = require('url')

const people = [
  'Dorothy',
  'Tallullah'
]

const server = http.createServer((request, response) => {
  const parts = url.parse(request.url, true)
  switch (parts.pathname) {
    case '/hello': {
      return response.end('hello!!!')
    }
    case '/goodbye': {
      return response.end('goodbye???')
    }
    case '/people': {
      if (parts.query.index) {
        const person = people[parts.query.index]
        if (!person) {
          const message = {
            message: 'Person not found'
          }
          const json = JSON.stringify(message)
          return response.end(json)
        }
        const json = JSON.stringify({ person })
        return response.end(json)
      }
      const json = JSON.stringify(people)
      return response.end(json)
    }
    default: {
      const message = {
        message: 'Not found'
      }
      const json = JSON.stringify(message)
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