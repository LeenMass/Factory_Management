import { useEffect, useState } from "react";
import { getDepartments } from "../Pages/Departments/departmentsUtils";

const DepartmentsDropdown = (props) => {
  const [departments, setDepartments] = useState([]);

  const getDepartmentsData = async () => {
    const { data } = await getDepartments();
    setDepartments(data);
  };
  useEffect(() => {
    getDepartmentsData();
  }, []);
  return (
    <div>
      <select
        onChange={(e) =>
          props.select({
            target: { value: e.target.value, name: "department_id" },
          })
        }
        value={props.selected}
      >
        <option value="">select All Department</option>
        {departments.map((dep) => {
          return (
            <option value={dep.id} key={dep.id}>
              {dep.department}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default DepartmentsDropdown;
