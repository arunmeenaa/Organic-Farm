import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";
import BackgroundEffects from "../components/common/BackgroundEffects";

const MainLayout = () => {
  const location = useLocation();
  const hideLayout = ["/login", "/register"].includes(location.pathname);

  return (
    <div className="min-h-screen app-bg relative ">
      <BackgroundEffects />

      {!hideLayout && (
        <header className="fixed top-4 left-0 right-0 z-50 px-4">
          <div className="mx-auto max-w-7xl">
            <Navbar />
          </div>
        </header>
      )}

      <main className="relative z-10 pt-28">
        <Outlet />
      </main>

      {!hideLayout && <Footer />}
    </div>
  );
};

export default MainLayout;
