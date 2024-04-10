import { configureStore } from "@reduxjs/toolkit";
import employeeReducer from "./employeeSlice";
export default configureStore({
  reducer: {
    employee: employeeReducer,
  },
});
