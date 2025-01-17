import axios from "axios";
import React, { useState } from "react";
import DepartmentsDropdown from "../../Components/DepartmentsDropdown";
const EmployeesUrl = "http://localhost:4000/employees";

const AddEmployee = () => {
  const [newEmployee, setNewEmployee] = useState({
    first_name: "",
    last_name: "",
    start_work_year: "",
    department_id: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewEmployee({ ...newEmployee, [name]: value });
  };
  const saveEmployee = async () => {
    try {
      console.log(newEmployee);
      const { data } = await axios.post(EmployeesUrl, newEmployee);
      console.log(data);
      return data;
    } catch (error) {
      console.error("Error saving employee:", error);
    }
  };

  return (
    <div>
      AddEmployee
      <form onSubmit={saveEmployee}>
        <input
          name="first_name"
          type="text"
          placeholder="enter employee's first_name"
          onChange={handleChange}
        />
        <input
          name="last_name"
          type="text"
          placeholder="enter employee's last_name"
          onChange={handleChange}
        />
        <input
          name="start_work_year"
          type="number"
          placeholder="start_year"
          onChange={handleChange}
        />
        <DepartmentsDropdown
          select={handleChange}
          selected={newEmployee.department_id}
        />
        <button type="submit">Save Employee</button>
      </form>
    </div>
  );
};

export default AddEmployee;
