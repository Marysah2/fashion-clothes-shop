import { Link } from 'react-router-dom';

export default function Home() {
  const categories = [
    { name: 'Men', icon: '👔', color: 'from-blue-500 to-blue-600' },
    { name: 'Women', icon: '👗', color: 'from-pink-500 to-pink-600' },
    { name: 'Kids', icon: '🧸', color: 'from-green-500 to-green-600' },
    { name: 'Accessories', icon: '👜', color: 'from-purple-500 to-purple-600' }
  ];

  return (
    <div>
      <div className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white py-24">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-6xl font-bold mb-6 animate-fade-in">Welcome to Fashion Shop</h1>
          <p className="text-2xl text-gray-300 mb-10 max-w-2xl mx-auto">
            Discover the latest trends in fashion and elevate your style
          </p>
          <Link 
            to="/products" 
            className="inline-block bg-white text-gray-900 px-10 py-4 rounded-lg hover:bg-gray-100 transition font-bold text-lg shadow-xl hover:shadow-2xl transform hover:scale-105"
          >
            Shop Now →
          </Link>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">Shop by Category</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {categories.map(category => (
            <Link 
              key={category.name} 
              to={`/products?category=${category.name}`} 
              className={`bg-gradient-to-br ${category.color} p-10 rounded-xl text-center hover:shadow-2xl transition-all transform hover:scale-105 text-white group`}
            >
              <div className="text-6xl mb-4 group-hover:scale-110 transition-transform">{category.icon}</div>
              <h3 className="text-3xl font-bold">{category.name}</h3>
              <p className="mt-2 text-white/80">Explore Collection</p>
            </Link>
          ))}
        </div>
      </div>

      <div className="bg-gray-100 py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6 text-gray-800">Why Choose Us?</h2>
          <div className="grid md:grid-cols-3 gap-8 mt-12">
            <div className="bg-white p-8 rounded-lg shadow-md">
              <div className="text-5xl mb-4">🚚</div>
              <h3 className="text-xl font-bold mb-2">Fast Delivery</h3>
              <p className="text-gray-600">Get your orders delivered quickly and safely</p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-md">
              <div className="text-5xl mb-4">✨</div>
              <h3 className="text-xl font-bold mb-2">Quality Products</h3>
              <p className="text-gray-600">Premium quality fashion items for everyone</p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-md">
              <div className="text-5xl mb-4">💳</div>
              <h3 className="text-xl font-bold mb-2">Secure Payment</h3>
              <p className="text-gray-600">Safe and secure payment processing</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
