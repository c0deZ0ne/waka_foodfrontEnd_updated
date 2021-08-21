import {FETCH_ALL_CATEGORIES,CREATE_NEW_CATEGORY} from "../constants/actionTypes";


const initialState = {
  categories: [],
};

export default function categories_reducer (state = initialState, action) {
  const { type, payload} = action;

  switch (type) {
    case FETCH_ALL_CATEGORIES:
      return {
        ...state,
        categories: payload,
      };
      case CREATE_NEW_CATEGORY:
        console.log(state)
      return {
        ...state, categories:[...initialState, action.payload],
        
      };
      
    default:
      return state;
  }
}
