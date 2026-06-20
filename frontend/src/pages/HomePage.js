import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Flame, Leaf, Sparkles } from 'lucide-react';
import products from '../data/products';

const HomePage = () => {
  const [heroLoaded, setHeroLoaded] = useState(false);
  const heroProduct = products[3]; // Gaura Signature Jar
  const featured = [products[0], products[2], products[4]];

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative min-h-[92vh] flex items-center overflow-hidden bg-[#1a1510]" data-testid="hero-section">
        <div className="absolute inset-0">
          <img
            src={heroProduct.image}
            alt={heroProduct.name}
            className={`w-full h-full object-cover opacity-0 transition-opacity duration-1000 ${heroLoaded ? 'opacity-50' : ''}`}
            onLoad={() => setHeroLoaded(true)}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#1a1510]/90 via-[#1a1510]/60 to-transparent" />
        </div>

        <div className="relative max-w-[1600px] mx-auto px-6 md:px-12 lg:px-24 z-10 w-full">
          <div className="max-w-2xl">
            <p
              className="text-xs uppercase tracking-[0.3em] text-[#D4AF37] mb-6 opacity-0 animate-[fadeUp_0.6s_ease_0.2s_forwards]"
              data-testid="hero-subtitle"
            >
              Hand-Poured Artisanal Candles
            </p>
            <h1
              className="text-5xl sm:text-6xl lg:text-7xl font-heading font-medium tracking-tight leading-[1.05] text-white mb-6 opacity-0 animate-[fadeUp_0.6s_ease_0.4s_forwards]"
              data-testid="hero-title"
            >
              Gaura<br />
              <span className="text-[#D4AF37]">Homemade</span><br />
              Candles
            </h1>
            <p
              className="text-base md:text-lg leading-relaxed font-light text-white/80 mb-10 max-w-lg opacity-0 animate-[fadeUp_0.6s_ease_0.6s_forwards]"
              data-testid="hero-description"
            >
              Each candle is a story of craft, warmth, and natural ingredients — hand-poured with love to bring light into your world.
            </p>
            <div className="opacity-0 animate-[fadeUp_0.6s_ease_0.8s_forwards]">
              <Link
                to="/collection"
                className="inline-flex items-center gap-3 bg-[#D4AF37] text-[#1a1510] hover:bg-[#c5a030] px-8 py-4 uppercase tracking-widest text-xs font-semibold transition-all duration-300 hover:gap-4"
                data-testid="hero-cta"
              >
                <span>View Collection</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 md:py-28 bg-white" data-testid="values-section">
        <div className="max-w-[1600px] mx-auto px-6 md:px-12 lg:px-24">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16">
            {[
              { icon: Leaf, title: '100% Natural', desc: 'Crafted with pure soy wax and eco-friendly materials for a clean, sustainable burn.' },
              { icon: Flame, title: 'Long-Lasting', desc: 'Designed to fill your home with warmth for 30–45+ hours of gentle, even flame.' },
              { icon: Sparkles, title: 'Hand-Poured', desc: 'Every candle is lovingly made by hand in small batches — each one uniquely yours.' },
            ].map(({ icon: Icon, title, desc }) => (
              <div key={title} className="text-center space-y-4">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-[#F0EFE9]">
                  <Icon className="w-6 h-6 text-[#5D6E5E]" />
                </div>
                <h3 className="text-lg font-heading font-normal">{title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground max-w-xs mx-auto">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Collection */}
      <section className="py-20 md:py-28 bg-[#F9F8F6]" data-testid="featured-section">
        <div className="max-w-[1600px] mx-auto px-6 md:px-12 lg:px-24">
          <div className="text-center mb-14">
            <p className="text-xs uppercase tracking-[0.3em] text-[#5D6E5E] mb-3">Handcrafted with Love</p>
            <h2 className="text-4xl sm:text-5xl font-heading font-normal tracking-tight">Our Collection</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {featured.map((product) => (
              <div
                key={product.id}
                className="group bg-white border border-transparent hover:border-[#D4AF37]/30 transition-all duration-500 overflow-hidden"
                data-testid={`featured-card-${product.id}`}
              >
                <div className="aspect-square overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    loading="lazy"
                  />
                </div>
                <div className="p-6 space-y-2">
                  <p className="text-[10px] uppercase tracking-[0.2em] text-[#D4AF37]">{product.category}</p>
                  <h3 className="text-lg font-heading font-normal">{product.name}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">{product.tagline}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              to="/collection"
              className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-[#5D6E5E] hover:text-[#D4AF37] transition-colors hover:gap-3 duration-300"
              data-testid="view-all-link"
            >
              <span>View All Candles</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Brand Story + Image */}
      <section className="py-20 md:py-28" data-testid="story-section">
        <div className="max-w-[1600px] mx-auto px-6 md:px-12 lg:px-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div className="order-2 lg:order-1 space-y-6">
              <p className="text-xs uppercase tracking-[0.3em] text-[#D4AF37]">The Gaura Story</p>
              <h2 className="text-4xl sm:text-5xl font-heading font-normal tracking-tight leading-tight">
                Crafted with Passion,<br />Poured with Love
              </h2>
              <p className="text-base leading-relaxed font-light text-muted-foreground">
                What began as a passion for natural living has blossomed into Gaura Homemade Candles. Every candle tells a story of craftsmanship, sustainability, and the simple joy of bringing warmth into your home.
              </p>
              <p className="text-base leading-relaxed font-light text-muted-foreground">
                We believe in the power of natural ingredients, the beauty of handmade artistry, and our commitment to our planet. Every candle is hand-poured in small batches, ensuring quality and care in every piece.
              </p>
              <Link
                to="/about"
                className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-[#5D6E5E] hover:text-[#D4AF37] transition-colors hover:gap-3 duration-300 pt-2"
                data-testid="read-story-link"
              >
                <span>Read Our Full Story</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="order-1 lg:order-2">
              <img
                src={products[1].image}
                alt="Heart Bowl Candle"
                className="w-full aspect-square object-cover"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Instagram-style banner */}
      <section className="py-16 bg-[#2C2C2C]" data-testid="cta-section">
        <div className="max-w-[1600px] mx-auto px-6 md:px-12 lg:px-24 text-center">
          <p className="text-xs uppercase tracking-[0.3em] text-[#D4AF37] mb-4">Follow the Glow</p>
          <h2 className="text-3xl sm:text-4xl font-heading font-normal text-white mb-4">
            Illuminate Your Space with Gaura
          </h2>
          <p className="text-sm text-gray-400 mb-8 max-w-lg mx-auto">
            Explore our full collection and find the perfect candle to bring warmth, beauty, and natural fragrance to every corner of your home.
          </p>
          <Link
            to="/collection"
            className="inline-flex items-center gap-3 border border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-[#1a1510] px-8 py-4 uppercase tracking-widest text-xs font-semibold transition-all duration-300"
            data-testid="cta-button"
          >
            <span>Explore Collection</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
