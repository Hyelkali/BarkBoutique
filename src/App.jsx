"use client"

import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { Navigation } from "./components/Navigation"
import { Footer } from "./components/Footer"
import { AuthProvider } from "./components/AuthContext"
import { CartProvider } from "./components/CartContext"
import { ThemeProvider } from "./components/ThemeContext"
import { ToastProvider } from "./components/ToastContext"
import { OrderProvider } from "./components/OrderContext"
import { SplashScreen } from "./components/SplashScreen"
import { CustomCursor } from "./components/CustomCursor"
import { ProtectedRoute } from "./components/ProtectedRoute"
import Home from "./pages/Home"
import Shop from "./pages/Shop"
import ProductDetail from "./pages/ProductDetail"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Checkout from "./pages/Checkout"
import OrderHistory from "./pages/OrderHistory"
import OrderDetail from "./pages/OrderDetail"
import Breeds from "./pages/Breeds"
import BreedDetail from "./pages/BreedDetail"
import Blog from "./pages/Blog"
import BlogPost from "./pages/BlogPost"
import Profile from "./pages/Profile"
import AdminDashboard from "./pages/admin/Dashboard"
import AdminProducts from "./pages/admin/Products"
import AdminOrders from "./pages/admin/Orders"
import AddProduct from "./pages/admin/AddProduct"
import EditProduct from "./pages/admin/EditProduct"
import AboutUs from "./pages/AboutUs"
import Contact from "./pages/Contact"
import ShippingReturns from "./pages/ShippingReturns"
import PrivacyPolicy from "./pages/PrivacyPolicy"
import { useEffect, useState } from "react"

function App() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setLoading(false)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  if (loading) {
    return <SplashScreen />
  }

  return (
    <Router>
      <ThemeProvider>
        <AuthProvider>
          <CartProvider>
            <OrderProvider>
              <ToastProvider>
                <div className="flex flex-col min-h-screen">
                  <Navigation />
                  <main className="flex-grow">
                    <Routes>
                      <Route path="/" element={<Home />} />
                      <Route path="/shop" element={<Shop />} />
                      <Route path="/product/:id" element={<ProductDetail />} />
                      <Route path="/login" element={<Login />} />
                      <Route path="/register" element={<Register />} />
                      <Route path="/breeds" element={<Breeds />} />
                      <Route path="/breeds/:id" element={<BreedDetail />} />
                      <Route path="/blog" element={<Blog />} />
                      <Route path="/blog/:id" element={<BlogPost />} />

                      {/* New Pages */}
                      <Route path="/about" element={<AboutUs />} />
                      <Route path="/contact" element={<Contact />} />
                      <Route path="/shipping-returns" element={<ShippingReturns />} />
                      <Route path="/privacy-policy" element={<PrivacyPolicy />} />

                      {/* Protected Routes */}
                      <Route
                        path="/checkout"
                        element={
                          <ProtectedRoute>
                            <Checkout />
                          </ProtectedRoute>
                        }
                      />
                      <Route
                        path="/orders"
                        element={
                          <ProtectedRoute>
                            <OrderHistory />
                          </ProtectedRoute>
                        }
                      />
                      <Route
                        path="/orders/:id"
                        element={
                          <ProtectedRoute>
                            <OrderDetail />
                          </ProtectedRoute>
                        }
                      />
                      <Route
                        path="/profile"
                        element={
                          <ProtectedRoute>
                            <Profile />
                          </ProtectedRoute>
                        }
                      />

                      {/* Admin Routes */}
                      <Route
                        path="/admin"
                        element={
                          <ProtectedRoute adminOnly>
                            <AdminDashboard />
                          </ProtectedRoute>
                        }
                      />
                      <Route
                        path="/admin/products"
                        element={
                          <ProtectedRoute adminOnly>
                            <AdminProducts />
                          </ProtectedRoute>
                        }
                      />
                      <Route
                        path="/admin/orders"
                        element={
                          <ProtectedRoute adminOnly>
                            <AdminOrders />
                          </ProtectedRoute>
                        }
                      />
                      <Route
                        path="/admin/products/add"
                        element={
                          <ProtectedRoute adminOnly>
                            <AddProduct />
                          </ProtectedRoute>
                        }
                      />
                      <Route
                        path="/admin/products/edit/:id"
                        element={
                          <ProtectedRoute adminOnly>
                            <EditProduct />
                          </ProtectedRoute>
                        }
                      />
                    </Routes>
                  </main>
                  <Footer />
                </div>
                <CustomCursor />
              </ToastProvider>
            </OrderProvider>
          </CartProvider>
        </AuthProvider>
      </ThemeProvider>
    </Router>
  )
}

export default App
