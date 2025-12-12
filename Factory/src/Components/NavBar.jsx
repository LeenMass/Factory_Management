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
  const logOut = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        "http://localhost:4000/logout",
        {},
        { withCredentials: true }
      );

      navigate("/");
    } catch (error) {
      alert("Something went wrong while logging out. Please try again.");
    }
  };

  return (
    <nav className="navbar">
      <NavLink
        to="/Employees"
        className="nav-link"
        onClick={() => {
          handleNavClick("/Employees");
        }}
      >
        Employees
      </NavLink>
      <NavLink
        to="/Departments"
        className="nav-link"
        onClick={() => {
          handleNavClick("/Departments");
        }}
      >
        Departments
      </NavLink>
      <NavLink
        to="/Shifts"
        className="nav-link"
        onClick={() => {
          handleNavClick("/Shifts");
        }}
      >
        Shifts
      </NavLink>
      <NavLink
        to="/Users"
        className="nav-link"
        onClick={() => {
          handleNavClick("/Users");
        }}
      >
        Users
      </NavLink>{" "}
      <a className="nav-link" onClick={logOut} href="#">
        logout
      </a>
    </nav>
  );
};

export default NavBar;
