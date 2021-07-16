/** @format */
import { combineReducers } from "redux";
import alert from "./alert/alert.reducer"
import user from "./user/user.reducer"

export default combineReducers({
  alert,
  user,
});


