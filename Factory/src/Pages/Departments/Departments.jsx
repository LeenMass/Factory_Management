import { useEffect, useState } from "react";
import Table from "../../Components/Table";
import { useNavigate } from "react-router-dom";
import { getDepartments } from "./departmentsUtils";

const Departments = () => {
  const [departments, setDepartments] = useState([]);
  const navigate = useNavigate();

  const columns = [
    { title: "Department", dataIndex: "Department", type: "link" },
    { title: "Manager", dataIndex: "Manager" },
    { title: "Employees", dataIndex: "Employees", type: "link-list" },
  ];
  const getAllDepartments = async () => {
    try {
      const { data } = await getDepartments();
      const formatedData = data.map((dep) => {
        return {
          id: dep.id,
          Manager: dep.Manager,
          Department: {
            text: dep.Department,
            route: "Departments",
            id: dep.id,
          },
          Employees: Array.isArray(dep.Employees)
            ? dep.Employees.map((emp) => ({
                ...emp,
                text: emp.name || "Unknown",
                id: emp.id,
                route: "editEmployee",
              }))
            : [],
        };
      });
      console.log("Formatted departments:", formatedData);

      setDepartments(formatedData);
    } catch (err) {
      alert(`failed to fetch departments`);
    }
  };
  const addDepartment = () => {
    navigate("/AddDepartment");
  };
  console.log("Formatted Departments:", departments);

  useEffect(() => {
    getAllDepartments();
  }, []);

  return (
    <div>
      Departments
      <Table source={departments} columns={columns} />
      <button onClick={addDepartment}>Add Department</button>
    </div>
  );
};

export default Departments;
