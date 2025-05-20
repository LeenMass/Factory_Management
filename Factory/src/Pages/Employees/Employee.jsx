import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import DepartmentsDropdown from "../../Components/DepartmentsDropdown";
const EmployeesUrl = "http://localhost:4000/employees";

const Employee = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [employee, setEmployee] = useState({});
  const [employeData, setData] = useState({});
  const [edit, setEdit] = useState(false);
  const getmployeeData = async () => {
    const { data } = await axios.get(`${EmployeesUrl}/${id}`);
    setEmployee(data);
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...employeData, [name]: value });
  };
  const updateData = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(`${EmployeesUrl}/${id}`, employeData);
      return data;
    } catch (error) {
      alert(`Failed to updates the employee Data, Please try again."`);
    }
  };
  const deleteEmployee = async (e) => {
    e.preventDefault();
    const isConfirmed = window.confirm(
      `Are you sure you want to delete ${
        employee.first_name + " " + employee.last_name
      }?`
    );
    if (!isConfirmed) return;
    try {
      await axios.delete(`${EmployeesUrl}/${id}`);
      navigate("/Employees");
    } catch (error) {
      alert("Failed to delete the employee, Please try again.");
    }
  };

  useEffect(() => {
    getmployeeData();
  }, [id]);
  return (
    <div>
      Employee
      <h3>{employee.first_name}</h3>
      <h2>{employee.last_name}</h2>
      Department :
      <DepartmentsDropdown selected={employee.department_id} />
      <button onClick={() => setEdit(!edit)}>Edit</button>
      {edit && (
        <form>
          First Name:{" "}
          <input
            name="first_name"
            defaultValue={employee.first_name}
            onChange={handleChange}
          />
          Last Name:{" "}
          <input
            name="last_name"
            defaultValue={employee.last_name}
            onChange={handleChange}
          />
          Department :
          <DepartmentsDropdown
            select={handleChange}
            selected={employeData.department_id}
          />
          <button onClick={updateData}>Update</button>
          <button onClick={() => setEdit(false)}>Cancel</button>
          <button onClick={deleteEmployee} type="button">
            Delete
          </button>
        </form>
      )}
    </div>
  );
};

export default Employee;
