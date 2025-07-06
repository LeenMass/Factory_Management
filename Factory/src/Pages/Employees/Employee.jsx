import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import DepartmentsDropdown from "../../Components/DepartmentsDropdown";
import { getEmployeeById } from "./utilsEmployees";
import EditEmployee from "./EditEmployee";
import { getDepartmentById } from "../Departments/utilsDepartments";

const Employee = () => {
  const { id } = useParams();
  const [employee, setEmployee] = useState({});
  const [editEmployeeData, setEdit] = useState(false);

  const getmployeeData = async () => {
    try {
      const { data } = await getEmployeeById(id);
      const { data: department } = await getDepartmentById(data.department_id);
      setEmployee({ ...data, department: department.name });
    } catch (error) {
      alert(`Failed to get employee Data, Please try again."`);
    }
  };

  useEffect(() => {
    getmployeeData();
  }, [id]);

  return (
    <div>
      {!editEmployeeData ? (
        <>
          First Name:<h3>{employee?.first_name}</h3>
          Last Name:<h2>{employee?.last_name}</h2>
          Department :<section>{employee.department}</section>
          <button onClick={() => setEdit(!editEmployeeData)}>Edit</button>
        </>
      ) : (
        <EditEmployee data={employee} />
      )}
    </div>
  );
};

export default Employee;
