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
      await axios.put(`${DepartmentsUrl}/${id}`, departmen);
      navigate("/Departments");
    } catch (error) {
      alert(`Failed to update, Please try again."`);
    }
  };
  const deleteData = async (e) => {
    e.preventDefault();
    const isConfirmed = window.confirm(
      `Are you sure you want to delete ${departmen.name} Department ?`
    );
    if (!isConfirmed) return;
    try {
      await axios.delete(`${DepartmentsUrl}/${id}`);
      navigate("/Departments");
    } catch (err) {
      alert(`Failed to delete This Department, Please try again."`);
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
        <button type="button" onClick={deleteData}>
          Delete Department
        </button>
      </form>
    </div>
  );
};

export default EditDepartment;
