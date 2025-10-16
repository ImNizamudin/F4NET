import { BrowserRouter, Routes, Route, Navigate, useLocation, } from "react-router-dom"
import Layout from "./components/Layout"
import LandingPage from "./pages/LandingPage"
import LoginPage from "./pages/LoginPage"
import Beranda from "./pages/Beranda"
import ProductsPage from "./pages/ProductPage"
import TransactionHistoryPage from "./pages/TransactionHistoryPage"
import CheckoutPage from "./pages/CheckoutPage"
import InitializeAuth from "./components/InitializeAuth"

const App = () => {
  const ProtectedRoute = ({ children, requireLogin = true }) => {
    const userLogin = localStorage.getItem("isAuthenticated");
    const location = useLocation()

    if (userLogin !== "true" && requireLogin) {
      return <Navigate to="/login" state={{ from: location }} replace />
    }

    if (userLogin == "true" && requireLogin == false ) {
      return <Navigate to="/beranda" replace />
    }

    return children
  }

  return (
    <BrowserRouter>
      <InitializeAuth />

      <Layout>
        <Routes>         
          <Route path="/" element={
            <ProtectedRoute requireLogin={false}>
              <LandingPage />
            </ProtectedRoute>
            } />

            <Route path="/login" element={
            <ProtectedRoute requireLogin={false}>
              <LoginPage />
            </ProtectedRoute>
            } />

            <Route path="/beranda" element={
            <ProtectedRoute requireLogin={true}>
              <Beranda />
            </ProtectedRoute>
            } />

            <Route path="/products" element={
            <ProtectedRoute requireLogin={true}>
              <ProductsPage />
            </ProtectedRoute>
            } />

            <Route path="/transactions" element={
            <ProtectedRoute requireLogin={true}>
              <TransactionHistoryPage />
            </ProtectedRoute>
            } />

            <Route path="/checkout" element={
            <ProtectedRoute requireLogin={true}>
              <CheckoutPage />
            </ProtectedRoute>
            } />
        </Routes>
      </Layout>
    </BrowserRouter>
  )
}

export default App
