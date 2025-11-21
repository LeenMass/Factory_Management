import { useEffect, useState } from "react";
import EmployeesDropdown from "../../Components/EmployeesDropdown";
import { useNavigate } from "react-router-dom";
import { addDepartment } from "./departmentsUtils";
import { getemployees } from "../Employees/employeesUtils";
import useAction from "../Users/Action";

const AddDepartment = () => {
  const [departmentData, setDepartmentData] = useState({
    name: "",
    manager: "",
  });
  const [employeesList, setEmployeesList] = useState([]);

  const navigate = useNavigate();
  const { checkActionNumber } = useAction();
  const getEmployeesList = async () => {
    const { data: employees } = await getemployees();
    setEmployeesList(employees);
  };

  const handelSubmit = (e) => {
    const { name, value } = e.target;
    setDepartmentData({ ...departmentData, [name]: value });
  };

  const saveDepartment = async (e) => {
    e.preventDefault();
    checkActionNumber(async () => {
      try {
        await addDepartment(departmentData);
        alert(`${departmentData.name} Department added successfully`);
        navigate("/Departments");
      } catch (error) {
        alert(error);
      }
    });
  };

  const cancelBtn = (e) => {
    e.preventDefault();
    navigate("/Departments");
  };

  useEffect(() => {
    getEmployeesList();
  }, []);

  return (
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
        choice={"select manager"}
      />
      <button type="submit" onClick={saveDepartment}>
        Save
      </button>
      <button onClick={cancelBtn}>Cancel</button>
    </form>
  );
};

export default AddDepartment;
