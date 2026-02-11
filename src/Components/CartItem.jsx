import { useDispatch } from 'react-redux';
import { removeFromCart, updateQuantity } from '../Features/cart/cartSlice';

export default function CartItem({ item }) {
  const dispatch = useDispatch();

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-4">
      <div className="flex items-center gap-6">
        <img src={item.image} alt={item.name} className="w-24 h-24 object-cover rounded" />
        <div className="flex-1">
          <h3 className="font-bold text-lg mb-1">{item.name}</h3>
          <p className="text-gray-700">${item.price.toFixed(2)}</p>
        </div>
        <div className="flex items-center gap-2">
          <button 
            onClick={() => dispatch(updateQuantity({ id: item.id, quantity: Math.max(1, item.quantity - 1) }))} 
            className="w-10 h-10 bg-blue-600 text-white rounded hover:bg-blue-700 font-bold"
          >
            -
          </button>
          <span className="w-10 text-center font-semibold">{item.quantity}</span>
          <button 
            onClick={() => dispatch(updateQuantity({ id: item.id, quantity: item.quantity + 1 }))} 
            className="w-10 h-10 bg-blue-600 text-white rounded hover:bg-blue-700 font-bold"
          >
            +
          </button>
        </div>
        <div className="text-blue-600 font-bold text-xl w-28 text-right">
          ${(item.price * item.quantity).toFixed(2)}
        </div>
        <button 
          onClick={() => dispatch(removeFromCart(item.id))} 
          className="bg-red-500 text-white px-6 py-2 rounded hover:bg-red-600 font-medium"
        >
          Remove
        </button>
      </div>
    </div>
  );
}
