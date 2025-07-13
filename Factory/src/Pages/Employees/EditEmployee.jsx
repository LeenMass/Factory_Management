import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  DeleteEmployee,
  getEmployeeById,
  UpdateEmployeeData,
} from "./utilsEmployees";
import DepartmentsDropdown from "../../Components/DepartmentsDropdown";
import Table from "../../Components/Table";

const EditEmployee = () => {
  const { id } = useParams();
  const [employee, setEmployee] = useState(null);

  const [employeeUpdatedData, setNewData] = useState({
    first_name: "",
    last_name: "",
    depId: "",
  });
  const fetchEmployeeData = async () => {
    const { data } = await getEmployeeById(id);
    console.log(data);
    setEmployee(data);
    setNewData({
      first_name: data.first_name || "",
      last_name: data.last_name || "",
      depId: data.depId || "",
    });
  };
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "first_name" || name === "last_name") {
      const regex = /^[a-zA-Z\s]*$/;
      if (!regex.test(value)) {
        alert(`First name and last name must contain only letters and spaces`);
      }
    }
    setNewData((prev) => ({ ...prev, [name]: value }));
  };

  const updateData = async (e) => {
    e.preventDefault();
    try {
      console.log(employeeUpdatedData);
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
      `Are you sure you want to delete ${employee.first_name} ${employee.last_name}?`
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
  useEffect(() => {
    fetchEmployeeData();
  }, [id]);
  return (
    <form onSubmit={updateData}>
      First Name:{" "}
      <input
        name="first_name"
        value={employeeUpdatedData.first_name || ""}
        onChange={handleChange}
      />
      Last Name:{" "}
      <input
        name="last_name"
        value={employeeUpdatedData.last_name || ""}
        onChange={handleChange}
      />
      Department :
      <DepartmentsDropdown
        select={handleChange}
        selected={employeeUpdatedData.depId || ""}
      />
      <button type="submit">Update</button>
      <button onClick={() => setEdit(false)}>Cancel</button>
      <button onClick={deleteEmployee} type="button">
        Delete
      </button>
      {/* <Table source={props.data.shifts} columns={columns} case7={"shifts"} /> */}
    </form>
  );
};

export default EditEmployee;
