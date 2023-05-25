const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Profile {
    _id: ID
    name: String
    email: String
    age: Int
    savedFoods: [Food]
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
  
  type Search {
    food_name: String
    serving_unit: String
    tag_name: String
    serving_qty: String
    common_type: String
    tag_id: String
    locale: String
  }
  
  type Query {
    search(search: String!): [Search]
    me: Profile
    profiles: [Profile]!
    profile(profileId: ID!): Profile
  }
  
  type Mutation {
    addProfile(name: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    removeProfile(profileId: ID!): Profile
    saveFood(name: String!, calories: Int!): Profile
  }
`;

module.exports = typeDefs;