import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FormFields } from "./EmployeeForm";

type FormattedFormFields = Omit<FormFields, "dateOfBirth" | "startDate"> & {
  dateOfBirth: string;
  startDate: string;
}

export interface EmployeeList {
  employees: FormattedFormFields[];
}

const initialState: EmployeeList = {
  employees: [],
};

const employeesSlice = createSlice({
  name: "employeeList",
  initialState,
  reducers: {
    addEmployee(state, action: PayloadAction<FormattedFormFields>) {
      state.employees.push(action.payload);
    },
  },
});

export const { addEmployee } = employeesSlice.actions;
export default employeesSlice;
