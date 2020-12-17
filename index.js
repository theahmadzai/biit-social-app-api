const server = require('./server')
const { app } = require('./config')

const { port } = app

server.listen(port, '0.0.0.0', () => {
  console.log(`Server started on: http://localhost:${port}`)
})
