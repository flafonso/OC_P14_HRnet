import DataTable from "../../components/dataTable/DataTable";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";

const columns = [
  { title: "First Name", data: "firstName" },
  { title: "Last Name", data: "lastName" },
  { title: "Start Date", data: "startDate" },
  { title: "Department", data: "department" },
  { title: "Date of Birth", data: "dateOfBirth" },
  { title: "Street", data: "street" },
  { title: "City", data: "city" },
  { title: "State", data: "state" },
  { title: "Zip Code", data: "zipCode" },
];

function EmployeeList() {
  const employees = useSelector((state: RootState) => {
    console.log(state);
    return state.employeeList.employees;
  });

  console.log(employees);
  return (
    <>
      <DataTable
        key={employees.length}
        id="employee-table"
        className="display"
        data={employees}
        columns={columns}
      />
    </>
  );
}

export default EmployeeList;
