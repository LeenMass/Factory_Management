import axios from "axios";
import React, { useEffect, useState } from "react";

const departmentUrl = "http://localhost:4000/departments";

const DepartmentsDropdown = (props) => {
  const [departments, setDepartments] = useState([]);
  console.log(props.selected);
  const getDepartments = async () => {
    const { data } = await axios.get(departmentUrl);

    setDepartments(data);
  };
  useEffect(() => {
    getDepartments();
  }, []);
  return (
    <div>
      <select
        onChange={(e) =>
          props.select({
            target: { value: e.target.value, name: "department_id" },
          })
        }
        name="department_id"
        defaultValue={props.selected}
        selected
      >
        <option value="" disabled>
          select Department
        </option>
        {departments.map((dep) => {
          return (
            <option value={dep.id} key={dep.id}>
              {dep.Department}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default DepartmentsDropdown;
