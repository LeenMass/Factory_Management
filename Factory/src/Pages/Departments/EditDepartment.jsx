import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import EmployeesDropdown from "../../Components/EmployeesDropdown";

const DepartmentsUrl = "http://localhost:4000/departments";

const EditDepartment = () => {
  const [departmen, setDepartmentData] = useState({});
  const { id } = useParams();
  const navigate = useNavigate();

  const getDepartmentData = async () => {
    const { data } = await axios.get(`${DepartmentsUrl}/${id}`);
    setDepartmentData(data);
  };

  const departmentHandle = (e) => {
    const { name, value } = e.target;
    setDepartmentData({ ...departmen, [name]: value });
  };
  const updateData = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(`${DepartmentsUrl}/${id}`, departmen);
      console.log(data);
      return data;
    } catch (error) {
      alert(`Failed to updates the employee Data, Please try again."`);
    }
  };
  useEffect(() => {
    getDepartmentData();
  }, [id]);

  return (
    <div>
      EditDepartment
      <form>
        Department Name:{" "}
        <input
          name="name"
          defaultValue={departmen.name}
          onChange={departmentHandle}
        />
        <EmployeesDropdown
          select={departmentHandle}
          selected={departmen.manager}
        />
        <button onClick={() => navigate("/Departments")}>Cancel</button>
        <button type="button" onClick={updateData}>
          Edit
        </button>
      </form>
    </div>
  );
};

export default EditDepartment;
