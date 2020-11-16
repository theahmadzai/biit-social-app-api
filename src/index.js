const app = require('./server')
const {
  server: { port },
} = require('./config')

app.listen(port, () => {
  console.log(`App started on: http://localhost:${port}`)
})
