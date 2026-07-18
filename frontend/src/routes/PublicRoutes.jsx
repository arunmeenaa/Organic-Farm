import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const PublicRoute = () => {
  const { isAuthenticated, user } = useAuth();

  if (!isAuthenticated) {
    return <Outlet />;
  }

  if (user?.role === "seller") {
    return <Navigate to="/seller/dashboard" replace />;
  }

  if (user?.role === "buyer") {
    return <Navigate to="/buyer/dashboard" replace />;
  }

  return <Navigate to="/" replace />;
};

export default PublicRoute;