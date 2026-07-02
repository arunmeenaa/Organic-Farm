import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const FarmerRoute = () => {
    const { user } = useAuth();

    return user?.role === "farmer"
        ? <Outlet />
        : <Navigate to="/" replace />;
};

export default FarmerRoute;