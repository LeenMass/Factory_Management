import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import EmployeesDropdown from "../../Components/EmployeesDropdown";
import { useSelector } from "react-redux";

const DepartmentsUrl = "http://localhost:4000/departments";

const EditDepartment = () => {
  const employees = useSelector((state) => state.employees);

  const [departmen, setDepartmentData] = useState({});
  const [selectedEmployees, setSelectedEmployees] = useState([]);

  const { id } = useParams();

  const navigate = useNavigate();
  const nn = employees.filter((x) => x.department_id !== id);

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
  const assignEmployeesToDepartment = async () => {
    try {
      console.log(selectedEmployees);
      await Promise.all(
        selectedEmployees?.map(async (empId) => {
          await axios.put(`http://localhost:4000/employees/${empId}`, {
            department_id: id,
          });
        })
      );
      alert("Employees successfully moved to this department.");
      navigate("/Departments");
    } catch (error) {
      alert("Failed to assign employees. Please try again.");
      console.error(error);
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
          choice={"Manager"}
          select={departmentHandle}
          selected={departmen.manager}
          data={employees}
          isMultiple={false}
          name={"manager"}
          placeholder={"Select A Manager"}
        />
        Add New Employe to this Department{" "}
        <button type="button" onClick={deleteData}>
          Delete Department
        </button>{" "}
        <button onClick={() => navigate("/Departments")}>Cancel</button>
        <button type="button" onClick={updateData}>
          Edit
        </button>
      </form>{" "}
      <EmployeesDropdown
        select={(e) => setSelectedEmployees(e.target.value)}
        choice={"Employees"}
        name={"Employees"}
        selected={selectedEmployees}
        data={nn}
        isMultiple={true}
        placeholder={"Select A Employees"}
      />
      <button onClick={assignEmployeesToDepartment}>Add emp</button>
    </div>
  );
};

export default EditDepartment;
