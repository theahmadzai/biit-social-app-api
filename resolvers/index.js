const { GraphQLUpload } = require('graphql-upload')
const { Op } = require('sequelize')
const {
  User,
  Group,
  Media,
  Like,
  Comment,
  Student,
  Teacher,
} = require('../models').models
const { searchUsersOperators } = require('../utils/db')

const resolvers = {
  Upload: GraphQLUpload,

  User: {
    groups: async user => await user.getGroups(),
    groupsOwned: async user => await user.getGroupsOwned(),
    posts: async user => await user.getPosts(),
    likes: async user => await user.getLikes(),
    comments: async user => await user.getComments(),
    profile: async user => {
      if (user.role === 'STUDENT') return await user.getStudentProfile()
      if (user.role === 'TEACHER') return await user.getTeacherProfile()
      return { firstName: null, middleName: null, lastName: null }
    },
  },

  Profile: {
    __resolveType: user => {
      if ('regNo' in user) return 'StudentProfile'
      if ('empNo' in user) return 'TeacherProfile'
      if ('adEmpNo' in user) return 'AdminProfile'
      return 'StudentProfile'
    },
  },

  StudentProfile: {},

  TeacherProfile: {},

  AdminProfile: {},

  Group: {
    owner: async group => await group.getOwner(),
    users: async group => await group.getUsers(),
    posts: async group => await group.getPosts(),
  },

  Post: {
    media: async post => ('Media' in post ? post.Media : await post.getMedia()),
    user: async post => ('User' in post ? post.User : await post.getUser()),
    group: async post => ('Group' in post ? post.Group : await post.getGroup()),
    likes: async post => ('Likes' in post ? post.Likes : await post.getLikes()),
    comments: async post =>
      'Comments' in post ? post.Comments : await post.getComments(),
  },

  Like: {
    user: async like => ('User' in like ? like.User : await like.getUser()),
    post: async like => ('Post' in like ? like.Post : await like.getPost()),
  },

  Comment: {
    user: async comment =>
      'User' in comment ? comment.User : await comment.getUser(),
    post: async comment =>
      'Post' in comment ? comment.Post : await comment.getPost(),
  },

  Query: {
    allCourses: async (_, { code }, { db }) => {
      return await db.models.Course.findOne({
        where: { code },
      })
    },
    course: async (_, __, { db }) => {
      return await db.models.Course.findAll()
    },
    allUsers: async (_, { id }, { db }) => {
      return await db.models.User.findOne({
        where: { id },
      })
    },
    user: async (_, __, { db }) => {
      return await db.models.User.findAll()
    },
    allGroups: async (_, __, { db }) => {
      return await db.models.Group.findAll()
    },
    group: async (_, { id }, { db }) => {
      return await db.models.Group.findOne({
        where: { id },
      })
    },
    allPosts: async (_, __, { db }) => {
      return await db.models.Post.findAll()
    },
    post: async (_, { id }, { db }) => {
      return await db.models.Post.findOne({
        where: { id },
      })
    },
    allComments: async (_, __, { db }) => {
      return await db.models.Comment.findAll()
    },
    comment: async (_, { id }, { db }) => {
      return await db.models.Comment.findOne({
        where: { id },
      })
    },
    allMedia: async (_, __, { db }) => {
      return await db.models.Media.findAll()
    },
    media: async (_, { id }, { db }) => {
      return await db.models.Media.findOne({
        where: { id },
      })
    },
    whoami: async (_, __, { db, user }) => {
      return await db.models.User.findOne({
        where: { id: user.id },
      })
    },
    userGroupsOwned: async (_, { id }, { db }) => {
      return await db.models.Group.findAll({
        where: { userId: id },
      })
    },
    userGroups: async (_, { id }, { db }) => {
      return (
        await db.models.User.findOne({
          where: { id },
          include: [Group],
        })
      ).Groups
    },
    userPosts: async (_, { id }, { db }) => {
      return await db.models.Post.findAll({
        where: { userId: id },
      })
    },
    userLikes: async (_, { id }, { db }) => {
      return await db.models.Like.findAll({
        where: { userId: id },
      })
    },
    userComments: async (_, { id }, { db }) => {
      return await db.models.Comment.findAll({
        where: { userId: id },
      })
    },
    groupPosts: async (_, { id }, { db }) => {
      return await db.models.Post.findAll({
        where: { groupId: id },
        order: [['id', 'DESC']],
        include: [Media, User, Like, Comment],
      })
    },
    groupUsers: async (_, { id }, { db }) => {
      return (
        await db.models.Group.findOne({
          where: { id },
          include: {
            model: User,
          },
        })
      ).Users
    },
    postLikes: async (_, { id }, { db }) => {
      return await db.models.Like.findAll({
        where: { postId: id },
        include: {
          model: User,
        },
      })
    },
    postComments: async (_, { id }, { db }) => {
      return await db.models.Comment.findAll({
        where: { postId: id },
        include: {
          model: User,
        },
      })
    },
    searchUsers: async (_, { input: { query } }, { db }) => {
      const parts = query.split(' ').filter(part => part.length)

      return await db.models.User.findAll({
        where: { [Op.or]: searchUsersOperators(parts) },
        order: [['id', 'DESC']],
        include: [
          { model: Student, as: 'StudentProfile' },
          { model: Teacher, as: 'TeacherProfile' },
        ],
      })
    },
  },

  Mutation: {
    login: require('./mutations/login'),
    createGroup: require('./mutations/group-create'),
    deleteGroup: require('./mutations/group-delete'),
    addGroupUser: require('./mutations/group-user-add'),
    removeGroupUser: require('./mutations/group-user-remove'),
    createGroupPost: require('./mutations/post-create'),
    createPostComment: require('./mutations/comment-create'),
    pushNotification: require('./mutations/push-notification'),
  },

  Subscription: {
    notification: require('./subscriptions/notification'),
  },
}

module.exports = resolvers
