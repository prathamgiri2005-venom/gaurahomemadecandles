import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Package } from 'lucide-react';
import api from '../utils/api';

const statusColors = {
  pending: 'bg-yellow-100 text-yellow-800',
  processing: 'bg-blue-100 text-blue-800',
  shipped: 'bg-purple-100 text-purple-800',
  delivered: 'bg-green-100 text-green-800',
  cancelled: 'bg-red-100 text-red-800',
};

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    try {
      const res = await api.get('/orders');
      setOrders(res.data);
    } catch (error) {
      console.error('Failed to load orders');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground">Loading orders...</p>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center py-24">
        <div className="text-center space-y-6" data-testid="no-orders">
          <Package className="w-16 h-16 text-[#5D6E5E] mx-auto" />
          <h2 className="text-2xl font-normal">No orders yet</h2>
          <p className="text-muted-foreground">Start shopping to see your orders here!</p>
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
        <h1 className="text-4xl md:text-5xl font-normal tracking-tight mb-12" data-testid="orders-title">My Orders</h1>

        <div className="space-y-6">
          {orders.map((order) => (
            <div
              key={order.id}
              className="bg-white p-6 border border-[#5D6E5E]/10"
              data-testid={`order-${order.id}`}
            >
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4 pb-4 border-b border-[#5D6E5E]/10">
                <div>
                  <p className="text-xs uppercase tracking-widest text-[#5D6E5E] mb-1">Order ID</p>
                  <p className="text-sm font-mono" data-testid={`order-id-${order.id}`}>{order.id}</p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-widest text-[#5D6E5E] mb-1">Date</p>
                  <p className="text-sm">{new Date(order.created_at).toLocaleDateString()}</p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-widest text-[#5D6E5E] mb-1">Total</p>
                  <p className="text-lg text-[#D4AF37]" data-testid={`order-total-${order.id}`}>₹{order.total_amount.toFixed(2)}</p>
                </div>
                <div>
                  <span className={`px-4 py-2 rounded-sm text-xs uppercase tracking-widest ${statusColors[order.status]}`} data-testid={`order-status-${order.id}`}>
                    {order.status}
                  </span>
                </div>
              </div>

              <div className="space-y-3">
                {order.items.map((item, idx) => (
                  <div key={idx} className="flex justify-between text-sm">
                    <span>{item.product_name} x {item.quantity}</span>
                    <span>₹{(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>

              <div className="mt-4 pt-4 border-t border-[#5D6E5E]/10">
                <p className="text-xs uppercase tracking-widest text-[#5D6E5E] mb-2">Shipping Address</p>
                <p className="text-sm">
                  {order.shipping_address.fullName}<br />
                  {order.shipping_address.address}<br />
                  {order.shipping_address.city}, {order.shipping_address.state} - {order.shipping_address.pincode}<br />
                  Phone: {order.shipping_address.phone}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OrdersPage;