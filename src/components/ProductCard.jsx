import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart } from '../slices/cartSlice';

export default function ProductCard({ product }) {
  const dispatch = useDispatch();

  const handleAddToCart = (e) => {
    e.preventDefault();
    dispatch(addToCart(product));
  };

  return (
    <Link to={`/products/${product.id}`} className="group border rounded-lg overflow-hidden hover:shadow-xl transition-all duration-300 bg-white">
      <div className="overflow-hidden">
        <img 
          src={product.image_url || 'https://via.placeholder.com/300'} 
          alt={product.name} 
          className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300" 
        />
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-lg group-hover:text-blue-600 transition-colors">{product.name}</h3>
        <p className="text-gray-500 text-sm mt-1">{product.category_name}</p>
        <div className="flex justify-between items-center mt-3">
          <p className="text-xl font-bold text-gray-900">${product.price}</p>
        </div>
        <button
          onClick={handleAddToCart}
          className="w-full mt-3 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Add to Cart
        </button>
      </div>
    </Link>
  );
}
