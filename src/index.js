const express = require('express')
const { ApolloServer, gql } = require('apollo-server-express')

const app = express()

const serverPort = process.env.PORT || 3000

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
  res.send('Hello World')
})

app.listen(serverPort, () => {
  console.log(
    `App started on: http://localhost:${serverPort}${server.graphqlPath}`
  )
})
