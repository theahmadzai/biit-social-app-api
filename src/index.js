const express = require('express')
const { ApolloServer, gql } = require('apollo-server-express')
const Sequelize = require('sequelize')

if (
  typeof process.env.CONTAINERIZED === 'string' &&
  process.env.CONTAINERIZED.toLowerCase() === 'false'
) {
  require('dotenv').config()
}

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOSTNAME,
    dialect: process.env.DB_PROVIDER,
  }
)

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.')
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err)
  })

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
