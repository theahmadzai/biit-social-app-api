const { GraphQLUpload } = require('graphql-upload')
const { Op } = require('sequelize')
const { User, Group, Media, Post, Like, Comment, Student, Employee } = require('../models').models
const { searchUsersOperators, matchStudentClass } = require('../utils/db')
const { getStudentClass } = require('../utils')

const resolvers = {
  Upload: GraphQLUpload,

  User: {
    groups: async user => ('Groups' in user ? user.Groups : await user.getGroups()),
    groupsOwned: async user =>
      'GroupsOwned' in user ? user.GroupsOwned : await user.getGroupsOwned(),
    posts: async user => ('Posts' in user ? user.posts : await user.getPosts()),
    likes: async user => ('Likes' in user ? user.Likes : await user.getLikes()),
    comments: async user => ('Comments' in user ? user.Comments : await user.getComments()),
    profile: async user => {
      switch (user.role) {
        case 'STUDENT':
          return 'StudentProfile' in user ? user.StudentProfile : await user.getStudentProfile()
        case 'TEACHER':
        case 'ADMIN':
          return 'EmployeeProfile' in user ? user.EmployeeProfile : await user.getEmployeeProfile()
        default:
          return { firstName: null, middleName: null, lastName: null }
      }
    },
  },

  Profile: {
    __resolveType: user => {
      if ('regNo' in user) return 'StudentProfile'
      if ('empNo' in user) return 'EmployeeProfile'
      return null
    },
  },

  StudentProfile: {},

  EmployeeProfile: {},

  Group: {
    owner: async group => ('Owner' in group ? group.Owner : await group.getOwner()),
    users: async group => ('Users' in group ? group.Users : await group.getUsers()),
    posts: async group => ('Posts' in group ? group.Posts : await group.getPosts()),
  },

  Class: {
    posts: async group => ('Posts' in group ? group.Posts : await group.getPosts()),
  },

  Post: {
    media: async post => ('Media' in post ? post.Media : await post.getMedia()),
    user: async post => ('User' in post ? post.User : await post.getUser()),
    group: async post => ('Group' in post ? post.Group : await post.getGroup()),
    likes: async post => ('Likes' in post ? post.Likes : await post.getLikes()),
    comments: async post => ('Comments' in post ? post.Comments : await post.getComments()),
    likesCount: async post =>
      'Likes' in post ? post.Likes.length : (await post.getLikes()).length,
    commentsCount: async post =>
      'Comments' in post ? post.Comments.length : (await post.getComments()).length,
  },

  Like: {
    user: async like => ('User' in like ? like.User : await like.getUser()),
    post: async like => ('Post' in like ? like.Post : await like.getPost()),
  },

  Comment: {
    user: async comment => ('User' in comment ? comment.User : await comment.getUser()),
    post: async comment => ('Post' in comment ? comment.Post : await comment.getPost()),
  },

  Query: {
    allCourses: async (_, __, { db }) => {
      return await db.models.Course.findAll()
    },
    course: async (_, { code }, { db }) => {
      return await db.models.Course.findOne({
        where: { code },
      })
    },
    allUsers: async (_, __, { db }) => {
      return await db.models.User.findAll()
    },
    user: async (_, { id }, { db }) => {
      return await db.models.User.findOne({
        where: { id },
      })
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
    userGroupsOwned: async (_, { id }, { db }) => {
      return await db.models.Group.findAll({
        where: { UserId: id },
      })
    },
    userGroups: async (_, __, { user, db }) => {
      return (
        await db.models.User.findOne({
          where: { id: user.id },
          include: [Group],
        })
      ).Groups
    },
    userPosts: async (_, __, { user, db }) => {
      return (
        await db.models.User.findOne({
          where: { id: user.id },
          include: [Post],
        })
      ).Posts
    },
    userClassPosts: async (_, __, { user, db }) => {
      const student = await user.getStudentProfile()
      const c = await db.models.Class.findOne({ where: { name: getStudentClass(student) } })

      if (c === null) return []

      return await c.getPosts({
        include: [Media, User, Like, Comment],
        order: [['id', 'DESC']],
      })
    },
    teacherClasses: async (_, __, { user }) => {
      return await user.getClasses()
    },
    userLikes: async (_, { id }, { db }) => {
      return await db.models.Like.findAll({
        where: { UserId: id },
      })
    },
    userComments: async (_, { id }, { db }) => {
      return await db.models.Comment.findAll({
        where: { UserId: id },
      })
    },
    classPosts: async (_, { id }, { db }) => {
      return await (await db.models.Class.findOne({ where: { id } })).getPosts({
        include: [Media, User, Like, Comment],
        order: [['id', 'DESC']],
      })
    },
    wallPosts: async (_, __, { db }) => {
      return await (await db.models.Wall.findOne({ where: { name: 'ALL' } })).getPosts({
        include: [Media, User, Like, Comment],
        order: [['id', 'DESC']],
      })
    },
    groupPosts: async (_, { id }, { db }) => {
      return await (await db.models.Group.findOne({ where: { id } })).getPosts({
        include: [Media, User, Like, Comment],
        order: [['id', 'DESC']],
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
        where: { PostId: id },
        include: {
          model: User,
        },
      })
    },
    postComments: async (_, { id }, { db }) => {
      return await db.models.Comment.findAll({
        where: { PostId: id },
        include: {
          model: User,
        },
      })
    },
    isPostLikedByUser: async (_, { id }, { user }) => {
      return (await user.getLikes({ where: { PostId: id } })).length ? true : false
    },
    searchUsers: async (_, { input: { query } }, { db }) => {
      const parts = query.split(' ').filter(part => part.length)

      return await db.models.User.findAll({
        where: { [Op.or]: searchUsersOperators(parts) },
        order: [['id', 'DESC']],
        include: [
          { model: Student, as: 'StudentProfile' },
          { model: Employee, as: 'EmployeeProfile' },
        ],
      })
    },
    whoami: async (_, __, { db, user }) => {
      return await db.models.User.findOne({
        where: { id: user.id },
      })
    },
    studentDatesheet: async (_, __, { db, user }) => {
      const student = await user.getStudentProfile()

      return await db.models.Datesheet.findAll({
        where: matchStudentClass(student),
      })
    },
    studentTimetable: async (_, __, { db, user }) => {
      const student = await user.getStudentProfile()

      return await db.models.Timetable.findAll({
        where: matchStudentClass(student),
      })
    },
  },

  Mutation: {
    login: require('./mutations/login'),
    createGroup: require('./mutations/group-create'),
    exitGroup: require('./mutations/group-exit'),
    deleteGroup: require('./mutations/group-delete'),
    addGroupUser: require('./mutations/group-user-add'),
    removeGroupUser: require('./mutations/group-user-remove'),
    createGroupPost: require('./mutations/post-create'),
    createClassPost: require('./mutations/create-class-post'),
    createWallPost: require('./mutations/create-wall-post'),
    createPostComment: require('./mutations/comment-create'),
    togglePostLike: require('./mutations/post-like-toggle'),
    intelligentPost: require('./mutations/intelligent-post'),
    pushNotification: require('./mutations/push-notification'),
  },

  Subscription: {
    notification: require('./subscriptions/notification'),
  },
}

module.exports = resolvers
