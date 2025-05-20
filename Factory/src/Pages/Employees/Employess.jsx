import React, { useState } from "react";
import Table from "../../Components/Table";

import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import DepartmentsDropdown from "../../Components/DepartmentsDropdown";

const Employess = () => {
  const [selectedEmp, setSelectedEmp] = useState("");
  const Onchange = (e) => {
    const { name, value } = e.target;
    setSelectedEmp({ ...selectedEmp, [name]: value });
  };
  const navigate = useNavigate();
  const employees = useSelector((state) => state.employees);
  const employessData =
    selectedEmp.department_id == "" || !selectedEmp.department_id
      ? employees
      : employees.filter(
          (emp) => emp.department_id == selectedEmp.department_id
        );

  const columns = [
    { title: "Full Name", dataIndex: "Full_Name" },
    { title: "Department", dataIndex: "Department" },
  ];

  const NavigateToAddEmployee = () => {
    navigate("/AddEmployee");
  };

  return (
    <div>
      Employess <DepartmentsDropdown select={Onchange} selected={""} />
      <Table
        columns={columns}
        source={employessData}
        editE={"Employees"}
        employee_id={"id"}
        department={"department_id"}
        editDep={"Departments"}
        case2={"Full_Name"}
        case3={"Department"}
      />
      <br />
      <button onClick={NavigateToAddEmployee}>New Employee</button>
    </div>
  );
};

export default Employess;
