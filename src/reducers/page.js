import { START_LOAD, STOP_LOAD } from "../actions/types";

const initialState = {
  loading: null,
};

export default function (state = initialState, action) {
  const { type} = action;

  switch (type) {
    case START_LOAD:
      return {
        ...state,
        loading: true,
      };
    case STOP_LOAD:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
}

