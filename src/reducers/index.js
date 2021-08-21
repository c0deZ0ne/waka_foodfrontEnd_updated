import { combineReducers } from "redux";
import alert from "./alerts";
import auth from "./auth";
import page from "./page";
import food from "./food";
import categories_reducer from  "./categories_reducer"

export default combineReducers({
  alert,
  categories_reducer,
  auth,
  page,
  food,
});
