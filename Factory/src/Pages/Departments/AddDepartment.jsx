import React, { useState } from "react";
import EmployeesDropdown from "../../Components/EmployeesDropdown";

const departmentUrl = "http://localhost:4000/departments";
const AddDepartment = () => {
  const [data, setData] = useState({ name: "", manager: "" });

  const handelSubmit = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };
  const saveDepartment = async () => {
    try {
      const { data } = await axios.post(departmentUrl);

      return data;
    } catch (error) {
      console.error("Error saving employee:", error);
    }
  };
  return (
    <div>
      AddDepartment
      <form>
        <input type="text" name="name" onChange={handelSubmit} />
        <EmployeesDropdown select={handelSubmit} />
        <button type="submit" onClick={saveDepartment}>
          Save
        </button>
      </form>
    </div>
  );
};

export default AddDepartment;
