import React, { useState, useEffect, useRef } from 'react';
import { X, Flame, Droplets } from 'lucide-react';
import products from '../data/products';

const categories = ['All', ...new Set(products.map((p) => p.category))];

const CollectionPage = () => {
  const [selected, setSelected] = useState(null);
  const [filter, setFilter] = useState('All');
  const [visibleCards, setVisibleCards] = useState(new Set());
  const gridRef = useRef(null);

  const filtered = filter === 'All' ? products : products.filter((p) => p.category === filter);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleCards((prev) => new Set(prev).add(entry.target.dataset.cardId));
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08 }
    );

    const cards = gridRef.current?.querySelectorAll('[data-card-id]');
    cards?.forEach((card) => observer.observe(card));
    return () => observer.disconnect();
  }, [filter]);

  return (
    <div className="min-h-screen py-24">
      <div className="max-w-[1600px] mx-auto px-6 md:px-12 lg:px-24">
        {/* Header */}
        <div className="mb-10">
          <p className="text-xs uppercase tracking-[0.3em] text-[#D4AF37] mb-3">Handcrafted Artisanal Candles</p>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-medium tracking-tight leading-[1.1] mb-4" data-testid="collection-title">
            Our Collection
          </h1>
          <p className="text-base md:text-lg leading-relaxed font-light text-muted-foreground max-w-2xl">
            {products.length} unique candles — each hand-poured with natural ingredients and designed to be both a source of light and a piece of art.
          </p>
        </div>

        {/* Category Filter */}
        <div className="mb-10 flex flex-wrap gap-2" data-testid="category-filter">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-5 py-2 text-[11px] uppercase tracking-widest transition-all duration-300 ${
                filter === cat
                  ? 'bg-[#2C2C2C] text-white'
                  : 'bg-transparent border border-[#5D6E5E]/20 text-[#5D6E5E] hover:border-[#D4AF37] hover:text-[#D4AF37]'
              }`}
              data-testid={`filter-${cat.toLowerCase().replace(/\s/g, '-')}`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5" data-testid="collection-grid">
          {filtered.map((product, i) => (
            <button
              key={product.id}
              data-card-id={product.id}
              onClick={() => setSelected(product)}
              className={`group text-left bg-white border border-transparent hover:border-[#D4AF37]/30 transition-all duration-500 overflow-hidden hover:shadow-[0_8px_30px_rgba(212,175,55,0.08)] ${
                i === 0 && filter === 'All' ? 'sm:col-span-2 lg:col-span-2' : ''
              }`}
              style={{
                opacity: visibleCards.has(String(product.id)) ? 1 : 0,
                transform: visibleCards.has(String(product.id)) ? 'translateY(0)' : 'translateY(30px)',
                transition: `opacity 0.6s cubic-bezier(0.16,1,0.3,1) ${(i % 3) * 0.1}s, transform 0.6s cubic-bezier(0.16,1,0.3,1) ${(i % 3) * 0.1}s`,
              }}
              data-testid={`collection-card-${product.id}`}
            >
              <div className={`overflow-hidden relative ${i === 0 && filter === 'All' ? 'aspect-[16/9]' : 'aspect-square'}`}>
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[1s] ease-out"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-2 group-hover:translate-y-0">
                  <span className="text-xs uppercase tracking-widest text-white/90">View Details</span>
                </div>
              </div>
              <div className="p-5 space-y-1.5">
                <p className="text-[10px] uppercase tracking-[0.2em] text-[#D4AF37]">{product.category}</p>
                <h3 className="text-lg font-heading font-normal group-hover:text-[#D4AF37] transition-colors duration-300">{product.name}</h3>
                <p className="text-sm text-muted-foreground italic">{product.tagline}</p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {selected && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 animate-[fadeIn_0.2s_ease]"
          onClick={() => setSelected(null)}
          data-testid="lightbox-overlay"
        >
          <div
            className="relative bg-white max-w-4xl w-full max-h-[90vh] overflow-y-auto animate-[fadeUp_0.35s_cubic-bezier(0.16,1,0.3,1)_forwards]"
            onClick={(e) => e.stopPropagation()}
            data-testid="lightbox-content"
          >
            <button
              onClick={() => setSelected(null)}
              className="absolute top-4 right-4 z-10 w-10 h-10 flex items-center justify-center bg-white/90 backdrop-blur-sm hover:bg-[#D4AF37] hover:text-white transition-colors duration-300"
              data-testid="lightbox-close"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="grid grid-cols-1 md:grid-cols-2">
              <div className="aspect-square overflow-hidden">
                <img
                  src={selected.image}
                  alt={selected.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-8 md:p-10 flex flex-col justify-center space-y-5">
                <p className="text-[10px] uppercase tracking-[0.2em] text-[#D4AF37]">{selected.category}</p>
                <h2 className="text-3xl font-heading font-normal">{selected.name}</h2>
                <div className="w-10 h-[2px] bg-[#D4AF37]" />
                <p className="text-sm italic text-[#5D6E5E]">{selected.tagline}</p>
                <p className="text-sm leading-relaxed text-muted-foreground">{selected.description}</p>
                <div className="flex gap-6 pt-4 border-t border-[#5D6E5E]/10">
                  <div className="flex items-center gap-2 text-sm text-[#5D6E5E]">
                    <Flame className="w-4 h-4 text-[#D4AF37]" />
                    <span>{selected.burnTime}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-[#5D6E5E]">
                    <Droplets className="w-4 h-4 text-[#D4AF37]" />
                    <span>{selected.wax}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CollectionPage;
