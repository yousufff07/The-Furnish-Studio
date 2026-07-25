import React from 'react';
import { useApp } from '../context/AppContext';
import { ProductCard } from '../components/common/ProductCard';
import { Heart, ShoppingBag, Trash2, ArrowRight } from 'lucide-react';

export const Wishlist: React.FC = () => {
  const { wishlist, products, moveToCart, toggleWishlist, navigate } = useApp();

  const wishlistedProducts = products.filter(p => wishlist.includes(p.id));

  if (wishlist.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center animate-in fade-in duration-300">
        <div className="w-20 h-20 bg-[#F3E5D8] rounded-full flex items-center justify-center mx-auto mb-6 border border-[#CCA37E]/40">
          <Heart className="w-10 h-10 text-[#CCA37E]" />
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#1E1A17] mb-3">Your Studio Wishlist is Empty</h1>
        <p className="text-sm text-[#8D9399] max-w-md mx-auto mb-8 font-sans">
          Save your favorite architectural pieces while you plan your interior spaces. They will remain securely bookmarked here.
        </p>
        <button
          onClick={() => navigate('shop', { category: 'All' })}
          className="px-8 py-4 bg-[#1E1A17] hover:bg-[#CCA37E] text-[#F8ECE1] hover:text-[#1E1A17] font-serif font-bold rounded-xl shadow-lg transition-all inline-flex items-center gap-2"
        >
          <span>Explore The Catalog</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 animate-in fade-in duration-300">
      
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 mb-8 border-b border-[#EBD8C6]">
        <div>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#1E1A17]">Saved Wishlist</h1>
          <p className="text-xs text-[#8D9399] mt-1">
            {wishlistedProducts.length} curated pieces bookmarked in your private folder
          </p>
        </div>
        
        <button
          onClick={() => {
            wishlistedProducts.forEach(p => moveToCart(p.id, p.color));
          }}
          className="px-6 py-3 bg-[#CCA37E] hover:bg-[#AD7C52] text-[#1E1A17] font-serif font-bold text-sm rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
        >
          <ShoppingBag className="w-4 h-4" />
          <span>Move All to Studio Cart</span>
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {wishlistedProducts.map(prod => (
          <div key={prod.id} className="relative group">
            <ProductCard product={prod} />
            <div className="mt-2 flex items-center justify-between gap-2 px-1">
              <button
                onClick={() => moveToCart(prod.id, prod.color)}
                className="flex-1 py-2 bg-[#1E1A17] hover:bg-[#CCA37E] text-[#F8ECE1] hover:text-[#1E1A17] text-xs font-semibold rounded-lg transition-colors flex items-center justify-center gap-1.5 shadow-sm"
              >
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>Move to Cart</span>
              </button>
              <button
                onClick={() => toggleWishlist(prod.id)}
                className="p-2 text-[#8D9399] hover:text-red-600 transition-colors rounded-lg bg-[#F3E5D8]/60 hover:bg-red-50"
                title="Remove from wishlist"
                aria-label="Remove from wishlist"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};
