import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Flame, Leaf, Sparkles } from 'lucide-react';
import api from '../utils/api';

const HomePage = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadFeaturedProducts();
  }, []);

  const loadFeaturedProducts = async () => {
    try {
      const res = await api.get('/products?featured=true');
      setFeaturedProducts(res.data.slice(0, 3));
    } catch (error) {
      console.error('Failed to load products');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[90vh] flex items-center overflow-hidden" data-testid="hero-section">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1667488925642-70e7c8948d63?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1ODF8MHwxfHNlYXJjaHwxfHxhcnRpc2FuYWwlMjBjYW5kbGUlMjBtYWtpbmclMjBoYW5kcyUyMHBvdXJpbmclMjB3YXh8ZW58MHx8fHwxNzY4MDQyODQ2fDA&ixlib=rb-4.1.0&q=85"
            alt="Artisan pouring wax"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#2C2C2C]/70 to-transparent"></div>
        </div>
        
        <div className="relative max-w-[1600px] mx-auto px-6 md:px-12 lg:px-24 z-10">
          <div className="max-w-2xl">
            <p className="text-xs uppercase tracking-[0.2em] text-[#D4AF37] mb-4" data-testid="hero-subtitle">Hand-Poured with Love</p>
            <h1 className="text-5xl md:text-7xl font-medium tracking-tight leading-[1.1] text-white mb-6" data-testid="hero-title">
              Where Light Meets Art
            </h1>
            <p className="text-lg md:text-xl leading-relaxed font-light text-white/90 mb-8" data-testid="hero-description">
              Discover our collection of artisanal candles, hand-poured with 100% natural soy wax and infused with carefully curated scents that transform your space.
            </p>
            <Link
              to="/shop"
              className="inline-flex items-center space-x-2 bg-[#5D6E5E] text-white hover:bg-[#4A584B] rounded-sm px-8 py-4 uppercase tracking-widest text-xs transition-all duration-300 hover:shadow-lg"
              data-testid="hero-cta"
            >
              <span>Explore Collection</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24 md:py-32 bg-white" data-testid="features-section">
        <div className="max-w-[1600px] mx-auto px-6 md:px-12 lg:px-24">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="text-center space-y-4">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#F0EFE9]">
                <Leaf className="w-8 h-8 text-[#5D6E5E]" />
              </div>
              <h3 className="text-2xl md:text-3xl font-normal">100% Natural</h3>
              <p className="text-base leading-relaxed text-muted-foreground">
                Crafted with pure soy wax and eco-friendly materials for a clean, sustainable burn.
              </p>
            </div>
            
            <div className="text-center space-y-4">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#F0EFE9]">
                <Flame className="w-8 h-8 text-[#5D6E5E]" />
              </div>
              <h3 className="text-2xl md:text-3xl font-normal">40+ Hours Burn</h3>
              <p className="text-base leading-relaxed text-muted-foreground">
                Long-lasting candles designed to fill your home with warmth for days on end.
              </p>
            </div>
            
            <div className="text-center space-y-4">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#F0EFE9]">
                <Sparkles className="w-8 h-8 text-[#5D6E5E]" />
              </div>
              <h3 className="text-2xl md:text-3xl font-normal">Hand-Poured</h3>
              <p className="text-base leading-relaxed text-muted-foreground">
                Each candle is lovingly crafted by hand, making every piece uniquely yours.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Best Sellers */}
      <section className="py-24 md:py-32 bg-[#F9F8F6]" data-testid="bestsellers-section">
        <div className="max-w-[1600px] mx-auto px-6 md:px-12 lg:px-24">
          <div className="text-center mb-12">
            <p className="text-xs uppercase tracking-[0.2em] text-[#5D6E5E] mb-4">Customer Favorites</p>
            <h2 className="text-4xl md:text-5xl font-normal tracking-tight">Best Sellers</h2>
          </div>

          {loading ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">Loading products...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {featuredProducts.map((product) => (
                <Link
                  key={product.id}
                  to={`/product/${product.id}`}
                  className="group bg-white p-8 border border-transparent hover:border-[#5D6E5E]/20 transition-all duration-500"
                  data-testid={`product-card-${product.id}`}
                >
                  <div className="aspect-square mb-6 overflow-hidden">
                    <img
                      src={product.image_url}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                  <div className="space-y-2">
                    <p className="text-xs uppercase tracking-[0.2em] text-[#5D6E5E]">{product.category}</p>
                    <h3 className="text-2xl font-normal">{product.name}</h3>
                    <p className="text-lg text-[#D4AF37]">₹{product.price}</p>
                  </div>
                </Link>
              ))}
            </div>
          )}

          <div className="text-center mt-12">
            <Link
              to="/shop"
              className="inline-flex items-center space-x-2 text-xs uppercase tracking-widest text-[#5D6E5E] hover:text-[#4A584B] transition-colors"
              data-testid="view-all-link"
            >
              <span>View All Products</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Brand Story */}
      <section className="py-24 md:py-32" data-testid="story-section">
        <div className="max-w-[1600px] mx-auto px-6 md:px-12 lg:px-24">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1">
              <p className="text-xs uppercase tracking-[0.2em] text-[#5D6E5E] mb-4">The Gauri Story</p>
              <h2 className="text-4xl md:text-5xl font-normal tracking-tight mb-6">Crafted with Passion, Poured with Love</h2>
              <p className="text-lg leading-relaxed font-light mb-6">
                What began as a passion for natural living has blossomed into Gauri Homemade Candles. Each candle tells a story of craftsmanship, sustainability, and the simple joy of bringing warmth into your home.
              </p>
              <p className="text-lg leading-relaxed font-light mb-8">
                We believe in the power of natural ingredients, the beauty of handmade artistry, and the commitment to our planet. Every candle is hand-poured in small batches, ensuring quality and care in every piece.
              </p>
              <Link
                to="/about"
                className="inline-flex items-center space-x-2 text-xs uppercase tracking-widest text-[#5D6E5E] hover:text-[#4A584B] transition-colors"
                data-testid="read-more-link"
              >
                <span>Read Our Full Story</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="order-1 md:order-2">
              <img
                src="https://images.unsplash.com/photo-1669151432266-cd991ea149ad?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1ODF8MHwxfHNlYXJjaHwyfHxhcnRpc2FuYWwlMjBjYW5kbGUlMjBtYWtpbmclMjBoYW5kcyUyMHBvdXJpbmclMjB3YXh8ZW58MHx8fHwxNzY4MDQyODQ2fDA&ixlib=rb-4.1.0&q=85"
                alt="Lighting a candle"
                className="w-full h-[500px] object-cover rounded-sm"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;