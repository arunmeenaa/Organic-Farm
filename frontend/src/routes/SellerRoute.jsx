import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const sellerRoute = () => {
    const { user } = useAuth();

    return user?.role === "seller"
        ? <Outlet />
        : <Navigate to="/" replace />;
};

export default sellerRoute;