import { useLocation, Navigate, Outlet } from "react-router-dom";
import { Navbar } from "./";
import useAuth from "../hooks/useAuth";
import {dbGetUserWallet} from "@@/utils/function";

const RequireAuth = ({ allowedRoles }) => {
  const user = dbGetUserWallet();
  const location = useLocation();

  return user?.roles?.find((role) => allowedRoles?.includes(role)) ? (
    <>
      <Navbar />
      <Outlet />
    </>
  ) : user ? (
    <Navigate to="/unauthorized" state={{ from: location }} replace />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default RequireAuth;
