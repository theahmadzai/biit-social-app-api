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
    groupId: ID!
  }

  input CommentInput {
    content: String!
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
    status: String
    section: String
  }

  type TeacherProfile implements Profile {
    firstName: String
    middleName: String
    lastName: String
    designation: String
    currentAddress: String
    currentCity: String
    phone: String
    email: String
    joiningDate: String
    resignDate: String
    status: String
  }

  type AdminProfile implements Profile {
    firstName: String
    middleName: String
    lastName: String
    designation: String
    currentAddress: String
    currentCity: String
    phone: String
    email: String
    joiningDate: String
    resignDate: String
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
    posts: [Post]
    createdAt: String!
    updatedAt: String!
  }

  type Post {
    id: ID!
    text: String
    media: [Media]
    user: User!
    group: Group!
    comments: [Comment]
    createdAt: String!
    updatedAt: String!
  }

  type Comment {
    id: ID!
    content: String!
    user: User!
    post: Post!
    createdAt: String!
    updatedAt: String!
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
    userGroups(id: ID!): [Group]!
    userPosts(id: ID!): [Post]!
    userComments(id: ID!): [Comment]!
    groupPosts(id: ID!): [Post]!
    groupUsers(id: ID!): [User]!
    postComments(id: ID!): [Comment]!
    searchUsers(input: SearchUsersInput!): [User]!
    whoami: User! @authenticated
  }

  type Mutation {
    login(input: AuthInput!): AuthPayload!
    createGroup(input: GroupInput!): Group! @authenticated
    deleteGroup(id: ID!): Group! @authenticated
    addGroupUser(input: GroupUserInput!): User! @authenticated
    removeGroupUser(input: GroupUserInput!): User! @authenticated
    createGroupPost(input: PostInput!): Post! @authenticated
    createPostComment(input: CommentInput!): Comment! @authenticated
    pushNotification(title: String!): Notification!
  }

  type Subscription {
    notification: Notification!
  }
`
