import React, { useState, useEffect } from 'react';
import { Package, ShoppingBag, Users, DollarSign } from 'lucide-react';
import { Link } from 'react-router-dom';
import api from '../utils/api';

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      const res = await api.get('/admin/stats');
      setStats(res.data);
    } catch (error) {
      console.error('Failed to load stats');
    } finally {
      setLoading(false);
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
      <div className="max-w-[1600px] mx-auto px-6 md:px-12 lg:px-24">
        <h1 className="text-4xl md:text-5xl font-normal tracking-tight mb-12" data-testid="admin-title">Admin Dashboard</h1>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <div className="bg-white p-6 border border-[#5D6E5E]/10">
            <div className="flex items-center justify-between mb-4">
              <Package className="w-8 h-8 text-[#5D6E5E]" />
              <span className="text-xs uppercase tracking-widest text-[#5D6E5E]">Products</span>
            </div>
            <p className="text-3xl font-normal" data-testid="total-products">{stats?.total_products || 0}</p>
          </div>

          <div className="bg-white p-6 border border-[#5D6E5E]/10">
            <div className="flex items-center justify-between mb-4">
              <ShoppingBag className="w-8 h-8 text-[#5D6E5E]" />
              <span className="text-xs uppercase tracking-widest text-[#5D6E5E]">Orders</span>
            </div>
            <p className="text-3xl font-normal" data-testid="total-orders">{stats?.total_orders || 0}</p>
          </div>

          <div className="bg-white p-6 border border-[#5D6E5E]/10">
            <div className="flex items-center justify-between mb-4">
              <Users className="w-8 h-8 text-[#5D6E5E]" />
              <span className="text-xs uppercase tracking-widest text-[#5D6E5E]">Users</span>
            </div>
            <p className="text-3xl font-normal" data-testid="total-users">{stats?.total_users || 0}</p>
          </div>

          <div className="bg-white p-6 border border-[#5D6E5E]/10">
            <div className="flex items-center justify-between mb-4">
              <DollarSign className="w-8 h-8 text-[#5D6E5E]" />
              <span className="text-xs uppercase tracking-widest text-[#5D6E5E]">Revenue</span>
            </div>
            <p className="text-3xl font-normal" data-testid="total-revenue">₹{stats?.total_revenue?.toFixed(2) || '0.00'}</p>
          </div>
        </div>

        {/* Quick Links */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <Link
            to="/admin/products"
            className="bg-[#F0EFE9] p-8 rounded-sm hover:bg-[#E8E6E1] transition-colors"
            data-testid="manage-products-link"
          >
            <h2 className="text-2xl font-normal mb-2">Manage Products</h2>
            <p className="text-base text-muted-foreground">Add, edit, or remove candles from your catalog</p>
          </Link>

          <Link
            to="/admin/orders"
            className="bg-[#F0EFE9] p-8 rounded-sm hover:bg-[#E8E6E1] transition-colors"
            data-testid="manage-orders-link"
          >
            <h2 className="text-2xl font-normal mb-2">Manage Orders</h2>
            <p className="text-base text-muted-foreground">View and update order statuses</p>
          </Link>
        </div>

        {/* Recent Orders */}
        <div>
          <h2 className="text-2xl font-normal mb-6">Recent Orders</h2>
          <div className="bg-white border border-[#5D6E5E]/10 overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[#5D6E5E]/10">
                  <th className="text-left p-4 text-xs uppercase tracking-widest text-[#5D6E5E]">Order ID</th>
                  <th className="text-left p-4 text-xs uppercase tracking-widest text-[#5D6E5E]">Date</th>
                  <th className="text-left p-4 text-xs uppercase tracking-widest text-[#5D6E5E]">Amount</th>
                  <th className="text-left p-4 text-xs uppercase tracking-widest text-[#5D6E5E]">Status</th>
                </tr>
              </thead>
              <tbody>
                {stats?.recent_orders && stats.recent_orders.length > 0 ? (
                  stats.recent_orders.map((order) => (
                    <tr key={order.id} className="border-b border-[#5D6E5E]/10">
                      <td className="p-4 text-sm font-mono">{order.id}</td>
                      <td className="p-4 text-sm">{new Date(order.created_at).toLocaleDateString()}</td>
                      <td className="p-4 text-sm">₹{order.total_amount.toFixed(2)}</td>
                      <td className="p-4 text-sm capitalize">{order.status}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="p-4 text-center text-muted-foreground">No recent orders</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;