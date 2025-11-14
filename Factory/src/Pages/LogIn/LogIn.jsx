import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../../assets/Login.css";

export default function LogIn() {
  const [userData, setUserData] = useState({ username: "", email: "" });
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const logInBtn = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        `http://localhost:4000/login`,
        userData,
        {
          withCredentials: true,
        }
      );
      localStorage["full_name"] = data.full_name;
      navigate("/Employees");
    } catch (error) {
      alert("User not found");
    }
  };
  return (
    <div className="login-container">
      <form className="login-form" onSubmit={logInBtn}>
        <h2>Log In</h2>

        <label>Username</label>
        <input
          name="username"
          type="text"
          onChange={handleSubmit}
          placeholder="Enter username"
        />

        <label>Email</label>
        <input
          name="email"
          type="email"
          onChange={handleSubmit}
          placeholder="Enter email"
        />

        <button type="submit">Log In</button>
      </form>
    </div>
  );
}
