import React, { useEffect, useState } from "react";
import AddDepartment from "./AddDepartment";
import axios from "axios";
import Table from "../../Components/Table";

const departmentUrl = "http://localhost:4000/departments";
const EmployeesUrl = "http://localhost:4000/employees";

const Departments = () => {
  const [departments, setDepartments] = useState([]);
  const columns = [
    { title: "Id", dataIndex: "id" },
    { title: "Department", dataIndex: "Department" },
    { title: "Full Name", dataIndex: "Full_Name" },
    { title: "Employees", dataIndex: "employess" },
  ];
  const getAllDepartments = async () => {
    try {
      const { data } = await axios.get(departmentUrl);
      const z = await Promise.all(
        data.map(async (u) => {
          const { data: employess } = await axios.get(
            `${EmployeesUrl}?department_id=${u.id}`
          );
          return { ...u, employess };
        })
      );
      return z;
    } catch (err) {
      console.log(err);
    }
  };
  const getDepartmentsData = async () => {
    try {
      const finalDepartmentData = await getAllDepartments();

      setDepartments(finalDepartmentData);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getDepartmentsData();
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
        case1={"employess"}
        case2={"Full_Name"}
        case3={"Department"}
      />
      <AddDepartment />
    </div>
  );
};

export default Departments;
