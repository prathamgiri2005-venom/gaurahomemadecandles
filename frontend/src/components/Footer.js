import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';
import api from '../utils/api';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!email) return;

    setLoading(true);
    try {
      await api.post('/newsletter', { email });
      toast.success('Successfully subscribed to our newsletter!');
      setEmail('');
    } catch (error) {
      toast.error('Failed to subscribe. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <footer className="bg-[#2C2C2C] text-white mt-24">
      <div className="max-w-[1600px] mx-auto px-6 md:px-12 lg:px-24 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="space-y-4">
            <h3 className="font-heading text-2xl text-[#D4AF37]">Gauri Homemade Candles</h3>
            <p className="text-sm text-gray-300 leading-relaxed">
              Hand-poured artisanal candles crafted with 100% natural soy wax. Bringing warmth and tranquility to your home.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs uppercase tracking-widest mb-4 text-[#D4AF37]">Quick Links</h4>
            <div className="flex flex-col space-y-2">
              <Link to="/shop" className="text-sm text-gray-300 hover:text-[#D4AF37] transition-colors" data-testid="footer-shop">Shop All</Link>
              <Link to="/accessories" className="text-sm text-gray-300 hover:text-[#D4AF37] transition-colors" data-testid="footer-accessories">Accessories</Link>
              <Link to="/care-guide" className="text-sm text-gray-300 hover:text-[#D4AF37] transition-colors" data-testid="footer-care-guide">Care Guide</Link>
              <Link to="/about" className="text-sm text-gray-300 hover:text-[#D4AF37] transition-colors" data-testid="footer-about">Our Story</Link>
            </div>
          </div>

          {/* Policies */}
          <div>
            <h4 className="text-xs uppercase tracking-widest mb-4 text-[#D4AF37]">Policies</h4>
            <div className="flex flex-col space-y-2">
              <Link to="/shipping" className="text-sm text-gray-300 hover:text-[#D4AF37] transition-colors" data-testid="footer-shipping">Shipping Policy</Link>
              <Link to="/returns" className="text-sm text-gray-300 hover:text-[#D4AF37] transition-colors" data-testid="footer-returns">Returns Policy</Link>
              <Link to="/eco-commitment" className="text-sm text-gray-300 hover:text-[#D4AF37] transition-colors" data-testid="footer-eco">Eco Commitment</Link>
            </div>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-xs uppercase tracking-widest mb-4 text-[#D4AF37]">Stay Connected</h4>
            <p className="text-sm text-gray-300 mb-4">Subscribe for exclusive offers and new scent launches.</p>
            <form onSubmit={handleSubscribe} className="space-y-3">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email"
                className="w-full bg-transparent border-b border-gray-500 focus:border-[#D4AF37] px-0 py-3 text-sm text-white placeholder:text-gray-500 focus:outline-none transition-colors"
                data-testid="newsletter-input"
              />
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#5D6E5E] text-white hover:bg-[#4A584B] rounded-sm px-6 py-3 uppercase tracking-widest text-xs transition-all duration-300 disabled:opacity-50"
                data-testid="newsletter-submit"
              >
                {loading ? 'Subscribing...' : 'Subscribe'}
              </button>
            </form>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-700 text-center">
          <p className="text-sm text-gray-400">
            © 2025 Gauri Homemade Candles. All rights reserved. Hand-poured with love.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;