const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Profile {
    _id: ID
    name: String
    email: String
    password: String
    age: Int
    savedFoods:[Food]
    totalCalories: Int 
  }
  type Food {
    name: String
    calories: Int 
  }
  type Auth {
    token: ID!
    profile: Profile
  }

  type Query {
    me: Profile 
    profiles: [Profile]!
    profile(profileId: ID!): Profile
  }

  type Mutation {
    addProfile(name: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    removeProfile (profileId:ID!): Profile
    saveFood (name:String!, calories:Int!): Profile


  }
`;

module.exports = typeDefs;
