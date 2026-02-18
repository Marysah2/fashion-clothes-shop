import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { fetchProducts, setFilters, setSortBy, clearFilters } from '../slices/productsSlice';
import ProductCard from '../components/ProductCard';

export default function Products() {
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const { filteredItems, filters, sortBy, loading } = useSelector(state => state.products);

  useEffect(() => {
    const category = searchParams.get('category');
    dispatch(fetchProducts());
    if (category) {
      dispatch(setFilters({ category }));
    } else {
      dispatch(clearFilters());
    }
  }, [searchParams, dispatch]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    dispatch(setFilters({ [name]: value }));
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-gray-800">Products</h1>
      
      <div className="flex gap-8">
        <aside className="w-64 flex-shrink-0">
          <div className="bg-white p-6 rounded-lg shadow-md sticky top-4">
            <h2 className="font-bold text-xl mb-6 text-gray-800">Filters</h2>
            
            <div className="mb-5">
              <label className="block text-sm font-semibold mb-2 text-gray-700">Category</label>
              <select name="category" value={filters.category} onChange={handleFilterChange} className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                <option value="">All Categories</option>
                <option value="Men">Men</option>
                <option value="Women">Women</option>
                <option value="Children">Children</option>
                <option value="Accessories">Accessories</option>
              </select>
            </div>

            <div className="mb-5">
              <label className="block text-sm font-semibold mb-2 text-gray-700">Price Range</label>
              <div className="flex gap-2">
                <input type="number" name="minPrice" value={filters.minPrice} onChange={handleFilterChange} className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="Min" />
                <input type="number" name="maxPrice" value={filters.maxPrice} onChange={handleFilterChange} className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="Max" />
              </div>
            </div>

            <button onClick={() => dispatch(clearFilters())} className="w-full bg-gray-200 py-2 rounded-lg hover:bg-gray-300 transition font-medium">
              Clear All Filters
            </button>
          </div>
        </aside>

        <div className="flex-1">
          <div className="flex justify-between items-center mb-6 bg-white p-4 rounded-lg shadow-sm">
            <p className="text-gray-700 font-medium">
              {loading ? 'Loading...' : `${filteredItems.length} product${filteredItems.length !== 1 ? 's' : ''} found`}
            </p>
            <div className="flex items-center gap-2">
              <label className="text-sm text-gray-600">Sort by:</label>
              <select value={sortBy} onChange={(e) => dispatch(setSortBy(e.target.value))} className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                <option value="name">Name (A-Z)</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
              </select>
            </div>
          </div>

          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
            </div>
          ) : filteredItems.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-lg shadow-sm">
              <p className="text-xl text-gray-500">No products found matching your criteria</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredItems.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
