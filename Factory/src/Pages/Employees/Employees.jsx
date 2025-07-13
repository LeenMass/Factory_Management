import { useEffect, useState } from "react";
import Table from "../../Components/Table";
import { useNavigate } from "react-router-dom";
import DepartmentsDropdown from "../../Components/DepartmentsDropdown";
import { getemployees } from "./utilsEmployees";

const Employees = () => {
  const [selectedEmp, setSelectedEmp] = useState("");
  const [employees, setEmployees] = useState([]);

  const Onchange = (e) => {
    const { name, value } = e.target;
    setSelectedEmp({ ...selectedEmp, [name]: value });
  };
  const navigate = useNavigate();
  const getAllEmployees = async () => {
    const { data } = await getemployees();
    const formatedEmployeesData = data.map((employee) => ({
      id: employee.id,
      employee: {
        text: employee.name,
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
  const employessData =
    selectedEmp.department_id == "" || !selectedEmp.department_id
      ? employees
      : employees.filter(
          (emp) => emp.department_id == selectedEmp.department_id
        );
  const columns = [
    { title: "Full Name", dataIndex: "employee", type: "link" },
    { title: "Department", dataIndex: "Department", type: "link" },
    { title: "Shifts", dataIndex: "shifts", type: "list-items" },
  ];

  const NavigateToAddEmployee = () => {
    navigate("/AddEmployee");
  };
  useEffect(() => {
    getAllEmployees();
  }, []);
  return (
    <div>
      Employess <DepartmentsDropdown select={Onchange} selected={""} />
      <Table columns={columns} source={employessData} />
      <br />
      <button onClick={NavigateToAddEmployee}>New Employee</button>
    </div>
  );
};

export default Employees;
