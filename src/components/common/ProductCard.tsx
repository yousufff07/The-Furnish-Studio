import React, { useState } from 'react';
import { Product, ToneColor } from '../../types';
import { useApp } from '../../context/AppContext';
import { Heart, ShoppingBag, Eye } from 'lucide-react';
import { Rating } from './Rating';
import { getToneConfig, ToneImageOverlay } from '../../utils/toneStyles';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { navigate, addToCart, toggleWishlist, isInWishlist } = useApp();
  const [activeColor, setActiveColor] = useState<ToneColor>(product.color || 'rust');
  const [isHovered, setIsHovered] = useState(false);

  const isWishlisted = isInWishlist(product.id);
  const toneConfig = getToneConfig(activeColor);

  const handleCardClick = () => {
    navigate('product-details', { productId: product.id });
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product.id, 1, activeColor);
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
      className="group bg-white/80 hover:bg-white rounded-3xl p-5 transition-all duration-300 shadow-sm hover:shadow-xl hover:-translate-y-1.5 cursor-pointer flex flex-col border border-[#EBD8C6]/60"
      style={{ borderColor: isHovered ? toneConfig.hex : undefined }}
    >
      {/* Image Container */}
      <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-[#EBD8C6]/50 mb-4">
        <img 
          src={product.imageUrl} 
          alt={product.name} 
          style={{ filter: toneConfig.imageFilter }}
          className="w-full h-full object-cover transform group-hover:scale-105 transition-all duration-700 ease-out relative z-0"
        />
        <ToneImageOverlay color={activeColor} />
        
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
          <span 
            className="text-[10px] uppercase font-semibold tracking-wider px-2.5 py-0.5 rounded-full shadow-sm backdrop-blur-md bg-white/90 border border-white/40 self-start"
            style={{ color: toneConfig.hex }}
          >
            {toneConfig.name}
          </span>
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
            style={{ backgroundColor: isHovered ? toneConfig.hex : '#1E1A17' }}
            className="flex-1 text-[#F8ECE1] text-xs font-semibold py-2.5 px-4 rounded-full shadow-lg flex items-center justify-center gap-1.5 transition-all duration-300 hover:brightness-110"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>Add to Cart ({activeColor})</span>
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

        <h3 
          className="font-serif font-semibold text-base text-[#1E1A17] transition-colors line-clamp-1 mb-2"
          style={{ color: isHovered ? toneConfig.hex : undefined }}
        >
          {product.name}
        </h3>

        <div className="flex flex-wrap items-center gap-1.5 text-[10px] text-[#8D9399] mb-3">
          <span className="bg-[#F3E5D8]/70 px-2 py-0.5 rounded-md border border-[#EBD8C6]/80 text-[#1E1A17]/90 font-medium flex items-center gap-1">
            Tone: <strong className="font-semibold capitalize" style={{ color: toneConfig.hex }}>{toneConfig.name}</strong>
          </span>
        </div>

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

          {/* Color Swatch Dots */}
          <div className="flex items-center gap-1.5" onClick={(e) => e.stopPropagation()}>
            {(product.availableColors || ['rust', 'slate', 'greige']).map((col) => {
              const swatchConfig = getToneConfig(col);
              const isSelected = activeColor === col;
              return (
                <button
                  key={col}
                  onClick={(e) => { e.stopPropagation(); setActiveColor(col); }}
                  className={`w-4 h-4 rounded-full transition-all duration-300 relative ${
                    isSelected ? 'ring-2 ring-offset-2 ring-[#1E1A17] scale-125 shadow-sm' : 'opacity-70 hover:opacity-100 hover:scale-110'
                  }`}
                  style={{ backgroundColor: swatchConfig.hex }}
                  title={`${swatchConfig.name} Tone`}
                  aria-label={`Select tone ${col}`}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
