import React from "react";

const EmployeesDropdown = (props) => {
  return (
    <div>
      Employees
      <select
        onChange={(e) =>
          props.select({
            target: { value: e.target.value, name: "manager" },
          })
        }
        name="manager"
        value={props.selected}
        selected
      >
        <option value="">{props.placeholder}</option>
        {props.data.map((emp) => {
          return (
            <option value={emp.id} key={emp.id}>
              {emp.Full_Name}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default EmployeesDropdown;
