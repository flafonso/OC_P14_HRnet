import { Link } from "react-router-dom";
import EmployeeForm from "../features/employeeForm/EmployeeForm";
import { useState } from "react";
import Modal from "../components/modal/Modal";

function CreateEmployeePage() {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const closeModal = () => {
    setIsOpen(false);
  };
  const handleFormSubmit = () => {
    setIsOpen(true);
  };

  return (
    <>
      <div className="title">
        <h1>HRnet</h1>
      </div>
      <div className="container">
        <Link to="employee-list">View Current Employees</Link>
        <h1>Create Employee</h1>
        <EmployeeForm onSubmitSuccess={handleFormSubmit} />
        <br />
        <br />
        <br />
        <Modal
          isOpen={isOpen}
          onClose={closeModal}
          content="Employee Created!"
        />
        <br />
        <br />
      </div>
    </>
  );
}

export default CreateEmployeePage;
