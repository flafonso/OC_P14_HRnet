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
      console.log("Employees before:", state.employees);

      state.employees.push(action.payload);

      console.log("Employees after:", state.employees);
    },
  },
});

export const { addEmployee } = employeesSlice.actions;
export default employeesSlice;
