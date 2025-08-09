import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import EmployeesDropdown from "../../Components/EmployeesDropdown";
import {
  DeleteDepartment,
  getDepartmentById,
  updateDepartmentData,
} from "./departmentsUtils";
import { getemployees } from "../Employees/employeesUtils";

const EditDepartment = () => {
  const [department, setDepartmentData] = useState(null);
  const [updateDepartment, setUpdateDepartmentData] = useState({
    name: "",
    manager: "",
  });
  const [employeesList, setEmployeesList] = useState([]);
  const [employeesLisWihoutFiltert, setEmployeesListWihoutFiltert] = useState(
    []
  );
  const [selectedEmployees, setSelectedEmployees] = useState([]);

  const { id } = useParams();
  const navigate = useNavigate();

  const getEmployeesList = async () => {
    const { data } = await getemployees();
    setEmployeesListWihoutFiltert(data);
    setEmployeesList(data.filter((x) => x.department_id !== id));
  };

  const getDepartmentData = async () => {
    const { data } = await getDepartmentById(id);
    setDepartmentData(data);
    setUpdateDepartmentData({
      name: data?.name || "",
      manager: data?.manager || "",
    });
  };

  const departmentHandle = (e) => {
    const { name, value } = e.target;
    setUpdateDepartmentData((prev) => ({ ...prev, [name]: value }));
  };

  const updateData = async (e) => {
    e.preventDefault();
    try {
      await updateDepartmentData(id, updateDepartment);
      navigate("/Departments");
    } catch (error) {
      alert(`Failed to update, Please try again."`);
    }
  };

  const deleteData = async (e) => {
    e.preventDefault();
    const isConfirmed = window.confirm(
      `Are you sure you want to delete ${department.name} Department ?`
    );
    if (!isConfirmed) return;
    try {
      await DeleteDepartment(id);
      navigate("/Departments");
    } catch (err) {
      alert(`Failed to delete This Department, Please try again."`);
    }
  };

  const assignEmployeesToDepartment = async () => {
    try {
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
    }
  };

  useEffect(() => {
    getDepartmentData();
  }, [id]);

  useEffect(() => {
    getEmployeesList();
  }, []);

  return (
    <div>
      EditDepartment
      <form onSubmit={updateData}>
        Department Name:{" "}
        <input
          name="name"
          value={updateDepartment.name || ""}
          onChange={departmentHandle}
        />
        <EmployeesDropdown
          choice={"Manager"}
          select={departmentHandle}
          selected={updateDepartment.manager || ""}
          data={employeesLisWihoutFiltert}
          isMultiple={false}
          name={"manager"}
          placeholder={"Select A Manager"}
        />
        Add New Employe to this Department{" "}
        <button type="button" onClick={deleteData}>
          Delete Department
        </button>{" "}
        <button onClick={() => navigate("/Departments")}>Cancel</button>
        <button type="submit" onClick={updateData}>
          Edit
        </button>
      </form>{" "}
      <EmployeesDropdown
        select={(e) => setSelectedEmployees(e.target.value)}
        choice={"Employees"}
        name={"Employees"}
        selected={selectedEmployees}
        data={employeesList}
        isMultiple={true}
        placeholder={"Select A Employees"}
      />
      <button onClick={assignEmployeesToDepartment}>Add emp</button>
    </div>
  );
};

export default EditDepartment;
