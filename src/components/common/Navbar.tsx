import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Search, Heart, ShoppingBag, User as UserIcon, Menu, X, 
  ChevronDown, ShieldAlert, Package, LogOut 
} from 'lucide-react';
import { CategoryName } from '../../types';
import SpecularButton from './SpecularButton';
import LineSidebar from './LineSidebar';
import MagicBento from './MagicBento';

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
  const [categoryViewMode, setCategoryViewMode] = useState<'grid' | 'list'>('grid');

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
          <nav className="hidden lg:flex items-center gap-2 text-sm font-medium uppercase tracking-widest">
            <SpecularButton
              size="sm"
              radius={14}
              onClick={() => navigate('home')}
              textColor={activeRoute === 'home' ? '#AD7C52' : '#1E1A17'}
              baseColor="#D4C4B4"
              lineColor="#AD7C52"
              intensity={1.5}
              shineSize={12}
              autoAnimate={activeRoute === 'home'}
              className="font-medium"
            >
              Home
            </SpecularButton>
            <SpecularButton
              size="sm"
              radius={14}
              onClick={() => navigate('shop', { category: 'All' })}
              textColor={activeRoute === 'shop' && !isCategoryDropdownOpen ? '#AD7C52' : '#1E1A17'}
              baseColor="#D4C4B4"
              lineColor="#AD7C52"
              intensity={1.5}
              shineSize={12}
              autoAnimate={activeRoute === 'shop' && !isCategoryDropdownOpen}
              className="font-medium"
            >
              Shop
            </SpecularButton>

            {/* Categories Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <SpecularButton
                size="sm"
                radius={14}
                onClick={() => setIsCategoryDropdownOpen(!isCategoryDropdownOpen)}
                textColor={isCategoryDropdownOpen || (activeRoute === 'shop' && isCategoryDropdownOpen) ? '#AD7C52' : '#1E1A17'}
                baseColor="#D4C4B4"
                lineColor="#AD7C52"
                intensity={1.5}
                shineSize={12}
                autoAnimate={isCategoryDropdownOpen}
                className="font-medium"
              >
                Categories <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${isCategoryDropdownOpen ? 'rotate-180 text-[#AD7C52]' : ''}`} />
              </SpecularButton>

              {isCategoryDropdownOpen && (
                <div className="absolute top-full left-0 mt-3 w-[720px] max-w-[90vw] max-h-[85vh] overflow-y-auto bg-[#F8ECE1] border border-[#EBD8C6] shadow-2xl rounded-2xl p-4 z-50 animate-in fade-in slide-in-from-top-2 duration-200 normal-case tracking-normal">
                  <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#EBD8C6]/80 sticky top-0 bg-[#F8ECE1] z-20">
                    <div>
                      <h3 className="text-sm font-serif font-bold text-[#1E1A17]">Curated Studio Divisions</h3>
                      <p className="text-xs text-[#8D9399]">Select a division to explore handcrafted collections</p>
                    </div>
                    <div className="flex items-center gap-2.5">
                      <div className="flex items-center bg-[#EBD8C6]/70 p-0.5 rounded-lg border border-[#D4C4B4]">
                        <button
                          onClick={() => setCategoryViewMode('grid')}
                          className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-all ${
                            categoryViewMode === 'grid'
                              ? 'bg-[#1E1A17] text-white shadow-sm'
                              : 'text-[#1E1A17] hover:text-[#AD7C52]'
                          }`}
                        >
                          Bento Grid
                        </button>
                        <button
                          onClick={() => setCategoryViewMode('list')}
                          className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-all ${
                            categoryViewMode === 'list'
                              ? 'bg-[#1E1A17] text-white shadow-sm'
                              : 'text-[#1E1A17] hover:text-[#AD7C52]'
                          }`}
                        >
                          Line List
                        </button>
                      </div>
                      <span className="px-2.5 py-1 bg-[#F3E5D8] text-[#AD7C52] text-xs font-bold rounded-full">
                        {categories.length}
                      </span>
                    </div>
                  </div>

                  <div className="py-1">
                    {categoryViewMode === 'grid' ? (
                      <MagicBento
                        cards={categories.map((cat, idx) => {
                          const darkPalettes = ['#181412', '#1C1614', '#1F1815', '#171311', '#211916', '#1A1513'];
                          return {
                            title: cat.name,
                            description: cat.description,
                            label: `${cat.count} Pieces`,
                            color: darkPalettes[idx % darkPalettes.length],
                          };
                        })}
                        glowColor="173, 124, 82"
                        spotlightRadius={280}
                        particleCount={8}
                        enableStars={true}
                        enableSpotlight={true}
                        enableBorderGlow={true}
                        enableTilt={true}
                        enableMagnetism={true}
                        clickEffect={true}
                        onCardClick={(card) => handleCategoryClick(card.title as CategoryName)}
                      />
                    ) : (
                      <div className="py-2 px-2 max-w-md mx-auto">
                        <LineSidebar
                          items={categories.map((cat) => cat.name)}
                          accentColor="#AD7C52"
                          textColor="#1E1A17"
                          markerColor="#D4C4B4"
                          markerLength={24}
                          markerGap={6}
                          maxShift={12}
                          itemGap={12}
                          fontSize={0.9}
                          showIndex={true}
                          showMarker={true}
                          proximityRadius={100}
                          onItemClick={(_, label) => handleCategoryClick(label as CategoryName)}
                        />
                      </div>
                    )}
                  </div>

                  <div className="border-t border-[#EBD8C6] mt-4 pt-3 sticky bottom-0 bg-[#F8ECE1] z-20 flex items-center justify-between">
                    <button
                      onClick={() => { navigate('shop', { category: 'All' }); setIsCategoryDropdownOpen(false); }}
                      className="w-full py-2.5 px-4 bg-[#1E1A17] hover:bg-[#AD7C52] text-white rounded-xl text-sm font-semibold transition-colors flex items-center justify-between shadow-md"
                    >
                      <span>Explore Entire Catalog ({categories.reduce((acc, c) => acc + c.count, 0)} Items)</span>
                      <span>&rarr;</span>
                    </button>
                  </div>
                </div>
              )}
            </div>

            <SpecularButton
              size="sm"
              radius={14}
              onClick={() => navigate('about')}
              textColor={activeRoute === 'about' ? '#AD7C52' : '#1E1A17'}
              baseColor="#D4C4B4"
              lineColor="#AD7C52"
              intensity={1.5}
              shineSize={12}
              autoAnimate={activeRoute === 'about'}
              className="font-medium"
            >
              About
            </SpecularButton>
            <SpecularButton
              size="sm"
              radius={14}
              onClick={() => navigate('contact')}
              textColor={activeRoute === 'contact' ? '#AD7C52' : '#1E1A17'}
              baseColor="#D4C4B4"
              lineColor="#AD7C52"
              intensity={1.5}
              shineSize={12}
              autoAnimate={activeRoute === 'contact'}
              className="font-medium"
            >
              Contact
            </SpecularButton>
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
                <SpecularButton
                  size="icon"
                  radius={20}
                  onClick={() => setIsSearchOpen(true)}
                  textColor="#1E1A17"
                  baseColor="#D4C4B4"
                  lineColor="#AD7C52"
                  intensity={1.5}
                  shineSize={14}
                >
                  <Search className="w-5 h-5" />
                </SpecularButton>
              )}
            </div>

            {/* Wishlist Icon */}
            <SpecularButton
              size="icon"
              radius={20}
              onClick={() => navigate('wishlist')}
              textColor={activeRoute === 'wishlist' ? '#AD7C52' : '#1E1A17'}
              baseColor="#D4C4B4"
              lineColor="#AD7C52"
              intensity={1.5}
              shineSize={14}
              autoAnimate={activeRoute === 'wishlist' || wishlist.length > 0}
              className="relative"
            >
              <Heart className="w-5 h-5" />
              {wishlist.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#AD7C52] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center shadow-sm">
                  {wishlist.length}
                </span>
              )}
            </SpecularButton>

            {/* Cart Icon */}
            <SpecularButton
              size="icon"
              radius={20}
              onClick={() => navigate('cart')}
              textColor={activeRoute === 'cart' ? '#AD7C52' : '#1E1A17'}
              baseColor="#D4C4B4"
              lineColor="#AD7C52"
              intensity={1.5}
              shineSize={14}
              autoAnimate={activeRoute === 'cart' || cartCount > 0}
              className="relative"
            >
              <ShoppingBag className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#CCA37E] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center shadow-sm">
                  {cartCount}
                </span>
              )}
            </SpecularButton>

            {/* Account / Profile Dropdown */}
            <div className="relative" ref={userMenuRef}>
              <SpecularButton
                size={user ? 'sm' : 'icon'}
                radius={20}
                onClick={() => {
                  if (!user) {
                    navigate('auth');
                  } else {
                    setIsUserMenuOpen(!isUserMenuOpen);
                  }
                }}
                textColor={isUserMenuOpen || user ? '#AD7C52' : '#1E1A17'}
                baseColor="#D4C4B4"
                lineColor="#AD7C52"
                intensity={1.5}
                shineSize={14}
                autoAnimate={isUserMenuOpen}
                className="transition-colors"
              >
                {user?.avatar ? (
                  <img src={user.avatar} alt={user.name} className="w-5 h-5 rounded-full object-cover ring-1 ring-[#CCA37E]" />
                ) : (
                  <UserIcon className="w-5 h-5" />
                )}
                {user && <span className="hidden md:inline max-w-[80px] truncate font-semibold text-xs">{user.name.split(' ')[0]}</span>}
              </SpecularButton>

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
              <div className="flex items-center justify-between px-3 mb-2">
                <p className="text-xs font-bold uppercase tracking-wider text-[#8D9399]">Divisions ({categories.length})</p>
                <div className="flex items-center bg-[#EBD8C6]/70 p-0.5 rounded-lg border border-[#D4C4B4]">
                  <button
                    onClick={() => setCategoryViewMode('grid')}
                    className={`px-2 py-0.5 text-[10px] font-semibold rounded ${
                      categoryViewMode === 'grid' ? 'bg-[#1E1A17] text-white' : 'text-[#1E1A17]'
                    }`}
                  >
                    Grid
                  </button>
                  <button
                    onClick={() => setCategoryViewMode('list')}
                    className={`px-2 py-0.5 text-[10px] font-semibold rounded ${
                      categoryViewMode === 'list' ? 'bg-[#1E1A17] text-white' : 'text-[#1E1A17]'
                    }`}
                  >
                    List
                  </button>
                </div>
              </div>
              <div className="px-1 py-1 max-h-[50vh] overflow-y-auto">
                {categoryViewMode === 'grid' ? (
                  <MagicBento
                    cards={categories.map((cat, idx) => {
                      const darkPalettes = ['#181412', '#1C1614', '#1F1815', '#171311', '#211916', '#1A1513'];
                      return {
                        title: cat.name,
                        description: cat.description,
                        label: `${cat.count} Pieces`,
                        color: darkPalettes[idx % darkPalettes.length],
                      };
                    })}
                    glowColor="173, 124, 82"
                    spotlightRadius={180}
                    particleCount={6}
                    enableStars={true}
                    enableSpotlight={true}
                    enableBorderGlow={true}
                    enableTilt={false}
                    enableMagnetism={false}
                    clickEffect={true}
                    onCardClick={(card) => {
                      handleCategoryClick(card.title as CategoryName);
                      setIsMobileMenuOpen(false);
                    }}
                  />
                ) : (
                  <div className="px-2">
                    <LineSidebar
                      items={categories.map((cat) => cat.name)}
                      accentColor="#AD7C52"
                      textColor="#1E1A17"
                      markerColor="#D4C4B4"
                      markerLength={18}
                      markerGap={6}
                      maxShift={10}
                      itemGap={12}
                      fontSize={0.875}
                      showIndex={true}
                      showMarker={true}
                      proximityRadius={80}
                      onItemClick={(_, label) => {
                        handleCategoryClick(label as CategoryName);
                        setIsMobileMenuOpen(false);
                      }}
                    />
                  </div>
                )}
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
