const express = require('express')
const { ApolloServer, gql } = require('apollo-server-express')
const mongoose = require('mongoose')

const app = express()

const serverPort = process.env.PORT || 3000
const mongoConnectionUrl =
  process.env.MONGO_CONNECTION_STRING || 'mongodb://127.0.0.1:27017'
const mongoDatabase = 'test'

mongoose.connect(`${mongoConnectionUrl}/${mongoDatabase}`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

const typeDefs = gql`
  type Query {
    hello: String
  }
`

const resolvers = {
  Query: {
    hello: () => 'Hello world!',
  },
}

const server = new ApolloServer({ typeDefs, resolvers })

server.applyMiddleware({ app })

app.get('/', (req, res) => {
  res.send(mongoose.version)
})

app.listen(serverPort, () => {
  console.log(
    `App started on: http://localhost:${serverPort}${server.graphqlPath}`
  )
})
