import { LOGIN_SUCCESS, LOGIN_FAIL, STOP_LOAD, GET_CATEGORIES } from "./types";
import { showError, showSuccess } from "./alerts";
import axios from "axios";

// LOGIN
export const login = (email, password) => async (dispatch) => {
  const config = {
    headers: {
      Accept: "application/json",
      "Content-type": "application/json",
    },
  };
  const body = JSON.stringify({ email, password });
  console.log("loggging in", `${process.env.REACT_APP_API_URL}/admin/login`);
  try {
    const res = await axios.post(
      `${process.env.REACT_APP_API_URL}/admin/login`,
      body,
      config
    );
    if (res.data.error) {
      dispatch({
        type: LOGIN_FAIL,
        payload: res.data.error,
      });
      // throw alert
      dispatch(showError(res.data.error));
      // stop screen loading
      dispatch({
        type: STOP_LOAD,
      });
    } else {
      console.log(res.data);
      // getting the admin details
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data,
      });
      // throw an alert
      dispatch(showSuccess("Welcome back.. Please check latest orders"));
      // stop screen loading
      dispatch({
        type: STOP_LOAD,
      });
      // get the categories attacched to it
      dispatch({
        type:GET_CATEGORIES,
        payload:res.data.categories
      })
    }
  } catch (err) {
    dispatch({
      type: LOGIN_FAIL,
    });
    // throw alert
    dispatch(showError("No network connected"));
    // stop screen loading
    dispatch({
      type: STOP_LOAD,
    });
  }
};
