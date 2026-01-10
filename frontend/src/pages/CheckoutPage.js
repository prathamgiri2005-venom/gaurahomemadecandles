import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import useRazorpay from 'react-razorpay';
import api from '../utils/api';

const CheckoutPage = () => {
  const [Razorpay] = useRazorpay();
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);
  const [shippingInfo, setShippingInfo] = useState({
    fullName: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    phone: '',
  });

  useEffect(() => {
    loadCart();
  }, []);

  const loadCart = async () => {
    try {
      const res = await api.get('/cart');
      if (res.data.length === 0) {
        navigate('/cart');
        return;
      }
      setCartItems(res.data);
    } catch (error) {
      toast.error('Failed to load cart');
      navigate('/cart');
    } finally {
      setLoading(false);
    }
  };

  const calculateTotal = () => {
    return cartItems.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
  };

  const handleInputChange = (e) => {
    setShippingInfo({ ...shippingInfo, [e.target.name]: e.target.value });
  };

  const handlePayment = async (e) => {
    e.preventDefault();
    
    // Validate shipping info
    if (!shippingInfo.fullName || !shippingInfo.address || !shippingInfo.city || !shippingInfo.pincode || !shippingInfo.phone) {
      toast.error('Please fill all shipping details');
      return;
    }

    setProcessing(true);

    try {
      const totalAmount = calculateTotal();

      // Create Razorpay order
      const orderRes = await api.post('/razorpay/create-order', { amount: totalAmount });
      const { order_id, amount, currency, key } = orderRes.data;

      const options = {
        key: key,
        amount: amount,
        currency: currency,
        name: 'Gauri Homemade Candles',
        description: 'Premium Hand-Poured Candles',
        order_id: order_id,
        handler: async (response) => {
          try {
            // Create order in our system
            const orderItems = cartItems.map(item => ({
              product_id: item.product.id,
              product_name: item.product.name,
              quantity: item.quantity,
              price: item.product.price,
            }));

            await api.post('/orders', {
              items: orderItems,
              total_amount: totalAmount,
              shipping_address: shippingInfo,
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            });

            toast.success('Order placed successfully!');
            navigate('/orders');
          } catch (error) {
            toast.error('Order creation failed. Please contact support.');
          }
        },
        prefill: {
          name: shippingInfo.fullName,
          contact: shippingInfo.phone,
        },
        theme: {
          color: '#5D6E5E',
        },
      };

      const razorpayInstance = new Razorpay(options);
      razorpayInstance.on('payment.failed', (response) => {
        toast.error('Payment failed. Please try again.');
        setProcessing(false);
      });
      razorpayInstance.open();
      setProcessing(false);
    } catch (error) {
      toast.error(error.response?.data?.detail || 'Payment initiation failed');
      setProcessing(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-24">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-24">
        <h1 className="text-4xl md:text-5xl font-normal tracking-tight mb-12" data-testid="checkout-title">Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Shipping Form */}
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-normal mb-6">Shipping Information</h2>
            <form onSubmit={handlePayment} className="space-y-6" data-testid="checkout-form">
              <div>
                <label className="block text-xs uppercase tracking-widest text-[#5D6E5E] mb-3">Full Name</label>
                <input
                  type="text"
                  name="fullName"
                  value={shippingInfo.fullName}
                  onChange={handleInputChange}
                  required
                  className="w-full bg-transparent border-b border-[#5D6E5E]/30 focus:border-[#5D6E5E] px-0 py-4 text-base placeholder:text-[#5D6E5E]/40 focus:outline-none transition-colors"
                  data-testid="shipping-fullname"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-widest text-[#5D6E5E] mb-3">Address</label>
                <textarea
                  name="address"
                  value={shippingInfo.address}
                  onChange={handleInputChange}
                  required
                  rows={3}
                  className="w-full bg-transparent border border-[#5D6E5E]/30 focus:border-[#5D6E5E] rounded-sm p-4 text-base placeholder:text-[#5D6E5E]/40 focus:outline-none transition-colors"
                  data-testid="shipping-address"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs uppercase tracking-widest text-[#5D6E5E] mb-3">City</label>
                  <input
                    type="text"
                    name="city"
                    value={shippingInfo.city}
                    onChange={handleInputChange}
                    required
                    className="w-full bg-transparent border-b border-[#5D6E5E]/30 focus:border-[#5D6E5E] px-0 py-4 text-base placeholder:text-[#5D6E5E]/40 focus:outline-none transition-colors"
                    data-testid="shipping-city"
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-widest text-[#5D6E5E] mb-3">State</label>
                  <input
                    type="text"
                    name="state"
                    value={shippingInfo.state}
                    onChange={handleInputChange}
                    required
                    className="w-full bg-transparent border-b border-[#5D6E5E]/30 focus:border-[#5D6E5E] px-0 py-4 text-base placeholder:text-[#5D6E5E]/40 focus:outline-none transition-colors"
                    data-testid="shipping-state"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs uppercase tracking-widest text-[#5D6E5E] mb-3">Pincode</label>
                  <input
                    type="text"
                    name="pincode"
                    value={shippingInfo.pincode}
                    onChange={handleInputChange}
                    required
                    pattern="[0-9]{6}"
                    className="w-full bg-transparent border-b border-[#5D6E5E]/30 focus:border-[#5D6E5E] px-0 py-4 text-base placeholder:text-[#5D6E5E]/40 focus:outline-none transition-colors"
                    data-testid="shipping-pincode"
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-widest text-[#5D6E5E] mb-3">Phone</label>
                  <input
                    type="tel"
                    name="phone"
                    value={shippingInfo.phone}
                    onChange={handleInputChange}
                    required
                    pattern="[0-9]{10}"
                    className="w-full bg-transparent border-b border-[#5D6E5E]/30 focus:border-[#5D6E5E] px-0 py-4 text-base placeholder:text-[#5D6E5E]/40 focus:outline-none transition-colors"
                    data-testid="shipping-phone"
                  />
                </div>
              </div>

              <div className="pt-6">
                <p className="text-xs text-muted-foreground mb-4">
                  * Your order will be hand-poured to order and shipped within 3-5 business days
                </p>
                <button
                  type="submit"
                  disabled={processing}
                  className="w-full bg-[#5D6E5E] text-white hover:bg-[#4A584B] rounded-sm px-8 py-4 uppercase tracking-widest text-xs transition-all duration-300 disabled:opacity-50"
                  data-testid="place-order-button"
                >
                  {processing ? 'Processing...' : 'Place Order & Pay'}
                </button>
              </div>
            </form>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-[#F0EFE9] p-8 rounded-sm space-y-6 sticky top-24" data-testid="order-summary">
              <h2 className="text-2xl font-normal">Order Summary</h2>
              
              <div className="space-y-4 py-6 border-t border-b border-[#5D6E5E]/10">
                {cartItems.map((item) => (
                  <div key={item.product.id} className="flex justify-between text-sm">
                    <span>{item.product.name} x {item.quantity}</span>
                    <span>₹{(item.product.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>

              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm">Subtotal</span>
                  <span className="text-sm">₹{calculateTotal().toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Shipping</span>
                  <span className="text-sm text-[#5D6E5E]">Free</span>
                </div>
              </div>

              <div className="flex justify-between pt-4 border-t border-[#5D6E5E]/10">
                <span className="text-lg font-medium">Total</span>
                <span className="text-lg text-[#D4AF37]" data-testid="checkout-total">₹{calculateTotal().toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;