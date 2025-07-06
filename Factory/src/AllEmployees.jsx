import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getemployees } from "./Pages/Employees/utilsEmployees";

const AllEmployees = () => {
  const dispatch = useDispatch();

  const LoadEmployees = async () => {
    try {
      const { data: employees } = await getemployees();
      dispatch({ type: "LOAD", payload: employees });
    } catch (error) {
      alert(`Failed to fetch Data ,${error}`);
    }
  };
  useEffect(() => {
    LoadEmployees();
  }, []);

  return <></>;
};

export default AllEmployees;
