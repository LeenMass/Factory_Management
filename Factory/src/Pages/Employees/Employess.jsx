import React from "react";
import Table from "../../Components/Table";

import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Employess = () => {
  const navegate = useNavigate();
  const employees = useSelector((state) => state.employees);
  const columns = [
    { title: "Full Name", dataIndex: "Full_Name" },
    { title: "Department", dataIndex: "Department" },
  ];

  const NavigateToAddEmployee = () => {
    navegate("/AddEmployee");
  };

  return (
    <div>
      Employess{" "}
      <Table
        columns={columns}
        source={employees}
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
