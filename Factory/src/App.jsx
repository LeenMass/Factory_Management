import { Route, Routes } from "react-router-dom";
import "./App.css";
import Departments from "./Pages/Departments/Departments";
import Employees from "./Pages/Employees/Employees";
import AddEmployee from "./Pages/Employees/AddEmployee";
import EditDepartment from "./Pages/Departments/EditDepartment";
import AddDepartment from "./Pages/Departments/AddDepartment";
import Shifts from "./Pages/Shifts/Shifts";
import AddingShift from "./Pages/Shifts/AddingShift";
import EditingShift from "./Pages/Shifts/EditingShift";
import NavBar from "./Components/NavBar";
import EditEmployee from "./Pages/Employees/EditEmployee";
import Users from "./Pages/Users/Users";

const App = () => {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element="{}" />
        <Route path="/Employees" element={<Employees />} />
        <Route path="/Departments" element={<Departments />} />
        <Route path="/AddEmployee" element={<AddEmployee />} />
        <Route path="/editEmployee/:id" element={<EditEmployee />}></Route>
        <Route path="/Departments/:id" element={<EditDepartment />}></Route>
        <Route path="/AddDepartment" element={<AddDepartment />}></Route>
        <Route path="/Shifts" element={<Shifts />}></Route>
        <Route path="/AddingShift" element={<AddingShift />}></Route>
        <Route path="/Shifts/:id" element={<EditingShift />}></Route>
        <Route path="/Users" element={<Users />}></Route>
      </Routes>
    </>
  );
};

export default App;
