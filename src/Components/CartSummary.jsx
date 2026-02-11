import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export default function CartSummary() {
  const items = useSelector(state => state.cart.items);
  const navigate = useNavigate();
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="bg-white rounded-lg shadow p-6 h-fit sticky top-6">
      <h2 className="text-xl font-bold mb-6">Order Summary</h2>
      <div className="space-y-3 mb-6">
        <div className="flex justify-between text-gray-600">
          <span>Subtotal</span>
          <span>${total.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-gray-600">
          <span>Shipping</span>
          <span>$10.00</span>
        </div>
        <div className="border-t pt-3 flex justify-between font-bold text-lg">
          <span>Total</span>
          <span>${(total + 10).toFixed(2)}</span>
        </div>
      </div>
      <button onClick={() => navigate('/checkout')} className="w-full bg-black text-white py-3 rounded hover:bg-gray-800 transition">Proceed to Checkout</button>
    </div>
  );
}
