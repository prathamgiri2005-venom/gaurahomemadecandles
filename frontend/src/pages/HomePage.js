import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Flame, Leaf, Sparkles } from 'lucide-react';
import { useReveal } from '../hooks/useReveal';
import products from '../data/products';

const Reveal = ({ children, className = '', delay = 0 }) => {
  const [ref, visible] = useReveal(0.12);
  return (
    <div ref={ref} className={`reveal ${visible ? 'visible' : ''} ${delay ? `reveal-delay-${delay}` : ''} ${className}`}>
      {children}
    </div>
  );
};

const HomePage = () => {
  const [heroLoaded, setHeroLoaded] = useState(false);
  const heroProduct = products[3];
  const featured = [products[5], products[7], products[9]];
  const marqueeText = 'Hand-Poured with Love';
  const photoStripItems = [...products.slice(0, 10), ...products.slice(0, 10)];

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative min-h-[92vh] flex items-center overflow-hidden bg-[#1a1510] grain" data-testid="hero-section">
        <div className="absolute inset-0">
          <img
            src={heroProduct.image}
            alt={heroProduct.name}
            className={`w-full h-full object-cover opacity-0 transition-opacity duration-[1.5s] ${heroLoaded ? 'opacity-40' : ''}`}
            onLoad={() => setHeroLoaded(true)}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#1a1510]/90 via-[#1a1510]/50 to-[#1a1510]/30" />
        </div>

        <div className="relative max-w-[1600px] mx-auto px-6 md:px-12 lg:px-24 z-10 w-full">
          <div className="max-w-2xl">
            <p className="text-xs uppercase tracking-[0.3em] text-[#D4AF37] mb-6 opacity-0 animate-[fadeUp_0.6s_ease_0.2s_forwards]" data-testid="hero-subtitle">
              Hand-Poured Artisanal Candles
            </p>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-heading font-medium tracking-tight leading-[1.05] text-white mb-6 opacity-0 animate-[fadeUp_0.6s_ease_0.4s_forwards]" data-testid="hero-title">
              Gaura<br />
              <span className="shimmer-text">Homemade</span><br />
              Candles
            </h1>
            <p className="text-base md:text-lg leading-relaxed font-light text-white/70 mb-10 max-w-lg opacity-0 animate-[fadeUp_0.6s_ease_0.6s_forwards]" data-testid="hero-description">
              Each candle is a story of craft, warmth, and natural ingredients — hand-poured with love to bring light into your world.
            </p>
            <div className="opacity-0 animate-[fadeUp_0.6s_ease_0.8s_forwards]">
              <Link
                to="/collection"
                className="group inline-flex items-center gap-3 bg-[#D4AF37] text-[#1a1510] hover:bg-[#c5a030] px-8 py-4 uppercase tracking-widest text-xs font-semibold transition-all duration-300"
                data-testid="hero-cta"
              >
                <span>View Collection</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 opacity-0 animate-[fadeIn_1s_ease_1.5s_forwards]">
          <div className="w-[1px] h-12 bg-gradient-to-b from-transparent via-[#D4AF37] to-transparent animate-[float_2s_ease-in-out_infinite]" />
        </div>
      </section>

      {/* Marquee Banner */}
      <section className="py-5 bg-[#2C2C2C] overflow-hidden" data-testid="marquee-section">
        <div className="marquee-track">
          {Array.from({ length: 8 }).map((_, i) => (
            <span key={i} className="flex items-center whitespace-nowrap px-8">
              <span className="w-2 h-2 rounded-full bg-[#D4AF37] mr-8" />
              <span className="text-sm uppercase tracking-[0.4em] text-white/60 font-light">{marqueeText}</span>
              <span className="w-2 h-2 rounded-full bg-[#D4AF37] ml-8 mr-8" />
              <span className="text-sm uppercase tracking-[0.4em] text-[#D4AF37]/60 font-heading italic">गौरा</span>
            </span>
          ))}
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
            ].map(({ icon: Icon, title, desc }, idx) => (
              <Reveal key={title} delay={idx + 1}>
                <div className="text-center space-y-4">
                  <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-[#F0EFE9] group">
                    <Icon className="w-6 h-6 text-[#5D6E5E]" />
                  </div>
                  <h3 className="text-lg font-heading font-normal">{title}</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground max-w-xs mx-auto">{desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Collection */}
      <section className="py-20 md:py-28 bg-[#F9F8F6]" data-testid="featured-section">
        <div className="max-w-[1600px] mx-auto px-6 md:px-12 lg:px-24">
          <Reveal>
            <div className="text-center mb-14">
              <p className="text-xs uppercase tracking-[0.3em] text-[#5D6E5E] mb-3">Handcrafted with Love</p>
              <h2 className="text-4xl sm:text-5xl font-heading font-normal tracking-tight">Our Collection</h2>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {featured.map((product, idx) => (
              <Reveal key={product.id} delay={idx + 1}>
                <Link
                  to="/collection"
                  className="group block bg-white border border-transparent hover:border-[#D4AF37]/30 transition-all duration-500 overflow-hidden hover:shadow-[0_8px_30px_rgba(212,175,55,0.08)]"
                  data-testid={`featured-card-${product.id}`}
                >
                  <div className="aspect-square overflow-hidden relative">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[1s] ease-out"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500" />
                  </div>
                  <div className="p-6 space-y-2">
                    <p className="text-[10px] uppercase tracking-[0.2em] text-[#D4AF37]">{product.category}</p>
                    <h3 className="text-lg font-heading font-normal group-hover:text-[#D4AF37] transition-colors duration-300">{product.name}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">{product.tagline}</p>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>

          <Reveal>
            <div className="text-center mt-12">
              <Link
                to="/collection"
                className="group inline-flex items-center gap-2 text-xs uppercase tracking-widest text-[#5D6E5E] hover:text-[#D4AF37] transition-colors duration-300"
                data-testid="view-all-link"
              >
                <span>View All {products.length} Candles</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Photo Strip */}
      <section className="py-6 bg-white overflow-hidden" data-testid="photo-strip">
        <div className="photo-strip">
          {photoStripItems.map((p, i) => (
            <div key={`${p.id}-${i}`} className="w-32 h-32 md:w-44 md:h-44 flex-shrink-0 overflow-hidden">
              <img src={p.image} alt={p.name} className="w-full h-full object-cover hover:scale-110 transition-transform duration-500" loading="lazy" />
            </div>
          ))}
        </div>
      </section>

      {/* Brand Story */}
      <section className="py-20 md:py-28" data-testid="story-section">
        <div className="max-w-[1600px] mx-auto px-6 md:px-12 lg:px-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <Reveal className="order-2 lg:order-1">
              <div className="space-y-6">
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
                  className="group inline-flex items-center gap-2 text-xs uppercase tracking-widest text-[#5D6E5E] hover:text-[#D4AF37] transition-colors duration-300 pt-2"
                  data-testid="read-story-link"
                >
                  <span>Read Our Full Story</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </Reveal>

            <Reveal className="order-1 lg:order-2">
              <img
                src={products[1].image}
                alt="Heart Bowl Candle"
                className="w-full aspect-square object-cover"
                loading="lazy"
              />
            </Reveal>
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="relative py-20 bg-[#1a1510] overflow-hidden grain" data-testid="cta-section">
        <div className="max-w-[1600px] mx-auto px-6 md:px-12 lg:px-24 text-center relative z-10">
          <Reveal>
            <p className="text-xs uppercase tracking-[0.3em] text-[#D4AF37] mb-4">Follow the Glow</p>
            <h2 className="text-3xl sm:text-4xl font-heading font-normal text-white mb-4">
              Illuminate Your Space with <span className="shimmer-text">Gaura</span>
            </h2>
            <p className="text-sm text-gray-400 mb-10 max-w-lg mx-auto">
              Explore our full collection of {products.length} handcrafted candles and find the perfect piece to bring warmth, beauty, and natural fragrance to every corner of your home.
            </p>
            <Link
              to="/collection"
              className="group inline-flex items-center gap-3 border border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-[#1a1510] px-8 py-4 uppercase tracking-widest text-xs font-semibold transition-all duration-300"
              data-testid="cta-button"
            >
              <span>Explore Collection</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Reveal>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
