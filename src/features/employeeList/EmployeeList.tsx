import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { DataTable } from "@flafonso/react-datatable-component";

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
    return state.employeeList.employees;
  });

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
