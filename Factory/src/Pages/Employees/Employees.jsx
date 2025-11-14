import { useEffect, useState } from "react";
import Table from "../../Components/Table";
import { useNavigate } from "react-router-dom";
import DepartmentsDropdown from "../../Components/DepartmentsDropdown";
import { getemployees } from "./employeesUtils";
import axios from "axios";

const Employees = () => {
  const [selectedEmp, setSelectedEmp] = useState("");
  const [employees, setEmployees] = useState([]);
  const navigate = useNavigate();
  const columns = [
    { title: "Full Name", dataIndex: "employee", type: "link" },
    { title: "Department", dataIndex: "Department", type: "link" },
    { title: "Shifts", dataIndex: "shifts", type: "list-items" },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSelectedEmp({ ...selectedEmp, [name]: value });
  };

  const getAllEmployees = async () => {
    const { data } = await getemployees();

    if (!data || data.length === 0) {
      alert("No data received - check auth");
    }
    const formatedEmployeesData = data.map((employee) => ({
      id: employee.id,
      employee: {
        text: employee.first_name + " " + employee.last_name,
        id: employee.id,
        route: "editEmployee",
      },
      Department: {
        text: employee.Department,
        id: employee.department_id,
        route: "Departments",
      },
      shifts: employee.shifts || [],
    }));

    setEmployees(formatedEmployeesData);
  };
  const employeesData =
    selectedEmp.department_id == "" || !selectedEmp.department_id
      ? employees
      : employees.filter(
          (emp) => emp.Department.id == selectedEmp.department_id
        );

  const NavigateToAddEmployee = () => {
    navigate("/AddEmployee");
  };

  useEffect(() => {
    getAllEmployees();
  }, []);

  return (
    <div>
      Employess{" "}
      <DepartmentsDropdown
        select={handleChange}
        selected={selectedEmp.department_id}
      />
      <Table columns={columns} source={employeesData} op1={"case1"} />
      <br />
      <button onClick={NavigateToAddEmployee}>New Employee</button>
    </div>
  );
};

export default Employees;
