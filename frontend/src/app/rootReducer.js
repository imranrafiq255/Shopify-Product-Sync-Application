import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import dashboardReducer from "../features/dashboard/dashboardSlice";
export default combineReducers({
  auth: authReducer,
  dashboard: dashboardReducer,
});
