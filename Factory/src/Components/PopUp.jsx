import { useEffect, useState } from "react";
import Modal from "react-modal";
import EmployeesDropdown from "./EmployeesDropdown";
import { getemployees } from "../Pages/Employees/employeesUtils";
import { addEmployeesToShift } from "../Pages/Shifts/shiftsUtils";

Modal.setAppElement("#root");

const PopUp = (props) => {
  const [employeesList, setEmployeesList] = useState([]);
  const [emp, setEmp] = useState([]);

  const getEmployeesList = async () => {
    const { data: employees } = await getemployees();

    setEmployeesList(
      employees.filter(
        (item) => !props.eData.map((emp) => emp.id).includes(item.id)
      )
    );
  };
  const handelSubmit = (e) => {
    const { name, value } = e.target;
    setEmp({ ...emp, shift_id: props.id, [name]: value });
  };

  const addEmpToShift = async () => {
    try {
      await addEmployeesToShift(emp);
      const newlyAddedEmployees = employeesList.filter((e) =>
        emp.employees.includes(e.id.toString())
      );

      const mergedEmployees = [
        ...props.eData,
        ...newlyAddedEmployees
          .filter(
            (newEmp) =>
              !props.eData.some((existingEmp) => existingEmp.id === newEmp.id)
          )
          .map((e) => {
            return { id: e.id, name: e.first_name + " " + e.last_name };
          }),
      ];
      props.update((prevShifts) =>
        prevShifts.map((shift) => {
          if (shift.id === emp.shift_id) {
            return {
              ...shift,
              employees: mergedEmployees,
            };
          }
          return shift;
        })
      );

      alert(` employees added successfully`);
    } catch (error) {
      alert(
        `Failed to add employees to This Shift,
        ${error}
      `
      );
    }
  };

  useEffect(() => {
    getEmployeesList();
  }, []);

  return (
    <>
      <Modal
        isOpen={props.isOpen}
        onRequestClose={props.onClose}
        style={{
          overlay: {
            backgroundColor: "transparent",
            zIndex: 1000,
          },
          content: {
            top: "50%",
            left: "50%",
            right: "auto",
            bottom: "auto",
            marginRight: "-50%",
            transform: "translate(-50%, -50%)",
            padding: "20px",
            borderRadius: "8px",
            width: "400px",
            maxWidth: "90%",
          },
        }}
      >
        <h2>Add Employees</h2>
        <EmployeesDropdown
          select={handelSubmit}
          data={employeesList}
          name={"employees"}
          isMultiple={true}
          placeholder={"select employees"}
        />
        <button onClick={props.onClose}>close</button>
        <button onClick={addEmpToShift}>add</button>
      </Modal>
    </>
  );
};

export default PopUp;
