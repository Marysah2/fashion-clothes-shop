import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, updateQuantity } from '../slices/cartSlice';
import { Link } from 'react-router-dom';

export default function Cart() {
  const dispatch = useDispatch();
  const items = useSelector(state => state.cart.items);
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold mb-8 text-gray-900">Shopping Cart</h1>
        
        {items.length === 0 ? (
          <div className="text-center py-24 bg-white rounded-2xl shadow-sm">
            <div className="text-6xl mb-4">🛒</div>
            <p className="text-2xl text-gray-600 mb-6">Your cart is empty</p>
            <Link to="/products" className="inline-block bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-3 rounded-lg hover:from-blue-700 hover:to-blue-800 transition font-semibold shadow-lg">
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-4">
              {items.map(item => (
                <div key={`${item.id}-${item.size}`} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition">
                  <div className="flex gap-6">
                    <img src={item.image || 'https://via.placeholder.com/120'} alt={item.name} className="w-28 h-28 object-cover rounded-lg" />
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-gray-900 mb-1">{item.name}</h3>
                      <p className="text-gray-500 text-sm mb-2">Size: <span className="font-medium text-gray-700">{item.size}</span></p>
                      <p className="text-2xl font-bold text-blue-600">${item.price}</p>
                    </div>
                    <div className="flex flex-col items-end justify-between">
                      <button onClick={() => dispatch(removeFromCart({ id: item.id, size: item.size }))} className="text-red-500 hover:text-red-700 font-medium transition">
                        ✕ Remove
                      </button>
                      <div className="flex items-center gap-2 border-2 border-gray-200 rounded-lg">
                        <button onClick={() => dispatch(updateQuantity({ id: item.id, size: item.size, quantity: Math.max(1, item.quantity - 1) }))} className="px-3 py-1 hover:bg-gray-100 font-bold">-</button>
                        <span className="px-4 font-semibold">{item.quantity}</span>
                        <button onClick={() => dispatch(updateQuantity({ id: item.id, size: item.size, quantity: item.quantity + 1 }))} className="px-3 py-1 hover:bg-gray-100 font-bold">+</button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="lg:col-span-1">
              <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 sticky top-4">
                <h2 className="text-2xl font-bold mb-6 text-gray-900">Order Summary</h2>
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal ({items.length} items)</span>
                    <span className="font-semibold">${total.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Shipping</span>
                    <span className="font-semibold text-green-600">FREE</span>
                  </div>
                  <div className="border-t-2 border-gray-200 pt-4">
                    <div className="flex justify-between text-xl font-bold text-gray-900">
                      <span>Total</span>
                      <span className="text-blue-600">${total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
                <Link to="/checkout" className="block w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white text-center py-4 rounded-lg hover:from-blue-700 hover:to-blue-800 transition font-semibold shadow-lg hover:shadow-xl transform hover:scale-[1.02]">
                  Proceed to Checkout
                </Link>
                <Link to="/products" className="block w-full text-center text-blue-600 hover:text-blue-700 font-medium mt-4">
                  ← Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
