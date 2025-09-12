import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Table from "../../Components/Table";
import { DeleteEmployeeFromShift, getShifts } from "./shiftsUtils";

const Shifts = () => {
  const navigate = useNavigate();
  const [shifts, setShifts] = useState([]);
  const [selectMode, setSelectMode] = useState(false);
  const [selectChoices, setSelectChoices] = useState([]);

  const columns = [
    { title: "Date", dataIndex: "date" },
    { title: "starting_hour", dataIndex: "starting_hour" },
    { title: "ending_hour", dataIndex: "ending_hour" },
    { title: "employees", dataIndex: "employees", type: "list-items" },
  ];

  const handelChoice = (shiftId, employeeId) => {
    setSelectChoices((prev) => {
      const existingShift = prev.find((shift) => shift.shift_id === shiftId);

      if (existingShift) {
        const alreadySelected = existingShift.employees.includes(employeeId);

        const updatedChoices = prev.map((shift) => {
          if (shift.shift_id !== shiftId) return shift;

          return {
            ...shift,
            employees: alreadySelected
              ? shift.employees.filter((empId) => empId !== employeeId)
              : [...shift.employees, employeeId],
          };
        });

        return updatedChoices;
      } else {
        return [...prev, { shift_id: shiftId, employees: [employeeId] }];
      }
    });
  };

  const deleteEmployeesFromShifts = async () => {
    try {
      await DeleteEmployeeFromShift(selectChoices);
      alert(` the employees removed successfully`);
      setSelectMode(false);
    } catch (error) {
      alert(
        `Failed to add This Shift,
        ${error}
      `
      );
    }
  };
  const getAllShifts = async () => {
    try {
      const { data } = await getShifts();

      setShifts(data);
    } catch (error) {
      alert(`Failed to fetch Shifts ,${error}`);
    }
  };

  useEffect(() => {
    getAllShifts();
  }, []);
  return (
    <div>
      <button onClick={() => setSelectMode(true)}>Select</button>
      {selectMode && (
        <>
          <button onClick={deleteEmployeesFromShifts}>Delete</button>
          <button onClick={() => setSelectMode(false)}> Cancel</button>
        </>
      )}
      Shifts
      <Table
        columns={columns}
        source={shifts}
        edit={true}
        editData={"Shifts"}
        editIcon={"Edit Shift"}
        addIcon={"Add Employees"}
        select={selectMode}
        setChoices={handelChoice}
        choices={selectChoices?.employees}
      />
      <button onClick={() => navigate("/AddingShift")}>Add Shift</button>
    </div>
  );
};

export default Shifts;
