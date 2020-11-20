const { gql } = require('apollo-server-express')

const typeDefs = gql`
  scalar Date

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

  type User {
    username: String!
    firstName: String!
    middleName: String!
    lastName: String!
    email: String!
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
    whoami: User!
  }

  type Mutation {
    login(input: AuthInput!): AuthPayload!
  }
`

module.exports = typeDefs
