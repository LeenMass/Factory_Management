import React, { useState } from "react";
import EmployeesDropdown from "../../Components/EmployeesDropdown";
import axios from "axios";

const departmentUrl = "http://localhost:4000/departments";
const AddDepartment = () => {
  const [data, setData] = useState({ name: "", manager: "" });

  const handelSubmit = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const saveDepartment = async () => {
    try {
      const { data: departmentData } = await axios.post(departmentUrl, data);

      return departmentData;
    } catch (error) {
      console.error("Error saving employee:", error);
    }
  };
  return (
    <div>
      <form onSubmit={saveDepartment}>
        AddDepartment <input type="text" name="name" onChange={handelSubmit} />
        <EmployeesDropdown select={handelSubmit} selected={data.manager} />
        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export default AddDepartment;
