const { gql } = require("apollo-server-express");

const typeDefs = gql`
  # scalar Date
  # scalar Time
  # scalar DateTime

  type User {
    _id: ID
    username: String
    email: String
    password: String
    userMeds: [Med]!
  }

  type Med {
    _id: ID
    userId: ID
    medName: String!
    maxDailyDoses: String
    minTimeBetween: String
    remindersBool: String!
    doses: [Dose]
  }

  type Dose {
    _id: ID!
    userId: ID!
    medId: ID!
    doseDate: String
    doseTime: String
    doseLogged: String
  }

  type Auth {
    token: ID!
    user: User
  }

  input MedInput {
    medId: ID
    medName: String!
    maxDailyDoses: String
    minTimeBetween: String
    remindersBool: String!
  }

  input MedUpdate {
    medId: ID
    medName: String!
    maxDailyDoses: String!
    minTimeBetween: String!
    remindersBool: String!
  }

  input DoseInput {
    medId: ID
    doseDate: String
    doseTime: String
    doseLogged: String
  }

  input DoseUpdate {
    doseId: ID
    doseDate: String
    doseTime: String
    doseLogged: String
  }

  type Query {
    med(medId: ID): Med
    meds: [Med]
    dosesByDate(date: String): [Dose]
    me: User
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth

    addMed(medSettings: MedInput!): Med
    addDose(doseData: DoseInput!): Dose

    updateMed(medData: MedUpdate!): Med
    updateDose(doseData: DoseUpdate!): Dose
  }
`;

module.exports = typeDefs;
