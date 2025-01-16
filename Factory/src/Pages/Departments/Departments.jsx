import React, { useState } from "react";
import AddDepartment from "./AddDepartment";

const departmentUrl = "http://localhost:4000/departments";
const Departments = () => {
  const [departments, setDepartments] = useState([]);
  return (
    <div>
      Departments
      <AddDepartment />
    </div>
  );
};

export default Departments;
