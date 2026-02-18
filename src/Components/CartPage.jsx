import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import CartItem from './CartItem';
import { clearCart } from '../Features/cart/cartSlice';

export default function CartPage() {
  const items = useSelector(state => state.cart.items);
  const dispatch = useDispatch();
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Your Cart ({items.length} items)</h1>
        <button 
          onClick={() => dispatch(clearCart())}
          className="bg-gray-600 text-white px-6 py-2 rounded hover:bg-gray-700"
        >
          Clear Cart
        </button>
      </div>
      
      {items.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-xl text-gray-600 mb-4">No items in cart</p>
          <Link to="/" className="text-blue-600 hover:underline">Continue Shopping</Link>
        </div>
      ) : (
        <>
          {items.map(item => <CartItem key={item.id} item={item} />)}
          
          <div className="bg-white rounded-lg shadow-md p-6 mt-6 max-w-md ml-auto">
            <div className="space-y-3">
              <div className="flex justify-between text-lg">
                <span>Subtotal:</span>
                <span className="font-semibold">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-lg">
                <span>Shipping:</span>
                <span className="text-gray-600">Calculated at checkout</span>
              </div>
              <div className="border-t pt-3 flex justify-between text-xl font-bold">
                <span>Total:</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
            </div>
            <Link 
              to="/checkout" 
              className="block w-full bg-blue-600 text-white py-3 rounded text-center hover:bg-blue-700 font-semibold mt-6"
            >
              Proceed to Checkout
            </Link>
          </div>
        </>
      )}
    </div>
  );
}
