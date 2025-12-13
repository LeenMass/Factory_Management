import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import NavBar from "./NavBar";
import axios from "axios";

const ProtectedLayout = () => {
  const [isAuth, setIsAuth] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:4000/employees", {
        withCredentials: true,
      })
      .then(() => setIsAuth(true))
      .catch(() => setIsAuth(false));
  }, []);

  if (isAuth === null) return <div>Loading...</div>;
  if (!isAuth) return <Navigate to="/" replace />;

  return (
    <>
      {" "}
      <NavBar />
      <div style={{ textAlign: "center", float: "left", margin: "30pء" }}>
        {" "}
        <h3>{localStorage["full_name"]}</h3>
      </div>
      <Outlet />
    </>
  );
};

export default ProtectedLayout;
