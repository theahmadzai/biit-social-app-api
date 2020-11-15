const express = require('express')
const { ApolloServer } = require('apollo-server-express')
const typeDefs = require('./schema')
const resolvers = require('./resolvers')
const db = require('./database')
const {
  server: { port },
} = require('./config')

const app = express()

const server = new ApolloServer({
  introspection: true,
  playground: true,
  typeDefs,
  resolvers,
  context: ({ req }) => {
    return {
      db,
      token: req.headers.authorization || '',
    }
  },
})

server.applyMiddleware({ app })

app.get('/', (req, res) => {
  res.send('Hello World')
})

app.listen(port, () => {
  console.log(`App started on: http://localhost:${port}${server.graphqlPath}`)
})
