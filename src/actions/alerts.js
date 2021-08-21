// import { v4 as uuid } from "uuid";
import { SUCCESS_ALERT, ERROR_ALERT} from "./types";

export const showSuccess = (message) => (dispatch) => {
  dispatch({
    type: SUCCESS_ALERT,
    payload: { message },
  });
};

export const showError = (message) => (dispatch) => {
  dispatch({
    type: ERROR_ALERT,
    payload: { message },
  });
};
