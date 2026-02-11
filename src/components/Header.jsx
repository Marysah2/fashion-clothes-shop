import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function Header() {
  const { isAdmin } = useSelector(state => state.auth);

  return (
    <header className="bg-gradient-to-r from-gray-900 to-gray-800 text-white shadow-lg">
      <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold hover:text-gray-300 transition">Fashion Shop</Link>
        <div className="flex gap-6 items-center">
          <Link to="/products" className="hover:text-gray-300 transition">Products</Link>
          <Link to="/products?category=Men" className="hover:text-gray-300 transition">Men</Link>
          <Link to="/products?category=Women" className="hover:text-gray-300 transition">Women</Link>
          <Link to="/products?category=Kids" className="hover:text-gray-300 transition">Kids</Link>
          <Link to="/products?category=Accessories" className="hover:text-gray-300 transition">Accessories</Link>
          {isAdmin && <Link to="/admin" className="bg-blue-600 px-3 py-1 rounded hover:bg-blue-700 transition">Admin</Link>}
        </div>
      </nav>
    </header>
  );
}
