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

  type Course {
    code: ID!
    title: String!
    description: String!
  }

  interface User {
    id: ID!
    username: String!
    password: String!
    role: Role!
    image: String
    groups: [Group]!
    groupsOwned: [Group]!
    posts: [Post]!
    comments: [Comment]!
    createdAt: String!
    updatedAt: String!
  }

  type Student implements User {
    id: ID!
    username: String!
    password: String!
    role: Role!
    image: String
    groups: [Group]!
    groupsOwned: [Group]!
    posts: [Post]!
    comments: [Comment]!
    createdAt: String!
    updatedAt: String!
    firstName: String
    middleName: String
    lastName: String
    fatherName: String
    sex: String
    birthDate: String
    currentAddress: String
    currentCity: String
    phone: String
    session: String
    admissionDate: String
    semester: String
    remarks: String
    status: String
    section: String
  }

  type Teacher implements User {
    id: ID!
    username: String!
    password: String!
    role: Role!
    image: String
    groups: [Group]!
    groupsOwned: [Group]!
    posts: [Post]!
    comments: [Comment]!
    createdAt: String!
    updatedAt: String!
    firstName: String
    lastName: String
    middleName: String
    designation: String
    currentAddress: String
    currentCity: String
    phone: String
    email: String
    joiningDate: String
    resignDate: String
    status: String
  }

  type Admin implements User {
    id: ID!
    username: String!
    password: String!
    role: Role!
    image: String
    groups: [Group]!
    groupsOwned: [Group]!
    posts: [Post]!
    comments: [Comment]!
    createdAt: String!
    updatedAt: String!
    firstName: String
    lastName: String
    middleName: String
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
    teacher(empNo: ID!): Teacher
    teachers: [Teacher]!
    student(regNo: ID!): Student
    students: [Student]!
    users: [User]!
    user(id: ID!): User
    groups: [Group]!
    group(id: ID!): Group
    posts: [Post]!
    post(id: ID!): Post
    getUserGroupsOwned(id: ID!): [Group]
    getUserGroups(id: ID!): [Group]
    getUserPosts(id: ID!): [Post]
    getUserComments(id: ID!): [Comment]
    getGroupPosts(id: ID!): [Post]
    getGroupMembers(id: ID!): [User]
    getPostComments(id: ID!): [Comment]
    whoami: User! @authenticated
  }

  input GroupInput {
    name: String!
    description: String!
    image: Upload!
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

  type Mutation {
    login(input: AuthInput!): AuthPayload!
    createGroup(input: GroupInput!): Group! @authenticated
    createPost(input: PostInput!): Post! @authenticated
    createComment(input: CommentInput!): Comment! @authenticated
    pushNotification(title: String!): Notification!
  }

  type Subscription {
    notification: Notification!
  }
`
