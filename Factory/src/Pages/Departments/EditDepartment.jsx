import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import EmployeesDropdown from "../../Components/EmployeesDropdown";
import { useSelector } from "react-redux";

const DepartmentsUrl = "http://localhost:4000/departments";
const EmployeesUrl = "http://localhost:4000/employees";

const EditDepartment = () => {
  const employees = useSelector((state) => state.employees);

  const [departmen, setDepartmentData] = useState({});
  const { id } = useParams();
  const navigate = useNavigate();
  const nn = employees.filter((x) => x.department_id !== id);
  console.log(nn);
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
  const updateEData = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(`${EmployeesUrl}/${id}`, employeData);
      console.log(data);
      return data;
    } catch (error) {
      alert(`Failed to updates the employee Data, Please try again."`);
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
          data={employees}
          placeholder={"Select A Manager"}
        />
        <button onClick={() => navigate("/Departments")}>Cancel</button>
        <button type="button" onClick={updateData}>
          Edit
        </button>
        <button type="button" onClick={deleteData}>
          Delete Department
        </button>
      </form>
      Add New Employe to this Department
      <EmployeesDropdown
        select={departmentHandle}
        selected={""}
        data={nn}
        placeholder={"Select Employee"}
      />
    </div>
  );
};

export default EditDepartment;
