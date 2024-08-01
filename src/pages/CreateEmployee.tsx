import { Link } from "react-router-dom";

function CreateEmployee() {
  return (
    <>
      <h1>Create Employee</h1>
      <Link to="employee-list">View Current Employees</Link>
    </>
  );
}

export default CreateEmployee;
