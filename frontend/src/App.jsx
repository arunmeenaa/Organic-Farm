import React from "react";
import Home from "./pages/Home";
import AppRoutes from "./routes/AppRoutes";
import ScrollToTop from "./components/common/ScrollToTop";
import { Toaster } from "react-hot-toast";

const App = () => {
  return (
    <>
      <ScrollToTop />
      <Toaster
        position="bottom-right"
        reverseOrder={false}
        gutter={12}
        toastOptions={{
          duration: 5000,
        }}
      />
      <AppRoutes />
    </>
  );
};

export default App;
