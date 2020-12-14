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

  User: {
    groups: async user => await user.getGroups(),
    groupsOwned: async user => await user.getGroupsOwned(),
    posts: async user => await user.getPosts(),
    comments: async user => await user.getComments(),
  },

  Group: {
    owner: async group => await group.getOwner(),
    members: async group => await group.getMembers(),
    posts: async group => await group.getPosts(),
  },

  Post: {
    user: async post => await post.getUser(),
    group: async post => await post.getGroup(),
    comments: async post => await post.getComments(),
  },

  Comment: {
    user: async comment => await comment.getUser(),
    post: async comment => await comment.getPost(),
  },

  Query: {
    course: async (_, { code }, { db }) => {
      return await db.models.Course.findOne({
        where: { code },
      })
    },
    courses: async (_, __, { db }) => {
      return await db.models.Course.findAll()
    },
    employee: async (_, { empNo }, { db }) => {
      return await db.models.Employee.findOne({
        where: { empNo },
      })
    },
    employees: async (_, __, { db }) => {
      return await db.models.Employee.findAll()
    },
    student: async (_, { regNo }, { db }) => {
      return await db.models.Student.findOne({
        where: { regNo },
      })
    },
    students: async (_, __, { db }) => {
      return await db.models.Student.findAll()
    },
    user: async (_, { username }, { db }) => {
      return await db.models.User.findOne({
        where: { username },
      })
    },
    users: async (_, __, { db }) => {
      return await db.models.User.findAll()
    },
    groups: async (_, __, { db }) => {
      return await db.models.Group.findAll()
    },
    group: async (_, { id }, { db }) => {
      return await db.models.Group.findOne({
        where: { id },
      })
    },
    posts: async (_, __, { db }) => {
      return await db.models.Post.findAll()
    },
    whoami: async (_, __, { db, user }) => {
      return await db.models.User.findOne({
        where: { id: user.id },
      })
    },
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
