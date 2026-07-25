import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { FAQ_ITEMS } from '../data/mockData';
import { Mail, Phone, MapPin, Clock, Send, ChevronDown, CheckCircle2, AlertCircle } from 'lucide-react';

export const ContactUs: React.FC = () => {
  const { showToast } = useApp();

  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: 'Showroom Appointment', message: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [openFaqIdx, setOpenFaqIdx] = useState<number | null>(0);

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!form.name.trim()) errs.name = 'Your full name is required';
    if (!form.email.trim() || !form.email.includes('@')) errs.email = 'Valid email address is required';
    if (!form.message.trim() || form.message.length < 10) errs.message = 'Please provide at least 10 characters of detail';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) {
      showToast('Please complete all required fields.', 'error', 'Validation Notice');
      return;
    }
    setIsSubmitted(true);
    showToast('Your architectural inquiry has been dispatched to our design curators.', 'success', 'Inquiry Received');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 animate-in fade-in duration-300 space-y-20">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs font-bold uppercase tracking-widest text-[#964627] block">Client Services & Concierge</span>
        <h1 className="font-serif text-4xl sm:text-5xl font-bold text-[#1E1A17]">Get in Touch with The Studio</h1>
        <p className="text-base text-[#1E1A17]/80 font-sans">
          Whether specifying pieces for a commercial architectural project or requesting custom material swatches for your private residence, our curators are at your service.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        {/* Left: Store Info & Showrooms (Col 5) */}
        <div className="lg:col-span-5 space-y-8">
          
          <div className="bg-[#F3E5D8] p-8 rounded-3xl border border-[#EBD8C6] shadow-md space-y-6">
            <h3 className="font-serif font-bold text-2xl text-[#1E1A17] pb-4 border-b border-[#EBD8C6]">
              Flagship Showrooms
            </h3>

            <div className="space-y-4 text-sm font-sans">
              <div className="flex items-start gap-3.5">
                <MapPin className="w-5 h-5 text-[#964627] flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-serif font-bold text-base text-[#1E1A17]">Mumbai Sanctuary (Flagship)</h4>
                  <p className="text-xs text-[#1E1A17]/80 mt-1">402, Palm Grove Heights, Linking Road, Bandra West, Mumbai, MH 400050</p>
                </div>
              </div>

              <div className="flex items-start gap-3.5 pt-3 border-t border-[#EBD8C6]/60">
                <MapPin className="w-5 h-5 text-[#964627] flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-serif font-bold text-base text-[#1E1A17]">Gurugram Design Lab</h4>
                  <p className="text-xs text-[#1E1A17]/80 mt-1">18, Cyber Hub Executive Towers, DLF Phase 2, Gurugram, HR 122002</p>
                </div>
              </div>

              <div className="flex items-center gap-3.5 pt-3 border-t border-[#EBD8C6]/60">
                <Phone className="w-5 h-5 text-[#CCA37E] flex-shrink-0" />
                <span className="font-mono text-sm font-semibold text-[#1E1A17]">+91 (0) 22 8890 4321</span>
              </div>

              <div className="flex items-center gap-3.5 pt-2">
                <Mail className="w-5 h-5 text-[#CCA37E] flex-shrink-0" />
                <span className="text-sm font-semibold text-[#1E1A17]">concierge@furnishstudio.com</span>
              </div>

              <div className="flex items-start gap-3.5 pt-3 border-t border-[#EBD8C6]/60">
                <Clock className="w-5 h-5 text-[#8D9399] flex-shrink-0 mt-0.5" />
                <div className="text-xs text-[#1E1A17]/80">
                  <p><strong className="text-[#1E1A17]">Mon - Sat:</strong> 10:00 AM - 8:00 PM</p>
                  <p><strong className="text-[#1E1A17]">Sunday:</strong> By private appointment only</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-[#1E1A17] text-[#F8ECE1] p-8 rounded-3xl shadow-xl space-y-4">
            <h4 className="font-serif font-bold text-lg">Architectural & Trade Program</h4>
            <p className="text-xs text-[#E2CEBD]/80 leading-relaxed">
              We offer exclusive trade pricing, custom dimensions, and dedicated 3D CAD models to licensed architects, interior designers, and hospitality specifiers.
            </p>
            <button
              onClick={() => showToast('Trade application packet sent to your email!', 'info')}
              className="text-xs font-semibold text-[#CCA37E] hover:underline"
            >
              Request Trade Credentials &rarr;
            </button>
          </div>

        </div>

        {/* Right: Contact Form (Col 7) */}
        <div className="lg:col-span-7">
          <div className="bg-[#F3E5D8]/60 p-8 sm:p-10 rounded-3xl border border-[#EBD8C6] shadow-sm">
            <h2 className="font-serif font-bold text-2xl text-[#1E1A17] mb-2">Send an Inquiry</h2>
            <p className="text-xs text-[#8D9399] mb-8 font-sans">
              Our curators respond to all correspondence within 4 business hours.
            </p>

            {isSubmitted ? (
              <div className="bg-[#F8ECE1] p-8 rounded-2xl border-2 border-[#964627] text-center space-y-4 my-6">
                <CheckCircle2 className="w-12 h-12 text-[#964627] mx-auto" />
                <h3 className="font-serif font-bold text-xl text-[#1E1A17]">Message Successfully Dispatched</h3>
                <p className="text-sm text-[#1E1A17]/80 max-w-md mx-auto">
                  Thank you, <strong className="text-[#1E1A17]">{form.name}</strong>. Your inquiry regarding "<strong className="text-[#1E1A17]">{form.subject}</strong>" has been assigned to a Senior Studio Curator.
                </p>
                <button
                  onClick={() => { setIsSubmitted(false); setForm({ name: '', email: '', phone: '', subject: 'Showroom Appointment', message: '' }); }}
                  className="px-6 py-2.5 bg-[#1E1A17] text-[#F8ECE1] font-semibold text-xs rounded-xl shadow-sm"
                >
                  Send Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="text-xs font-semibold uppercase tracking-wider text-[#8D9399] block mb-1.5">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      placeholder="e.g. Aria Montgomery"
                      className={`w-full bg-[#F8ECE1] border ${errors.name ? 'border-red-500' : 'border-[#CCA37E]'} rounded-xl p-3 text-sm text-[#1E1A17] focus:outline-none focus:ring-1 focus:ring-[#964627]`}
                    />
                    {errors.name && <p className="text-[11px] text-red-600 mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" /> {errors.name}</p>}
                  </div>

                  <div>
                    <label className="text-xs font-semibold uppercase tracking-wider text-[#8D9399] block mb-1.5">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      placeholder="aria.m@example.com"
                      className={`w-full bg-[#F8ECE1] border ${errors.email ? 'border-red-500' : 'border-[#CCA37E]'} rounded-xl p-3 text-sm text-[#1E1A17] focus:outline-none focus:ring-1 focus:ring-[#964627]`}
                    />
                    {errors.email && <p className="text-[11px] text-red-600 mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" /> {errors.email}</p>}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="text-xs font-semibold uppercase tracking-wider text-[#8D9399] block mb-1.5">
                      Phone (Optional)
                    </label>
                    <input
                      type="text"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      placeholder="+91 98765 43210"
                      className="w-full bg-[#F8ECE1] border border-[#CCA37E] rounded-xl p-3 text-sm font-mono text-[#1E1A17] focus:outline-none focus:ring-1 focus:ring-[#964627]"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold uppercase tracking-wider text-[#8D9399] block mb-1.5">
                      Inquiry Subject
                    </label>
                    <select
                      value={form.subject}
                      onChange={(e) => setForm({ ...form, subject: e.target.value })}
                      className="w-full bg-[#F8ECE1] border border-[#CCA37E] rounded-xl p-3 text-sm font-semibold text-[#1E1A17] focus:outline-none focus:ring-1 focus:ring-[#964627] cursor-pointer"
                    >
                      <option value="Showroom Appointment">Private Showroom Appointment</option>
                      <option value="Material Swatch Request">Material Swatch Request</option>
                      <option value="White-Glove Logistics">White-Glove Delivery Inquiry</option>
                      <option value="Trade & Architectural Program">Trade & Architectural Program</option>
                      <option value="General Support">General Patron Support</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="contact-message-input" className="text-xs font-semibold uppercase tracking-wider text-[#8D9399] block mb-1.5">
                    Your Message & Requirements *
                  </label>
                  <textarea
                    id="contact-message-input"
                    rows={5}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder="Describe your architectural project, space dimensions, or specific finish questions..."
                    className={`w-full bg-[#F8ECE1] border ${errors.message ? 'border-red-500' : 'border-[#CCA37E]'} rounded-xl p-3 text-sm text-[#1E1A17] placeholder-[#8D9399] focus:outline-none focus:ring-1 focus:ring-[#964627]`}
                  />
                  {errors.message && <p className="text-[11px] text-red-600 mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" /> {errors.message}</p>}
                </div>

                <button
                  type="submit"
                  className="w-full py-4 bg-[#1E1A17] hover:bg-[#964627] text-[#F8ECE1] font-serif font-bold text-base rounded-xl shadow-lg transition-all flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>Dispatch Correspondence</span>
                </button>
              </form>
            )}
          </div>
        </div>

      </div>

      {/* FAQ Accordion Section */}
      <section className="max-w-4xl mx-auto pt-10 border-t border-[#EBD8C6]">
        <div className="text-center mb-10">
          <span className="text-xs font-bold uppercase tracking-wider text-[#964627] block mb-1">Frequently Asked Questions</span>
          <h2 className="font-serif text-3xl font-bold text-[#1E1A17]">Studio Policies & Logistics FAQ</h2>
        </div>

        <div className="space-y-4">
          {FAQ_ITEMS.map((item, idx) => {
            const isOpen = openFaqIdx === idx;
            return (
              <div
                key={idx}
                className="bg-[#F3E5D8]/50 border border-[#EBD8C6] rounded-2xl overflow-hidden transition-all"
              >
                <button
                  onClick={() => setOpenFaqIdx(isOpen ? null : idx)}
                  className="w-full text-left p-6 flex items-center justify-between gap-4 font-serif font-bold text-base sm:text-lg text-[#1E1A17] hover:text-[#964627] transition-colors"
                >
                  <span>{item.question}</span>
                  <ChevronDown className={`w-5 h-5 text-[#8D9399] transform transition-transform duration-200 flex-shrink-0 ${isOpen ? 'rotate-180 text-[#964627]' : ''}`} />
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 pt-0 text-sm text-[#1E1A17]/80 leading-relaxed font-sans border-t border-[#EBD8C6]/40 mt-1">
                    <p className="pt-4">{item.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

    </div>
  );
};
