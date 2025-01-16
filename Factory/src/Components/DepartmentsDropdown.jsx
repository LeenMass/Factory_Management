import axios from "axios";
import React, { useEffect, useState } from "react";

const departmentUrl = "http://localhost:4000/departments";

const DepartmentsDropdown = (props) => {
  const [departments, setDepartments] = useState([]);

  const getDepartments = async () => {
    const { data } = await axios.get(departmentUrl);

    setDepartments(data);
  };
  useEffect(() => {
    getDepartments();
  }, []);
  return (
    <div>
      Departments Dropdown
      <select
        onChange={(e) =>
          props.select({
            target: { value: e.target.value, name: "department_id" },
          })
        }
        value={""}
        name="department_id"
      >
        <option value=" " disabled>
          Select a department
        </option>
        {departments.map((dep) => {
          return (
            <option value={dep._id} key={dep._id}>
              {dep.name}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default DepartmentsDropdown;
