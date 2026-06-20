import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-[#2C2C2C] text-white mt-24">
      <div className="max-w-[1600px] mx-auto px-6 md:px-12 lg:px-24 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="space-y-4">
            <h3 className="font-heading text-2xl text-[#D4AF37]">Gaura Homemade Candles</h3>
            <p className="text-sm text-gray-300 leading-relaxed">
              Hand-poured artisanal candles crafted with love and natural ingredients. Bringing warmth, light, and beauty into your home.
            </p>
          </div>

          <div>
            <h4 className="text-xs uppercase tracking-widest mb-4 text-[#D4AF37]">Explore</h4>
            <div className="flex flex-col gap-2">
              <Link to="/collection" className="text-sm text-gray-300 hover:text-[#D4AF37] transition-colors" data-testid="footer-collection">Collection</Link>
              <Link to="/care-guide" className="text-sm text-gray-300 hover:text-[#D4AF37] transition-colors" data-testid="footer-care-guide">Care Guide</Link>
              <Link to="/about" className="text-sm text-gray-300 hover:text-[#D4AF37] transition-colors" data-testid="footer-about">Our Story</Link>
              <Link to="/eco-commitment" className="text-sm text-gray-300 hover:text-[#D4AF37] transition-colors" data-testid="footer-eco">Eco Commitment</Link>
            </div>
          </div>

          <div>
            <h4 className="text-xs uppercase tracking-widest mb-4 text-[#D4AF37]">Policies</h4>
            <div className="flex flex-col gap-2">
              <Link to="/shipping" className="text-sm text-gray-300 hover:text-[#D4AF37] transition-colors" data-testid="footer-shipping">Shipping Policy</Link>
              <Link to="/returns" className="text-sm text-gray-300 hover:text-[#D4AF37] transition-colors" data-testid="footer-returns">Returns Policy</Link>
              <Link to="/eco-commitment" className="text-sm text-gray-300 hover:text-[#D4AF37] transition-colors" data-testid="footer-recycle">Recycle Your Jar</Link>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-700 text-center">
          <p className="text-sm text-gray-400">
            &copy; {new Date().getFullYear()} Gaura Homemade Candles. All rights reserved. Hand-poured with love.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
