import React, { useState } from 'react';
import { Product } from '../../types';
import { useApp } from '../../context/AppContext';
import { Heart, ShoppingBag, Eye } from 'lucide-react';
import { Rating } from './Rating';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { navigate, addToCart, toggleWishlist, isInWishlist } = useApp();
  const [isHovered, setIsHovered] = useState(false);

  const isWishlisted = isInWishlist(product.id);

  const handleCardClick = () => {
    navigate('product-details', { productId: product.id });
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product.id, 1, product.color || 'rust');
  };

  const handleWishlistClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleWishlist(product.id);
  };

  return (
    <div 
      onClick={handleCardClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group bg-white/80 hover:bg-white rounded-3xl p-5 transition-all duration-300 shadow-sm hover:shadow-xl hover:-translate-y-1.5 cursor-pointer flex flex-col border border-[#EBD8C6]/60 hover:border-[#964627]"
    >
      {/* Image Container */}
      <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-[#EBD8C6]/50 mb-4">
        <img 
          src={product.imageUrl} 
          alt={product.name} 
          className="w-full h-full object-cover transform group-hover:scale-105 transition-all duration-700 ease-out relative z-0"
        />
        
        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1 z-10">
          {product.isNew && (
            <span className="bg-[#1E1A17] text-[#F8ECE1] text-[10px] uppercase font-bold tracking-wider px-3 py-1 rounded-full shadow-sm">
              New
            </span>
          )}
          {product.isBestSeller && (
            <span className="bg-[#CCA37E] text-[#1E1A17] text-[10px] uppercase font-bold tracking-wider px-3 py-1 rounded-full shadow-sm">
              Best Seller
            </span>
          )}
          {product.originalPrice && (
            <span className="bg-[#AD7C52] text-[#F8ECE1] text-[10px] uppercase font-bold tracking-wider px-3 py-1 rounded-full shadow-sm">
              Save ₹{(product.originalPrice - product.price).toLocaleString('en-IN')}
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={handleWishlistClick}
          className={`absolute top-3 right-3 w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 shadow-md z-10 ${
            isWishlisted 
              ? 'bg-[#AD7C52] text-[#F8ECE1]' 
              : 'bg-[#F8ECE1]/90 hover:bg-[#F8ECE1] text-[#1E1A17]/80 hover:text-[#AD7C52]'
          }`}
          aria-label="Save to wishlist"
        >
          <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
        </button>

        {/* Quick actions overlay on hover */}
        <div className={`absolute inset-x-3 bottom-3 flex gap-2 transition-all duration-300 z-10 ${isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3 pointer-events-none'}`}>
          <button
            onClick={handleAddToCart}
            className="flex-1 bg-[#1E1A17] hover:bg-[#964627] text-[#F8ECE1] text-xs font-semibold py-2.5 px-4 rounded-full shadow-lg flex items-center justify-center gap-1.5 transition-all duration-300"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>Add to Cart</span>
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); navigate('product-details', { productId: product.id }); }}
            className="bg-[#F8ECE1]/90 hover:bg-[#F8ECE1] text-[#1E1A17] p-2.5 rounded-full shadow-lg transition-colors flex items-center justify-center"
            title="Quick View"
          >
            <Eye className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Product Content */}
      <div className="flex flex-col flex-1">
        <div className="flex items-center justify-between gap-2 mb-1.5">
          <span className="text-xs uppercase tracking-wider text-[#8D9399] font-medium">
            {product.category}
          </span>
          <Rating rating={product.rating} reviewCount={product.reviewCount} size="sm" showNumber={false} />
        </div>

        <h3 className="font-serif font-semibold text-base text-[#1E1A17] group-hover:text-[#964627] transition-colors line-clamp-1 mb-3">
          {product.name}
        </h3>

        <div className="mt-auto flex items-end justify-between pt-2 border-t border-[#EBD8C6]/60">
          <div>
            <div className="flex items-baseline gap-2">
              <span className="font-serif font-bold text-lg text-[#1E1A17]">
                ₹{product.price.toLocaleString('en-IN')}
              </span>
              {product.originalPrice && (
                <span className="text-xs text-[#8D9399] line-through">
                  ₹{product.originalPrice.toLocaleString('en-IN')}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
