const server = require('./server')
const { app } = require('./config')

const { port } = app

server.listen(port, () => {
  console.log(`Server started on: http://localhost:${port}`)
})
