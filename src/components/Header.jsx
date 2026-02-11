import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../slices/authSlice';

export default function Header() {
  const dispatch = useDispatch();
  const { user, isAdmin } = useSelector(state => state.auth);
  const cartItems = useSelector(state => state.cart.items);
  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

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
          <Link to="/cart" className="relative hover:text-gray-300 transition">
            Cart
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </Link>
          {user ? (
            <div className="flex items-center gap-3">
              <span className="text-sm text-gray-300">Hi, {user.name}</span>
              <button onClick={() => dispatch(logout())} className="hover:text-gray-300 transition">Logout</button>
            </div>
          ) : (
            <Link to="/login" className="bg-white text-gray-900 px-4 py-2 rounded hover:bg-gray-100 transition">Login</Link>
          )}
        </div>
      </nav>
    </header>
  );
}
