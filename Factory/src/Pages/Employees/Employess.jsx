import axios from "axios";
import React, { useEffect, useState } from "react";
import Table from "../../Components/Table";

import { useNavigate } from "react-router-dom";
const EmployeesUrl = "http://localhost:4000/employees";

const Employess = () => {
  const [employees, setEmployees] = useState([]);
  const navegate = useNavigate();

  const columns = [
    { title: "Id", dataIndex: "id" },
    { title: "Full Name", dataIndex: "Full_Name" },
    { title: "Department", dataIndex: "Department" },
  ];

  const getAllEmployees = async () => {
    try {
      const { data } = await axios.get(EmployeesUrl);
      setEmployees(data);
    } catch (error) {
      alert(`Failed to fetch Data ,${error}`);
    }
  };
  const NavigateToAddEmployee = () => {
    navegate("/AddEmployee");
  };

  useEffect(() => {
    getAllEmployees();
  }, []);
  return (
    <div>
      Employess{" "}
      <Table
        columns={columns}
        source={employees}
        editE={"Employees"}
        employee_id={"id"}
        editDep={"EditDepartment"}
      />
      <br />
      <button onClick={NavigateToAddEmployee}>New Employee</button>
    </div>
  );
};

export default Employess;
