const http = require('http')
const url = require('url')

const server = http.createServer((request, response) => {
  const parts = url.parse(request.url)
  console.log('parts', parts)
  switch (parts.pathname) {
    case '/hello': {
      return response.end('hello!!!')
    }
    case '/goodbye': {
      return response.end('goodbye???')
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