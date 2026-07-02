import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const BuyerRoute = () => {
    const { user } = useAuth();

    return user?.role === "buyer"
        ? <Outlet />
        : <Navigate to="/" replace />;
};

export default BuyerRoute;