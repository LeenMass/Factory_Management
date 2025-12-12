import { NavLink, useNavigate } from "react-router-dom";
import "../assets/navBarStyle.css";
import axios from "axios";
import useAction from "../Pages/Users/Action";
const NavBar = () => {
  const navigate = useNavigate();
  const { checkActionNumber } = useAction();

  const handleNavClick = async (path) => {
    checkActionNumber(() => {
      navigate(path);
    });
  };
  const logOut = async () => {
    try {
      await axios.post(
        "http://localhost:4000/logout",
        {},
        { withCredentials: true }
      );

      window.location.href = "/";
    } catch (error) {
      alert("Something went wrong while logging out. Please try again.");
    }
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
      <NavLink
        to="/Departments"
        className="nav-link"
        onClick={(e) => {
          e.preventDefault();
          handleNavClick("/Departments");
        }}
      >
        Departments
      </NavLink>
      <NavLink
        to="/Shifts"
        className="nav-link"
        onClick={(e) => {
          e.preventDefault();
          handleNavClick("/Shifts");
        }}
      >
        Shifts
      </NavLink>
      <NavLink
        to="/Users"
        className="nav-link"
        onClick={(e) => {
          e.preventDefault();
          handleNavClick("/Users");
        }}
      >
        Users
      </NavLink>{" "}
      <NavLink className="nav-link" onClick={logOut} style={{ color: "black" }}>
        logout
      </NavLink>
    </nav>
  );
};

export default NavBar;
