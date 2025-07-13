import { useState } from "react";
import EmployeesDropdown from "../../Components/EmployeesDropdown";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { addDepartment } from "./utilsDepartments";

const AddDepartment = () => {
  const [employeeData, setEmployeeData] = useState({ name: "", manager: "" });
  const navigate = useNavigate();
  const employees = useSelector((state) => state.employees);

  const handelSubmit = (e) => {
    const { name, value } = e.target;
    setEmployeeData({ ...employeeData, [name]: value });
  };

  const saveDepartment = async (e) => {
    e.preventDefault();
    try {
      await addDepartment(departmentUrl, employeeData);
      alert(`${data.name} Department added successfully`);
    } catch (error) {
      console.error("Failed to add Department", error);
    }
  };

  const cancelBtn = (e) => {
    e.preventDefault();
    navigate("/Departments");
  };
  return (
    <div>
      <form>
        <section>Add Ne</section>
        Department Name:
        <input type="text" name="name" onChange={handelSubmit} />
        <EmployeesDropdown
          select={handelSubmit}
          selected={data.manager}
          data={employees}
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
