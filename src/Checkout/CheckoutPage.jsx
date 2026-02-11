import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { clearCart } from '../Features/cart/cartSlice';
import { orderAPI } from '../api';

export default function CheckoutPage() {
  const items = useSelector(state => state.cart.items);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', address: '', city: '', zip: '', phone: '' });
  const [paymentMethod, setPaymentMethod] = useState('mpesa');
  const [loading, setLoading] = useState(false);

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0) + 10;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const orderData = {
        shipping_address: `${form.address}, ${form.city}, ${form.zip}`,
        billing_info: `${form.name}, ${form.email}`,
        payment_method: paymentMethod,
        phone_number: form.phone,
        items: items.map(item => ({
          product_id: item.id,
          quantity: item.quantity,
          price: item.price
        }))
      };
      await orderAPI.createOrder(orderData);
      dispatch(clearCart());
      navigate('/order-success');
    } catch (error) {
      alert('Order failed. Make sure backend is running.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Checkout</h1>
      <div className="grid md:grid-cols-2 gap-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="text" placeholder="Name" value={form.name} onChange={e => setForm({...form, name: e.target.value})} className="w-full border p-2 cursor-text" required />
          <input type="email" placeholder="Email" value={form.email} onChange={e => setForm({...form, email: e.target.value})} className="w-full border p-2 cursor-text" required />
          <input type="text" placeholder="Street Address" value={form.address} onChange={e => setForm({...form, address: e.target.value})} className="w-full border p-2 cursor-text" required />
          <div className="grid grid-cols-2 gap-4">
            <input type="text" placeholder="City" value={form.city} onChange={e => setForm({...form, city: e.target.value})} className="border p-2 cursor-text" required />
            <input type="text" placeholder="ZIP" value={form.zip} onChange={e => setForm({...form, zip: e.target.value})} className="border p-2 cursor-text" required />
          </div>
          <div className="border-t pt-4">
            <h3 className="font-bold mb-3">Payment Method</h3>
            <div className="space-y-2">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="radio" name="payment" value="mpesa" checked={paymentMethod === 'mpesa'} onChange={e => setPaymentMethod(e.target.value)} />
                <span>M-Pesa</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="radio" name="payment" value="card" checked={paymentMethod === 'card'} onChange={e => setPaymentMethod(e.target.value)} />
                <span>Credit/Debit Card</span>
              </label>
            </div>
          </div>
          {paymentMethod === 'mpesa' && (
            <input type="tel" placeholder="M-Pesa Phone (07XX or 254XXX)" value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} className="w-full border p-2 cursor-text" required pattern="(254[0-9]{9}|0[17][0-9]{8})" />
          )}
          <button type="submit" disabled={loading} className="w-full bg-black text-white py-2 disabled:opacity-50 cursor-pointer">
            {loading ? 'Processing...' : paymentMethod === 'mpesa' ? 'Pay with M-Pesa' : 'Place Order'}
          </button>
        </form>
        <div className="border p-4">
          <h2 className="font-bold mb-4">Order Summary</h2>
          {items.map(item => (
            <div key={item.id} className="flex justify-between mb-2">
              <span>{item.name} x{item.quantity}</span>
              <span>${(item.price * item.quantity).toFixed(2)}</span>
            </div>
          ))}
          <div className="border-t pt-2 mt-2 font-bold">
            <div className="flex justify-between">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
