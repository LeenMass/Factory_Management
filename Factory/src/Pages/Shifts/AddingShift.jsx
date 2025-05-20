import axios from "axios";
import React, { useState } from "react";
import EmployeesDropdown from "../../Components/EmployeesDropdown";
import { useSelector } from "react-redux";
const shiftsUrl = "http://localhost:4000/shifts";

function AddingShift() {
  const [newShift, setNewShift] = useState({
    date: "",
    starting_hour: "",
    ending_hour: "",
    employees: [],
  });
  const employeesD = useSelector((state) => state.employees);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewShift({ ...newShift, [name]: value });
  };
  const saveShift = async (e) => {
    e.preventDefault();
    try {
      await axios.post(shiftsUrl, newShift);
      alert(`$ The Shift added successfully`);
      setNewShift({
        date: "",
        starting_hour: "",
        ending_hour: "",
      });
    } catch (error) {
      alert(
        `Failed to add This Shift,
        ${error}
      `
      );
    }
  };
  console.log(newShift);
  return (
    <div>
      Adding Shift
      <form>
        <input
          name="date"
          type="date"
          placeholder="choose Date"
          onChange={handleChange}
        />
        <input
          name="starting_hour"
          type="time"
          placeholder="enter starting Hour"
          onChange={handleChange}
        />
        <input
          name="ending_hour"
          type="time"
          placeholder="choose ending hour"
          onChange={handleChange}
        />
        <EmployeesDropdown
          select={handleChange}
          data={employeesD}
          name={"employees"}
          isMultiple={true}
        />

        <button type="submit" onClick={saveShift}>
          Save Shift
        </button>
        <button>Cancel</button>
      </form>
    </div>
  );
}

export default AddingShift;
