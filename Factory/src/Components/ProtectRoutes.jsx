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
      <div
        style={{
          marginTop: "70px",
          paddingLeft: "20px",
          textAlign: "left",
          fontSize: "1.6rem",
          fontWeight: "600",
          color: "#388e3c",
        }}
      >
        <h3> Welcome again {localStorage["full_name"]}</h3>
      </div>
      <Outlet />
    </>
  );
};

export default ProtectedLayout;
