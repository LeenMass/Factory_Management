import { Route, Routes } from "react-router-dom";
import "./App.css";
import Departments from "./Pages/Departments/Departments";
import Employess from "./Pages/Employees/Employess";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element="{}" />
        <Route path="/Employees" element={<Employess />} />
        <Route path="/Departments" element={<Departments />} />
      </Routes>
    </>
  );
};

export default App;
