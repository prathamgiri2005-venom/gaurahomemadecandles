import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Filter, Star } from 'lucide-react';
import api from '../utils/api';

const ShopPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedType, setSelectedType] = useState('');

  useEffect(() => {
    loadProducts();
  }, [selectedCategory, selectedType]);

  const loadProducts = async () => {
    setLoading(true);
    try {
      let url = '/products?';
      if (selectedCategory) url += `category=${selectedCategory}&`;
      if (selectedType) url += `product_type=${selectedType}&`;
      
      const res = await api.get(url);
      setProducts(res.data);
    } catch (error) {
      console.error('Failed to load products');
    } finally {
      setLoading(false);
    }
  };

  const categories = ['Floral', 'Woody', 'Spicy', 'Fresh'];
  const types = ['Jar Candles', 'Pillars', 'Tea Lights'];

  return (
    <div className="min-h-screen py-24">
      <div className="max-w-[1600px] mx-auto px-6 md:px-12 lg:px-24">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-5xl md:text-7xl font-medium tracking-tight leading-[1.1] mb-4" data-testid="shop-title">Our Collection</h1>
          <p className="text-lg md:text-xl leading-relaxed font-light text-muted-foreground">Discover hand-poured candles crafted with natural soy wax</p>
        </div>

        {/* Filters */}
        <div className="mb-12 space-y-6" data-testid="filter-section">
          {/* Category Filter */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Filter className="w-4 h-4 text-[#5D6E5E]" />
              <h3 className="text-xs uppercase tracking-widest text-[#5D6E5E]">Scent Category</h3>
            </div>
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => setSelectedCategory('')}
                className={`px-6 py-2 rounded-sm text-xs uppercase tracking-widest transition-all duration-300 ${
                  selectedCategory === ''
                    ? 'bg-[#5D6E5E] text-white'
                    : 'bg-transparent border border-[#5D6E5E] text-[#5D6E5E] hover:bg-[#5D6E5E] hover:text-white'
                }`}
                data-testid="filter-all"
              >
                All
              </button>
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-6 py-2 rounded-sm text-xs uppercase tracking-widest transition-all duration-300 ${
                    selectedCategory === cat
                      ? 'bg-[#5D6E5E] text-white'
                      : 'bg-transparent border border-[#5D6E5E] text-[#5D6E5E] hover:bg-[#5D6E5E] hover:text-white'
                  }`}
                  data-testid={`filter-category-${cat.toLowerCase()}`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Type Filter */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Filter className="w-4 h-4 text-[#5D6E5E]" />
              <h3 className="text-xs uppercase tracking-widest text-[#5D6E5E]">Product Type</h3>
            </div>
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => setSelectedType('')}
                className={`px-6 py-2 rounded-sm text-xs uppercase tracking-widest transition-all duration-300 ${
                  selectedType === ''
                    ? 'bg-[#5D6E5E] text-white'
                    : 'bg-transparent border border-[#5D6E5E] text-[#5D6E5E] hover:bg-[#5D6E5E] hover:text-white'
                }`}
                data-testid="filter-type-all"
              >
                All Types
              </button>
              {types.map((type) => (
                <button
                  key={type}
                  onClick={() => setSelectedType(type)}
                  className={`px-6 py-2 rounded-sm text-xs uppercase tracking-widest transition-all duration-300 ${
                    selectedType === type
                      ? 'bg-[#5D6E5E] text-white'
                      : 'bg-transparent border border-[#5D6E5E] text-[#5D6E5E] hover:bg-[#5D6E5E] hover:text-white'
                  }`}
                  data-testid={`filter-type-${type.toLowerCase().replace(' ', '-')}`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Products Grid (Bento Style) */}
        {loading ? (
          <div className="text-center py-24">
            <p className="text-muted-foreground">Loading products...</p>
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-24">
            <p className="text-muted-foreground">No products found</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" data-testid="products-grid">
            {products.map((product, index) => (
              <Link
                key={product.id}
                to={`/product/${product.id}`}
                className={`group bg-white p-6 md:p-8 border border-transparent hover:border-[#5D6E5E]/20 transition-all duration-500 ${
                  index % 7 === 0 ? 'md:col-span-2 md:row-span-2' : ''
                }`}
                data-testid={`product-card-${product.id}`}
              >
                <div className={`mb-6 overflow-hidden ${
                  index % 7 === 0 ? 'aspect-[16/10]' : 'aspect-square'
                }`}>
                  <img
                    src={product.image_url}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
                <div className="space-y-2">
                  {product.category && (
                    <p className="text-xs uppercase tracking-[0.2em] text-[#5D6E5E]">{product.category}</p>
                  )}
                  <h3 className="text-xl md:text-2xl font-normal">{product.name}</h3>
                  {product.rating > 0 && (
                    <div className="flex items-center space-x-2">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${
                              i < product.rating ? 'fill-[#D4AF37] text-[#D4AF37]' : 'text-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-xs text-muted-foreground">({product.review_count})</span>
                    </div>
                  )}
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

export default ShopPage;