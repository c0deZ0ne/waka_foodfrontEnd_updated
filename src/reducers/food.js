import { GET_CATEGORIES, CLEAR_CATEGORIES } from "../actions/types";

const initialState = {
  categories: [],
  sub_categories : [], 
  foods: [],
  step:[]
};

export default function (state = initialState, action) {
  const { type, payload} = action;

  switch (type) {
    case GET_CATEGORIES:
      return {
        ...state,
        categories: payload,
      };
    case CLEAR_CATEGORIES:
      return {
        ...state,
        categories: [],
      };
    default:
      return state;
  }
}
