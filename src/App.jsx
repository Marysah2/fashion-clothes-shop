import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

import ProductsPage from "./Products/ProductsPage";
import CartPage from "./Components/CartPage";
import CheckoutPage from "./Checkout/CheckoutPage";
import OrderSuccess from "./Checkout/OrderSuccess";
import OrderHistory from "./features/orders/OrderHistory";
import AdminOrders from "./features/orders/AdminOrders";
import AnalyticsDashboard from "./features/admin/AnalyticsDashboard";

import ProtectedRoute from "./components/protectedRoutes";
import SelectRole from "./pages/selectRole";
import Auth from "./pages/Auth";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";

export default function App() {
  const reduxUser = useSelector((state) => state.auth.user);
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const user = reduxUser || storedUser;

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={user ? <Navigate to="/home" /> : <Navigate to="/auth" />}
        />
        <Route path="/select-role" element={user ? <Navigate to="/home" /> : <SelectRole />} />
        <Route path="/auth" element={user ? <Navigate to="/home" /> : <Auth />} />
        <Route
          path="/home"
          element={
            <ProtectedRoute allowedRoles={["customer", "admin"]}>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/products"
          element={
            <ProtectedRoute allowedRoles={["customer", "admin"]}>
              <ProductsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/cart"
          element={
            <ProtectedRoute allowedRoles={["customer", "admin"]}>
              <CartPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/checkout"
          element={
            <ProtectedRoute allowedRoles={["customer", "admin"]}>
              <CheckoutPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/order-success"
          element={
            <ProtectedRoute allowedRoles={["customer", "admin"]}>
              <OrderSuccess />
            </ProtectedRoute>
          }
        />
        <Route
          path="/orders/history"
          element={
            <ProtectedRoute allowedRoles={["customer", "admin"]}>
              <OrderHistory />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/analytics"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <AnalyticsDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/orders"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <AdminOrders />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<div>404</div>} />
      </Routes>
    </BrowserRouter>
  );
}