const { ApolloServer } = require('apollo-server-express')
const { createTestClient } = require('apollo-server-testing')
const typeDefs = require('../server/typedefs')
const resolvers = require('../resolvers')

const createTestServer = ctx => {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    mockEntireSchema: false,
    mocks: true,
    context() {
      return ctx
    },
  })

  return createTestClient(server)
}

module.exports = createTestServer
