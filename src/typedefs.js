const { gql } = require('apollo-server-express')

module.exports = gql`
  scalar Date

  enum Role {
    EMPLOYEE
    STUDENT
  }

  directive @authenticated on FIELD_DEFINITION
  directive @authorized(role: Role! = EMPLOYEE) on FIELD_DEFINITION

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
    users: [User]! @authenticated
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
