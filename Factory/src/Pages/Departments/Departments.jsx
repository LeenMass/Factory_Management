import React, { useEffect, useState } from "react";
import AddDepartment from "./AddDepartment";
import axios from "axios";
import Table from "../../Components/Table";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const departmentUrl = "http://localhost:4000/departments";
const EmployeesUrl = "http://localhost:4000/employees";

const Departments = () => {
  const [departments, setDepartments] = useState([]);
  const navigate = useNavigate();

  const columns = [
    { title: "Id", dataIndex: "id" },
    { title: "Department", dataIndex: "Department" },
    { title: "Manager", dataIndex: "Full_Name" },
    { title: "Employees", dataIndex: "Employees" },
  ];
  const getAllDepartments = async () => {
    try {
      const { data } = await axios.get(departmentUrl);
      setDepartments(data);
    } catch (err) {
      console.log(err);
    }
  };
  console.log(departments);
  const addDepartment = () => {
    navigate("/AddDepartment");
  };
  useEffect(() => {
    getAllDepartments();
  }, []);

  return (
    <div>
      Departments
      <Table
        source={departments}
        columns={columns}
        editE={"Employees"}
        editDep={"Departments"}
        employee_id={"Manager"}
        department={"id"}
        case1={"Employees"}
        case2={"Full_Name"}
        case3={"Department"}
      />
      <button onClick={addDepartment}>Add Department</button>
    </div>
  );
};

export default Departments;
