import axios from "axios";
import React, { useEffect, useState } from "react";

const EmployeesDropdown = (props) => {
  const EmployeesUrl = "http://localhost:4000/employees";

  const [employees, setEmployees] = useState([]);

  const getAllEmployees = async () => {
    const { data } = await axios.get(EmployeesUrl);

    setEmployees(data);
  };

  useEffect(() => {
    getAllEmployees();
  }, []);
  return (
    <div>
      Departments Dropdown
      <select
        onChange={(e) =>
          props.select({
            target: { value: e.target.value, name: "manager" },
          })
        }
        name="manager"
        defaultValue={props.selected}
      >
        <option value="" disabled>
          Select a manager
        </option>
        {employees.map((emp) => {
          return (
            <option value={emp._id} key={emp._id}>
              {emp.first_name + " " + emp.last_name}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default EmployeesDropdown;
