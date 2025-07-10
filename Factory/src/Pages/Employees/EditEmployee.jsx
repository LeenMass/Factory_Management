import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { DeleteEmployee, UpdateEmployeeData } from "./utilsEmployees";
import DepartmentsDropdown from "../../Components/DepartmentsDropdown";
import Table from "../../Components/Table";

const EditEmployee = (props) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [employeeUpdatedData, setNewData] = useState({
    first_name: props.data.first_name,
    last_name: props.data.last_name,
    department: props.data.department_id,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "first_Name" || name === "last_Name") {
      const regex = /^[a-zA-Z\s]*$/;
      if (!regex.test(value)) {
        alert(`First name and last name must contain only letters and spaces`);
      }
    }
    setNewData({ ...employeeUpdatedData, [name]: value });
  };

  const updateData = async (e) => {
    e.preventDefault();
    try {
      await UpdateEmployeeData(id, employeeUpdatedData);
      alert(
        `${employeeUpdatedData.first_name} ${employeeUpdatedData.last_name} Details has been updated.`
      );
      navigate("/Employees");
    } catch (error) {
      alert(
        `Failed to update ${employeeUpdatedData.first_name} ${employeeUpdatedData.last_name}'s Details`
      );
    }
  };

  const deleteEmployee = async (e) => {
    e.preventDefault();
    const isConfirmed = window.confirm(
      `Are you sure you want to delete ${props.first_name} ${props.last_name}?`
    );
    if (!isConfirmed) return;
    try {
      await DeleteEmployee(id);
      alert(
        `Successfully removed ${employee.first_name} ${employee.last_name}'s record.`
      );
      navigate("/Employees");
    } catch (error) {
      alert(
        `Failed to delete ${employee.first_name} ${employee.last_name}'s record!`
      );
    }
  };
  const columns = [
    { title: "Date", dataIndex: "date" },
    { title: "starting_hour", dataIndex: "starting_hour" },
    { title: "ending_hour", dataIndex: "ending_hour" },
  ];

  return (
    <form>
      First Name:{" "}
      <input
        name="first_name"
        defaultValue={employeeUpdatedData.first_name}
        onChange={handleChange}
      />
      Last Name:{" "}
      <input
        name="last_name"
        defaultValue={employeeUpdatedData.last_name}
        onChange={handleChange}
      />
      Department :
      <DepartmentsDropdown
        select={handleChange}
        selected={employeeUpdatedData.department}
      />
      <button onClick={updateData}>Update</button>
      <button onClick={() => setEdit(false)}>Cancel</button>
      <button onClick={deleteEmployee} type="button">
        Delete
      </button>
      <Table source={props.data.shifts} columns={columns} case7={"shifts"} />
    </form>
  );
};

export default EditEmployee;
