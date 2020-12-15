const http = require('http')
const express = require('express')
const { ApolloServer, AuthenticationError } = require('apollo-server-express')
const routes = require('./routes')
const typeDefs = require('./typedefs')
const resolvers = require('../resolvers')
const database = require('../models')
const { AuthenticatedDirective, AuthorizedDirective } = require('./directives')
const { getUserFromToken } = require('./token')

const app = express()

app.use('/', routes)

const server = new ApolloServer({
  introspection: true,
  playground: true,
  typeDefs,
  resolvers,
  schemaDirectives: {
    authenticated: AuthenticatedDirective,
    authorized: AuthorizedDirective,
  },
  formatError(error) {
    // Log critical errors here using (error instanceof CriticalError)
    return error
  },
  subscriptions: {
    async onConnect(connectionParams) {
      const user = await getUserFromToken(connectionParams.authToken)

      if (!user) {
        throw new AuthenticationError('Not authenticated.')
      }

      return {
        user,
      }
    },
  },
  async context({ req, connection }) {
    const context = { db: database }

    if (connection) {
      return { ...context, ...connection.context }
    }

    const user = await getUserFromToken(req.headers.authorization)

    return {
      ...context,
      user,
    }
  },
})

const httpServer = http.createServer(app)

server.applyMiddleware({ app })
server.installSubscriptionHandlers(httpServer)

module.exports = httpServer
