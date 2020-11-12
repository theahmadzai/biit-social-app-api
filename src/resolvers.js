const resolvers = {
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
  },
}

module.exports = resolvers
