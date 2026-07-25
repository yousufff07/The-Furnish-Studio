import React from 'react';
import { useApp } from '../context/AppContext';
import { CheckCircle2, Package, ArrowRight, Truck, ShieldCheck, MapPin, Calendar } from 'lucide-react';

export const OrderConfirmation: React.FC = () => {
  const { orders, products, selectedProductId, navigate } = useApp();

  const order = orders.find(o => o.id === selectedProductId) || orders[0];

  if (!order) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center">
        <h1 className="font-serif text-3xl font-bold text-[#1E1A17] mb-4">No Order Selected</h1>
        <button onClick={() => navigate('home')} className="px-6 py-3 bg-[#1E1A17] text-[#F8ECE1] rounded-xl font-semibold">
          Return Home
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 animate-in fade-in duration-500">
      
      {/* Banner */}
      <div className="bg-gradient-to-br from-[#F3E5D8] to-[#EBD8C6] rounded-3xl p-8 sm:p-12 text-center border border-[#CCA37E] shadow-xl relative overflow-hidden mb-10">
        <div className="w-16 h-16 bg-[#964627] text-[#F8ECE1] rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
          <CheckCircle2 className="w-8 h-8" />
        </div>
        
        <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#964627] block mb-1">
          White-Glove Dispatch Confirmed
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#1E1A17] mb-3">
          Thank you for your order!
        </h1>
        <p className="text-sm text-[#1E1A17]/80 font-sans max-w-md mx-auto mb-6">
          Your order <span className="font-mono font-bold text-[#1E1A17]">#{order.orderNumber}</span> has been received by our architectural warehouse and is being scheduled for inspection.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={() => navigate('order-history')}
            className="w-full sm:w-auto px-6 py-3 bg-[#1E1A17] hover:bg-[#964627] text-[#F8ECE1] font-serif font-bold text-sm rounded-xl transition-colors shadow-md flex items-center justify-center gap-2"
          >
            <Package className="w-4 h-4" />
            <span>Track Order Status</span>
          </button>
          <button
            onClick={() => navigate('shop', { category: 'All' })}
            className="w-full sm:w-auto px-6 py-3 bg-[#F8ECE1] hover:bg-[#CCA37E] text-[#1E1A17] font-serif font-semibold text-sm rounded-xl transition-colors border border-[#CCA37E] flex items-center justify-center gap-2"
          >
            <span>Continue Exploring</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Order Details Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
        
        {/* Shipping & Delivery Box */}
        <div className="bg-[#F3E5D8]/50 p-6 rounded-2xl border border-[#EBD8C6] space-y-4">
          <h3 className="font-serif font-bold text-lg text-[#1E1A17] flex items-center gap-2 pb-3 border-b border-[#EBD8C6]">
            <Truck className="w-5 h-5 text-[#964627]" />
            <span>Logistics & Delivery</span>
          </h3>
          
          <div className="space-y-3 text-sm">
            <div>
              <span className="text-xs text-[#8D9399] uppercase font-semibold block">Scheduled Recipient</span>
              <p className="font-semibold text-[#1E1A17]">{order.shippingAddress.fullName}</p>
              <p className="text-xs text-[#1E1A17]/80">{order.shippingAddress.street}</p>
              <p className="text-xs text-[#8D9399]">{order.shippingAddress.city}, {order.shippingAddress.state} - {order.shippingAddress.pincode}</p>
              <p className="text-xs font-mono text-[#1E1A17]/80 mt-1">{order.shippingAddress.phone}</p>
            </div>

            <div className="pt-2 border-t border-[#EBD8C6]">
              <span className="text-xs text-[#8D9399] uppercase font-semibold block">Estimated Room-of-Choice Delivery</span>
              <p className="font-serif font-bold text-base text-[#964627] flex items-center gap-1.5 mt-0.5">
                <Calendar className="w-4 h-4" />
                <span>{order.estimatedDelivery || 'Within 5-7 Business Days'}</span>
              </p>
            </div>
          </div>
        </div>

        {/* Payment & Invoice Box */}
        <div className="bg-[#F3E5D8]/50 p-6 rounded-2xl border border-[#EBD8C6] space-y-4">
          <h3 className="font-serif font-bold text-lg text-[#1E1A17] flex items-center gap-2 pb-3 border-b border-[#EBD8C6]">
            <ShieldCheck className="w-5 h-5 text-[#964627]" />
            <span>Payment Summary</span>
          </h3>

          <div className="space-y-2.5 text-sm">
            <div className="flex justify-between">
              <span className="text-[#8D9399]">Payment Method</span>
              <span className="font-semibold text-[#1E1A17]">{order.paymentMethod}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#8D9399]">Payment Status</span>
              <span className="font-semibold text-green-700 bg-green-100 px-2 py-0.5 rounded text-xs">{order.paymentStatus}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#8D9399]">Subtotal</span>
              <span className="font-mono">₹{order.subtotal.toLocaleString('en-IN')}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#8D9399]">White-Glove Freight</span>
              <span className="font-mono">
                {order.deliveryFee === 0 ? <span className="text-[#964627] font-bold">FREE</span> : `₹${order.deliveryFee.toLocaleString('en-IN')}`}
              </span>
            </div>
            <div className="pt-3 border-t border-[#EBD8C6] flex justify-between items-baseline font-serif font-bold text-lg text-[#1E1A17]">
              <span>Total Settled</span>
              <span className="text-xl">₹{order.totalPrice.toLocaleString('en-IN')}</span>
            </div>
          </div>
        </div>

      </div>

      {/* Purchased Items List */}
      <div className="bg-[#F3E5D8]/40 p-6 sm:p-8 rounded-3xl border border-[#EBD8C6] space-y-4">
        <h3 className="font-serif font-bold text-xl text-[#1E1A17] pb-4 border-b border-[#EBD8C6]">
          Purchased Catalog Items
        </h3>

        <div className="space-y-4">
          {order.items.map((item, idx) => {
            const prod = products.find(p => p.id === item.productId);
            return (
              <div key={idx} className="flex items-center justify-between gap-4 py-3 border-b border-[#EBD8C6]/60 last:border-0">
                <div className="flex items-center gap-4 min-w-0">
                  {prod && (
                    <img src={prod.imageUrl} alt="" className="w-14 h-14 rounded-xl object-cover flex-shrink-0 shadow-sm" />
                  )}
                  <div className="truncate">
                    <h4 className="font-serif font-bold text-base text-[#1E1A17] truncate">
                      {prod ? prod.name : `Catalog Item (${item.productId})`}
                    </h4>
                    <p className="text-xs text-[#8D9399] font-sans">
                      Qty: {item.quantity} &middot; Tone: <span className="capitalize font-semibold text-[#1E1A17]">{item.selectedColor}</span>
                    </p>
                  </div>
                </div>
                <span className="font-mono font-bold text-base text-[#1E1A17] flex-shrink-0">
                  ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                </span>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
};
