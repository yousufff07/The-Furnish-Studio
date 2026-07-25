import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Lock, Mail, User as UserIcon, Phone, ArrowRight, ShieldAlert, Sparkles, Check } from 'lucide-react';

export const Auth: React.FC = () => {
  const { login, register, showToast, navigate } = useApp();
  const [mode, setMode] = useState<'login' | 'register' | 'forgot'>('login');

  // Form states
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('+91 ');
  const [error, setError] = useState('');
  const [resetSent, setResetSent] = useState(false);

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please provide both email address and password.');
      return;
    }
    setError('');
    login(email, password);
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !phone || !password) {
      setError('All architectural membership fields are required.');
      return;
    }
    if (password.length < 6) {
      setError('Password must contain at least 6 characters.');
      return;
    }
    setError('');
    register(name, email, phone);
  };

  const handleForgotSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.includes('@')) {
      setError('Please enter a valid registered email address.');
      return;
    }
    setError('');
    setResetSent(true);
    showToast('A secure password restoration link has been dispatched to your inbox.', 'success', 'Recovery Dispatched');
  };

  const handleAdminQuickLogin = () => {
    login('admin@furnishstudio.com', 'admin123', true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 animate-in fade-in duration-300">
      <div className="max-w-md mx-auto bg-[#F3E5D8]/80 border border-[#EBD8C6] rounded-3xl p-8 sm:p-10 shadow-2xl relative overflow-hidden">
        
        {/* Brand Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center p-3 bg-[#CCA37E]/20 rounded-full mb-4">
            <Lock className="w-6 h-6 text-[#964627]" />
          </div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#1E1A17]">
            {mode === 'login' && 'Studio Patron Portal'}
            {mode === 'register' && 'Become a Studio Member'}
            {mode === 'forgot' && 'Restore Access'}
          </h1>
          <p className="text-xs text-[#8D9399] mt-2 font-sans">
            {mode === 'login' && 'Access your wishlist, order history, and saved addresses.'}
            {mode === 'register' && 'Enjoy complimentary 10-year warranty tracking and private sales.'}
            {mode === 'forgot' && 'Enter your email to receive recovery instructions.'}
          </p>
        </div>

        {/* Tab switcher */}
        {mode !== 'forgot' && (
          <div className="flex bg-[#F8ECE1] p-1 rounded-2xl border border-[#EBD8C6] mb-6">
            <button
              onClick={() => { setMode('login'); setError(''); }}
              className={`flex-1 py-2.5 text-xs font-serif font-bold rounded-xl transition-all ${
                mode === 'login' ? 'bg-[#1E1A17] text-[#F8ECE1] shadow-md' : 'text-[#1E1A17]/70 hover:text-[#1E1A17]'
              }`}
            >
              Sign In
            </button>
            <button
              onClick={() => { setMode('register'); setError(''); }}
              className={`flex-1 py-2.5 text-xs font-serif font-bold rounded-xl transition-all ${
                mode === 'register' ? 'bg-[#1E1A17] text-[#F8ECE1] shadow-md' : 'text-[#1E1A17]/70 hover:text-[#1E1A17]'
              }`}
            >
              Register
            </button>
          </div>
        )}

        {error && (
          <div className="mb-6 p-3 bg-red-100 border-l-4 border-red-600 text-red-800 text-xs rounded-lg font-sans">
            {error}
          </div>
        )}

        {/* 1. Login Form */}
        {mode === 'login' && (
          <form onSubmit={handleLoginSubmit} className="space-y-4">
            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-[#8D9399] block mb-1.5">
                Email Address
              </label>
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="aria.m@example.com"
                  className="w-full bg-[#F8ECE1] border border-[#CCA37E] rounded-xl py-3 pl-10 pr-4 text-sm text-[#1E1A17] placeholder-[#8D9399] focus:outline-none focus:ring-1 focus:ring-[#964627]"
                />
                <Mail className="w-4 h-4 text-[#8D9399] absolute left-3.5 top-3.5" />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="text-xs font-semibold uppercase tracking-wider text-[#8D9399]">
                  Password
                </label>
                <button
                  type="button"
                  onClick={() => { setMode('forgot'); setError(''); }}
                  className="text-xs text-[#964627] hover:underline"
                >
                  Forgot password?
                </button>
              </div>
              <div className="relative">
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-[#F8ECE1] border border-[#CCA37E] rounded-xl py-3 pl-10 pr-4 text-sm text-[#1E1A17] placeholder-[#8D9399] focus:outline-none focus:ring-1 focus:ring-[#964627]"
                />
                <Lock className="w-4 h-4 text-[#8D9399] absolute left-3.5 top-3.5" />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 bg-[#CCA37E] hover:bg-[#AD7C52] text-[#1E1A17] font-serif font-bold text-base rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 mt-2"
            >
              <span>Sign In to Sanctuary</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <div className="pt-6 border-t border-[#EBD8C6] text-center">
              <p className="text-xs text-[#8D9399] mb-3">Testing & Evaluation Shortcuts:</p>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => { setEmail('aria.m@example.com'); setPassword('password123'); login('aria.m@example.com', 'password123'); }}
                  className="py-2 px-3 bg-[#F8ECE1] hover:bg-[#EBD8C6] text-[#1E1A17] text-xs font-semibold rounded-xl border border-[#EBD8C6] transition-colors"
                >
                  Demo Patron Login
                </button>
                <button
                  type="button"
                  onClick={handleAdminQuickLogin}
                  className="py-2 px-3 bg-[#964627] hover:bg-[#1E1A17] text-[#F8ECE1] text-xs font-semibold rounded-xl transition-colors shadow-sm flex items-center justify-center gap-1"
                >
                  <ShieldAlert className="w-3.5 h-3.5" /> Admin Dashboard
                </button>
              </div>
            </div>
          </form>
        )}

        {/* 2. Register Form */}
        {mode === 'register' && (
          <form onSubmit={handleRegisterSubmit} className="space-y-4">
            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-[#8D9399] block mb-1.5">
                Full Name *
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Aria Montgomery"
                  className="w-full bg-[#F8ECE1] border border-[#CCA37E] rounded-xl py-3 pl-10 pr-4 text-sm text-[#1E1A17] placeholder-[#8D9399] focus:outline-none focus:ring-1 focus:ring-[#964627]"
                />
                <UserIcon className="w-4 h-4 text-[#8D9399] absolute left-3.5 top-3.5" />
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-[#8D9399] block mb-1.5">
                Email Address *
              </label>
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="aria.m@example.com"
                  className="w-full bg-[#F8ECE1] border border-[#CCA37E] rounded-xl py-3 pl-10 pr-4 text-sm text-[#1E1A17] placeholder-[#8D9399] focus:outline-none focus:ring-1 focus:ring-[#964627]"
                />
                <Mail className="w-4 h-4 text-[#8D9399] absolute left-3.5 top-3.5" />
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-[#8D9399] block mb-1.5">
                Phone Number *
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+91 98765 43210"
                  className="w-full bg-[#F8ECE1] border border-[#CCA37E] rounded-xl py-3 pl-10 pr-4 text-sm font-mono text-[#1E1A17] placeholder-[#8D9399] focus:outline-none focus:ring-1 focus:ring-[#964627]"
                />
                <Phone className="w-4 h-4 text-[#8D9399] absolute left-3.5 top-3.5" />
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-[#8D9399] block mb-1.5">
                Create Password *
              </label>
              <div className="relative">
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="At least 6 characters"
                  className="w-full bg-[#F8ECE1] border border-[#CCA37E] rounded-xl py-3 pl-10 pr-4 text-sm text-[#1E1A17] placeholder-[#8D9399] focus:outline-none focus:ring-1 focus:ring-[#964627]"
                />
                <Lock className="w-4 h-4 text-[#8D9399] absolute left-3.5 top-3.5" />
              </div>
            </div>

            <div className="text-[11px] text-[#8D9399] space-y-1 py-1">
              <p className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-[#964627]" /> Free room-of-choice setup tracking</p>
              <p className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-[#964627]" /> Instant 10-year structural warranty registration</p>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 bg-[#1E1A17] hover:bg-[#964627] text-[#F8ECE1] font-serif font-bold text-base rounded-xl shadow-lg transition-all flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4" />
              <span>Create Patron Account</span>
            </button>
          </form>
        )}

        {/* 3. Forgot Password Form */}
        {mode === 'forgot' && (
          <div className="space-y-6">
            {resetSent ? (
              <div className="bg-[#F8ECE1] p-6 rounded-2xl border border-[#964627] text-center space-y-4">
                <div className="w-12 h-12 bg-green-100 text-green-800 rounded-full flex items-center justify-center mx-auto">
                  <Check className="w-6 h-6" />
                </div>
                <h4 className="font-serif font-bold text-base text-[#1E1A17]">Check your inbox</h4>
                <p className="text-xs text-[#8D9399] leading-relaxed">
                  If an account exists for <strong className="text-[#1E1A17]">{email}</strong>, you will receive password recovery instructions within 2 minutes.
                </p>
                <button
                  onClick={() => { setMode('login'); setResetSent(false); }}
                  className="w-full py-2.5 bg-[#1E1A17] text-[#F8ECE1] font-bold text-xs rounded-xl"
                >
                  Return to Sign In
                </button>
              </div>
            ) : (
              <form onSubmit={handleForgotSubmit} className="space-y-4">
                <div>
                  <label className="text-xs font-semibold uppercase tracking-wider text-[#8D9399] block mb-1.5">
                    Registered Email Address
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="aria.m@example.com"
                    className="w-full bg-[#F8ECE1] border border-[#CCA37E] rounded-xl py-3 px-4 text-sm text-[#1E1A17] focus:outline-none focus:ring-1 focus:ring-[#964627]"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-3.5 bg-[#964627] hover:bg-[#1E1A17] text-[#F8ECE1] font-serif font-bold text-sm rounded-xl transition-colors shadow-md"
                >
                  Dispatch Recovery Link
                </button>
                <button
                  type="button"
                  onClick={() => { setMode('login'); setError(''); }}
                  className="w-full py-2.5 text-xs text-[#8D9399] hover:text-[#1E1A17] underline"
                >
                  Cancel & Return to Login
                </button>
              </form>
            )}
          </div>
        )}

      </div>
    </div>
  );
};
