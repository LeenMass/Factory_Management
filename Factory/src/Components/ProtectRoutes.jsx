import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import NavBar from "./NavBar";

const ProtectedLayout = () => {
  const [isAuth, setIsAuth] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsAuth(!!token);
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
