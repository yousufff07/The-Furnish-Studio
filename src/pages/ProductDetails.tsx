import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Rating } from '../components/common/Rating';
import { ProductCard } from '../components/common/ProductCard';
import { ToneColor } from '../types';
import { 
  Heart, ShoppingBag, Truck, ShieldCheck, RefreshCw, 
  ArrowLeft, Check, Share2, Plus, Minus, MessageSquare, Star 
} from 'lucide-react';
import { getToneConfig, ToneImageOverlay } from '../utils/toneStyles';

export const ProductDetails: React.FC = () => {
  const { products, selectedProductId, navigate, addToCart, toggleWishlist, isInWishlist, reviews, addReview, user, showToast } = useApp();

  const product = products.find(p => p.id === selectedProductId) || products[0];
  const isWishlisted = isInWishlist(product.id);

  const gallery = product.galleryImages && product.galleryImages.length > 0 
    ? product.galleryImages 
    : [product.imageUrl];

  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const [selectedColor, setSelectedColor] = useState<ToneColor>(product.color || 'rust');
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'desc' | 'specs' | 'reviews'>('desc');

  // New review form state
  const [newRating, setNewRating] = useState(5);
  const [newComment, setNewComment] = useState('');

  const productReviews = reviews.filter(r => r.productId === product.id);
  const relatedProducts = products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);
  const toneConfig = getToneConfig(selectedColor);

  const handleAddToCart = () => {
    addToCart(product.id, quantity, selectedColor, product.material);
  };

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) {
      showToast('Please enter your review commentary.', 'warning');
      return;
    }
    addReview(product.id, newRating, newComment);
    setNewComment('');
    setNewRating(5);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: product.name,
        text: product.description,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      showToast('Piece direct link copied to clipboard.', 'info');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-in fade-in duration-300">
      
      {/* Back button / Breadcrumb */}
      <div className="flex items-center justify-between mb-8 pb-4 border-b border-[#EBD8C6]">
        <button
          onClick={() => navigate('shop', { category: product.category })}
          className="text-xs font-semibold text-[#964627] hover:text-[#1E1A17] flex items-center gap-1.5 transition-colors uppercase tracking-wider"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to {product.category}</span>
        </button>
        <div className="text-xs font-mono text-[#8D9399]">
          SKU: {product.sku || `FURN-${product.category.substring(0, 2).toUpperCase()}-001`}
        </div>
      </div>

      {/* Main Top Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-16">
        
        {/* 1. Left Gallery (Col 7) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="aspect-[4/3] rounded-3xl overflow-hidden bg-[#EBD8C6]/40 border border-[#EBD8C6] shadow-xl relative">
            <img
              src={gallery[activeImageIdx]}
              alt={`${product.name} view ${activeImageIdx + 1}`}
              style={{ filter: toneConfig.imageFilter }}
              className="w-full h-full object-cover transition-all duration-500 relative z-0"
            />
            <ToneImageOverlay color={selectedColor} />
            
            {product.isBestSeller && (
              <span className="absolute top-4 left-4 bg-[#CCA37E] text-[#1E1A17] text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-full shadow-md z-10">
                Studio Best Seller
              </span>
            )}
            <span 
              className="absolute top-4 left-4 bg-white/90 text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full shadow-md border border-white/50 z-10 ml-36"
              style={{ color: toneConfig.hex }}
            >
              {toneConfig.name} Finish
            </span>
            
            <button
              onClick={handleShare}
              className="absolute top-4 right-4 p-3 bg-[#F8ECE1]/90 hover:bg-[#F8ECE1] text-[#1E1A17] rounded-full shadow-md transition-colors z-10"
              title="Share piece"
            >
              <Share2 className="w-4 h-4" />
            </button>
          </div>

          {/* Thumbnails */}
          {gallery.length > 1 && (
            <div className="grid grid-cols-4 gap-4">
              {gallery.map((imgUrl, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIdx(idx)}
                  className={`aspect-video rounded-xl overflow-hidden border-2 transition-all relative ${
                    activeImageIdx === idx 
                      ? 'ring-2 ring-offset-1 scale-105 shadow-sm' 
                      : 'border-transparent opacity-70 hover:opacity-100'
                  }`}
                  style={{ borderColor: activeImageIdx === idx ? toneConfig.hex : 'transparent' }}
                >
                  <img src={imgUrl} alt="Thumbnail" style={{ filter: toneConfig.imageFilter }} className="w-full h-full object-cover relative z-0" />
                  <ToneImageOverlay color={selectedColor} />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* 2. Right Product Details & Actions (Col 5) */}
        <div className="lg:col-span-5 space-y-6 flex flex-col justify-between">
          
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-[#964627] block mb-1">
              {product.category} Division
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#1E1A17] leading-tight mb-3">
              {product.name}
            </h1>

            <div className="flex items-center gap-4 mb-6">
              <Rating rating={product.rating} reviewCount={product.reviewCount} size="md" />
              <span className="text-[#EBD8C6]">&bull;</span>
              <button 
                onClick={() => { setActiveTab('reviews'); window.scrollTo({ top: 600, behavior: 'smooth' }); }}
                className="text-xs text-[#964627] underline font-semibold"
              >
                Read {productReviews.length} Patron Reviews
              </button>
            </div>

            <div className="flex items-baseline gap-3 pb-6 border-b border-[#EBD8C6]">
              <span className="font-serif font-bold text-3xl text-[#1E1A17]">
                ₹{product.price.toLocaleString('en-IN')}
              </span>
              {product.originalPrice && (
                <span className="text-base text-[#8D9399] line-through">
                  ₹{product.originalPrice.toLocaleString('en-IN')}
                </span>
              )}
              {product.originalPrice && (
                <span className="text-xs font-bold uppercase tracking-wider bg-[#964627]/10 text-[#964627] px-2.5 py-1 rounded-md">
                  Save {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
                </span>
              )}
            </div>

            {/* Tone Selector */}
            <div className="space-y-2.5 pt-6">
              <div className="flex justify-between text-xs font-semibold">
                <span className="text-[#8D9399] uppercase tracking-wider">Tone:</span>
                <span className="font-bold capitalize" style={{ color: toneConfig.hex }}>{toneConfig.name}</span>
              </div>
              <div className="flex items-center gap-3">
                {(product.availableColors || ['rust', 'slate', 'greige']).map((col) => {
                  const swatchCfg = getToneConfig(col);
                  const isSelected = selectedColor === col;
                  return (
                    <button
                      key={col}
                      onClick={() => setSelectedColor(col)}
                      style={{ borderColor: isSelected ? swatchCfg.hex : undefined }}
                      className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border transition-all ${
                        isSelected 
                          ? 'bg-[#F3E5D8] ring-2 ring-offset-2 shadow-sm font-bold scale-105' 
                          : 'border-[#EBD8C6] bg-[#F8ECE1] hover:border-[#CCA37E] opacity-80 hover:opacity-100'
                      }`}
                    >
                      <span 
                        className="w-5 h-5 rounded-full border border-black/10 shadow-sm transition-transform" 
                        style={{ backgroundColor: swatchCfg.hex }} 
                      />
                      <span className="text-xs font-bold capitalize text-[#1E1A17]">{swatchCfg.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Quantity and Stock */}
            <div className="space-y-2.5 pt-6">
              <div className="flex justify-between text-xs font-semibold">
                <span className="text-[#8D9399] uppercase tracking-wider">Quantity:</span>
                <span className={product.stock > 0 ? "text-[#964627]" : "text-red-600"}>
                  {product.stock > 0 ? `In Stock (${product.stock} units available)` : 'Out of Stock'}
                </span>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="inline-flex items-center border border-[#CCA37E] rounded-xl bg-[#F3E5D8]/60 p-1">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    disabled={quantity <= 1}
                    className="p-2 text-[#1E1A17] hover:text-[#964627] disabled:opacity-30 transition-colors"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="w-10 text-center font-mono font-bold text-base text-[#1E1A17]">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(Math.min(product.stock || 10, quantity + 1))}
                    disabled={quantity >= (product.stock || 10)}
                    className="p-2 text-[#1E1A17] hover:text-[#964627] disabled:opacity-30 transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>

                <div className="text-xs text-[#8D9399] font-sans">
                  Total: <span className="font-bold text-[#1E1A17]">₹{(product.price * quantity).toLocaleString('en-IN')}</span>
                </div>
              </div>
            </div>

          </div>

          {/* Action Buttons */}
          <div className="space-y-3 pt-8 border-t border-[#EBD8C6]">
            <div className="flex gap-3">
              <button
                onClick={handleAddToCart}
                disabled={product.stock <= 0}
                style={{ backgroundColor: toneConfig.hex, color: '#F8ECE1' }}
                className="flex-1 py-4 px-6 font-serif font-bold text-base rounded-xl shadow-lg transition-all flex items-center justify-center gap-2.5 disabled:opacity-50 disabled:cursor-not-allowed hover:brightness-110 hover:scale-[1.01]"
              >
                <ShoppingBag className="w-5 h-5" />
                <span>Add to Studio Cart ({toneConfig.name})</span>
              </button>

              <button
                onClick={() => toggleWishlist(product.id)}
                className={`p-4 rounded-xl border-2 transition-all flex items-center justify-center ${
                  isWishlisted 
                    ? 'bg-[#964627] border-[#964627] text-[#F8ECE1] shadow-md' 
                    : 'border-[#CCA37E] bg-transparent text-[#1E1A17] hover:bg-[#F3E5D8]'
                }`}
                aria-label="Save to Wishlist"
                title="Save to Wishlist"
              >
                <Heart className={`w-6 h-6 ${isWishlisted ? 'fill-current' : ''}`} />
              </button>
            </div>

            <button
              onClick={() => {
                handleAddToCart();
                navigate('checkout');
              }}
              disabled={product.stock <= 0}
              className="w-full py-3.5 bg-[#1E1A17] hover:bg-[#964627] text-[#F8ECE1] font-sans font-semibold text-sm rounded-xl transition-colors shadow-md disabled:opacity-50"
            >
              Instant Purchase (White-Glove Dispatch)
            </button>
          </div>

          {/* Trust Highlights */}
          <div className="grid grid-cols-2 gap-3 pt-4 text-xs text-[#1E1A17]/80 bg-[#F3E5D8]/50 p-4 rounded-xl border border-[#EBD8C6]">
            <div className="flex items-center gap-2">
              <Truck className="w-4 h-4 text-[#964627]" />
              <span>Free delivery over ₹50,000</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#964627]" />
              <span>10-year structural warranty</span>
            </div>
            <div className="flex items-center gap-2">
              <RefreshCw className="w-4 h-4 text-[#964627]" />
              <span>30-day in-home trial</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-[#964627]" />
              <span>FSC-Certified hardwood</span>
            </div>
          </div>

        </div>

      </div>

      {/* 3. Tabbed Sections (Description / Specifications / Reviews) */}
      <div className="bg-[#F3E5D8]/40 border border-[#EBD8C6] rounded-3xl p-6 sm:p-10 mb-16 shadow-sm">
        <div className="flex border-b border-[#EBD8C6] gap-8 mb-8 overflow-x-auto">
          <button
            onClick={() => setActiveTab('desc')}
            className={`pb-4 font-serif font-bold text-lg sm:text-xl transition-colors whitespace-nowrap border-b-2 ${
              activeTab === 'desc' ? 'border-[#964627] text-[#964627]' : 'border-transparent text-[#1E1A17]/60 hover:text-[#1E1A17]'
            }`}
          >
            Design & Materiality
          </button>
          <button
            onClick={() => setActiveTab('specs')}
            className={`pb-4 font-serif font-bold text-lg sm:text-xl transition-colors whitespace-nowrap border-b-2 ${
              activeTab === 'specs' ? 'border-[#964627] text-[#964627]' : 'border-transparent text-[#1E1A17]/60 hover:text-[#1E1A17]'
            }`}
          >
            Technical Specifications
          </button>
          <button
            onClick={() => setActiveTab('reviews')}
            className={`pb-4 font-serif font-bold text-lg sm:text-xl transition-colors whitespace-nowrap border-b-2 ${
              activeTab === 'reviews' ? 'border-[#964627] text-[#964627]' : 'border-transparent text-[#1E1A17]/60 hover:text-[#1E1A17]'
            }`}
          >
            Patron Reviews ({productReviews.length})
          </button>
        </div>

        {activeTab === 'desc' && (
          <div className="space-y-6 max-w-3xl animate-in fade-in duration-300">
            <p className="text-base sm:text-lg text-[#1E1A17]/90 leading-relaxed font-sans">
              {product.description}
            </p>
            <p className="text-sm text-[#1E1A17]/80 leading-relaxed font-sans">
              Designed with timeless architectural elegance, this piece balances structural rigidity with inviting softness. Our craftsmen hand-finish each joinery connection, applying natural beeswax and organic oils that nourish the timber while allowing it to breathe.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
              <div className="bg-[#F8ECE1] p-5 rounded-2xl border border-[#EBD8C6]">
                <h4 className="font-serif font-bold text-base text-[#1E1A17] mb-1">Sustainable Craft</h4>
                <p className="text-xs text-[#8D9399]">All timber is sustainably harvested from European white oak forests with zero VOC finishes.</p>
              </div>
              <div className="bg-[#F8ECE1] p-5 rounded-2xl border border-[#EBD8C6]">
                <h4 className="font-serif font-bold text-base text-[#1E1A17] mb-1">White-Glove Care</h4>
                <p className="text-xs text-[#8D9399]">Delivered fully assembled by our specialized logistics team directly to your room of choice.</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'specs' && (
          <div className="max-w-3xl animate-in fade-in duration-300">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-4 text-sm">
              <div className="flex justify-between py-3 border-b border-[#EBD8C6]">
                <span className="text-[#8D9399]">Overall Dimensions</span>
                <span className="font-semibold text-[#1E1A17] font-mono">{product.dimensions || '84"W x 38"D x 32"H'}</span>
              </div>
              <div className="flex justify-between py-3 border-b border-[#EBD8C6]">
                <span className="text-[#8D9399]">Net Weight</span>
                <span className="font-semibold text-[#1E1A17] font-mono">{product.weight || '45 kg'}</span>
              </div>
              <div className="flex justify-between py-3 border-b border-[#EBD8C6]">
                <span className="text-[#8D9399]">Primary Material</span>
                <span className="font-semibold text-[#1E1A17]">{product.material}</span>
              </div>
              <div className="flex justify-between py-3 border-b border-[#EBD8C6]">
                <span className="text-[#8D9399]">Tone</span>
                <span className="font-semibold text-[#1E1A17] capitalize">{product.color}</span>
              </div>
              <div className="flex justify-between py-3 border-b border-[#EBD8C6]">
                <span className="text-[#8D9399]">Assembly Required</span>
                <span className="font-semibold text-[#1E1A17]">No (White-Glove Assembly Included)</span>
              </div>
              <div className="flex justify-between py-3 border-b border-[#EBD8C6]">
                <span className="text-[#8D9399]">Country of Origin</span>
                <span className="font-semibold text-[#1E1A17]">Designed in Studio, Handcrafted in Italy/Nordics</span>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'reviews' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 animate-in fade-in duration-300">
            
            {/* Reviews List (Col 7) */}
            <div className="lg:col-span-7 space-y-6">
              {productReviews.length > 0 ? (
                productReviews.map((rev) => (
                  <div key={rev.id} className="bg-[#F8ECE1] p-6 rounded-2xl border border-[#EBD8C6] shadow-sm space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <img 
                          src={rev.userAvatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=100&q=80'} 
                          alt={rev.userName} 
                          className="w-10 h-10 rounded-full object-cover" 
                        />
                        <div>
                          <h4 className="font-serif font-bold text-sm text-[#1E1A17]">{rev.userName}</h4>
                          {rev.verifiedPurchase && (
                            <span className="text-[10px] text-[#964627] font-bold uppercase tracking-wider flex items-center gap-1">
                              <Check className="w-3 h-3" /> Verified Studio Patron
                            </span>
                          )}
                        </div>
                      </div>
                      <span className="text-xs text-[#8D9399] font-mono">{rev.date}</span>
                    </div>
                    
                    <Rating rating={rev.rating} size="sm" showNumber={false} />
                    
                    <p className="text-sm text-[#1E1A17]/90 leading-relaxed font-sans">
                      "{rev.comment}"
                    </p>
                  </div>
                ))
              ) : (
                <div className="text-center py-12 bg-[#F8ECE1] rounded-2xl border border-dashed border-[#CCA37E]">
                  <MessageSquare className="w-10 h-10 text-[#CCA37E] mx-auto mb-2" />
                  <p className="font-serif font-bold text-base text-[#1E1A17]">No reviews published yet for this piece</p>
                  <p className="text-xs text-[#8D9399]">Be the first patron to share your architectural experience.</p>
                </div>
              )}
            </div>

            {/* Add Review Form (Col 5) */}
            <div className="lg:col-span-5 bg-[#F8ECE1] p-6 sm:p-8 rounded-2xl border border-[#CCA37E] shadow-md h-fit">
              <h3 className="font-serif font-bold text-xl text-[#1E1A17] mb-2">Write a Studio Review</h3>
              <p className="text-xs text-[#8D9399] mb-6">
                Share your impressions on craftsmanship, materiality, and comfort with fellow patrons.
              </p>

              <form onSubmit={handleReviewSubmit} className="space-y-4">
                <div>
                  <label className="text-xs font-semibold uppercase tracking-wider text-[#8D9399] block mb-2">
                    Your Rating
                  </label>
                  <Rating 
                    rating={newRating} 
                    interactive={true} 
                    onRate={(val) => setNewRating(val)} 
                    size="lg" 
                  />
                </div>

                <div>
                  <label htmlFor="review-comment" className="text-xs font-semibold uppercase tracking-wider text-[#8D9399] block mb-2">
                    Your Commentary
                  </label>
                  <textarea
                    id="review-comment"
                    rows={4}
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Describe how the piece looks and feels in your sanctuary..."
                    className="w-full bg-[#F3E5D8] border border-[#EBD8C6] rounded-xl p-3 text-sm text-[#1E1A17] placeholder-[#8D9399] focus:outline-none focus:border-[#CCA37E]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-[#1E1A17] hover:bg-[#CCA37E] text-[#F8ECE1] hover:text-[#1E1A17] font-serif font-bold text-sm rounded-xl transition-colors shadow-md flex items-center justify-center gap-2"
                >
                  <Star className="w-4 h-4 fill-current" />
                  <span>Publish Review</span>
                </button>
              </form>
            </div>

          </div>
        )}
      </div>

      {/* 4. Related Products Section */}
      {relatedProducts.length > 0 && (
        <div className="space-y-8 pt-8 border-t border-[#EBD8C6]">
          <div className="flex items-end justify-between">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#964627] block mb-1">Harmonious Pairings</span>
              <h2 className="font-serif text-3xl font-bold text-[#1E1A17]">Related {product.category} Pieces</h2>
            </div>
            <button
              onClick={() => navigate('shop', { category: product.category })}
              className="text-sm font-semibold text-[#964627] hover:text-[#1E1A17] transition-colors"
            >
              View All {product.category} &rarr;
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((prod) => (
              <ProductCard key={prod.id} product={prod} />
            ))}
          </div>
        </div>
      )}

    </div>
  );
};
