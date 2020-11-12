const { gql } = require('apollo-server-express')

const typeDefs = gql`
  type Course {
    code: String!
    title: String!
    description: String!
  }

  type Query {
    course(code: String): Course
    courses: [Course]
  }
`

module.exports = typeDefs
