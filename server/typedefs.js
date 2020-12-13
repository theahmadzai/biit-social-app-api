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
  }

  type Group {
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

  type Post {
    text: String!
    media: String!
    user: User!
    group: Group!
    comments: [Comment]
  }

  type Comment {
    content: String!
    user: User!
    post: Post!
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
    user(username: ID!): User
    users: [User]!
    groups: [Group]!
    posts: [Post]!
    whoami: User! @authenticated
  }

  type Mutation {
    login(input: AuthInput!): AuthPayload!
    pushNotification(title: String!): Notification!
  }

  type Subscription {
    notification: Notification!
  }
`
