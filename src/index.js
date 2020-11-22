const server = require('./server')
const {
  server: { port },
} = require('./config')

server.listen(port, () => {
  console.log(`Server started on: http://localhost:${port}`)
})
