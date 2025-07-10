import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getEmployeeById } from "./utilsEmployees";
import EditEmployee from "./EditEmployee";

const Employee = () => {
  const { id } = useParams();
  const [employee, setEmployee] = useState({});
  const [editEmployeeData, setEdit] = useState(false);

  const getmployeeData = async () => {
    try {
      const { data } = await getEmployeeById(id);
      setEmployee(data);
    } catch (error) {
      alert(`Failed to get Employee's Data, Please try again."`);
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
          Department :<section>{employee.departmentName}</section>
          <button onClick={() => setEdit(!editEmployeeData)}>Edit</button>
        </>
      ) : (
        <EditEmployee data={employee} />
      )}
    </div>
  );
};

export default Employee;
