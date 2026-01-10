import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Trash2, ShoppingBag } from 'lucide-react';
import { toast } from 'sonner';
import api from '../utils/api';

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    loadCart();
  }, []);

  const loadCart = async () => {
    try {
      const res = await api.get('/cart');
      setCartItems(res.data);
    } catch (error) {
      console.error('Failed to load cart');
    } finally {
      setLoading(false);
    }
  };

  const updateQuantity = async (productId, quantity) => {
    if (quantity < 1) return;
    try {
      await api.post('/cart', { product_id: productId, quantity });
      loadCart();
    } catch (error) {
      toast.error('Failed to update quantity');
    }
  };

  const removeItem = async (productId) => {
    try {
      await api.delete(`/cart/${productId}`);
      toast.success('Item removed from cart');
      loadCart();
    } catch (error) {
      toast.error('Failed to remove item');
    }
  };

  const calculateTotal = () => {
    return cartItems.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground">Loading cart...</p>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center py-24">
        <div className="text-center space-y-6" data-testid="empty-cart">
          <ShoppingBag className="w-16 h-16 text-[#5D6E5E] mx-auto" />
          <h2 className="text-2xl font-normal">Your cart is empty</h2>
          <p className="text-muted-foreground">Start adding some beautiful candles!</p>
          <Link
            to="/shop"
            className="inline-block bg-[#5D6E5E] text-white hover:bg-[#4A584B] rounded-sm px-8 py-4 uppercase tracking-widest text-xs transition-all duration-300"
            data-testid="shop-now-button"
          >
            Shop Now
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-24">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-24">
        <h1 className="text-4xl md:text-5xl font-normal tracking-tight mb-12" data-testid="cart-title">Shopping Cart</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-6">
            {cartItems.map((item) => (
              <div
                key={item.product.id}
                className="flex gap-6 bg-white p-6 border border-[#5D6E5E]/10"
                data-testid={`cart-item-${item.product.id}`}
              >
                <img
                  src={item.product.image_url}
                  alt={item.product.name}
                  className="w-24 h-24 object-cover"
                />
                <div className="flex-1">
                  <Link to={`/product/${item.product.id}`} className="text-xl font-normal hover:text-[#5D6E5E] transition-colors">
                    {item.product.name}
                  </Link>
                  <p className="text-sm text-muted-foreground mt-1">{item.product.category}</p>
                  <p className="text-lg text-[#D4AF37] mt-2">₹{item.product.price}</p>

                  <div className="flex items-center space-x-4 mt-4">
                    <div className="flex items-center space-x-3">
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                        className="w-8 h-8 border border-[#5D6E5E]/30 hover:border-[#5D6E5E] transition-colors text-sm"
                        data-testid={`decrease-quantity-${item.product.id}`}
                      >
                        -
                      </button>
                      <span className="w-8 text-center" data-testid={`quantity-${item.product.id}`}>{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                        className="w-8 h-8 border border-[#5D6E5E]/30 hover:border-[#5D6E5E] transition-colors text-sm"
                        data-testid={`increase-quantity-${item.product.id}`}
                      >
                        +
                      </button>
                    </div>

                    <button
                      onClick={() => removeItem(item.product.id)}
                      className="text-red-500 hover:text-red-700 transition-colors"
                      data-testid={`remove-item-${item.product.id}`}
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-[#F0EFE9] p-8 rounded-sm space-y-6 sticky top-24" data-testid="order-summary">
              <h2 className="text-2xl font-normal">Order Summary</h2>
              
              <div className="space-y-3 py-6 border-t border-b border-[#5D6E5E]/10">
                <div className="flex justify-between">
                  <span className="text-sm">Subtotal</span>
                  <span className="text-sm" data-testid="subtotal">₹{calculateTotal().toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Shipping</span>
                  <span className="text-sm text-[#5D6E5E]">Free</span>
                </div>
              </div>

              <div className="flex justify-between">
                <span className="text-lg font-medium">Total</span>
                <span className="text-lg text-[#D4AF37]" data-testid="total">₹{calculateTotal().toFixed(2)}</span>
              </div>

              <button
                onClick={() => navigate('/checkout')}
                className="w-full bg-[#5D6E5E] text-white hover:bg-[#4A584B] rounded-sm px-8 py-4 uppercase tracking-widest text-xs transition-all duration-300"
                data-testid="checkout-button"
              >
                Proceed to Checkout
              </button>

              <Link
                to="/shop"
                className="block text-center text-xs uppercase tracking-widest text-[#5D6E5E] hover:text-[#4A584B] transition-colors"
                data-testid="continue-shopping-link"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;