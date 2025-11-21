import { useState } from "react";
import DepartmentsDropdown from "../../Components/DepartmentsDropdown";
import { useNavigate } from "react-router-dom";
import { addEmployee } from "./employeesUtils";
import useAction from "../Users/Action";
const AddEmployee = () => {
  const [newEmployee, setNewEmployee] = useState({
    first_name: "",
    last_name: "",
    start_work_year: "",
    department_id: "",
  });
  const navigate = useNavigate();
  const { checkActionNumber } = useAction();

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "first_name" || name === "last_name") {
      const regex = /^[a-zA-Z\s]*$/;
      if (!regex.test(value)) {
        alert(`First name and last name must contain only letters and spaces`);
      }
    }
    setNewEmployee({ ...newEmployee, [name]: value });
  };

  const cancelBtn = (e) => {
    e.preventDefault();
    navigate("/Employees");
  };

  const saveEmployee = async (e) => {
    e.preventDefault();

    checkActionNumber(async () => {
      try {
        await addEmployee(newEmployee);
        alert(
          `New Employee ${newEmployee.first_name} ${newEmployee.last_name}  has been added successfully.`
        );
        setNewEmployee({
          first_name: "",
          last_name: "",
          start_work_year: "",
          department_id: "",
        });
        navigate("/Employees");
      } catch (error) {
        alert(
          `Failed to add ${newEmployee.first_name} ${newEmployee.last_name},
        ${error}
      `
        );
      }
    });
  };
  return (
    <div>
      <h2>Add New Employee</h2>
      <form>
        <input
          name="first_name"
          type="text"
          placeholder="enter employee's first name"
          onChange={handleChange}
        />
        <input
          name="last_name"
          type="text"
          placeholder="enter employee's last name"
          onChange={handleChange}
        />
        <input
          name="start_work_year"
          type="number"
          placeholder="start work year"
          onChange={handleChange}
        />
        <DepartmentsDropdown
          select={handleChange}
          selected={newEmployee.department_id}
        />
        <button onClick={saveEmployee} type="submit">
          Save Employee
        </button>
        <button onClick={cancelBtn}>Cancel</button>
      </form>
    </div>
  );
};

export default AddEmployee;
