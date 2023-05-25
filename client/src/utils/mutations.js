import { gql } from '@apollo/client';

export const ADD_PROFILE = gql`
mutation addProfile($name: String!, $email: String!, $password: String!) {
    addProfile(name: $name, email: $email, password: $password) {
      profile {
        _id
        name
      }
      token
    }
  }`;

  export const LOGIN_PROFILE = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      profile {
        _id
        name
      }
    }
  }`;
  export const REMOVE_PROFILE= gql`
  mutation removeProfile($profileId: ID!) {
    removeProfile(profileId: $profileId) {
      _id
    }
  }`;
  export const SAVE_FOOD= gql`
mutation SaveFood($name: String!, $calories: Int!) {
    saveFood(name: $name, calories: $calories) {
      _id
      name
      savedFoods {
        calories
        name
      }
      totalCalories
    }
  }`;

