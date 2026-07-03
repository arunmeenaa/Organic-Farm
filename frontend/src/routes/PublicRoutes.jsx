import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const PublicRoute = () => {
  const { isAuthenticated, user } = useAuth();

  if (!isAuthenticated) {
    return <Outlet />;
  }

  if (user?.role === "farmer") {
    return <Navigate to="/farmer/dashboard" replace />;
  }

  if (user?.role === "buyer") {
    return <Navigate to="/buyer/dashboard" replace />;
  }

  return <Navigate to="/" replace />;
};

export default PublicRoute;