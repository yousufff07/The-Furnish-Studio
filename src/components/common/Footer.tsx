import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Instagram, Facebook, Twitter, Mail, ArrowRight, ShieldCheck, 
  Truck, RefreshCw, Award, CreditCard, Lock 
} from 'lucide-react';

export const Footer: React.FC = () => {
  const { navigate, showToast, categories } = useApp();
  const [email, setEmail] = useState('');

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && email.includes('@')) {
      showToast('Welcome to our inner circle! A world of editorial design awaits in your inbox.', 'success', 'Subscribed to Journal');
      setEmail('');
    } else {
      showToast('Please enter a valid email address.', 'warning');
    }
  };

  return (
    <footer className="bg-[#5E402B] text-[#E2CEBD] transition-all">
      {/* Accent Band / Trust Strip */}
      <div className="bg-[#AD7C52] text-[#F8ECE1] py-8 px-4 sm:px-6 lg:px-8 border-b border-[#5E402B]/40">
        <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-6 text-center lg:text-left">
          <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3">
            <div className="p-3 bg-[#5E402B]/30 rounded-full">
              <Truck className="w-6 h-6 text-[#F8ECE1]" />
            </div>
            <div>
              <h4 className="font-serif font-bold text-base text-[#F8ECE1]">White-Glove Delivery</h4>
              <p className="text-xs text-[#F8ECE1]/80">Free room-of-choice setup over ₹50k</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3">
            <div className="p-3 bg-[#5E402B]/30 rounded-full">
              <ShieldCheck className="w-6 h-6 text-[#F8ECE1]" />
            </div>
            <div>
              <h4 className="font-serif font-bold text-base text-[#F8ECE1]">10-Year Warranty</h4>
              <p className="text-xs text-[#F8ECE1]/80">Kiln-dried hardwood & structural frames</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3">
            <div className="p-3 bg-[#5E402B]/30 rounded-full">
              <RefreshCw className="w-6 h-6 text-[#F8ECE1]" />
            </div>
            <div>
              <h4 className="font-serif font-bold text-base text-[#F8ECE1]">30-Day In-Home Trial</h4>
              <p className="text-xs text-[#F8ECE1]/80">Hassle-free returns & exchange</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3">
            <div className="p-3 bg-[#5E402B]/30 rounded-full">
              <Award className="w-6 h-6 text-[#F8ECE1]" />
            </div>
            <div>
              <h4 className="font-serif font-bold text-base text-[#F8ECE1]">Sustainably Crafted</h4>
              <p className="text-xs text-[#F8ECE1]/80">FSC-certified European white oak</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 border-b border-[#E2CEBD]/10">
        
        {/* Brand Column */}
        <div className="lg:col-span-2 space-y-4">
          <button onClick={() => navigate('home')} className="font-serif text-3xl font-bold tracking-tight text-[#F8ECE1]">
            The Furnish <span className="italic font-normal text-[#CCA37E]">Studio</span>
          </button>
          <p className="text-sm text-[#E2CEBD]/80 leading-relaxed max-w-sm font-sans">
            We craft enduring architectural furniture for the discerning home. Rooted in tactile materiality, generous proportions, and timeless Scandinavian warmth.
          </p>
          <div className="flex items-center gap-4 pt-2">
            <a href="#instagram" onClick={(e) => { e.preventDefault(); showToast('Following @furnishstudio on Instagram!', 'info'); }} className="w-10 h-10 rounded-full bg-[#E2CEBD]/10 hover:bg-[#CCA37E] hover:text-[#1E1A17] transition-all flex items-center justify-center">
              <Instagram className="w-4 h-4" />
            </a>
            <a href="#facebook" onClick={(e) => { e.preventDefault(); showToast('Following @furnishstudio on Facebook!', 'info'); }} className="w-10 h-10 rounded-full bg-[#E2CEBD]/10 hover:bg-[#CCA37E] hover:text-[#1E1A17] transition-all flex items-center justify-center">
              <Facebook className="w-4 h-4" />
            </a>
            <a href="#twitter" onClick={(e) => { e.preventDefault(); showToast('Following @furnishstudio on Twitter!', 'info'); }} className="w-10 h-10 rounded-full bg-[#E2CEBD]/10 hover:bg-[#CCA37E] hover:text-[#1E1A17] transition-all flex items-center justify-center">
              <Twitter className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Shop Column */}
        <div>
          <h5 className="font-serif font-bold text-base text-[#F8ECE1] uppercase tracking-wider mb-4">Shop Collections</h5>
          <ul className="space-y-2.5 text-sm">
            <li>
              <button onClick={() => navigate('shop', { category: 'All' })} className="hover:text-[#CCA37E] transition-colors">
                All Furniture
              </button>
            </li>
            {categories.slice(0, 5).map(cat => (
              <li key={cat.name}>
                <button onClick={() => navigate('shop', { category: cat.name })} className="hover:text-[#CCA37E] transition-colors">
                  {cat.name}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Company Column */}
        <div>
          <h5 className="font-serif font-bold text-base text-[#F8ECE1] uppercase tracking-wider mb-4">Studio & Brand</h5>
          <ul className="space-y-2.5 text-sm">
            <li>
              <button onClick={() => navigate('about')} className="hover:text-[#CCA37E] transition-colors">
                Our Story & Heritage
              </button>
            </li>
            <li>
              <button onClick={() => navigate('about')} className="hover:text-[#CCA37E] transition-colors">
                Sustainably Harvested
              </button>
            </li>
            <li>
              <button onClick={() => navigate('contact')} className="hover:text-[#CCA37E] transition-colors">
                Showrooms & Locations
              </button>
            </li>
            <li>
              <button onClick={() => navigate('contact')} className="hover:text-[#CCA37E] transition-colors">
                Press & Editorial
              </button>
            </li>
            <li>
              <button onClick={() => navigate('admin')} className="hover:text-[#CCA37E] text-xs font-mono transition-colors text-[#CCA37E]/70">
                [Admin Portal Access]
              </button>
            </li>
          </ul>
        </div>

        {/* Newsletter / Support Column */}
        <div>
          <h5 className="font-serif font-bold text-base text-[#F8ECE1] uppercase tracking-wider mb-4">The Journal</h5>
          <p className="text-xs text-[#E2CEBD]/80 mb-3">
            Subscribe to receive insider access to new collections, architectural essays, and private showroom invitations.
          </p>
          <form onSubmit={handleNewsletterSubmit} className="space-y-2">
            <div className="relative">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                className="w-full bg-[#E2CEBD]/10 border border-[#E2CEBD]/20 rounded-lg py-2.5 pl-3.5 pr-10 text-sm text-[#F8ECE1] placeholder-[#E2CEBD]/50 focus:outline-none focus:border-[#CCA37E]"
              />
              <button
                type="submit"
                className="absolute right-1.5 top-1.5 bottom-1.5 px-3 bg-[#CCA37E] hover:bg-[#AD7C52] text-[#1E1A17] font-semibold rounded-md transition-colors flex items-center justify-center"
                aria-label="Subscribe"
              >
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
            <p className="text-[10px] text-[#E2CEBD]/60 flex items-center gap-1">
              <Lock className="w-3 h-3" /> We respect your privacy. Unsubscribe anytime.
            </p>
          </form>
        </div>

      </div>

      {/* Footer Bottom Bar */}
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#E2CEBD]/60">
        <p>&copy; {new Date().getFullYear()} The Furnish Studio Inc. All rights reserved. Designed for Google AI Studio.</p>
        
        {/* Payment Icons */}
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1 bg-[#E2CEBD]/10 px-2.5 py-1 rounded border border-[#E2CEBD]/20 text-[#F8ECE1] font-mono">
            <CreditCard className="w-3.5 h-3.5 text-[#CCA37E]" /> Visa / MC / Amex
          </span>
          <span className="bg-[#E2CEBD]/10 px-2.5 py-1 rounded border border-[#E2CEBD]/20 text-[#F8ECE1] font-mono">
            UPI Instant
          </span>
          <span className="bg-[#E2CEBD]/10 px-2.5 py-1 rounded border border-[#E2CEBD]/20 text-[#F8ECE1] font-mono">
            Net Banking
          </span>
        </div>
      </div>
    </footer>
  );
};
