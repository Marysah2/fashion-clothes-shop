import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ProductsPage from './Products/ProductsPage';
import CartPage from './Components/CartPage';
import CheckoutPage from './Checkout/CheckoutPage';
import OrderSuccess from './Checkout/OrderSuccess';
import OrderHistory from './features/orders/OrderHistory';
import AdminOrders from './features/orders/AdminOrders';
import AnalyticsDashboard from './features/admin/AnalyticsDashboard';
import './index.css';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ProductsPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/order-success" element={<OrderSuccess />} />
        <Route path="/orders/history" element={<OrderHistory />} />
        <Route path="/admin/analytics" element={<AnalyticsDashboard />} />
        <Route path="/admin/orders" element={<AdminOrders />} />
        <Route path="*" element={<div>404</div>} />
      </Routes>
    </BrowserRouter>
  );
}
