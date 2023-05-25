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
export const SEARCHED_FOOD = gql`
query Search($search: String!) {
  search(search: $search) {
    food_name
    serving_unit
    tag_name
    serving_qty
    tag_id
}
}
`;
  