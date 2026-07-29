import React from 'react';
import { useApp } from '../context/AppContext';
import { Package, Truck, Calendar, XCircle, RefreshCw, ArrowRight, CheckCircle2, AlertCircle } from 'lucide-react';

export const OrderHistory: React.FC = () => {
  const { orders, products, user, cancelOrder, returnOrder, navigate } = useApp();

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Delivered':
        return <span className="bg-green-100 text-green-800 text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1"><CheckCircle2 className="w-3.5 h-3.5" /> Delivered</span>;
      case 'Processing':
        return <span className="bg-amber-100 text-amber-800 text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1"><AlertCircle className="w-3.5 h-3.5" /> Processing</span>;
      case 'Out for Delivery':
      case 'Shipped':
        return <span className="bg-blue-100 text-blue-800 text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1"><Truck className="w-3.5 h-3.5" /> {status}</span>;
      case 'Cancelled':
        return <span className="bg-red-100 text-red-800 text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1"><XCircle className="w-3.5 h-3.5" /> Cancelled</span>;
      case 'Returned':
        return <span className="bg-purple-100 text-purple-800 text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1"><RefreshCw className="w-3.5 h-3.5" /> Returned</span>;
      default:
        return <span className="bg-gray-100 text-gray-800 text-xs font-bold px-3 py-1 rounded-full">{status}</span>;
    }
  };

  if (orders.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center animate-in fade-in duration-300">
        <div className="w-20 h-20 bg-[#F3E5D8] rounded-full flex items-center justify-center mx-auto mb-6 border border-[#CCA37E]/40">
          <Package className="w-10 h-10 text-[#CCA37E]" />
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#1E1A17] mb-3">No Past Orders</h1>
        <p className="text-sm text-[#8D9399] max-w-md mx-auto mb-8 font-sans">
          Your architectural order log is currently empty. Once you place an order, you can track its shipment and schedule white-glove setup here.
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
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#1E1A17]">Order History & Logistics</h1>
          <p className="text-xs text-[#8D9399] mt-1">
            Tracking white-glove dispatch and warranty logs for {user ? user.name : 'your studio account'}
          </p>
        </div>
        <span className="text-xs font-mono bg-[#EBD8C6] text-[#964627] font-bold px-3 py-1.5 rounded-lg">
          {orders.length} Total Orders
        </span>
      </div>

      <div className="space-y-6">
        {orders.map((ord) => (
          <div key={ord.id} className="bg-[#F3E5D8]/50 hover:bg-[#F3E5D8] border border-[#EBD8C6] rounded-3xl p-6 sm:p-8 shadow-sm transition-all space-y-6">
            
            {/* Top Row: Order ID, Date, Status */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#EBD8C6]">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#8D9399] block">Order Identifier</span>
                <h3 className="font-serif font-bold text-lg text-[#1E1A17] flex items-center gap-2">
                  <span>#{ord.orderNumber}</span>
                  <span className="text-xs text-[#8D9399] font-sans font-normal">(&middot; {ord.createdAt})</span>
                </h3>
              </div>
              
              <div className="flex items-center gap-4">
                {getStatusBadge(ord.orderStatus)}
                <span className="font-serif font-bold text-xl text-[#1E1A17]">
                  ₹{ord.totalPrice.toLocaleString('en-IN')}
                </span>
              </div>
            </div>

            {/* Items Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {ord.items.map((item, idx) => {
                const prod = products.find(p => p.id === item.productId);
                return (
                  <div key={idx} className="flex items-center gap-3 bg-[#F8ECE1]/80 p-3 rounded-2xl border border-[#EBD8C6]">
                    {prod ? (
                      <img src={prod.imageUrl} alt="" className="w-14 h-14 rounded-xl object-cover flex-shrink-0" />
                    ) : (
                      <div className="w-14 h-14 bg-[#EBD8C6] rounded-xl flex items-center justify-center"><Package className="w-6 h-6 text-[#8D9399]" /></div>
                    )}
                    <div className="min-w-0 flex-1">
                      <h4 className="font-serif font-bold text-sm text-[#1E1A17] truncate">
                        {prod ? prod.name : `Piece (${item.productId})`}
                      </h4>
                      <p className="text-xs text-[#8D9399] font-sans">
                        Qty: {item.quantity}
                      </p>
                      <p className="text-xs font-mono font-semibold text-[#964627] mt-0.5">
                        ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Bottom Logistics & Action Row */}
            <div className="pt-4 border-t border-[#EBD8C6] flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs">
              <div className="text-[#1E1A17]/80">
                <p className="font-semibold text-[#1E1A17]">Shipping To: <span className="font-normal">{ord.shippingAddress.fullName}, {ord.shippingAddress.city}</span></p>
                <p className="text-[#8D9399] mt-0.5 flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Estimated Arrival: <strong className="text-[#1E1A17]">{ord.estimatedDelivery || 'Within 5-7 Days'}</strong></span>
                </p>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => navigate('order-confirmation', { productId: ord.id })}
                  className="px-4 py-2 bg-[#1E1A17] hover:bg-[#CCA37E] text-[#F8ECE1] hover:text-[#1E1A17] font-semibold rounded-xl transition-colors shadow-sm"
                >
                  View Full Receipt
                </button>

                {(ord.orderStatus === 'Processing' || ord.orderStatus === 'Confirmed') && (
                  <button
                    onClick={() => {
                      if (window.confirm(`Cancel order #${ord.orderNumber}?`)) cancelOrder(ord.id);
                    }}
                    className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-xl transition-colors shadow-sm flex items-center gap-1"
                  >
                    <XCircle className="w-3.5 h-3.5" /> Cancel Order
                  </button>
                )}

                {ord.orderStatus === 'Delivered' && (
                  <button
                    onClick={() => {
                      if (window.confirm(`Initiate 30-Day in-home return trial for #${ord.orderNumber}?`)) returnOrder(ord.id);
                    }}
                    className="px-4 py-2 bg-[#964627] hover:bg-[#1E1A17] text-[#F8ECE1] font-semibold rounded-xl transition-colors shadow-sm flex items-center gap-1"
                  >
                    <RefreshCw className="w-3.5 h-3.5" /> Request Return
                  </button>
                )}
              </div>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
};
