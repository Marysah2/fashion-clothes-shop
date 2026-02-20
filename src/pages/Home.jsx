import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTruck, faLock, faGem } from "@fortawesome/free-solid-svg-icons";

export default function Home() {
  return (
    <div className="min-h-screen font-sans">

      <section
        className="relative h-screen flex items-center justify-center bg-cover bg-center bg-gray-900"
        style={{
          backgroundImage:
            "url('https://images.pexels.com/photos/1926769/pexels-photo-1926769.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')",
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="relative text-center px-6 text-white">
          <h1 className="text-5xl md:text-6xl font-extrabold mb-4 uppercase tracking-widest">
            New Season Arrivals
          </h1>
          <p className="text-lg md:text-xl mb-8">
            Step into the latest fashion trends
          </p>
          <Link
            to="/products"
            className="px-8 py-4 bg-white text-black font-semibold rounded-lg hover:bg-gray-200 transition transform hover:scale-105"
          >
            Shop Now
          </Link>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto text-center px-6">
          <h2 className="text-4xl font-bold mb-12 text-black">Why Choose Us?</h2>
          <div className="grid md:grid-cols-3 gap-12">
            <div className="flex flex-col items-center text-center p-8 border border-gray-200 rounded-xl hover:shadow-xl transition">
              <FontAwesomeIcon icon={faTruck} className="text-5xl mb-4 text-black" />
              <h3 className="text-xl font-bold mb-2">Fast Delivery</h3>
              <p className="text-gray-700">
                Get your orders delivered quickly and safely
              </p>
            </div>
            <div className="flex flex-col items-center text-center p-8 border border-gray-200 rounded-xl hover:shadow-xl transition">
              <FontAwesomeIcon icon={faGem} className="text-5xl mb-4 text-black" />
              <h3 className="text-xl font-bold mb-2">Quality Products</h3>
              <p className="text-gray-700">
                Premium fashion items for everyone
              </p>
            </div>
            <div className="flex flex-col items-center text-center p-8 border border-gray-200 rounded-xl hover:shadow-xl transition">
              <FontAwesomeIcon icon={faLock} className="text-5xl mb-4 text-black" />
              <h3 className="text-xl font-bold mb-2">Secure Payment</h3>
              <p className="text-gray-700">
                Safe and secure payment processing
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-black text-white text-center px-6">
        <h2 className="text-4xl font-bold mb-6">Stay Updated</h2>
        <p className="mb-8 text-gray-300 max-w-xl mx-auto">
          Subscribe to our newsletter and never miss the latest trends
        </p>
        <form className="flex flex-col sm:flex-row max-w-md mx-auto gap-4">
          <input
            type="email"
            placeholder="Enter your email"
            className="p-3 rounded-lg text-black flex-1 focus:outline-none"
          />
          <button className="bg-white text-black font-semibold px-6 py-3 rounded-lg hover:bg-gray-200 transition">
            Subscribe
          </button>
        </form>
      </section>
    </div>
  );
}