import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const RequireAuth = ({ allowedRoles }) => {
  const { auth } = useAuth();
  const location = useLocation();
  console.log("auth :>> ", auth);
  console.log("allowedRoles :>> ", allowedRoles);
  console.log("auth.role :>> ", auth.role);
  console.log(
    "allowedRoles.includes(auth?.role) :>> ",
    allowedRoles.includes(auth?.role)
  );

  return allowedRoles.includes(auth?.role) ? (
    <Outlet />
  ) : auth?.user ? (
    <Navigate to="/unauthorized" state={{ from: location }} replace />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default RequireAuth;
