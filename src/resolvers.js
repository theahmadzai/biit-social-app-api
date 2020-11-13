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
    course: async (_, { code }, ctx) => {
      const data = await ctx.db.models.Course.findOne({
        where: { code },
      })

      return data
    },

    courses: async (_, __, ctx) => {
      const data = await ctx.db.models.Course.findAll()

      return data
    },

    employee: async (_, { empNo }, ctx) => {
      const data = await ctx.db.models.Employee.findOne({
        where: { empNo },
      })

      return data
    },

    employees: async (_, __, ctx) => {
      const data = await ctx.db.models.Employee.findAll()

      return data
    },

    student: async (_, { regNo }, ctx) => {
      const data = await ctx.db.models.Student.findOne({
        where: { regNo },
      })

      return data
    },

    students: async (_, __, ctx) => {
      const data = await ctx.db.models.Student.findAll()

      return data
    },
  },
}

module.exports = resolvers
