import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../utils/api';

const AccessoriesPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadAccessories();
  }, []);

  const loadAccessories = async () => {
    try {
      const res = await api.get('/products?product_type=Accessories');
      setProducts(res.data);
    } catch (error) {
      console.error('Failed to load accessories');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen py-24">
      <div className="max-w-[1600px] mx-auto px-6 md:px-12 lg:px-24">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-5xl md:text-7xl font-medium tracking-tight leading-[1.1] mb-4" data-testid="accessories-title">Candle Accessories</h1>
          <p className="text-lg md:text-xl leading-relaxed font-light text-muted-foreground">
            Premium tools to enhance your candle experience
          </p>
        </div>

        {/* Description */}
        <div className="bg-[#F0EFE9] p-12 rounded-sm mb-16">
          <p className="text-lg leading-relaxed font-light max-w-3xl">
            Complete your candle ritual with our carefully curated collection of accessories. From elegant wick trimmers that ensure a perfect burn to sophisticated snuffers that preserve your candle's fragrance, each piece is designed to elevate your experience.
          </p>
        </div>

        {/* Products */}
        {loading ? (
          <div className="text-center py-24">
            <p className="text-muted-foreground">Loading accessories...</p>
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-24">
            <p className="text-muted-foreground">Accessories coming soon!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product) => (
              <Link
                key={product.id}
                to={`/product/${product.id}`}
                className="group bg-white p-8 border border-transparent hover:border-[#5D6E5E]/20 transition-all duration-500"
                data-testid={`accessory-${product.id}`}
              >
                <div className="aspect-square mb-6 overflow-hidden">
                  <img
                    src={product.image_url}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
                <div className="space-y-2">
                  <h3 className="text-2xl font-normal">{product.name}</h3>
                  <p className="text-base text-muted-foreground line-clamp-2">{product.description}</p>
                  <p className="text-lg text-[#D4AF37]">₹{product.price}</p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AccessoriesPage;