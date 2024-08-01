import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FormFields } from "./EmployeeForm";

export interface EmployeeList {
  employees: FormFields[];
}

const initialState: EmployeeList = {
  employees: [],
};

const employeesSlice = createSlice({
  name: "employeeList",
  initialState,
  reducers: {
    addEmployee(state, action: PayloadAction<FormFields>) {
      // console.log(state);
      // console.log(action);
      state.employees.push(action.payload);
    },
  },
});

export const { addEmployee } = employeesSlice.actions;
export default employeesSlice;
