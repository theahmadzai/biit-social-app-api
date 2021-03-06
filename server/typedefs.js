const { gql } = require('apollo-server-express')

module.exports = gql`
  scalar Upload

  enum Role {
    STUDENT
    TEACHER
    ADMIN
  }

  directive @authenticated on FIELD_DEFINITION
  directive @authorized(role: Role! = ADMIN) on FIELD_DEFINITION

  input AuthInput {
    username: String!
    password: String!
  }

  type AuthPayload {
    token: String!
    user: User!
  }

  input SearchUsersInput {
    query: String!
  }

  input GroupInput {
    name: String!
    description: String!
    image: Upload!
  }

  input GroupUserInput {
    userId: ID!
    groupId: ID!
  }

  input PostInput {
    text: String
    media: [Upload!]
    postableId: ID!
  }

  input ClassPostInput {
    text: String
    media: [Upload!]
    classId: ID
    secret: Boolean
  }

  input WallPostInput {
    text: String
    media: [Upload!]
  }

  input IntelligentPostInput {
    type: String!
    file: Upload!
  }

  input CommentInput {
    content: String!
    secret: Boolean
    postId: ID!
  }

  type Course {
    code: ID!
    title: String!
    description: String!
  }

  type User {
    id: ID!
    username: String!
    password: String!
    role: Role!
    image: String
    groups: [Group]!
    groupsOwned: [Group]!
    posts: [Post]!
    likes: [Like]!
    comments: [Comment]!
    profile: Profile!
    createdAt: String!
    updatedAt: String!
  }

  interface Profile {
    firstName: String
    middleName: String
    lastName: String
  }

  type StudentProfile implements Profile {
    firstName: String
    middleName: String
    lastName: String
    sex: String
    birthDate: String
    permanentAddress: String
    permanentCity: String
    phone: String
    session: String
    admissionDate: String
    semester: String
    section: String
    program: String
  }

  type EmployeeProfile implements Profile {
    firstName: String
    middleName: String
    lastName: String
    permanentAddress: String
    permanentCity: String
    joiningDate: String
    resignDate: String
    phone: String
    email: String
    designation: String
    status: String
  }

  type Media {
    id: ID!
    filename: String!
    mimetype: String!
    encoding: String!
  }

  type Group {
    id: ID!
    name: String!
    description: String!
    image: String!
    owner: User!
    users: [User]!
    posts: [Post]!
    createdAt: String!
    updatedAt: String!
  }

  type Class {
    id: ID!
    name: String!
    posts: [Post]!
    createdAt: String!
    updatedAt: String!
  }

  type Post {
    id: ID!
    text: String
    secret: Boolean
    tags: String
    media: [Media]!
    user: User!
    group: Group!
    likes: [Like]!
    comments: [Comment]!
    createdAt: String!
    updatedAt: String!
    likesCount: Int!
    commentsCount: Int!
  }

  type Like {
    id: ID!
    user: User!
    post: Post!
    createdAt: String!
    updatedAt: String!
  }

  type Comment {
    id: ID!
    content: String!
    secret: Boolean
    user: User!
    post: Post!
    createdAt: String!
    updatedAt: String!
  }

  type Datesheet {
    id: ID!
    title: String
    time: String
    day: String
    date: String
    class: String
    course: String
  }

  type Timetable {
    id: ID!
    day: String
    time: String
    class: String
    course: String
    teacher: String
  }

  type Notification {
    title: String!
  }

  type Query {
    allCourses: [Course]!
    course(code: ID!): Course
    allUsers: [User]!
    user(id: ID!): User
    allGroups: [Group]!
    group(id: ID!): Group
    allPosts: [Post]!
    post(id: ID!): Post
    allComments: [Comment]!
    comment(id: ID!): Comment
    allMedia: [Media]
    media(id: ID!): Media
    userGroupsOwned(id: ID!): [Group]!
    userGroups: [Group]! @authenticated
    userPosts: [Post]! @authenticated
    userClassPosts: [Post]! @authenticated
    wallPosts: [Post]! @authenticated
    teacherClasses: [Class]! @authenticated
    userLikes(id: ID!): [Like]!
    userComments(id: ID!): [Comment]!
    classPosts(id: ID!): [Post]!
    groupPosts(id: ID!): [Post]!
    groupUsers(id: ID!): [User]!
    postLikes(id: ID!): [Like]!
    postComments(id: ID!): [Comment]!
    isPostLikedByUser(id: ID!): Boolean! @authenticated
    searchUsers(input: SearchUsersInput!): [User]!
    studentDatesheet: [Datesheet]! @authorized(role: STUDENT)
    studentTimetable: [Timetable]! @authorized(role: STUDENT)
    whoami: User! @authenticated
  }

  type Mutation {
    login(input: AuthInput!): AuthPayload!
    createGroup(input: GroupInput!): Group! @authenticated
    exitGroup(id: ID!): Group! @authenticated
    deleteGroup(id: ID!): Group! @authenticated
    addGroupUser(input: GroupUserInput!): User! @authenticated
    removeGroupUser(input: GroupUserInput!): User! @authenticated
    createGroupPost(input: PostInput!): Post! @authenticated
    createClassPost(input: ClassPostInput!): Post! @authenticated
    createWallPost(input: WallPostInput!): Post! @authenticated
    createPostComment(input: CommentInput!): Comment! @authenticated
    togglePostLike(id: ID!): [Like]! @authenticated
    intelligentPost(input: IntelligentPostInput!): String! @authorized(role: ADMIN)
    pushNotification(title: String!): Notification!
  }

  type Subscription {
    notification: Notification!
  }
`
