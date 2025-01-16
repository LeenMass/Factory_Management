import "./App.css";
import Departments from "./Pages/Departments/Departments";
import Employess from "./Pages/Employees/Employess";

const App = () => {
  return (
    <>
      <h1>Vite + React</h1>
      <Employess />
      <br />
      <Departments />
    </>
  );
};

export default App;
