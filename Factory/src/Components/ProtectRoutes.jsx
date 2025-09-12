import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import axios from "axios";
import NavBar from "./NavBar";

const ProtectedLayout = () => {
  const [isAuth, setIsAuth] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:4000/auth", { withCredentials: true })
      .then(() => setIsAuth(true))
      .catch(() => setIsAuth(false));
  }, []);

  if (isAuth === null) return <div>Loading...</div>;
  if (!isAuth) return <Navigate to="/" replace />;

  return (
    <>
      {" "}
      <NavBar />
      <h3>{localStorage["full_name"]}</h3>
      <Outlet />
    </>
  );
};

export default ProtectedLayout;
