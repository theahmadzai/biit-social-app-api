const express = require('express')
const mongoose = require('mongoose')

const app = express()

serverPort = process.env.PORT || 3000
mongoConnectionUrl =
  process.env.MONGO_CONNECTION_STRING || 'mongodb://127.0.0.1:27017'
mongoDatabase = 'test'

mongoose.connect(`${mongoConnectionUrl}/${mongoDatabase}`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

app.get('/', (req, res) => {
  res.send(mongoose.version)
})

app.listen(serverPort, () => {
  console.log(`App started on: http://localhost:${serverPort}`)
})
