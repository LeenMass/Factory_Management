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

  const users = useSelector((state) => state.employees);
  console.log(users);
  const columns = [
    { title: "Id", dataIndex: "id" },
    { title: "Department", dataIndex: "Department" },
    { title: "Manager", dataIndex: "Full_Name" },
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

  const addDepartment = () => {
    navigate("/AddDepartment");
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
      <button onClick={addDepartment}>Add Department</button>
    </div>
  );
};

export default Departments;
