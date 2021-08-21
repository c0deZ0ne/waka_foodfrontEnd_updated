import { LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT_SUCCESS } from "../actions/types";

const initialState = {
  isAuthenticated: null,
  id: "",
  email: "",
  first_name: "",
  last_name: "",
  phone_number: "",
  kitchenId:0
};

export default function (state = initialState, action) {
  const { type, payload } = action; //get the icomming auth value from aaction

  switch (type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        id: payload.id,
        email: payload.email,
        first_name: payload.first_name,
        last_name: payload.last_name,
        phone_number: payload.phone_number,
        kitchenId:payload.kitchenId
      };
    case LOGIN_FAIL:
    case LOGOUT_SUCCESS:
      return {
        ...state,
        isAuthenticated: false,
        id: "",
        email: "",
        first_name: "",
        last_name: "",
        phone_number: "",
      };
    default:
      return state;
  }
}
