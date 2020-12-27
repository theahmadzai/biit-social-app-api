const { GraphQLUpload } = require('graphql-upload')
const { User, Group, Media } = require('../models').models

const resolvers = {
  Upload: GraphQLUpload,

  User: {
    groups: async user => await user.getGroups(),
    groupsOwned: async user => await user.getGroupsOwned(),
    posts: async user => await user.getPosts(),
    comments: async user => await user.getComments(),
    profile: async user => await user.getStudentProfile(),
  },

  Profile: {
    __resolveType: ({ role }) => {
      if (role === 'STUDENT') return 'StudentProfile'
      if (role === 'TEACHER') return 'TeacherProfile'
      if (role === 'ADMIN') return 'AdminProfile'
      return 'StudentProfile'
    },
  },

  StudentProfile: {},

  TeacherProfile: {},

  AdminProfile: {},

  Group: {
    owner: async group => await group.getOwner(),
    members: async group => await group.getMembers(),
    posts: async group => await group.getPosts(),
  },

  Post: {
    user: async post => ('User' in post ? post.User : await post.getUser()),
    group: async post => ('Group' in post ? post.Group : await post.getGroup()),
    comments: async post =>
      'Comments' in post ? post.Comments : await post.getComments(),
    media: async post => ('Media' in post ? post.Media : await post.getMedia()),
  },

  Comment: {
    user: async comment =>
      'User' in comment ? comment.User : await comment.getUser(),
    post: async comment =>
      'Post' in comment ? comment.Post : await comment.getPost(),
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
    user: async (_, { id }, { db }) => {
      return await db.models.User.findOne({
        where: { id },
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
    post: async (_, { id }, { db }) => {
      return await db.models.Post.findOne({
        where: { id },
      })
    },
    whoami: async (_, __, { db, user }) => {
      return await db.models.User.findOne({
        where: { id: user.id },
      })
    },
    getUserGroupsOwned: async (_, { id }, { db }) => {
      return await db.models.Group.findAll({
        where: { userId: id },
      })
    },
    getUserGroups: async (_, { id }, { db }) => {
      return (
        await db.models.User.findOne({
          where: { id },
          include: {
            model: Group,
          },
        })
      ).Groups
    },
    getUserPosts: async (_, { id }, { db }) => {
      return await db.models.Post.findAll({
        where: { userId: id },
      })
    },
    getUserComments: async (_, { id }, { db }) => {
      return await db.models.Comment.findAll({
        where: { userId: id },
      })
    },
    getGroupPosts: async (_, { id }, { db }) => {
      return await db.models.Post.findAll({
        where: { groupId: id },
        order: [['id', 'DESC']],
        include: [Media, User],
      })
    },
    getGroupMembers: async (_, { id }, { db }) => {
      return (
        await db.models.Group.findOne({
          where: { id },
          include: {
            model: User,
            as: 'Members',
          },
        })
      ).Members
    },
    getPostComments: async (_, { id }, { db }) => {
      return await db.models.Comment.findAll({
        where: { postId: id },
        include: {
          model: User,
        },
      })
    },
  },

  Mutation: {
    login: require('./mutations/login'),
    createGroup: require('./mutations/create-group'),
    addGroupMember: require('./mutations/add-group-member'),
    createPost: require('./mutations/create-post'),
    createComment: require('./mutations/create-comment'),
    pushNotification: require('./mutations/push-notification'),
  },

  Subscription: {
    notification: require('./subscriptions/notification'),
  },
}

module.exports = resolvers
