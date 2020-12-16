const { gql } = require('apollo-server-express')

module.exports = gql`
  scalar Date

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

  type Employee {
    empNo: ID
    firstName: String
    lastName: String
    middleName: String
    Designation: String
    PermanentAddress: String
    PermanentCity: String
    CurrentAddress: String
    CurrentCity: String
    phone: String
    email: String
    joiningDate: Date
    resignDate: Date
    status: String
    nic: String
  }

  type Student {
    regNo: ID
    appNo: String
    firstName: String
    lastName: String
    middleName: String
    fatherName: String
    email: String
    sex: String
    uaarRegNo: String
    maritalStatus: String
    birthDate: String
    nic: String
    currentAddress: String
    currentCity: String
    permanentAddress: String
    permanentCity: String
    phone: String
    admissionStatus: String
    session: String
    prefOne: String
    prefTwo: String
    admissionDate: Date
    semester: String
    remarks: String
    status: String
    section: String
  }

  type Notification {
    title: String!
  }

  type User {
    id: ID!
    username: String!
    password: String!
    role: String!
    groups: [Group]!
    groupsOwned: [Group]!
    posts: [Post]!
    comments: [Comment]!
    createdAt: String!
    updatedAt: String!
  }

  type Group {
    id: ID!
    name: String!
    description: String!
    logo: String!
    cover: String!
    owner: User!
    members: [User]!
    posts: [Post]
    createdAt: String!
    updatedAt: String!
  }

  type File {
    filename: String!
    mimetype: String!
    encoding: String!
  }

  type Post {
    id: ID!
    title: String!
    text: String!
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
    employee(empNo: ID!): Employee!
    employees: [Employee]!
    student(regNo: ID!): Student!
    students: [Student]!
    users: [User]!
    user(username: ID!): User
    groups: [Group]!
    group(id: ID!): Group!
    posts: [Post]!
    post(id: ID!): Post!
    whoami: User! @authenticated
  }

  input PostInput {
    title: String!
    text: String!
    media: String!
    group: ID!
  }

  type Mutation {
    login(input: AuthInput!): AuthPayload!
    pushNotification(title: String!): Notification!
    createPost(input: PostInput!): Post! @authenticated
  }

  type Subscription {
    notification: Notification!
  }
`
