import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Heart, Trash2 } from 'lucide-react';
import { toast } from 'sonner';
import api from '../utils/api';

const WishlistPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadWishlist();
  }, []);

  const loadWishlist = async () => {
    try {
      const res = await api.get('/wishlist');
      setProducts(res.data);
    } catch (error) {
      console.error('Failed to load wishlist');
    } finally {
      setLoading(false);
    }
  };

  const removeItem = async (productId) => {
    try {
      await api.delete(`/wishlist/${productId}`);
      toast.success('Removed from wishlist');
      loadWishlist();
    } catch (error) {
      toast.error('Failed to remove item');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground">Loading wishlist...</p>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center py-24">
        <div className="text-center space-y-6" data-testid="empty-wishlist">
          <Heart className="w-16 h-16 text-[#5D6E5E] mx-auto" />
          <h2 className="text-2xl font-normal">Your wishlist is empty</h2>
          <p className="text-muted-foreground">Save your favorite candles here!</p>
          <Link
            to="/shop"
            className="inline-block bg-[#5D6E5E] text-white hover:bg-[#4A584B] rounded-sm px-8 py-4 uppercase tracking-widest text-xs transition-all duration-300"
            data-testid="shop-now-button"
          >
            Shop Now
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-24">
      <div className="max-w-[1600px] mx-auto px-6 md:px-12 lg:px-24">
        <h1 className="text-4xl md:text-5xl font-normal tracking-tight mb-12" data-testid="wishlist-title">My Wishlist</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="group bg-white p-6 md:p-8 border border-transparent hover:border-[#5D6E5E]/20 transition-all duration-500 relative"
              data-testid={`wishlist-item-${product.id}`}
            >
              <button
                onClick={() => removeItem(product.id)}
                className="absolute top-4 right-4 z-10 text-red-500 hover:text-red-700 transition-colors"
                data-testid={`remove-wishlist-${product.id}`}
              >
                <Trash2 className="w-5 h-5" />
              </button>
              
              <Link to={`/product/${product.id}`}>
                <div className="aspect-square mb-6 overflow-hidden">
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
                  <p className="text-lg text-[#D4AF37]">₹{product.price}</p>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WishlistPage;