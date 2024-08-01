import { configureStore } from "@reduxjs/toolkit";
import employeesSlice from "../features/employeeForm/employeeSlice";

const state = {};

export const store = configureStore({
  preloadedState: state,
  reducer: {
    employeeList: employeesSlice.reducer,
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;