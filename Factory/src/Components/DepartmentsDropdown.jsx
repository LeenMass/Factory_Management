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
      <select
        onChange={(e) =>
          props.select({
            target: { value: e.target.value, name: "depId" },
          })
        }
        name="depId"
        value={props.selected}
      >
        <option value="">select Department</option>
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
