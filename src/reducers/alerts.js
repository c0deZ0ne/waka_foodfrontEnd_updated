import { SUCCESS_ALERT, ERROR_ALERT, REMOVE_ALERT } from "../actions/types";

const initialState = {
  error: null,
  success: null,
  message: "",
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case SUCCESS_ALERT:
      return {
        ...state,
        success: true,
        message: payload.message,
      };
    case ERROR_ALERT:
      return {
        ...state,
        error: true,
        message: payload.message,
      };
    case REMOVE_ALERT:
      return {
        ...state,
        error: null,
        success: null,
        message: "",
      };
    default:
      return state;
  }
}
