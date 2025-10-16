import { BrowserRouter, Routes, Route } from "react-router-dom"
import Layout from "./components/Layout"
import LandingPage from "./pages/LandingPage"
import LoginPage from "./pages/LoginPage"
import Beranda from "./pages/Beranda"
import ProductsPage from "./pages/ProductPage"
import TransactionHistoryPage from "./pages/TransactionHistoryPage"
import CheckoutPage from "./pages/CheckoutPage"

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/beranda" element={<Beranda />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/transactions" element={<TransactionHistoryPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  )
}

export default App
