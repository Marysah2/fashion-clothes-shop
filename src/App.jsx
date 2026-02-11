import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store/store';
import Header from './components/Header';
import Home from './pages/Home';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import Admin from './pages/Admin';

export default function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <div className="min-h-screen bg-gray-50">
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/products/:id" element={<ProductDetail />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="*" element={<div className="container mx-auto px-4 py-16 text-center"><h1 className="text-4xl font-bold">404 - Page Not Found</h1></div>} />
          </Routes>
        </div>
      </BrowserRouter>
    </Provider>
  );
}
