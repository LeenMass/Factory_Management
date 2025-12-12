import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  DeleteEmployee,
  getEmployeeById,
  UpdateEmployeeData,
} from "./employeesUtils";
import DepartmentsDropdown from "../../Components/DepartmentsDropdown";
import Table from "../../Components/Table";
import { assignEmployeeToShift, getShifts } from "../Shifts/shiftsUtils";
import useAction from "../Users/Action";

const EditEmployee = () => {
  const { id } = useParams();
  const [employee, setEmployee] = useState(null);
  const [shifts, setShifts] = useState([]);
  const [choiceDate, setDate] = useState({ empId: id, shiftId: "", date: "" });
  const [shiftData, setShiftData] = useState([]);
  const [reload, setReload] = useState(false);
  const [employeeUpdatedData, setNewData] = useState({
    first_name: "",
    last_name: "",
    department_id: "",
  });
  const navigate = useNavigate();
  const { checkActionNumber } = useAction();

  const columns = [
    { title: "Date", dataIndex: "date" },
    { title: "Starting_hour", dataIndex: "starting_hour" },
    { title: "Ending_hour", dataIndex: "ending_hour" },
  ];

  const getAllShifts = async () => {
    const { data } = await getShifts();
    setShifts(data);
  };

  const fetchEmployeeData = async () => {
    checkActionNumber(async () => {
      const { data } = await getEmployeeById(id);
      setEmployee(data);
      setNewData({
        first_name: data.first_name || "",
        last_name: data.last_name || "",
        department_id: data.department_id || "",
      });
    });
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "first_name" || name === "last_name") {
      const regex = /^[a-zA-Z\s]*$/;
      if (!regex.test(value)) {
        alert(`First name and last name must contain only letters and spaces`);
      }
    }
    setNewData((oldData) => ({ ...oldData, [name]: value }));
  };
  const handelRegesterToshift = (e) => {
    const { name, value } = e.target;
    setDate({ ...choiceDate, [name]: value });
  };

  const updateEmploye = async (e) => {
    e.preventDefault();
    checkActionNumber(async () => {
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
    });
  };

  const deleteEmployee = async (e) => {
    e.preventDefault();
    const isConfirmed = window.confirm(
      `Are you sure you want to delete ${employee.first_name} ${employee.last_name}?`
    );
    if (!isConfirmed) return;
    checkActionNumber(async () => {
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
    });
  };
  const addEmployeeToShift = async (e) => {
    e.preventDefault();
    checkActionNumber(async () => {
      try {
        await assignEmployeeToShift(choiceDate);

        setReload(!reload);
        setDate({});

        alert(`Employees have been successfully added to this shift.`);
      } catch (eror) {
        alert("Failed to add Employees to this Shift");
      }
    });
  };
  useEffect(() => {
    fetchEmployeeData();
  }, [id, reload]);

  useEffect(() => {
    getAllShifts();
  }, []);

  useEffect(() => {
    if (choiceDate.date && shifts.length > 0) {
      const dataShiftsByDate = shifts.filter((e) => e.date === choiceDate.date);
      if (employee.shifts) {
        const idsToRemove = new Set(employee.shifts.map((obj) => obj._id));

        const filtered = dataShiftsByDate.filter(
          (obj) => !idsToRemove.has(obj.id)
        );

        setShiftData(filtered);
      }
    }
  }, [choiceDate.date, shifts]);

  return (
    <>
      <form>
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
          selected={employeeUpdatedData.department_id || ""}
        />
        <button
          type="submit"
          style={{ marginRight: "30px", border: "2px solid black" }}
          onClick={updateEmploye}
        >
          {" "}
          Update
        </button>
      </form>
      <div style={{ marginTop: "30px" }}>
        <button
          onClick={deleteEmployee}
          style={{ marginRight: "30px", border: "2px solid black" }}
        >
          Delete Employee
        </button>
        <button
          onClick={() => navigate("/Employees")}
          style={{ marginRight: "30px", border: "2px solid black" }}
        >
          Cancel
        </button>
      </div>
      <section>
        <h2>register to new shift:</h2>
        <div style={{ marginTop: "30px" }}>
          {" "}
          {employee?.shifts?.length > 0 ? (
            <Table source={employee.shifts} columns={columns} />
          ) : (
            <p>No shifts assigned for this employee</p>
          )}
        </div>
        <select
          onChange={handelRegesterToshift}
          name="date"
          value={choiceDate.date || ""}
        >
          <option value="">choose shift date</option>
          {[...new Set(shifts.map((shift) => shift.date))].map(
            (shift, index) => (
              <option value={shift} key={index}>
                {shift}
              </option>
            )
          )}
        </select>
        <h3>select starting hour:</h3>
        <select
          onChange={handelRegesterToshift}
          name="shiftId"
          value={choiceDate.shiftId || ""}
        >
          <option value="">select starting hour</option>
          {shiftData.map((e) => (
            <option value={e.id} key={e.id}>
              {e.starting_hour}
            </option>
          ))}
        </select>
        <button onClick={addEmployeeToShift}>add shift</button>
      </section>
    </>
  );
};

export default EditEmployee;
