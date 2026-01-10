import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Heart, ShoppingCart, Star } from 'lucide-react';
import { toast } from 'sonner';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import api from '../utils/api';

const ProductDetailPage = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [submittingReview, setSubmittingReview] = useState(false);

  useEffect(() => {
    loadProduct();
    loadReviews();
  }, [id]);

  const loadProduct = async () => {
    try {
      const res = await api.get(`/products/${id}`);
      setProduct(res.data);
    } catch (error) {
      toast.error('Product not found');
      navigate('/shop');
    } finally {
      setLoading(false);
    }
  };

  const loadReviews = async () => {
    try {
      const res = await api.get(`/reviews/${id}`);
      setReviews(res.data);
    } catch (error) {
      console.error('Failed to load reviews');
    }
  };

  const handleAddToCart = async () => {
    if (!user) {
      toast.error('Please login to add items to cart');
      navigate('/login');
      return;
    }

    try {
      await api.post('/cart', { product_id: id, quantity });
      toast.success('Added to cart!');
    } catch (error) {
      toast.error('Failed to add to cart');
    }
  };

  const handleAddToWishlist = async () => {
    if (!user) {
      toast.error('Please login to add items to wishlist');
      navigate('/login');
      return;
    }

    try {
      await api.post(`/wishlist/${id}`);
      toast.success('Added to wishlist!');
    } catch (error) {
      toast.error('Failed to add to wishlist');
    }
  };

  const handleSubmitReview = async (e) => {
    e.preventDefault();
    if (!user) {
      toast.error('Please login to submit a review');
      navigate('/login');
      return;
    }

    setSubmittingReview(true);
    try {
      await api.post('/reviews', { product_id: id, rating, comment });
      toast.success('Review submitted!');
      setComment('');
      loadReviews();
      loadProduct();
    } catch (error) {
      toast.error(error.response?.data?.detail || 'Failed to submit review');
    } finally {
      setSubmittingReview(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground">Loading...</p>
      </div>
    );
  }

  if (!product) return null;

  return (
    <div className="min-h-screen py-24">
      <div className="max-w-[1600px] mx-auto px-6 md:px-12 lg:px-24">
        {/* Product Main */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-24">
          {/* Image */}
          <div className="aspect-square overflow-hidden bg-white" data-testid="product-image">
            <img
              src={product.image_url}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Details */}
          <div className="space-y-6">
            {product.category && (
              <p className="text-xs uppercase tracking-[0.2em] text-[#5D6E5E]" data-testid="product-category">{product.category}</p>
            )}
            <h1 className="text-4xl md:text-5xl font-normal tracking-tight" data-testid="product-name">{product.name}</h1>
            
            {product.rating > 0 && (
              <div className="flex items-center space-x-3">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${
                        i < product.rating ? 'fill-[#D4AF37] text-[#D4AF37]' : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-muted-foreground" data-testid="review-count">({product.review_count} reviews)</span>
              </div>
            )}

            <p className="text-3xl text-[#D4AF37]" data-testid="product-price">₹{product.price}</p>

            <p className="text-lg leading-relaxed font-light" data-testid="product-description">{product.description}</p>

            {/* Product Info */}
            <div className="space-y-3 pt-6 border-t border-[#5D6E5E]/10">
              {product.burn_time && (
                <div className="flex justify-between">
                  <span className="text-xs uppercase tracking-widest text-[#5D6E5E]">Burn Time</span>
                  <span className="text-sm" data-testid="burn-time">{product.burn_time}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-xs uppercase tracking-widest text-[#5D6E5E]">Wax Type</span>
                <span className="text-sm" data-testid="wax-type">{product.wax_type}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-xs uppercase tracking-widest text-[#5D6E5E]">Stock</span>
                <span className="text-sm" data-testid="stock">{product.stock > 0 ? 'In Stock' : 'Out of Stock'}</span>
              </div>
            </div>

            {/* Quantity */}
            <div className="flex items-center space-x-4">
              <span className="text-xs uppercase tracking-widest text-[#5D6E5E]">Quantity</span>
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 border border-[#5D6E5E]/30 hover:border-[#5D6E5E] transition-colors"
                  data-testid="quantity-decrease"
                >
                  -
                </button>
                <span className="w-12 text-center" data-testid="quantity-value">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-10 border border-[#5D6E5E]/30 hover:border-[#5D6E5E] transition-colors"
                  data-testid="quantity-increase"
                >
                  +
                </button>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4 pt-6">
              <button
                onClick={handleAddToCart}
                disabled={product.stock === 0}
                className="flex-1 flex items-center justify-center space-x-2 bg-[#5D6E5E] text-white hover:bg-[#4A584B] rounded-sm px-8 py-4 uppercase tracking-widest text-xs transition-all duration-300 disabled:opacity-50"
                data-testid="add-to-cart-button"
              >
                <ShoppingCart className="w-4 h-4" />
                <span>{product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}</span>
              </button>
              <button
                onClick={handleAddToWishlist}
                className="flex items-center justify-center space-x-2 bg-transparent border border-[#5D6E5E] text-[#5D6E5E] hover:bg-[#5D6E5E] hover:text-white rounded-sm px-8 py-4 uppercase tracking-widest text-xs transition-all duration-300"
                data-testid="add-to-wishlist-button"
              >
                <Heart className="w-4 h-4" />
                <span>Wishlist</span>
              </button>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="description" className="w-full">
          <TabsList className="w-full justify-start border-b border-[#5D6E5E]/10 bg-transparent rounded-none h-auto p-0 space-x-8">
            <TabsTrigger 
              value="description" 
              className="text-xs uppercase tracking-widest bg-transparent data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-[#5D6E5E] rounded-none pb-4"
              data-testid="tab-description"
            >
              Description
            </TabsTrigger>
            {product.scent_notes && (
              <TabsTrigger 
                value="scent" 
                className="text-xs uppercase tracking-widest bg-transparent data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-[#5D6E5E] rounded-none pb-4"
                data-testid="tab-scent"
              >
                Scent Notes
              </TabsTrigger>
            )}
            <TabsTrigger 
              value="safety" 
              className="text-xs uppercase tracking-widest bg-transparent data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-[#5D6E5E] rounded-none pb-4"
              data-testid="tab-safety"
            >
              Safety Tips
            </TabsTrigger>
            <TabsTrigger 
              value="reviews" 
              className="text-xs uppercase tracking-widest bg-transparent data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-[#5D6E5E] rounded-none pb-4"
              data-testid="tab-reviews"
            >
              Reviews ({product.review_count})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="description" className="py-12" data-testid="content-description">
            <div className="max-w-3xl">
              <p className="text-lg leading-relaxed font-light">{product.description}</p>
            </div>
          </TabsContent>

          {product.scent_notes && (
            <TabsContent value="scent" className="py-12" data-testid="content-scent">
              <div className="max-w-3xl space-y-6">
                <div>
                  <h3 className="text-xs uppercase tracking-widest text-[#5D6E5E] mb-2">Top Notes</h3>
                  <p className="text-lg" data-testid="scent-top">{product.scent_notes.top}</p>
                </div>
                <div>
                  <h3 className="text-xs uppercase tracking-widest text-[#5D6E5E] mb-2">Heart Notes</h3>
                  <p className="text-lg" data-testid="scent-heart">{product.scent_notes.heart}</p>
                </div>
                <div>
                  <h3 className="text-xs uppercase tracking-widest text-[#5D6E5E] mb-2">Base Notes</h3>
                  <p className="text-lg" data-testid="scent-base">{product.scent_notes.base}</p>
                </div>
              </div>
            </TabsContent>
          )}

          <TabsContent value="safety" className="py-12" data-testid="content-safety">
            <div className="max-w-3xl space-y-4">
              <p className="text-lg leading-relaxed font-light">Follow these safety tips for the best candle experience:</p>
              <ul className="space-y-3 list-disc list-inside text-base leading-relaxed">
                <li>Always burn candles on a heat-resistant surface away from flammable materials</li>
                <li>Never leave a burning candle unattended</li>
                <li>Keep candles away from drafts, vents, and air currents</li>
                <li>Trim wick to 1/4 inch before each use to ensure a clean burn</li>
                <li>Do not burn candles for more than 4 hours at a time</li>
                <li>Keep out of reach of children and pets</li>
                <li>Stop use when 1/2 inch of wax remains at the bottom</li>
              </ul>
            </div>
          </TabsContent>

          <TabsContent value="reviews" className="py-12" data-testid="content-reviews">
            <div className="max-w-3xl space-y-12">
              {/* Submit Review */}
              {user && (
                <div className="space-y-6">
                  <h3 className="text-2xl font-normal">Write a Review</h3>
                  <form onSubmit={handleSubmitReview} className="space-y-6">
                    <div>
                      <label className="block text-xs uppercase tracking-widest text-[#5D6E5E] mb-3">Rating</label>
                      <div className="flex items-center space-x-2">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            key={star}
                            type="button"
                            onClick={() => setRating(star)}
                            data-testid={`rating-star-${star}`}
                          >
                            <Star
                              className={`w-6 h-6 cursor-pointer ${
                                star <= rating ? 'fill-[#D4AF37] text-[#D4AF37]' : 'text-gray-300'
                              }`}
                            />
                          </button>
                        ))}
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs uppercase tracking-widest text-[#5D6E5E] mb-3">Your Review</label>
                      <textarea
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        required
                        rows={4}
                        className="w-full bg-transparent border border-[#5D6E5E]/30 focus:border-[#5D6E5E] rounded-sm p-4 text-base placeholder:text-[#5D6E5E]/40 focus:outline-none transition-colors"
                        placeholder="Share your experience with this candle..."
                        data-testid="review-comment"
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={submittingReview}
                      className="bg-[#5D6E5E] text-white hover:bg-[#4A584B] rounded-sm px-8 py-4 uppercase tracking-widest text-xs transition-all duration-300 disabled:opacity-50"
                      data-testid="submit-review-button"
                    >
                      {submittingReview ? 'Submitting...' : 'Submit Review'}
                    </button>
                  </form>
                </div>
              )}

              {/* Reviews List */}
              <div className="space-y-8">
                <h3 className="text-2xl font-normal">Customer Reviews</h3>
                {reviews.length === 0 ? (
                  <p className="text-muted-foreground">No reviews yet. Be the first to review!</p>
                ) : (
                  <div className="space-y-8">
                    {reviews.map((review) => (
                      <div key={review.id} className="border-b border-[#5D6E5E]/10 pb-8" data-testid={`review-${review.id}`}>
                        <div className="flex items-center space-x-3 mb-3">
                          <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`w-4 h-4 ${
                                  i < review.rating ? 'fill-[#D4AF37] text-[#D4AF37]' : 'text-gray-300'
                                }`}
                              />
                            ))}
                          </div>
                          <span className="text-sm font-medium">{review.user_name}</span>
                          <span className="text-xs text-muted-foreground">
                            {new Date(review.created_at).toLocaleDateString()}
                          </span>
                        </div>
                        <p className="text-base leading-relaxed">{review.comment}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ProductDetailPage;