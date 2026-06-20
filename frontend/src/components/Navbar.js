import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const navLinks = [
  { to: '/collection', label: 'Collection' },
  { to: '/care-guide', label: 'Care Guide' },
  { to: '/about', label: 'Our Story' },
  { to: '/eco-commitment', label: 'Eco Commitment' },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  return (
    <nav className="bg-[#F9F8F6]/80 backdrop-blur-md border-b border-[#5D6E5E]/10 sticky top-0 z-50">
      <div className="max-w-[1600px] mx-auto px-6 md:px-12 lg:px-24">
        <div className="flex justify-between items-center h-20">
          <Link to="/" className="flex items-center gap-2" data-testid="logo-link">
            <span className="font-heading text-2xl md:text-3xl text-[#5D6E5E] tracking-tight">
              Gaura Homemade Candles
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`text-xs uppercase tracking-widest transition-colors ${
                  pathname === link.to
                    ? 'text-[#D4AF37]'
                    : 'text-[#5D6E5E] hover:text-[#4A584B]'
                }`}
                data-testid={`nav-${link.label.toLowerCase().replace(/\s/g, '-')}`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <button
            onClick={() => setOpen(!open)}
            className="md:hidden text-[#5D6E5E]"
            data-testid="mobile-menu-toggle"
          >
            {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {open && (
          <div className="md:hidden py-4 border-t border-[#5D6E5E]/10" data-testid="mobile-menu">
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`text-xs uppercase tracking-widest ${
                    pathname === link.to ? 'text-[#D4AF37]' : 'text-[#5D6E5E]'
                  }`}
                  onClick={() => setOpen(false)}
                  data-testid={`mobile-nav-${link.label.toLowerCase().replace(/\s/g, '-')}`}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
