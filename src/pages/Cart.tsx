import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import SplitText from '../components/common/SplitText';
import { ShoppingBag, Trash2, Plus, Minus, ArrowRight, ShieldCheck, Truck, Tag } from 'lucide-react';

export const Cart: React.FC = () => {
  const { cart, products, updateCartQuantity, removeFromCart, clearCart, navigate, cartSubtotal, deliveryFee, cartTotal, showToast } = useApp();
  
  const [promoCode, setPromoCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [promoApplied, setPromoApplied] = useState(false);

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (promoCode.trim().toUpperCase() === 'STUDIO10' || promoCode.trim().toUpperCase() === 'WELCOME10') {
      const disc = Math.round(cartSubtotal * 0.1);
      setDiscount(disc);
      setPromoApplied(true);
      showToast(`Voucher "${promoCode.toUpperCase()}" applied! You saved ₹${disc.toLocaleString('en-IN')}`, 'success', 'Voucher Applied');
    } else if (promoCode.trim().toUpperCase() === 'FREESHIP') {
      setDiscount(deliveryFee);
      setPromoApplied(true);
      showToast('Free White-Glove delivery voucher applied!', 'success', 'Voucher Applied');
    } else {
      showToast('Invalid voucher code. Try "STUDIO10" for 10% off.', 'warning');
    }
  };

  const finalTotal = Math.max(0, cartTotal - discount);

  if (cart.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center animate-in fade-in duration-300">
        <div className="w-20 h-20 bg-[#F3E5D8] rounded-full flex items-center justify-center mx-auto mb-6 border border-[#CCA37E]/40">
          <ShoppingBag className="w-10 h-10 text-[#CCA37E]" />
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#1E1A17] mb-3">Your Studio Cart is Empty</h1>
        <p className="text-sm text-[#8D9399] max-w-md mx-auto mb-8 font-sans">
          You haven't selected any architectural pieces yet. Explore our curated collections of living, dining, and bedroom furniture.
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
      
      <div className="flex items-center justify-between pb-6 mb-8 border-b border-[#EBD8C6]">
        <div>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#1E1A17]">Your Studio Cart</h1>
          <p className="text-xs text-[#8D9399] mt-1">
            {cart.reduce((a, b) => a + b.quantity, 0)} pieces selected for White-Glove Dispatch
          </p>
        </div>
        <button
          onClick={() => {
            if (window.confirm('Clear all items from your studio cart?')) clearCart();
          }}
          className="text-xs font-semibold text-red-600 hover:text-red-700 underline"
        >
          Clear Cart
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        
        {/* Left Line Items (Col 8) */}
        <div className="lg:col-span-8 space-y-4">
          {cart.map((item) => {
            const prod = products.find(p => p.id === item.productId);
            if (!prod) return null;

            return (
              <div 
                key={`${item.productId}-${item.selectedColor}`}
                className="bg-[#F3E5D8]/60 hover:bg-[#F3E5D8] rounded-2xl p-4 sm:p-6 border border-[#EBD8C6] transition-all flex flex-col sm:flex-row items-center gap-6"
              >
                {/* Product Thumbnail */}
                <div 
                  onClick={() => navigate('product-details', { productId: prod.id })}
                  className="relative w-full sm:w-28 h-28 rounded-xl overflow-hidden cursor-pointer shadow-md flex-shrink-0"
                >
                  <img
                    src={prod.imageUrl}
                    alt={prod.name}
                    className="w-full h-full object-cover relative z-0"
                  />
                </div>

                {/* Details */}
                <div className="flex-1 min-w-0 w-full text-center sm:text-left">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#8D9399] block mb-0.5">
                    {prod.category}
                  </span>
                  <h3 
                    onClick={() => navigate('product-details', { productId: prod.id })}
                    className="font-serif font-bold text-lg text-[#1E1A17] hover:text-[#964627] cursor-pointer transition-colors truncate mb-1"
                  >
                    {prod.name}
                  </h3>
                </div>

                {/* Stepper & Price */}
                <div className="flex sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto gap-4 pt-4 sm:pt-0 border-t sm:border-t-0 border-[#EBD8C6]">
                  <div className="flex items-center gap-3">
                    <div className="inline-flex items-center border border-[#CCA37E] rounded-lg bg-[#F8ECE1]">
                      <button
                        onClick={() => updateCartQuantity(item.productId, item.selectedColor, item.quantity - 1)}
                        className="p-1.5 text-[#1E1A17] hover:text-[#964627]"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="w-8 text-center font-mono font-bold text-sm">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateCartQuantity(item.productId, item.selectedColor, item.quantity + 1)}
                        className="p-1.5 text-[#1E1A17] hover:text-[#964627]"
                        aria-label="Increase quantity"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <button
                      onClick={() => removeFromCart(item.productId, item.selectedColor)}
                      className="p-2 text-[#8D9399] hover:text-red-600 transition-colors rounded-lg hover:bg-red-50"
                      title="Remove item"
                      aria-label="Remove item"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="text-right">
                    <p className="font-serif font-bold text-lg text-[#1E1A17]">
                      ₹{(prod.price * item.quantity).toLocaleString('en-IN')}
                    </p>
                    {item.quantity > 1 && (
                      <p className="text-[10px] text-[#8D9399] font-mono">
                        ₹{prod.price.toLocaleString('en-IN')} each
                      </p>
                    )}
                  </div>
                </div>

              </div>
            );
          })}
        </div>

        {/* Right Order Summary Box (Col 4) */}
        <div className="lg:col-span-4">
          <div className="bg-[#F3E5D8]/80 rounded-3xl p-6 sm:p-8 border border-[#EBD8C6] shadow-xl sticky top-28 space-y-6">
            <SplitText text="Order Summary" tag="h2" className="font-serif font-bold text-xl text-[#1E1A17] pb-4 border-b border-[#EBD8C6]" />

            {/* Voucher Code Form */}
            <form onSubmit={handleApplyPromo} className="space-y-2">
              <label className="text-xs font-semibold uppercase tracking-wider text-[#8D9399] flex items-center gap-1">
                <Tag className="w-3.5 h-3.5 text-[#964627]" />
                <span>Patron Voucher Code</span>
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="e.g. STUDIO10"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  disabled={promoApplied}
                  className="flex-1 bg-[#F8ECE1] border border-[#CCA37E] rounded-xl px-3 py-2 text-sm uppercase font-mono text-[#1E1A17] placeholder-[#8D9399] focus:outline-none focus:ring-1 focus:ring-[#964627]"
                />
                <button
                  type="submit"
                  disabled={promoApplied || !promoCode.trim()}
                  className="px-4 py-2 bg-[#1E1A17] hover:bg-[#964627] text-[#F8ECE1] font-semibold text-xs rounded-xl transition-colors disabled:opacity-40"
                >
                  {promoApplied ? 'Applied' : 'Apply'}
                </button>
              </div>
              {promoApplied && (
                <p className="text-xs text-[#964627] font-semibold flex items-center justify-between">
                  <span>Voucher Active</span>
                  <button type="button" onClick={() => { setPromoApplied(false); setDiscount(0); setPromoCode(''); }} className="underline">Remove</button>
                </p>
              )}
            </form>

            {/* Cost Breakdown */}
            <div className="space-y-3 pt-4 border-t border-[#EBD8C6] text-sm font-sans">
              <div className="flex justify-between text-[#1E1A17]/80">
                <span>Subtotal ({cart.reduce((a, b) => a + b.quantity, 0)} items)</span>
                <span className="font-semibold font-mono">₹{cartSubtotal.toLocaleString('en-IN')}</span>
              </div>

              <div className="flex justify-between text-[#1E1A17]/80">
                <span className="flex items-center gap-1">
                  <span>White-Glove Delivery</span>
                </span>
                <span className="font-semibold font-mono">
                  {deliveryFee === 0 ? (
                    <span className="text-[#964627] font-bold uppercase text-xs">FREE</span>
                  ) : (
                    `₹${deliveryFee.toLocaleString('en-IN')}`
                  )}
                </span>
              </div>

              {discount > 0 && (
                <div className="flex justify-between text-[#964627] font-semibold">
                  <span>Voucher Discount</span>
                  <span className="font-mono">-₹{discount.toLocaleString('en-IN')}</span>
                </div>
              )}

              <div className="pt-4 border-t border-[#EBD8C6] flex justify-between items-baseline">
                <span className="font-serif font-bold text-lg text-[#1E1A17]">Estimated Total</span>
                <span className="font-serif font-bold text-2xl text-[#1E1A17]">
                  ₹{finalTotal.toLocaleString('en-IN')}
                </span>
              </div>
              <p className="text-[11px] text-[#8D9399] text-right">Includes all applicable GST & import duties</p>
            </div>

            {/* Checkout CTA */}
            <button
              onClick={() => navigate('checkout')}
              className="w-full py-4 bg-[#CCA37E] hover:bg-[#AD7C52] text-[#1E1A17] font-serif font-bold text-base rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 group"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
            </button>

            {/* Mini Trust Highlights */}
            <div className="space-y-2 pt-2 border-t border-[#EBD8C6]/60 text-xs text-[#8D9399]">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#964627] flex-shrink-0" />
                <span>256-Bit SSL Encrypted & Secure Checkout</span>
              </div>
              <div className="flex items-center gap-2">
                <Truck className="w-4 h-4 text-[#964627] flex-shrink-0" />
                <span>Scheduled 2-hour White-Glove delivery window</span>
              </div>
            </div>

          </div>
        </div>

      </div>

    </div>
  );
};
