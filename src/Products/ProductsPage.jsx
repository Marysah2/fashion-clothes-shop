import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { addToCart } from '../Features/cart/cartSlice';

const products = [
  { id: 1, name: 'Classic T-Shirt', price: 25.99, image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400' },
  { id: 2, name: 'Denim Jeans', price: 79.99, image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=400' },
  { id: 3, name: 'White Sneakers', price: 129.99, image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400' },
  { id: 4, name: 'Leather Jacket', price: 199.99, image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400' },
  { id: 5, name: 'Summer Dress', price: 89.99, image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400' },
  { id: 6, name: 'Casual Hoodie', price: 59.99, image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400' }
];

export default function ProductsPage() {
  const dispatch = useDispatch();
  const cartItems = useSelector(state => state.cart.items);

  return (
    <div className="max-w-7xl mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Fashion Store</h1>
        <Link to="/cart" className="flex items-center gap-2 bg-black text-white px-4 py-2">
          Cart ({cartItems.length})
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {products.map(product => (
          <div key={product.id} className="border rounded-lg overflow-hidden">
            <img src={product.image} alt={product.name} className="w-full h-64 object-cover" />
            <div className="p-4">
              <h3 className="font-bold text-lg">{product.name}</h3>
              <p className="text-blue-600 text-xl mb-3">${product.price}</p>
              <button 
                onClick={() => dispatch(addToCart(product))}
                className="w-full bg-black text-white py-2 rounded hover:bg-gray-800"
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
