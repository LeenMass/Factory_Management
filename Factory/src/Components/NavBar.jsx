import { NavLink, useNavigate } from "react-router-dom";
import "../assets/navBarStyle.css";
import axios from "axios";
import { countOfUserActions } from "../Pages/Users/usersUtils";

const NavBar = () => {
  const navigate = useNavigate();

  const handleNavClick = async (path) => {
    await countOfUserActions(navigate);
    navigate(path);
  };
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
      <NavLink
        to="/Employees"
        className="nav-link"
        onClick={(e) => {
          e.preventDefault();
          handleNavClick("/Employees");
        }}
      >
        Employees
      </NavLink>
      <NavLink to="/Departments" className="nav-link" onClick={handleNavClick}>
        Departments
      </NavLink>
      <NavLink to="/Shifts" className="nav-link" onClick={handleNavClick}>
        Shifts
      </NavLink>
      <NavLink to="/Users" className="nav-link" onClick={handleNavClick}>
        Users
      </NavLink>{" "}
      <button className="nav-link" onClick={logout} style={{ color: "black" }}>
        logout
      </button>
    </nav>
  );
};

export default NavBar;
