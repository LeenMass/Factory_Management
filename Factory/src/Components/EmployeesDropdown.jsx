const EmployeesDropdown = (props) => {
  return (
    <div>
      {props.choice}
      <select
        onChange={(e) => {
          const selectedValues = Array.from(
            e.target.selectedOptions,
            (option) => option.value
          );
          props.select({
            target: {
              value: props.isMultiple ? selectedValues : selectedValues[0],
              name: props.name,
            },
          });
        }}
        value={props.isMultiple ? props.selected || [] : props.selected || ""}
        multiple={props.isMultiple}
        name={props.name}
      >
        <option value="" disabled>
          {props.placeholder}
        </option>
        {props.data.map((emp) => {
          return (
            <option value={emp.id} key={emp.id}>
              {emp.name}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default EmployeesDropdown;
