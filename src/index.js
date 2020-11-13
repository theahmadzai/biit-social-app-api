const config = require('./config')
const express = require('express')
const { ApolloServer } = require('apollo-server-express')
const typeDefs = require('./schema')
const resolvers = require('./resolvers')
const db = require('./database')

const app = express()

const server = new ApolloServer({
  introspection: true,
  playground: true,
  typeDefs,
  resolvers,
  context: () => ({
    db,
  }),
})

server.applyMiddleware({ app })

app.get('/', (req, res) => {
  res.send('Hello World')
})

app.listen(config.serverPort, () => {
  console.log(
    `App started on: http://localhost:${config.serverPort}${server.graphqlPath}`
  )
})
