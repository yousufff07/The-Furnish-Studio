import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Address, PaymentMethod } from '../types';
import SplitText from '../components/common/SplitText';
import { 
  CreditCard, ShieldCheck, Truck, CheckCircle2, Plus, 
  MapPin, AlertCircle, Lock, ArrowLeft 
} from 'lucide-react';

export const Checkout: React.FC = () => {
  const { cart, products, user, cartSubtotal, deliveryFee, cartTotal, placeOrder, navigate, addAddress, showToast } = useApp();

  // Address selection state
  const defaultAddr = user?.addresses.find(a => a.isDefault) || user?.addresses[0];
  const [selectedAddressId, setSelectedAddressId] = useState<string | 'new'>(defaultAddr ? defaultAddr.id : 'new');

  // New Address form state
  const [newAddr, setNewAddr] = useState({
    label: 'Home',
    fullName: user ? user.name : '',
    street: '',
    city: '',
    state: 'Maharashtra',
    pincode: '',
    phone: user ? user.phone : ''
  });
  const [addrErrors, setAddrErrors] = useState<Record<string, string>>({});

  // Payment method state
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('Card');
  const [cardDetails, setCardDetails] = useState({ number: '4532 •••• •••• 8890', name: user ? user.name : '', expiry: '12/28', cvv: '882' });
  const [upiId, setUpiId] = useState('patron@okaxis');
  const [selectedBank, setSelectedBank] = useState('HDFC Bank');
  const [paymentErrors, setPaymentErrors] = useState<Record<string, string>>({});

  if (cart.length === 0) {
    navigate('cart');
    return null;
  }

  const validateAddress = () => {
    if (selectedAddressId !== 'new') return true;

    const errs: Record<string, string> = {};
    if (!newAddr.fullName.trim()) errs.fullName = 'Full name is required';
    if (!newAddr.street.trim()) errs.street = 'Street address is required';
    if (!newAddr.city.trim()) errs.city = 'City is required';
    if (!newAddr.pincode.trim() || newAddr.pincode.length < 5) errs.pincode = 'Valid 6-digit postal code required';
    if (!newAddr.phone.trim() || newAddr.phone.length < 10) errs.phone = 'Valid phone number required';

    setAddrErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const validatePayment = () => {
    const errs: Record<string, string> = {};
    if (paymentMethod === 'Card') {
      if (!cardDetails.number || cardDetails.number.length < 12) errs.cardNumber = 'Valid 16-digit card number required';
      if (!cardDetails.expiry) errs.cardExpiry = 'Valid expiry date required';
      if (!cardDetails.cvv || cardDetails.cvv.length < 3) errs.cardCvv = '3-digit CVV required';
    } else if (paymentMethod === 'UPI') {
      if (!upiId || !upiId.includes('@')) errs.upiId = 'Valid UPI Virtual Payment Address required (e.g. name@okaxis)';
    }
    setPaymentErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateAddress() || !validatePayment()) {
      showToast('Please check highlighted form fields and correct any errors.', 'error', 'Validation Error');
      return;
    }

    let shippingAddr: Address;

    if (selectedAddressId === 'new') {
      shippingAddr = {
        id: `addr-${Date.now()}`,
        label: newAddr.label,
        fullName: newAddr.fullName,
        street: newAddr.street,
        city: newAddr.city,
        state: newAddr.state,
        pincode: newAddr.pincode,
        phone: newAddr.phone,
        isDefault: true
      };
      if (user) {
        addAddress(shippingAddr);
      }
    } else {
      shippingAddr = user!.addresses.find(a => a.id === selectedAddressId)!;
    }

    const createdOrder = placeOrder(paymentMethod, shippingAddr);
    navigate('order-confirmation', { productId: createdOrder.id });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-in fade-in duration-300">
      
      {/* Header */}
      <div className="flex items-center justify-between pb-4 mb-8 border-b border-[#EBD8C6]">
        <div>
          <button onClick={() => navigate('cart')} className="text-xs font-semibold text-[#964627] hover:text-[#1E1A17] flex items-center gap-1.5 uppercase tracking-wider mb-1">
            <ArrowLeft className="w-3.5 h-3.5" /> Return to Cart
          </button>
          <h1 className="font-serif text-3xl font-bold text-[#1E1A17]">Secure White-Glove Checkout</h1>
        </div>
        <div className="flex items-center gap-2 text-xs font-semibold text-[#8D9399]">
          <Lock className="w-4 h-4 text-[#CCA37E]" />
          <span>256-Bit SSL Bank Encryption</span>
        </div>
      </div>

      <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        
        {/* Left Forms (Col 7) */}
        <div className="lg:col-span-7 space-y-10">
          
          {/* 1. Delivery Address Section */}
          <div className="bg-[#F3E5D8]/40 border border-[#EBD8C6] rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="font-serif font-bold text-xl text-[#1E1A17] flex items-center gap-2">
                <span className="w-7 h-7 rounded-full bg-[#1E1A17] text-[#F8ECE1] text-xs flex items-center justify-center font-mono">1</span>
                <SplitText text="Delivery Address" tag="span" />
              </h2>
              {user && user.addresses.length > 0 && (
                <button
                  type="button"
                  onClick={() => setSelectedAddressId('new')}
                  className="text-xs font-semibold text-[#964627] hover:underline flex items-center gap-1"
                >
                  <Plus className="w-3.5 h-3.5" /> Add New Address
                </button>
              )}
            </div>

            {/* Existing Addresses Grid */}
            {user && user.addresses.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {user.addresses.map(addr => (
                  <div
                    key={addr.id}
                    onClick={() => setSelectedAddressId(addr.id)}
                    className={`p-4 rounded-2xl border-2 cursor-pointer transition-all relative ${
                      selectedAddressId === addr.id 
                        ? 'bg-[#F8ECE1] border-[#964627] shadow-md' 
                        : 'bg-[#F8ECE1]/60 border-[#EBD8C6] hover:border-[#CCA37E]'
                    }`}
                  >
                    {selectedAddressId === addr.id && (
                      <CheckCircle2 className="w-5 h-5 text-[#964627] absolute top-3 right-3" />
                    )}
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#8D9399] bg-[#EBD8C6] px-2 py-0.5 rounded">
                      {addr.label}
                    </span>
                    <h4 className="font-serif font-bold text-sm text-[#1E1A17] mt-2">{addr.fullName}</h4>
                    <p className="text-xs text-[#1E1A17]/80 mt-1 leading-relaxed line-clamp-2">{addr.street}</p>
                    <p className="text-xs text-[#8D9399] mt-1">{addr.city}, {addr.state} - {addr.pincode}</p>
                    <p className="text-xs font-mono text-[#1E1A17]/80 mt-2">{addr.phone}</p>
                  </div>
                ))}
              </div>
            )}

            {/* New Address Form */}
            {(selectedAddressId === 'new' || (!user || user.addresses.length === 0)) && (
              <div className="space-y-4 pt-4 border-t border-[#EBD8C6]">
                <h3 className="font-serif font-semibold text-base text-[#1E1A17]">Enter Shipping Details</h3>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-semibold uppercase tracking-wider text-[#8D9399] block mb-1">Full Name *</label>
                    <input
                      type="text"
                      value={newAddr.fullName}
                      onChange={(e) => setNewAddr({ ...newAddr, fullName: e.target.value })}
                      placeholder="e.g. Aria Montgomery"
                      className={`w-full bg-[#F8ECE1] border ${addrErrors.fullName ? 'border-red-500' : 'border-[#EBD8C6]'} rounded-xl p-3 text-sm text-[#1E1A17] focus:outline-none focus:border-[#CCA37E]`}
                    />
                    {addrErrors.fullName && <p className="text-[11px] text-red-600 mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" /> {addrErrors.fullName}</p>}
                  </div>

                  <div>
                    <label className="text-xs font-semibold uppercase tracking-wider text-[#8D9399] block mb-1">Phone Number *</label>
                    <input
                      type="text"
                      value={newAddr.phone}
                      onChange={(e) => setNewAddr({ ...newAddr, phone: e.target.value })}
                      placeholder="e.g. +91 98765 43210"
                      className={`w-full bg-[#F8ECE1] border ${addrErrors.phone ? 'border-red-500' : 'border-[#EBD8C6]'} rounded-xl p-3 text-sm text-[#1E1A17] focus:outline-none focus:border-[#CCA37E]`}
                    />
                    {addrErrors.phone && <p className="text-[11px] text-red-600 mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" /> {addrErrors.phone}</p>}
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold uppercase tracking-wider text-[#8D9399] block mb-1">Street Address & Apartment *</label>
                  <input
                    type="text"
                    value={newAddr.street}
                    onChange={(e) => setNewAddr({ ...newAddr, street: e.target.value })}
                    placeholder="e.g. 402, Palm Grove Heights, Linking Road, Bandra West"
                    className={`w-full bg-[#F8ECE1] border ${addrErrors.street ? 'border-red-500' : 'border-[#EBD8C6]'} rounded-xl p-3 text-sm text-[#1E1A17] focus:outline-none focus:border-[#CCA37E]`}
                  />
                  {addrErrors.street && <p className="text-[11px] text-red-600 mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" /> {addrErrors.street}</p>}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="text-xs font-semibold uppercase tracking-wider text-[#8D9399] block mb-1">City *</label>
                    <input
                      type="text"
                      value={newAddr.city}
                      onChange={(e) => setNewAddr({ ...newAddr, city: e.target.value })}
                      placeholder="e.g. Mumbai"
                      className={`w-full bg-[#F8ECE1] border ${addrErrors.city ? 'border-red-500' : 'border-[#EBD8C6]'} rounded-xl p-3 text-sm text-[#1E1A17] focus:outline-none focus:border-[#CCA37E]`}
                    />
                    {addrErrors.city && <p className="text-[11px] text-red-600 mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" /> {addrErrors.city}</p>}
                  </div>

                  <div>
                    <label className="text-xs font-semibold uppercase tracking-wider text-[#8D9399] block mb-1">State</label>
                    <select
                      value={newAddr.state}
                      onChange={(e) => setNewAddr({ ...newAddr, state: e.target.value })}
                      className="w-full bg-[#F8ECE1] border border-[#EBD8C6] rounded-xl p-3 text-sm text-[#1E1A17] focus:outline-none focus:border-[#CCA37E]"
                    >
                      <option value="Maharashtra">Maharashtra</option>
                      <option value="Delhi NCR">Delhi NCR</option>
                      <option value="Karnataka">Karnataka</option>
                      <option value="Telangana">Telangana</option>
                      <option value="Tamil Nadu">Tamil Nadu</option>
                      <option value="West Bengal">West Bengal</option>
                      <option value="Gujarat">Gujarat</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-semibold uppercase tracking-wider text-[#8D9399] block mb-1">Postal Code *</label>
                    <input
                      type="text"
                      value={newAddr.pincode}
                      onChange={(e) => setNewAddr({ ...newAddr, pincode: e.target.value })}
                      placeholder="e.g. 400050"
                      className={`w-full bg-[#F8ECE1] border ${addrErrors.pincode ? 'border-red-500' : 'border-[#EBD8C6]'} rounded-xl p-3 text-sm text-[#1E1A17] focus:outline-none focus:border-[#CCA37E] font-mono`}
                    />
                    {addrErrors.pincode && <p className="text-[11px] text-red-600 mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" /> {addrErrors.pincode}</p>}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* 2. Payment Method Selector Section */}
          <div className="bg-[#F3E5D8]/40 border border-[#EBD8C6] rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
            <h2 className="font-serif font-bold text-xl text-[#1E1A17] flex items-center gap-2">
              <span className="w-7 h-7 rounded-full bg-[#1E1A17] text-[#F8ECE1] text-xs flex items-center justify-center font-mono">2</span>
              <SplitText text="Payment Gateway (Mocked)" tag="span" />
            </h2>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {(['Card', 'UPI', 'Net Banking', 'Cash on Delivery'] as PaymentMethod[]).map((method) => (
                <button
                  key={method}
                  type="button"
                  onClick={() => { setPaymentMethod(method); setPaymentErrors({}); }}
                  className={`p-4 rounded-2xl border-2 text-left transition-all ${
                    paymentMethod === method 
                      ? 'bg-[#1E1A17] border-[#1E1A17] text-[#F8ECE1] shadow-md' 
                      : 'bg-[#F8ECE1] border-[#EBD8C6] text-[#1E1A17] hover:border-[#CCA37E]'
                  }`}
                >
                  <CreditCard className={`w-5 h-5 mb-2 ${paymentMethod === method ? 'text-[#CCA37E]' : 'text-[#8D9399]'}`} />
                  <span className="font-serif font-bold text-xs sm:text-sm block">{method}</span>
                </button>
              ))}
            </div>

            {/* Conditional Sub-inputs for Payment Method */}
            <div className="bg-[#F8ECE1] p-6 rounded-2xl border border-[#EBD8C6] space-y-4">
              {paymentMethod === 'Card' && (
                <div className="space-y-4 animate-in fade-in duration-200">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#8D9399]">Credit / Debit Card Details</span>
                    <span className="text-[10px] bg-[#EBD8C6] px-2 py-0.5 rounded text-[#964627] font-mono">Mock Mode: Auto-filled</span>
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-[#8D9399] block mb-1">Card Number *</label>
                    <input
                      type="text"
                      value={cardDetails.number}
                      onChange={(e) => setCardDetails({ ...cardDetails, number: e.target.value })}
                      placeholder="4532 •••• •••• 8890"
                      className="w-full bg-[#F3E5D8] border border-[#EBD8C6] rounded-xl p-3 text-sm font-mono text-[#1E1A17]"
                    />
                    {paymentErrors.cardNumber && <p className="text-[11px] text-red-600 mt-1">{paymentErrors.cardNumber}</p>}
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-semibold text-[#8D9399] block mb-1">Expiry Date *</label>
                      <input
                        type="text"
                        value={cardDetails.expiry}
                        onChange={(e) => setCardDetails({ ...cardDetails, expiry: e.target.value })}
                        placeholder="MM/YY"
                        className="w-full bg-[#F3E5D8] border border-[#EBD8C6] rounded-xl p-3 text-sm font-mono text-[#1E1A17]"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-[#8D9399] block mb-1">CVV / CVC *</label>
                      <input
                        type="password"
                        value={cardDetails.cvv}
                        onChange={(e) => setCardDetails({ ...cardDetails, cvv: e.target.value })}
                        placeholder="•••"
                        maxLength={4}
                        className="w-full bg-[#F3E5D8] border border-[#EBD8C6] rounded-xl p-3 text-sm font-mono text-[#1E1A17]"
                      />
                    </div>
                  </div>
                </div>
              )}

              {paymentMethod === 'UPI' && (
                <div className="space-y-4 animate-in fade-in duration-200">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#8D9399]">Instant UPI Payment</span>
                    <span className="text-[10px] bg-[#EBD8C6] px-2 py-0.5 rounded text-[#964627] font-mono">GPay / PhonePe / Paytm</span>
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-[#8D9399] block mb-1">UPI Virtual Payment Address (VPA) *</label>
                    <input
                      type="text"
                      value={upiId}
                      onChange={(e) => setUpiId(e.target.value)}
                      placeholder="e.g. yourname@okaxis"
                      className="w-full bg-[#F3E5D8] border border-[#EBD8C6] rounded-xl p-3 text-sm font-mono text-[#1E1A17]"
                    />
                    {paymentErrors.upiId && <p className="text-[11px] text-red-600 mt-1">{paymentErrors.upiId}</p>}
                  </div>
                  <p className="text-xs text-[#8D9399]">An automated payment authorization request will be dispatched to your UPI app.</p>
                </div>
              )}

              {paymentMethod === 'Net Banking' && (
                <div className="space-y-4 animate-in fade-in duration-200">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#8D9399] block">Select Financial Institution</span>
                  <select
                    value={selectedBank}
                    onChange={(e) => setSelectedBank(e.target.value)}
                    className="w-full bg-[#F3E5D8] border border-[#EBD8C6] rounded-xl p-3 text-sm font-semibold text-[#1E1A17]"
                  >
                    <option value="HDFC Bank">HDFC Bank (Instant Transfer)</option>
                    <option value="ICICI Bank">ICICI Bank</option>
                    <option value="State Bank of India">State Bank of India (SBI)</option>
                    <option value="Axis Bank">Axis Bank</option>
                    <option value="Kotak Mahindra Bank">Kotak Mahindra Bank</option>
                  </select>
                </div>
              )}

              {paymentMethod === 'Cash on Delivery' && (
                <div className="space-y-2 animate-in fade-in duration-200">
                  <div className="flex items-center gap-2 text-[#964627] font-semibold text-sm">
                    <Truck className="w-5 h-5" />
                    <span>White-Glove Cash on Delivery Available</span>
                  </div>
                  <p className="text-xs text-[#1E1A17]/80 leading-relaxed">
                    You may settle the invoice via Cash, Card, or UPI directly with our logistics team upon successful room-of-choice setup and inspection.
                  </p>
                </div>
              )}
            </div>
          </div>

        </div>

        {/* Right Order Summary & Submit (Col 5) */}
        <div className="lg:col-span-5">
          <div className="bg-[#F3E5D8]/80 rounded-3xl p-6 sm:p-8 border border-[#EBD8C6] shadow-xl sticky top-28 space-y-6">
            <SplitText text="Order Verification" tag="h2" className="font-serif font-bold text-xl text-[#1E1A17] pb-4 border-b border-[#EBD8C6]" />

            {/* Mini Line Items */}
            <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
              {cart.map(item => {
                const prod = products.find(p => p.id === item.productId);
                if (!prod) return null;
                return (
                  <div key={`${item.productId}-${item.selectedColor}`} className="flex items-center justify-between gap-3 text-xs">
                    <div className="flex items-center gap-2 min-w-0">
                      <img src={prod.imageUrl} alt="" className="w-10 h-10 rounded-lg object-cover flex-shrink-0" />
                      <div className="truncate">
                        <p className="font-serif font-bold text-[#1E1A17] truncate">{prod.name}</p>
                        <p className="text-[10px] text-[#8D9399]">Qty: {item.quantity}</p>
                      </div>
                    </div>
                    <span className="font-mono font-semibold text-[#1E1A17] flex-shrink-0">
                      ₹{(prod.price * item.quantity).toLocaleString('en-IN')}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Totals */}
            <div className="space-y-3 pt-4 border-t border-[#EBD8C6] text-sm font-sans">
              <div className="flex justify-between text-[#1E1A17]/80">
                <span>Subtotal</span>
                <span className="font-mono">₹{cartSubtotal.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between text-[#1E1A17]/80">
                <span>White-Glove Delivery</span>
                <span className="font-mono">
                  {deliveryFee === 0 ? <span className="text-[#964627] font-bold">FREE</span> : `₹${deliveryFee.toLocaleString('en-IN')}`}
                </span>
              </div>
              <div className="pt-4 border-t border-[#EBD8C6] flex justify-between items-baseline">
                <span className="font-serif font-bold text-lg text-[#1E1A17]">Grand Total</span>
                <span className="font-serif font-bold text-2xl text-[#1E1A17]">
                  ₹{cartTotal.toLocaleString('en-IN')}
                </span>
              </div>
            </div>

            {/* Place Order Button */}
            <button
              type="submit"
              className="w-full py-4 bg-[#CCA37E] hover:bg-[#AD7C52] text-[#1E1A17] font-serif font-bold text-base rounded-xl shadow-lg transition-all flex items-center justify-center gap-2"
            >
              <ShieldCheck className="w-5 h-5" />
              <span>Authorize & Place Order</span>
            </button>

            <p className="text-[11px] text-[#8D9399] text-center leading-relaxed">
              By placing your order, you agree to our 30-Day In-Home Trial terms and White-Glove delivery guidelines.
            </p>

          </div>
        </div>

      </form>

    </div>
  );
};
