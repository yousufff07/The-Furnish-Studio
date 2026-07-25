import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Search, Heart, ShoppingBag, User as UserIcon, Menu, X, 
  ChevronDown, ShieldAlert, Package, LogOut 
} from 'lucide-react';
import { CategoryName } from '../../types';

export const Navbar: React.FC = () => {
  const { 
    activeRoute, navigate, cartCount, wishlist, user, logout, 
    searchQuery, setSearchQuery, categories 
  } = useApp();
  
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchInput, setSearchInput] = useState(searchQuery);

  const dropdownRef = useRef<HTMLDivElement>(null);
  const userMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setSearchInput(searchQuery);
  }, [searchQuery]);

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsCategoryDropdownOpen(false);
      }
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setIsUserMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchInput.trim() || activeRoute === 'shop') {
      navigate('shop', { searchQuery: searchInput });
      setIsSearchOpen(false);
    }
  };

  const handleCategoryClick = (catName: CategoryName) => {
    navigate('shop', { category: catName });
    setIsCategoryDropdownOpen(false);
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-[#F8ECE1]/95 backdrop-blur-md border-b border-[#EBD8C6] transition-all duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Mobile Hamburger */}
          <div className="flex items-center lg:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 -ml-2 text-[#1E1A17] hover:text-[#964627] transition-colors focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Logo */}
          <div className="flex-1 lg:flex-none text-center lg:text-left">
            <button 
              onClick={() => navigate('home')} 
              className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-[#1E1A17] hover:text-[#AD7C52] transition-colors focus:outline-none"
              style={{ fontFamily: "'Georgia', serif" }}
            >
              The Furnish <span className="italic font-normal text-[#AD7C52]">Studio</span>
            </button>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-8 text-sm font-medium uppercase tracking-widest">
            <button
              onClick={() => navigate('home')}
              className={`transition-colors ${activeRoute === 'home' ? 'text-[#CCA37E] font-bold' : 'text-[#1E1A17]/80 hover:text-[#CCA37E]'}`}
            >
              Home
            </button>
            <button
              onClick={() => navigate('shop', { category: 'All' })}
              className={`transition-colors ${activeRoute === 'shop' && !isCategoryDropdownOpen ? 'text-[#CCA37E] font-bold' : 'text-[#1E1A17]/80 hover:text-[#CCA37E]'}`}
            >
              Shop
            </button>

            {/* Categories Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setIsCategoryDropdownOpen(!isCategoryDropdownOpen)}
                className="flex items-center gap-1 text-sm font-medium uppercase tracking-widest text-[#1E1A17]/80 hover:text-[#CCA37E] transition-colors focus:outline-none"
              >
                Categories <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${isCategoryDropdownOpen ? 'rotate-180 text-[#CCA37E]' : ''}`} />
              </button>

              {isCategoryDropdownOpen && (
                <div className="absolute top-full left-0 mt-3 w-72 max-h-[80vh] overflow-y-auto bg-[#F8ECE1] border border-[#EBD8C6] shadow-2xl rounded-xl py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200 normal-case tracking-normal">
                  <div className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-[#8D9399] sticky top-0 bg-[#F8ECE1] z-10 border-b border-[#EBD8C6]/50">
                    Curated Divisions ({categories.length})
                  </div>
                  <div className="py-1">
                    {categories.map((cat) => (
                      <button
                        key={cat.name}
                        onClick={() => handleCategoryClick(cat.name)}
                        className="w-full text-left px-3 py-2 text-sm text-[#1E1A17]/80 hover:bg-[#F3E5D8] hover:text-[#AD7C52] transition-colors flex items-center justify-between gap-2.5"
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          <img
                            src={cat.image}
                            alt={cat.name}
                            className="w-7 h-7 rounded-lg object-cover flex-shrink-0 border border-black/10 shadow-sm"
                          />
                          <span className="truncate font-medium">{cat.name}</span>
                        </div>
                        <span className="text-xs text-[#8D9399] font-mono flex-shrink-0">({cat.count})</span>
                      </button>
                    ))}
                  </div>
                  <div className="border-t border-[#EBD8C6] my-1 pt-1 sticky bottom-0 bg-[#F8ECE1] z-10">
                    <button
                      onClick={() => { navigate('shop', { category: 'All' }); setIsCategoryDropdownOpen(false); }}
                      className="w-full text-left px-4 py-2 text-sm font-semibold text-[#AD7C52] hover:bg-[#F3E5D8] transition-colors flex items-center justify-between"
                    >
                      <span>Explore All Catalog</span>
                      <span>&rarr;</span>
                    </button>
                  </div>
                </div>
              )}
            </div>

            <button
              onClick={() => navigate('about')}
              className={`transition-colors ${activeRoute === 'about' ? 'text-[#CCA37E] font-bold' : 'text-[#1E1A17]/80 hover:text-[#CCA37E]'}`}
            >
              About
            </button>
            <button
              onClick={() => navigate('contact')}
              className={`transition-colors ${activeRoute === 'contact' ? 'text-[#CCA37E] font-bold' : 'text-[#1E1A17]/80 hover:text-[#CCA37E]'}`}
            >
              Contact
            </button>
          </nav>

          {/* Right Side Icons */}
          <div className="flex items-center gap-1 sm:gap-3">
            {/* Search Button / Input */}
            <div className="relative">
              {isSearchOpen ? (
                <form onSubmit={handleSearchSubmit} className="flex items-center">
                  <input
                    type="text"
                    placeholder="Search studio pieces..."
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                    autoFocus
                    className="w-48 sm:w-64 bg-[#F3E5D8] border border-[#CCA37E] rounded-full py-1.5 pl-3.5 pr-8 text-sm text-[#1E1A17] placeholder-[#8D9399] focus:outline-none focus:ring-2 focus:ring-[#CCA37E]"
                  />
                  <button
                    type="button"
                    onClick={() => setIsSearchOpen(false)}
                    className="absolute right-2.5 text-[#8D9399] hover:text-[#1E1A17]"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </form>
              ) : (
                <button
                  onClick={() => setIsSearchOpen(true)}
                  className="p-2 text-[#1E1A17] hover:text-[#AD7C52] transition-colors rounded-full hover:bg-[#F3E5D8]"
                  aria-label="Search catalog"
                  title="Search catalog"
                >
                  <Search className="w-5 h-5" />
                </button>
              )}
            </div>

            {/* Wishlist Icon */}
            <button
              onClick={() => navigate('wishlist')}
              className="relative p-2 text-[#1E1A17] hover:text-[#AD7C52] transition-colors rounded-full hover:bg-[#F3E5D8]"
              aria-label="Wishlist"
              title="Saved Wishlist"
            >
              <Heart className="w-5 h-5" />
              {wishlist.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#AD7C52] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {wishlist.length}
                </span>
              )}
            </button>

            {/* Cart Icon */}
            <button
              onClick={() => navigate('cart')}
              className="relative p-2 text-[#1E1A17] hover:text-[#AD7C52] transition-colors rounded-full hover:bg-[#F3E5D8]"
              aria-label="Shopping Cart"
              title="Shopping Cart"
            >
              <ShoppingBag className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#CCA37E] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Account / Profile Dropdown */}
            <div className="relative" ref={userMenuRef}>
              <button
                onClick={() => {
                  if (!user) {
                    navigate('auth');
                  } else {
                    setIsUserMenuOpen(!isUserMenuOpen);
                  }
                }}
                className={`p-2 rounded-full transition-colors flex items-center gap-1.5 ${
                  user ? 'bg-[#F3E5D8] text-[#964627] font-semibold text-xs pr-3' : 'text-[#1E1A17] hover:text-[#964627] hover:bg-[#F3E5D8]'
                }`}
                aria-label="Account"
                title={user ? user.name : 'Sign in'}
              >
                {user?.avatar ? (
                  <img src={user.avatar} alt={user.name} className="w-6 h-6 rounded-full object-cover ring-1 ring-[#CCA37E]" />
                ) : (
                  <UserIcon className="w-5 h-5" />
                )}
                {user && <span className="hidden md:inline max-w-[80px] truncate">{user.name.split(' ')[0]}</span>}
              </button>

              {isUserMenuOpen && user && (
                <div className="absolute right-0 mt-3 w-56 bg-[#F8ECE1] border border-[#EBD8C6] shadow-2xl rounded-xl py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                  <div className="px-4 py-2 border-b border-[#EBD8C6]/80 mb-1">
                    <p className="text-xs text-[#8D9399]">Signed in as</p>
                    <p className="text-sm font-semibold text-[#1E1A17] truncate">{user.name}</p>
                    <p className="text-[11px] text-[#8D9399] truncate">{user.email}</p>
                  </div>

                  <button
                    onClick={() => { navigate('profile'); setIsUserMenuOpen(false); }}
                    className="w-full text-left px-4 py-2 text-sm text-[#1E1A17]/80 hover:bg-[#F3E5D8] hover:text-[#964627] flex items-center gap-2.5 transition-colors"
                  >
                    <UserIcon className="w-4 h-4 text-[#8D9399]" />
                    <span>My Studio Profile</span>
                  </button>

                  <button
                    onClick={() => { navigate('order-history'); setIsUserMenuOpen(false); }}
                    className="w-full text-left px-4 py-2 text-sm text-[#1E1A17]/80 hover:bg-[#F3E5D8] hover:text-[#964627] flex items-center gap-2.5 transition-colors"
                  >
                    <Package className="w-4 h-4 text-[#8D9399]" />
                    <span>Order History</span>
                  </button>

                  {user.role === 'admin' && (
                    <button
                      onClick={() => { navigate('admin'); setIsUserMenuOpen(false); }}
                      className="w-full text-left px-4 py-2 text-sm font-semibold text-[#964627] hover:bg-[#F3E5D8] flex items-center gap-2.5 transition-colors"
                    >
                      <ShieldAlert className="w-4 h-4 text-[#964627]" />
                      <span>Admin Dashboard</span>
                    </button>
                  )}

                  <div className="border-t border-[#EBD8C6] mt-1 pt-1">
                    <button
                      onClick={() => { logout(); setIsUserMenuOpen(false); }}
                      className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-[#F3E5D8] flex items-center gap-2.5 transition-colors"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                </div>
              )}
            </div>

          </div>

        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-x-0 top-20 bg-[#F8ECE1] border-b border-[#EBD8C6] shadow-2xl z-50 animate-in slide-in-from-top duration-300 max-h-[80vh] overflow-y-auto">
          <div className="p-4 space-y-4">
            {/* Mobile Search */}
            <form onSubmit={handleSearchSubmit} className="relative">
              <input
                type="text"
                placeholder="Search studio pieces..."
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                className="w-full bg-[#F3E5D8] border border-[#CCA37E] rounded-xl py-2.5 pl-4 pr-10 text-sm text-[#1E1A17] placeholder-[#8D9399]"
              />
              <button type="submit" className="absolute right-3 top-3 text-[#CCA37E]">
                <Search className="w-4 h-4" />
              </button>
            </form>

            {/* Main Links */}
            <div className="space-y-1">
              <button
                onClick={() => { navigate('home'); setIsMobileMenuOpen(false); }}
                className="w-full text-left px-3 py-2 text-base font-serif font-medium text-[#1E1A17] hover:bg-[#F3E5D8] rounded-lg"
              >
                Home
              </button>
              <button
                onClick={() => { navigate('shop', { category: 'All' }); setIsMobileMenuOpen(false); }}
                className="w-full text-left px-3 py-2 text-base font-serif font-medium text-[#1E1A17] hover:bg-[#F3E5D8] rounded-lg"
              >
                Shop All Furniture
              </button>
              <button
                onClick={() => { navigate('about'); setIsMobileMenuOpen(false); }}
                className="w-full text-left px-3 py-2 text-base font-serif font-medium text-[#1E1A17] hover:bg-[#F3E5D8] rounded-lg"
              >
                About Us
              </button>
              <button
                onClick={() => { navigate('contact'); setIsMobileMenuOpen(false); }}
                className="w-full text-left px-3 py-2 text-base font-serif font-medium text-[#1E1A17] hover:bg-[#F3E5D8] rounded-lg"
              >
                Contact & Support
              </button>
            </div>

            {/* Mobile Categories */}
            <div className="border-t border-[#EBD8C6] pt-3">
              <p className="px-3 text-xs font-bold uppercase tracking-wider text-[#8D9399] mb-2">Divisions</p>
              <div className="grid grid-cols-2 gap-1.5 px-1 max-h-[40vh] overflow-y-auto">
                {categories.map(cat => (
                  <button
                    key={cat.name}
                    onClick={() => handleCategoryClick(cat.name)}
                    className="text-left px-2.5 py-1.5 text-sm text-[#1E1A17]/80 hover:text-[#964627] hover:bg-[#F3E5D8]/60 rounded-xl transition-colors flex items-center gap-2"
                  >
                    <img
                      src={cat.image}
                      alt={cat.name}
                      className="w-6 h-6 rounded-md object-cover flex-shrink-0 border border-black/10 shadow-sm"
                    />
                    <span className="truncate text-xs font-medium">{cat.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Mobile Account / Admin */}
            <div className="border-t border-[#EBD8C6] pt-3 flex flex-col gap-2">
              {user ? (
                <>
                  <div className="flex items-center justify-between px-3 py-2 bg-[#F3E5D8] rounded-xl">
                    <div className="flex items-center gap-2">
                      <img src={user.avatar} alt={user.name} className="w-8 h-8 rounded-full object-cover" />
                      <div>
                        <p className="text-sm font-semibold text-[#1E1A17]">{user.name}</p>
                        <p className="text-xs text-[#8D9399]">{user.email}</p>
                      </div>
                    </div>
                    <button onClick={() => { logout(); setIsMobileMenuOpen(false); }} className="text-red-600 text-xs font-bold">
                      Logout
                    </button>
                  </div>
                  <button
                    onClick={() => { navigate('profile'); setIsMobileMenuOpen(false); }}
                    className="w-full text-left px-3 py-2 text-sm text-[#1E1A17] hover:bg-[#F3E5D8] rounded-lg flex items-center gap-2"
                  >
                    <UserIcon className="w-4 h-4" /> Profile & Saved Addresses
                  </button>
                  <button
                    onClick={() => { navigate('order-history'); setIsMobileMenuOpen(false); }}
                    className="w-full text-left px-3 py-2 text-sm text-[#1E1A17] hover:bg-[#F3E5D8] rounded-lg flex items-center gap-2"
                  >
                    <Package className="w-4 h-4" /> Order History
                  </button>
                  {user.role === 'admin' && (
                    <button
                      onClick={() => { navigate('admin'); setIsMobileMenuOpen(false); }}
                      className="w-full text-left px-3 py-2 text-sm font-bold text-[#964627] bg-[#CCA37E]/20 rounded-lg flex items-center gap-2"
                    >
                      <ShieldAlert className="w-4 h-4" /> Admin Dashboard
                    </button>
                  )}
                </>
              ) : (
                <button
                  onClick={() => { navigate('auth'); setIsMobileMenuOpen(false); }}
                  className="w-full bg-[#CCA37E] hover:bg-[#AD7C52] text-[#1E1A17] font-semibold py-3 rounded-xl text-center shadow-md transition-colors"
                >
                  Sign In / Register
                </button>
              )}
            </div>

          </div>
        </div>
      )}
    </header>
  );
};
