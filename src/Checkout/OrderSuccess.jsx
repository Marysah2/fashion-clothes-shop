import { useNavigate } from 'react-router-dom';

export default function OrderSuccess() {
  const navigate = useNavigate();

  return (
    <div className="max-w-2xl mx-auto p-4 text-center mt-20">
      <h1 className="text-4xl font-bold mb-4">Order Confirmed</h1>
      <p className="text-gray-600 mb-6">Check your email for order details.</p>
      <button onClick={() => navigate('/')} className="bg-black text-white px-6 py-2">Back to Shop</button>
    </div>
  );
}
