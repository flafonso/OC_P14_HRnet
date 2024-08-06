import { Link } from "react-router-dom";
import EmployeeList from "../features/employeeList/EmployeeList";

function EmployeeListPage() {
  return (
    <div id="employee-div" className="container">
      <h1>Current Employees</h1>
      <EmployeeList />
      <Link to="/">Home</Link>
    </div>
  );
}

export default EmployeeListPage;
