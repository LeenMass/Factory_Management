import { useEffect, useState } from "react";
import { getDepartments } from "../Pages/Departments/utilsDepartments";

const DepartmentsDropdown = (props) => {
  const [departments, setDepartments] = useState([]);

  const getAllDepartments = async () => {
    const { data } = await getDepartments();
    setDepartments(data);
  };
  useEffect(() => {
    getAllDepartments();
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
