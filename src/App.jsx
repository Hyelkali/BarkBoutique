"use client"

import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { CartProvider } from "./components/CartContext"
import { ThemeProvider } from "./components/ThemeContext"
import { AuthProvider } from "./components/AuthContext"
import Home from "./pages/Home"
import Shop from "./pages/Shop"
import ProductDetail from "./pages/ProductDetail"
import Checkout from "./pages/Checkout"
import Breeds from "./pages/Breeds"
import BreedDetail from "./pages/BreedDetail"
import Blog from "./pages/Blog"
import BlogPost from "./pages/BlogPost"
import Login from "./pages/Login"
import AdminDashboard from "./pages/admin/Dashboard"
import AdminProducts from "./pages/admin/Products"
import AdminAddProduct from "./pages/admin/AddProduct"
import AdminEditProduct from "./pages/admin/EditProduct"
import ProtectedRoute from "./components/ProtectedRoute"
import { SplashScreen } from "./components/SplashScreen"
import { Navigation } from "./components/Navigation"
import { Footer } from "./components/Footer"
import { AnimatePresence } from "framer-motion"

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <CartProvider>
          <Router>
            <div className="min-h-screen transition-colors duration-300 dark:bg-dark-900 dark:text-gray-100 bg-gray-50 text-gray-900">
              <SplashScreen />
              <Navigation />
              <AnimatePresence mode="wait">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/shop" element={<Shop />} />
                  <Route path="/product/:id" element={<ProductDetail />} />
                  <Route path="/checkout" element={<Checkout />} />
                  <Route path="/breeds" element={<Breeds />} />
                  <Route path="/breed/:id" element={<BreedDetail />} />
                  <Route path="/blog" element={<Blog />} />
                  <Route path="/blog/:slug" element={<BlogPost />} />
                  <Route path="/login" element={<Login />} />

                  {/* Admin Routes */}
                  <Route
                    path="/admin"
                    element={
                      <ProtectedRoute>
                        <AdminDashboard />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/admin/products"
                    element={
                      <ProtectedRoute>
                        <AdminProducts />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/admin/products/add"
                    element={
                      <ProtectedRoute>
                        <AdminAddProduct />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/admin/products/edit/:id"
                    element={
                      <ProtectedRoute>
                        <AdminEditProduct />
                      </ProtectedRoute>
                    }
                  />
                </Routes>
              </AnimatePresence>
              <Footer />
            </div>
          </Router>
        </CartProvider>
      </AuthProvider>
    </ThemeProvider>
  )
}

export default App
