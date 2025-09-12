import { NavLink } from "react-router-dom";
import "../assets/navBarStyle.css";
import axios from "axios";
const NavBar = () => {
  const logout = () => {
    axios
      .post("http://localhost:4000/logout", {}, { withCredentials: true })
      .then(() => {
        window.location.href = "/";
      })
      .catch((err) => console.error(err));
  };

  return (
    <nav className="navbar">
      <>
        <NavLink to="/Employees" className="nav-link">
          Employees
        </NavLink>
        <NavLink to="/Departments" className="nav-link">
          Departments
        </NavLink>
        <NavLink to="/Shifts" className="nav-link">
          Shifts
        </NavLink>
        <NavLink to="/Users" className="nav-link">
          Users
        </NavLink>
        <button className="nav-link" onClick={logout}>
          logout
        </button>
      </>
    </nav>
  );
};

export default NavBar;
