import { NavLink } from "react-router-dom";
import "../assets/navBarStyle.css";
const NavBar = () => {
  return (
    <nav className="navbar">
      <NavLink to="/" className="nav-link">
        Home
      </NavLink>
      <NavLink to="/Employees" className="nav-link">
        Employees
      </NavLink>
      <NavLink to="/Departments" className="nav-link">
        Departments
      </NavLink>
      <NavLink to="/Shifts" className="nav-link">
        Shifts
      </NavLink>
    </nav>
  );
};

export default NavBar;
