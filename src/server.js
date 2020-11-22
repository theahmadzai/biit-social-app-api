const http = require('http')
const express = require('express')
const { ApolloServer } = require('apollo-server-express')
const routes = require('./routes')
const typeDefs = require('./typedefs')
const resolvers = require('./resolvers')
const database = require('./database')
const { getUserFromToken } = require('./utils/auth')

const app = express()

app.use('/', routes)

const server = new ApolloServer({
  introspection: true,
  playground: true,
  typeDefs,
  resolvers,
  formatError(error) {
    // Log critical errors here using (error instanceof CriticalError)
    return error
  },
  subscriptions: {
    async onConnect(connectionParams) {
      const user = await getUserFromToken(connectionParams.authToken)

      if (!user) {
        throw new Error('nop')
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
