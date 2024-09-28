import { Link } from "react-router-dom";
import EmployeeForm from "../features/employeeForm/EmployeeForm";

function CreateEmployeePage() {
  return (
    <>
      <div className="title">
        <h1>HRnet</h1>
      </div>
      <div className="container">
        <Link to="employee-list">View Current Employees</Link>
        <h1>Create Employee</h1>
        <EmployeeForm />
        <br />
        <br />
        <br />
        <br />
        <br />
      </div>
    </>
  );
}

export default CreateEmployeePage;
