import { gql } from '@apollo/client';

export const QUERY_ME = gql`
query me {
    me {
      name
      email
      _id
      age
      totalCalories
      savedFoods {
        name
        calories
      }
    }
  }
`;