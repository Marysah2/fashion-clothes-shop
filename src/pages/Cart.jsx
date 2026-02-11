import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, updateQuantity } from '../slices/cartSlice';
import { Link } from 'react-router-dom';

export default function Cart() {
  const dispatch = useDispatch();
  const items = useSelector(state => state.cart.items);
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Shopping Cart</h1>
      
      {items.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-xl text-gray-600 mb-4">Your cart is empty</p>
          <Link to="/products" className="bg-black text-white px-6 py-2 rounded hover:bg-gray-800">
            Continue Shopping
          </Link>
        </div>
      ) : (
        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            {items.map(item => (
              <div key={`${item.id}-${item.size}`} className="flex gap-4 border-b py-4">
                <img src={item.image || 'https://via.placeholder.com/100'} alt={item.name} className="w-24 h-24 object-cover rounded" />
                <div className="flex-1">
                  <h3 className="font-semibold">{item.name}</h3>
                  <p className="text-gray-600">Size: {item.size}</p>
                  <p className="font-bold">${item.price}</p>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    min="1"
                    value={item.quantity}
                    onChange={(e) => dispatch(updateQuantity({ id: item.id, size: item.size, quantity: parseInt(e.target.value) }))}
                    className="w-16 border rounded px-2 py-1"
                  />
                  <button onClick={() => dispatch(removeFromCart({ id: item.id, size: item.size }))} className="text-red-600 hover:underline">
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-gray-100 p-6 rounded-lg h-fit">
            <h2 className="text-xl font-bold mb-4">Order Summary</h2>
            <div className="flex justify-between mb-2">
              <span>Subtotal</span>
              <span>${total.toFixed(2)}</span>
            </div>
            <div className="flex justify-between font-bold text-xl mt-4 pt-4 border-t">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
            <Link to="/checkout" className="block w-full bg-black text-white text-center py-3 rounded mt-6 hover:bg-gray-800">
              Proceed to Checkout
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
