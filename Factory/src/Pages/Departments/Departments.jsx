import React, { useEffect, useState } from "react";
import AddDepartment from "./AddDepartment";
import axios from "axios";
import Table from "../../Components/Table";

const departmentUrl = "http://localhost:4000/departments";
const Departments = () => {
  const [departments, setDepartments] = useState([]);
  const columns = [
    { title: "Id", dataIndex: "id" },
    { title: "Department", dataIndex: "Department" },
    { title: "Full Name", dataIndex: "Full_Name" },
  ];
  const getAllDepartments = async () => {
    try {
      const { data } = await axios.get(departmentUrl);

      setDepartments(data);
    } catch (err) {
      console.log(err);
    }
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
        editDep={"EditDepartment"}
        employee_id={"Manager"}
        x={""}
      />{" "}
      <AddDepartment />
    </div>
  );
};

export default Departments;
