import { useEffect, useState } from "react";
import EmployeesDropdown from "../../Components/EmployeesDropdown";
import { useNavigate } from "react-router-dom";
import { addDepartment } from "./utilsDepartments";
import { getemployees } from "../Employees/utilsEmployees";

const AddDepartment = () => {
  const [departmentData, setDepartmentData] = useState({
    name: "",
    manager: "",
  });
  const [employeesList, setEmployeesList] = useState([]);

  const navigate = useNavigate();

  const getEmployeesList = async () => {
    const employees = await getemployees();
    setEmployeesList(employees);
  };

  const handelSubmit = (e) => {
    const { name, value } = e.target;
    setDepartmentData({ ...departmentData, [name]: value });
  };

  const saveDepartment = async (e) => {
    e.preventDefault();
    try {
      await addDepartment(departmentUrl, departmentData);
      alert(`${departmentData.namw} Department added successfully`);
    } catch (error) {
      console.error("Failed to add Department", error);
    }
  };

  const cancelBtn = (e) => {
    e.preventDefault();
    navigate("/Departments");
  };
  useEffect(() => {
    getEmployeesList();
  }, []);
  return (
    <div>
      <form>
        <section>Add New Department</section>
        Department Name:
        <input type="text" name="name" onChange={handelSubmit} />
        <EmployeesDropdown
          select={handelSubmit}
          selected={departmentData.manager}
          data={employeesList}
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
