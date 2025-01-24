import axios from "axios";
import React, { useEffect, useState } from "react";

const EmployeesDropdown = (props) => {
  console.log(props.selected);
  const EmployeesUrl = "http://localhost:4000/employees";

  const [employees, setEmployees] = useState([]);

  const getAllEmployees = async () => {
    const { data } = await axios.get(EmployeesUrl);
    console.log(data);
    setEmployees(data);
  };

  useEffect(() => {
    getAllEmployees();
  }, []);
  return (
    <div>
      Employees
      <select
        onChange={(e) =>
          props.select({
            target: { value: e.target.value, name: "manager" },
          })
        }
        name="manager"
        value={props.selected}
        selected
      >
        <option value="" disabled>
          Select a manager
        </option>
        {employees.map((emp) => {
          return (
            <option value={emp.id} key={emp.id}>
              {emp.Full_Name}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default EmployeesDropdown;
