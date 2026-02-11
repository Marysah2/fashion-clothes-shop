import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ProductsPage from './Products/ProductsPage';
import CartPage from './Components/CartPage';
import CheckoutPage from './Checkout/CheckoutPage';
import OrderSuccess from './Checkout/OrderSuccess';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ProductsPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/order-success" element={<OrderSuccess />} />
      </Routes>
    </BrowserRouter>
  );
}
