import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductById } from '../slices/productsSlice';
import { addToCart } from '../slices/cartSlice';

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const product = useSelector(state => state.products.currentProduct);
  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);

  useEffect(() => {
    dispatch(fetchProductById(id));
  }, [id, dispatch]);

  const handleAddToCart = () => {
    if (!selectedSize && product.sizes && product.sizes.length > 0) {
      alert('Please select a size');
      return;
    }
    dispatch(addToCart({ ...product, size: selectedSize || 'N/A', quantity }));
    alert('Added to cart successfully!');
  };

  if (!product) return (
    <div className="container mx-auto px-4 py-16 flex justify-center">
      <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-gray-900"></div>
    </div>
  );

  const images = product.images || [product.image || 'https://via.placeholder.com/600'];

  return (
    <div className="container mx-auto px-4 py-8">
      <button onClick={() => navigate(-1)} className="mb-6 text-blue-600 hover:text-blue-800 flex items-center gap-2">
        ← Back to Products
      </button>

      <div className="grid md:grid-cols-2 gap-12 bg-white p-8 rounded-lg shadow-lg">
        <div>
          <div className="mb-4 rounded-lg overflow-hidden border">
            <img src={images[selectedImage]} alt={product.name} className="w-full h-96 object-cover" />
          </div>
          {images.length > 1 && (
            <div className="flex gap-3">
              {images.map((img, i) => (
                <img 
                  key={i} 
                  src={img} 
                  alt="" 
                  onClick={() => setSelectedImage(i)}
                  className={`w-20 h-20 object-cover rounded cursor-pointer border-2 transition ${selectedImage === i ? 'border-blue-600' : 'border-gray-300 hover:border-gray-400'}`}
                />
              ))}
            </div>
          )}
        </div>

        <div>
          <div className="mb-2">
            <span className="inline-block bg-gray-200 text-gray-700 text-sm px-3 py-1 rounded-full">{product.category}</span>
          </div>
          <h1 className="text-4xl font-bold mb-3 text-gray-900">{product.name}</h1>
          <p className="text-4xl font-bold text-blue-600 mb-6">${product.price}</p>

          <div className="mb-6 pb-6 border-b">
            <h2 className="font-semibold text-lg mb-2 text-gray-800">Description</h2>
            <p className="text-gray-600 leading-relaxed">{product.description || 'No description available.'}</p>
          </div>

          {product.material && (
            <div className="mb-6 pb-6 border-b">
              <h2 className="font-semibold text-lg mb-2 text-gray-800">Material</h2>
              <p className="text-gray-600">{product.material}</p>
            </div>
          )}

          {product.sizes && product.sizes.length > 0 && (
            <div className="mb-6">
              <h2 className="font-semibold text-lg mb-3 text-gray-800">Select Size</h2>
              <div className="flex gap-3 flex-wrap">
                {product.sizes.map(size => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-6 py-3 border-2 rounded-lg font-medium transition ${
                      selectedSize === size 
                        ? 'bg-black text-white border-black' 
                        : 'bg-white text-gray-700 border-gray-300 hover:border-gray-400'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="mb-8">
            <h2 className="font-semibold text-lg mb-3 text-gray-800">Quantity</h2>
            <div className="flex items-center gap-3">
              <button 
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-10 h-10 border-2 border-gray-300 rounded-lg hover:bg-gray-100 font-bold"
              >
                -
              </button>
              <input
                type="number"
                min="1"
                value={quantity}
                onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                className="border-2 border-gray-300 rounded-lg px-4 py-2 w-20 text-center font-medium"
              />
              <button 
                onClick={() => setQuantity(quantity + 1)}
                className="w-10 h-10 border-2 border-gray-300 rounded-lg hover:bg-gray-100 font-bold"
              >
                +
              </button>
            </div>
          </div>

          <button 
            onClick={handleAddToCart} 
            className="w-full bg-black text-white py-4 rounded-lg hover:bg-gray-800 transition font-semibold text-lg shadow-md"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
