import React, { useState } from "react";
import EmployeesDropdown from "../../Components/EmployeesDropdown";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const departmentUrl = "http://localhost:4000/departments";
const AddDepartment = () => {
  const [data, setData] = useState({ name: "", manager: "" });
  const navigate = useNavigate();
  const employees = useSelector((state) => state.employees);

  const handelSubmit = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const saveDepartment = async (e) => {
    e.preventDefault();
    try {
      await axios.post(departmentUrl, data);

      alert(`${data.name} Department added successfully`);
    } catch (error) {
      console.error("Error saving employee:", error);
    }
  };

  const cancelBtn = (e) => {
    e.preventDefault();
    navigate("/Departments");
  };
  return (
    <div>
      <form>
        AddDepartment <input type="text" name="name" onChange={handelSubmit} />
        <EmployeesDropdown
          select={handelSubmit}
          selected={data.manager}
          data={employees}
          name="manager"
          isMultiple={false}
        />
        <button type="submit" onClick={saveDepartment}>
          Save
        </button>
        <button onClick={cancelBtn}>Cancel</button>
      </form>
    </div>
  );
};

export default AddDepartment;
