import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
export default function LogIn() {
  const [userData, setUserData] = useState({ username: "", email: "" });
  const navigate = useNavigate();
  const handelSubmit = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const logInBtn = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`http://localhost:4000/login`, userData, {
        withCredentials: true,
      });
      navigate("/Employees");
    } catch (error) {
      console.error("user not found");
    }
  };

  return (
    <div>
      LogIn
      <form onSubmit={logInBtn}>
        username: <input name="username" type="text" onChange={handelSubmit} />
        Email: <input name="email" type="email" onChange={handelSubmit} />
        <button type="submit">Log In</button>
      </form>
    </div>
  );
}
