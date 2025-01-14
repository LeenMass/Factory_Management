import axios from "axios";
import React, { useEffect, useState } from "react";
import Table from "../../Components/Table";
const EmployeesUrl = "http://localhost:4000/employees";
const Employess = () => {
  const [employees, setEmployees] = useState([]);

  const columns = [{ title: "full name", dataIndex: "full_name" }];

  const getAllEmployees = async () => {
    const { data } = await axios.get(EmployeesUrl);
    const employeesData = data.map((emp) => {
      return {
        id: emp._id,
        full_name: emp.first_name + " " + emp.last_name,
      };
    });

    setEmployees(employeesData);
  };

  useEffect(() => {
    getAllEmployees();
  }, []);
  return (
    <div>
      Employess
      <Table columns={columns} source={employees} />
    </div>
  );
};

export default Employess;
