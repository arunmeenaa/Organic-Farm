import React from 'react'
import Home from './pages/Home'
import AppRoutes from './routes/AppRoutes'
import ScrollToTop from "./components/common/ScrollToTop";

const App = () => {
  return (
    <>
    <ScrollToTop />
    <AppRoutes />
    </>
  )
}

export default App
