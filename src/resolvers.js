const { GraphQLScalarType, Kind } = require('graphql')

const resolvers = {
  Date: new GraphQLScalarType({
    name: 'Date',
    parseValue(value) {
      return new Date(value)
    },
    serialize(value) {
      return value.getTime()
    },
    parseLiteral(ast) {
      if (ast.kind === Kind.INT) {
        return parseInt(ast.value, 10)
      }
      return null
    },
  }),

  Query: {
    course: require('./resolvers/query/course'),
    courses: require('./resolvers/query/courses'),
    employee: require('./resolvers/query/employee'),
    employees: require('./resolvers/query/employees'),
    student: require('./resolvers/query/student'),
    students: require('./resolvers/query/students'),
    whoami: require('./resolvers/query/whoami'),
  },

  Mutation: {
    login: require('./resolvers/mutation/login'),
  },
}

module.exports = resolvers
