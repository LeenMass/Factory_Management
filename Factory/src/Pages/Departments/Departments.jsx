import { useEffect, useState } from "react";
import Table from "../../Components/Table";
import { useNavigate } from "react-router-dom";
import { getDepartments } from "./departmentsUtils";

const Departments = () => {
  const [departments, setDepartments] = useState([]);
  const navigate = useNavigate();

  const columns = [
    { title: "Department", dataIndex: "department", type: "link" },
    { title: "Manager", dataIndex: "managerName" },
    { title: "Employees", dataIndex: "employees", type: "link-list" },
  ];

  const getAllDepartments = async () => {
    try {
      const { data } = await getDepartments();
      const formatedData = data.map((dep) => {
        return {
          id: dep.id,
          managerName: dep.managerName,
          department: {
            text: dep.department,
            route: "Departments",
            id: dep.id,
          },
          employees: Array.isArray(dep.employees)
            ? dep.employees.map((emp) => ({
                ...emp,
                text: emp.name || "Un known",
                id: emp.id,
                route: "editEmployee",
              }))
            : [],
        };
      });
      setDepartments(formatedData);
    } catch (err) {
      alert(`failed to fetch departments`);
    }
  };
  const addDepartment = () => {
    navigate("/AddDepartment");
  };

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
