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
query Query($search: String!) {
  search(search: $search) {
    food_name
    locale
    serving_qty
    serving_unit
    tag_id
    tag_name
    common_type
  }
}
`;
  