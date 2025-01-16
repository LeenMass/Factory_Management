import axios from "axios";
import React, { useEffect, useState } from "react";
import Table from "../../Components/Table";

import AddEmployee from "./AddEmployee";
const EmployeesUrl = "http://localhost:4000/employees";

const Employess = () => {
  const [employees, setEmployees] = useState([]);
  const [addEmployee, setAddEmployee] = useState(false);

  const columns = [
    { title: "Id", dataIndex: "id" },
    { title: "full name", dataIndex: "full_name" },
    { title: "start_work", dataIndex: "start_work_year" },
  ];

  const getAllEmployees = async () => {
    const { data } = await axios.get(EmployeesUrl);
    const employeesData = data.map((emp) => {
      return {
        id: emp._id,
        full_name: emp.first_name + " " + emp.last_name,
        start_work_year: emp.start_work_year,
      };
    });

    setEmployees(employeesData);
  };

  useEffect(() => {
    getAllEmployees();
  }, []);
  return (
    <div>
      Employess <Table columns={columns} source={employees} />
      <button onClick={() => setAddEmployee(!addEmployee)}>Add employee</button>
      {addEmployee ? <AddEmployee /> : ""}
    </div>
  );
};

export default Employess;
