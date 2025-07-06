import axios from "axios";
import React, { useEffect, useState } from "react";
import DepartmentsDropdown from "../../Components/DepartmentsDropdown";
import { useNavigate } from "react-router-dom";
const EmployeesUrl = "http://localhost:4000/employees";

const AddEmployee = () => {
  const [newEmployee, setNewEmployee] = useState({
    first_name: "",
    last_name: "",
    start_work_year: "",
    department_id: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewEmployee({ ...newEmployee, [name]: value });
  };
  const cancelBtn = (e) => {
    e.preventDefault();
    navigate("/Employees");
  };
  const saveEmployee = async (e) => {
    e.preventDefault();
    try {
      await axios.post(EmployeesUrl, newEmployee);
      alert(
        `New Employee ${newEmployee.first_name} ${newEmployee.last_name}  has been added successfully.`
      );
      setNewEmployee({
        first_name: "",
        last_name: "",
        start_work_year: "",
        department_id: "",
      });
    } catch (error) {
      alert(
        `Failed to add ${newEmployee.first_name} ${newEmployee.last_name},
        ${error}
      `
      );
    }
  };
  return (
    <div>
      Add Employee
      <form>
        <input
          name="first_name"
          type="text"
          value={newEmployee.first_name}
          placeholder="enter employee's first_name"
          onChange={handleChange}
        />
        <input
          name="last_name"
          type="text"
          value={newEmployee.last_name}
          placeholder="enter employee's last_name"
          onChange={handleChange}
        />
        <input
          name="start_work_year"
          type="number"
          placeholder="start_year"
          onChange={handleChange}
          value={newEmployee.start_work_year}
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
