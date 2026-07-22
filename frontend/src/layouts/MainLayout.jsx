import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";
import BackgroundEffects from "../components/common/BackgroundEffects";
import FloatingAIButton from "../components/common/FloatingAIButton";
const MainLayout = () => {
  const location = useLocation();
  const hideLayout = ["/login", "/register", ].includes(location.pathname);
  const hideAIButton = hideLayout || location.pathname === "/ai";

  return (
    <div className="min-h-screen app-bg relative ">
      <BackgroundEffects />

      {!hideLayout && (
        <header className="fixed inset-x-0 top-4 z-9999 px-4">
          <div className="mx-auto max-w-7xl">
            <Navbar />
          </div>
        </header>
      )}

      <main className={`relative z-10 ${!hideLayout ? "page-content" : ""}`}>
        <Outlet />
      </main>
      {!hideLayout && !hideAIButton && <FloatingAIButton />}
      {!hideLayout && <Footer />}
    </div>
  );
};

export default MainLayout;
