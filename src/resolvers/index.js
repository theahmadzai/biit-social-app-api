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
    course: require('./queries/course'),
    courses: require('./queries/courses'),
    employee: require('./queries/employee'),
    employees: require('./queries/employees'),
    student: require('./queries/student'),
    students: require('./queries/students'),
    user: require('./queries/user'),
    users: require('./queries/users'),
    whoami: require('./queries/whoami'),
  },

  Mutation: {
    login: require('./mutations/login'),
    pushNotification: require('./mutations/push-notification'),
  },

  Subscription: {
    notification: require('./subscriptions/notification'),
  },
}

module.exports = resolvers
