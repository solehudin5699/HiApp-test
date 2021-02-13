import { combineReducers } from "redux";
import authReducer from "./users/auth";
import victimReducer from "./victims/victim";
//Combine reducers
const indexReducer = combineReducers({
  auth: authReducer,
  victim: victimReducer,
});

export default indexReducer;
