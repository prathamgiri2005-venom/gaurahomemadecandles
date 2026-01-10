import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { ShoppingCart, Heart, User, Menu, X, LogOut } from 'lucide-react';
import api from '../utils/api';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    if (user) {
      loadCartCount();
    }
  }, [user]);

  const loadCartCount = async () => {
    try {
      const res = await api.get('/cart');
      const count = res.data.reduce((sum, item) => sum + item.quantity, 0);
      setCartCount(count);
    } catch (error) {
      console.error('Failed to load cart count');
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="bg-[#F9F8F6]/80 backdrop-blur-md border-b border-[#5D6E5E]/10 sticky top-0 z-50">
      <div className="max-w-[1600px] mx-auto px-6 md:px-12 lg:px-24">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2" data-testid="logo-link">
            <span className="font-heading text-2xl md:text-3xl text-[#5D6E5E] tracking-tight">Gauri Homemade Candles</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/shop" className="text-xs uppercase tracking-widest text-[#5D6E5E] hover:text-[#4A584B] transition-colors" data-testid="nav-shop">Shop</Link>
            <Link to="/accessories" className="text-xs uppercase tracking-widest text-[#5D6E5E] hover:text-[#4A584B] transition-colors" data-testid="nav-accessories">Accessories</Link>
            <Link to="/care-guide" className="text-xs uppercase tracking-widest text-[#5D6E5E] hover:text-[#4A584B] transition-colors" data-testid="nav-care-guide">Care Guide</Link>
            <Link to="/about" className="text-xs uppercase tracking-widest text-[#5D6E5E] hover:text-[#4A584B] transition-colors" data-testid="nav-about">Our Story</Link>
          </div>

          {/* Icons */}
          <div className="flex items-center space-x-4">
            {user && (
              <Link to="/wishlist" className="relative" data-testid="wishlist-icon">
                <Heart className="w-5 h-5 text-[#5D6E5E] hover:text-[#D4AF37] transition-colors" />
              </Link>
            )}
            
            {user && (
              <Link to="/cart" className="relative" data-testid="cart-icon">
                <ShoppingCart className="w-5 h-5 text-[#5D6E5E] hover:text-[#D4AF37] transition-colors" />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-[#D4AF37] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center" data-testid="cart-count">
                    {cartCount}
                  </span>
                )}
              </Link>
            )}

            {user ? (
              <div className="relative group">
                <button className="flex items-center space-x-2" data-testid="user-menu-button">
                  <User className="w-5 h-5 text-[#5D6E5E]" />
                </button>
                <div className="absolute right-0 mt-2 w-48 bg-white border border-[#5D6E5E]/10 rounded-sm shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                  <Link to="/account" className="block px-4 py-3 text-sm text-[#2C2C2C] hover:bg-[#F0EFE9]" data-testid="account-link">My Account</Link>
                  <Link to="/orders" className="block px-4 py-3 text-sm text-[#2C2C2C] hover:bg-[#F0EFE9]" data-testid="orders-link">My Orders</Link>
                  {user.role === 'admin' && (
                    <Link to="/admin" className="block px-4 py-3 text-sm text-[#2C2C2C] hover:bg-[#F0EFE9]" data-testid="admin-link">Admin Dashboard</Link>
                  )}
                  <button onClick={handleLogout} className="w-full text-left px-4 py-3 text-sm text-[#2C2C2C] hover:bg-[#F0EFE9] flex items-center space-x-2" data-testid="logout-button">
                    <LogOut className="w-4 h-4" />
                    <span>Logout</span>
                  </button>
                </div>
              </div>
            ) : (
              <Link to="/login" className="text-xs uppercase tracking-widest text-[#5D6E5E] hover:text-[#4A584B] transition-colors" data-testid="login-link">Login</Link>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden text-[#5D6E5E]"
              data-testid="mobile-menu-toggle"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-[#5D6E5E]/10" data-testid="mobile-menu">
            <div className="flex flex-col space-y-4">
              <Link to="/shop" className="text-xs uppercase tracking-widest text-[#5D6E5E]" onClick={() => setMobileMenuOpen(false)} data-testid="mobile-nav-shop">Shop</Link>
              <Link to="/accessories" className="text-xs uppercase tracking-widest text-[#5D6E5E]" onClick={() => setMobileMenuOpen(false)} data-testid="mobile-nav-accessories">Accessories</Link>
              <Link to="/care-guide" className="text-xs uppercase tracking-widest text-[#5D6E5E]" onClick={() => setMobileMenuOpen(false)} data-testid="mobile-nav-care-guide">Care Guide</Link>
              <Link to="/about" className="text-xs uppercase tracking-widest text-[#5D6E5E]" onClick={() => setMobileMenuOpen(false)} data-testid="mobile-nav-about">Our Story</Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;