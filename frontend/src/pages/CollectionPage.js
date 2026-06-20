import React, { useState } from 'react';
import { X, Flame, Droplets } from 'lucide-react';
import products from '../data/products';

const CollectionPage = () => {
  const [selected, setSelected] = useState(null);

  return (
    <div className="min-h-screen py-24">
      <div className="max-w-[1600px] mx-auto px-6 md:px-12 lg:px-24">
        {/* Header */}
        <div className="mb-14">
          <p className="text-xs uppercase tracking-[0.3em] text-[#D4AF37] mb-3">Handcrafted Artisanal Candles</p>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-medium tracking-tight leading-[1.1] mb-4" data-testid="collection-title">
            Our Collection
          </h1>
          <p className="text-base md:text-lg leading-relaxed font-light text-muted-foreground max-w-2xl">
            Each Gaura candle is hand-poured with natural ingredients and designed to be both a source of light and a piece of art.
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5" data-testid="collection-grid">
          {products.map((product, i) => (
            <button
              key={product.id}
              onClick={() => setSelected(product)}
              className={`group text-left bg-white border border-transparent hover:border-[#D4AF37]/30 transition-all duration-500 overflow-hidden ${
                i === 0 ? 'sm:col-span-2 lg:col-span-2' : ''
              }`}
              data-testid={`collection-card-${product.id}`}
            >
              <div className={`overflow-hidden ${i === 0 ? 'aspect-[16/9]' : 'aspect-square'}`}>
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                />
              </div>
              <div className="p-5 space-y-1.5">
                <p className="text-[10px] uppercase tracking-[0.2em] text-[#D4AF37]">{product.category}</p>
                <h3 className="text-lg font-heading font-normal">{product.name}</h3>
                <p className="text-sm text-muted-foreground italic">{product.tagline}</p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {selected && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4"
          onClick={() => setSelected(null)}
          data-testid="lightbox-overlay"
        >
          <div
            className="relative bg-white max-w-4xl w-full max-h-[90vh] overflow-y-auto animate-[fadeUp_0.3s_ease_forwards]"
            onClick={(e) => e.stopPropagation()}
            data-testid="lightbox-content"
          >
            <button
              onClick={() => setSelected(null)}
              className="absolute top-4 right-4 z-10 w-10 h-10 flex items-center justify-center bg-white/80 backdrop-blur-sm hover:bg-white transition-colors"
              data-testid="lightbox-close"
            >
              <X className="w-5 h-5 text-[#2C2C2C]" />
            </button>

            <div className="grid grid-cols-1 md:grid-cols-2">
              <div className="aspect-square">
                <img
                  src={selected.image}
                  alt={selected.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-8 md:p-10 flex flex-col justify-center space-y-5">
                <p className="text-[10px] uppercase tracking-[0.2em] text-[#D4AF37]">{selected.category}</p>
                <h2 className="text-3xl font-heading font-normal">{selected.name}</h2>
                <p className="text-sm italic text-[#5D6E5E]">{selected.tagline}</p>
                <p className="text-sm leading-relaxed text-muted-foreground">{selected.description}</p>
                <div className="flex gap-6 pt-2">
                  <div className="flex items-center gap-2 text-sm text-[#5D6E5E]">
                    <Flame className="w-4 h-4" />
                    <span>{selected.burnTime}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-[#5D6E5E]">
                    <Droplets className="w-4 h-4" />
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
