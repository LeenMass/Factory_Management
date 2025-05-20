import { Link, Route, Routes } from "react-router-dom";
import "./App.css";
import Departments from "./Pages/Departments/Departments";
import Employess from "./Pages/Employees/Employess";
import AddEmployee from "./Pages/Employees/AddEmployee";
import EditEmployee from "./Pages/Employees/EditEmployee";
import EditDepartment from "./Pages/Departments/EditDepartment";
import Employee from "./Pages/Employees/Employee";
import AddDepartment from "./Pages/Departments/AddDepartment";
import AllEmployees from "./AllEmployees";
import Shifts from "./Pages/Shifts/Shifts";
import AddingShift from "./Pages/Shifts/AddingShift";
import EditingShift from "./Pages/Shifts/EditingShift";

const App = () => {
  return (
    <>
      <AllEmployees />
      <h1>Factory Managment</h1>
      <Link to="/">Home</Link> <br />
      <Link to="/Employees">Employees</Link> <br />
      <Link to="/Departments">Departments</Link> <br />
      <Link to="/Shifts">Shifts</Link> <br />
      <Routes>
        <Route path="/" element="{}" />
        <Route path="/Employees" element={<Employess />} />
        <Route path="/Departments" element={<Departments />} />
        <Route path="/AddEmployee" element={<AddEmployee />} />
        <Route path="/Employees/:id" element={<Employee />}></Route>
        <Route path="/Departments/:id" element={<EditDepartment />}></Route>
        <Route path="/AddDepartment" element={<AddDepartment />}></Route>
        <Route path="/Shifts" element={<Shifts />}></Route>
        <Route path="/AddingShift" element={<AddingShift />}></Route>
        <Route path="/Shifts/:id" element={<EditingShift />}></Route>
      </Routes>
    </>
  );
};

export default App;
