import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
const EmployeesUrl = "http://localhost:4000/employees";

const AllEmployees = () => {
  const dispatch = useDispatch();

  const getemployees = async () => {
    try {
      const { data: employees } = await axios.get(EmployeesUrl);

      dispatch({ type: "LOAD", payload: employees });
    } catch (error) {
      alert(`Failed to fetch Data ,${error}`);
    }
  };
  useEffect(() => {
    getemployees();
  }, []);

  return <></>;
};

export default AllEmployees;
