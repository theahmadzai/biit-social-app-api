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

  input SearchUsersInput {
    query: String!
  }

  input CreateGroupInput {
    name: String!
    description: String!
    image: Upload!
  }

  input AddGroupMemberInput {
    username: String!
    groupId: ID!
  }

  input CreatePostInput {
    text: String
    media: [Upload!]
    groupId: ID!
  }

  input CreateCommentInput {
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

  type Notification {
    title: String!
  }

  type File {
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
    members: [User]!
    posts: [Post]
    createdAt: String!
    updatedAt: String!
  }

  type Post {
    id: ID!
    text: String
    user: User!
    group: Group!
    media: [File]
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

  type AuthPayload {
    token: String!
    user: User!
  }

  input AuthInput {
    username: String!
    password: String!
  }

  type Query {
    course(code: ID!): Course
    courses: [Course]
    users: [User]!
    user(id: ID!): User
    groups: [Group]!
    group(id: ID!): Group
    posts: [Post]!
    post(id: ID!): Post
    getUserGroupsOwned(id: ID!): [Group]!
    getUserGroups(id: ID!): [Group]!
    getUserPosts(id: ID!): [Post]!
    getUserComments(id: ID!): [Comment]!
    getGroupPosts(id: ID!): [Post]!
    getGroupMembers(id: ID!): [User]!
    getPostComments(id: ID!): [Comment]!
    searchUsers(input: SearchUsersInput!): [User]!
    whoami: User! @authenticated
  }

  type Mutation {
    login(input: AuthInput!): AuthPayload!
    createGroup(input: CreateGroupInput!): Group! @authenticated
    addGroupMember(input: AddGroupMemberInput!): User! @authenticated
    createPost(input: CreatePostInput!): Post! @authenticated
    createComment(input: CreateCommentInput!): Comment! @authenticated
    pushNotification(title: String!): Notification!
  }

  type Subscription {
    notification: Notification!
  }
`
