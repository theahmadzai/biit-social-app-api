const express = require('express')
const { ApolloServer } = require('apollo-server-express')
const routes = require('./routes')
const typeDefs = require('./schema')
const resolvers = require('./resolvers')
const { sequelize, mongoose } = require('./database')

const app = express()

app.use('/', routes)

const server = new ApolloServer({
  introspection: true,
  playground: true,
  typeDefs,
  resolvers,
  context: ({ req }) => ({
    db: sequelize,
    mongoose,
    authToken: req.headers.authorization || '',
  }),
})

server.applyMiddleware({ app })

module.exports = app
