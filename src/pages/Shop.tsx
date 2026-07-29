import React, { useState, useMemo, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { FilterSidebar } from '../components/common/FilterSidebar';
import { ProductCard } from '../components/common/ProductCard';
import { LogoLoop } from '../components/common/LogoLoop';
import { FilterState, SortOption } from '../types';
import { SlidersHorizontal, Search, X, ChevronLeft, ChevronRight, PackageOpen } from 'lucide-react';

export const Shop: React.FC = () => {
  const { products, categories, selectedCategoryFilter, setSelectedCategoryFilter, searchQuery, setSearchQuery } = useApp();
  
  const allDivisionsList = useMemo(() => [
    { name: 'All', count: products.length, isAll: true, image: '' },
    ...categories
  ], [categories, products.length]);
  
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // Filter state
  const [filters, setFilters] = useState<FilterState>({
    category: selectedCategoryFilter || 'All',
    priceRange: [0, 1500000],
    materials: [],
    colors: [],
    inStockOnly: false,
    ratingMin: 0
  });

  const [sortBy, setSortBy] = useState<SortOption>('featured');

  // Sync category filter from context when navigating from Home
  useEffect(() => {
    if (selectedCategoryFilter) {
      setFilters(prev => ({ ...prev, category: selectedCategoryFilter }));
      setCurrentPage(1);
    }
  }, [selectedCategoryFilter]);

  // Reset filters
  const handleResetFilters = () => {
    setFilters({
      category: 'All',
      priceRange: [0, 1500000],
      materials: [],
      colors: [],
      inStockOnly: false,
      ratingMin: 0
    });
    setSearchQuery('');
    setSelectedCategoryFilter('All');
    setCurrentPage(1);
  };

  // Filter and Sort logic
  const filteredProducts = useMemo(() => {
    return products.filter(prod => {
      // 1. Category
      if (filters.category !== 'All' && prod.category !== filters.category) return false;
      // 2. Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchName = prod.name.toLowerCase().includes(q);
        const matchDesc = prod.description.toLowerCase().includes(q);
        const matchCat = prod.category.toLowerCase().includes(q);
        const matchMat = prod.material.toLowerCase().includes(q);
        if (!matchName && !matchDesc && !matchCat && !matchMat) return false;
      }
      // 3. Price max
      if (prod.price > filters.priceRange[1]) return false;
      // 4. Materials
      if (filters.materials.length > 0 && !filters.materials.includes(prod.material)) return false;
      // 5. In stock
      if (filters.inStockOnly && prod.stock <= 0) return false;
      // 7. Rating min
      if (prod.rating < filters.ratingMin) return false;

      return true;
    }).sort((a, b) => {
      switch (sortBy) {
        case 'price-asc': return a.price - b.price;
        case 'price-desc': return b.price - a.price;
        case 'newest': return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        case 'rating': return b.rating - a.rating;
        case 'best-selling': return (b.isBestSeller ? 1 : 0) - (a.isBestSeller ? 1 : 0);
        default: return 0; // featured
      }
    });
  }, [products, filters, searchQuery, sortBy]);

  // Pagination
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const paginatedProducts = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredProducts.slice(start, start + itemsPerPage);
  }, [filteredProducts, currentPage]);

  // Handle page change
  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
      window.scrollTo({ top: 120, behavior: 'smooth' });
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-in fade-in duration-300">
      
      {/* Page Header */}
      <div className="border-b border-[#EBD8C6] pb-6 mb-6">
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#1E1A17] mb-2">
          {filters.category === 'All' ? 'The Architectural Collection' : `${filters.category} Collection`}
        </h1>
        <p className="text-sm text-[#1E1A17]/70 font-sans">
          Showing {filteredProducts.length} handcrafted pieces available for direct studio dispatch.
        </p>
      </div>

      {/* Studio Divisions Marquee Bar */}
      <div className="mb-8 bg-[#F3E5D8]/50 border border-[#EBD8C6] rounded-3xl p-5 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
          <div className="flex items-center gap-2.5">
            <span className="text-xs font-bold uppercase tracking-wider text-[#964627] bg-[#F3E5D8] px-3 py-1 rounded-full border border-[#EBD8C6]">
              Studio Divisions ({categories.length})
            </span>
            <span className="text-xs text-[#8D9399] font-mono hidden md:inline">Continuous live marquee • Hover to pause • Click to filter</span>
          </div>
          <button
            onClick={() => {
              setFilters(prev => ({ ...prev, category: 'All' }));
              setSelectedCategoryFilter(null);
              setCurrentPage(1);
            }}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all flex items-center gap-1.5 self-start sm:self-auto ${
              filters.category === 'All'
                ? 'bg-[#1E1A17] text-[#F8ECE1] shadow-md font-bold ring-2 ring-[#CCA37E]'
                : 'bg-white hover:bg-[#F8ECE1] text-[#1E1A17]/80 border border-[#EBD8C6]'
            }`}
          >
            <span>Show All Divisions</span>
            <span className="text-[10px] px-1.5 py-0.2 bg-[#CCA37E] text-[#1E1A17] rounded-full font-mono font-bold">
              {products.length}
            </span>
          </button>
        </div>

        <LogoLoop
          logos={allDivisionsList}
          speed={35}
          direction="left"
          logoHeight={48}
          gap={14}
          pauseOnHover={true}
          scaleOnHover={true}
          fadeOut={true}
          ariaLabel="Studio Divisions marquee"
          renderItem={(cat: any) => {
            const isSelected = filters.category === cat.name;
            return (
              <button
                key={cat.name}
                onClick={() => {
                  setFilters(prev => ({ ...prev, category: cat.name }));
                  setSelectedCategoryFilter(cat.isAll ? null : cat.name);
                  setCurrentPage(1);
                }}
                className={`flex items-center gap-2.5 px-4 py-2.5 rounded-2xl border transition-all cursor-pointer shadow-sm ${
                  isSelected
                    ? 'bg-[#1E1A17] text-[#F8ECE1] border-[#1E1A17] ring-2 ring-offset-2 ring-[#1E1A17] scale-105 font-bold'
                    : 'bg-white/90 hover:bg-white text-[#1E1A17] border-[#EBD8C6] hover:border-[#CCA37E]'
                }`}
              >
                {!cat.isAll && cat.image && (
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className="w-7 h-7 rounded-lg object-cover flex-shrink-0 border border-black/10"
                  />
                )}
                {cat.isAll && (
                  <span className="w-7 h-7 rounded-lg bg-[#CCA37E] text-[#1E1A17] flex items-center justify-center font-bold text-xs">
                    ★
                  </span>
                )}
                <span className="text-xs font-bold uppercase tracking-wider whitespace-nowrap">{cat.isAll ? 'All Divisions' : cat.name}</span>
                <span className={`text-[10px] px-2 py-0.5 rounded-full font-mono font-bold ${
                  isSelected ? 'bg-[#CCA37E] text-[#1E1A17]' : 'bg-[#F3E5D8] text-[#8D9399]'
                }`}>
                  {cat.count}
                </span>
              </button>
            );
          }}
        />
      </div>

      {/* Main Layout Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* Desktop Sidebar */}
        <div className="hidden lg:block lg:col-span-1">
          <div className="sticky top-28 bg-[#F3E5D8]/40 border border-[#EBD8C6] rounded-2xl p-6 shadow-sm">
            <FilterSidebar 
              filters={filters}
              onChange={(updated) => { setFilters(updated); setCurrentPage(1); }}
              onReset={handleResetFilters}
            />
          </div>
        </div>

        {/* Product List Area */}
        <div className="lg:col-span-3 space-y-6">
          
          {/* Top Controls Bar */}
          <div className="bg-[#F3E5D8]/50 border border-[#EBD8C6] rounded-xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
            
            {/* Search and Mobile Filter Toggle */}
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <button
                onClick={() => setIsMobileFilterOpen(true)}
                className="lg:hidden px-4 py-2 bg-[#1E1A17] text-[#F8ECE1] rounded-lg text-sm font-semibold flex items-center gap-2 shadow-sm"
              >
                <SlidersHorizontal className="w-4 h-4" />
                <span>Filters</span>
              </button>

              <div className="relative flex-1 sm:w-64">
                <input
                  type="text"
                  placeholder="Search catalog..."
                  value={searchQuery}
                  onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
                  className="w-full bg-[#F8ECE1] border border-[#CCA37E] rounded-lg py-1.5 pl-3.5 pr-8 text-sm text-[#1E1A17] placeholder-[#8D9399] focus:outline-none focus:ring-1 focus:ring-[#964627]"
                />
                {searchQuery ? (
                  <button onClick={() => setSearchQuery('')} className="absolute right-2.5 top-2 text-[#8D9399] hover:text-[#1E1A17]">
                    <X className="w-4 h-4" />
                  </button>
                ) : (
                  <Search className="absolute right-2.5 top-2 w-4 h-4 text-[#8D9399]" />
                )}
              </div>
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
              <label htmlFor="sort-by-select" className="text-xs font-semibold text-[#8D9399] uppercase tracking-wider">Sort By:</label>
              <select
                id="sort-by-select"
                aria-label="Sort catalog items"
                value={sortBy}
                onChange={(e) => { setSortBy(e.target.value as SortOption); setCurrentPage(1); }}
                className="bg-[#F8ECE1] border border-[#CCA37E] rounded-lg py-1.5 px-3 text-sm font-semibold text-[#1E1A17] focus:outline-none focus:ring-1 focus:ring-[#964627] cursor-pointer"
              >
                <option value="featured">Featured Curations</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="newest">Newest Arrivals</option>
                <option value="best-selling">Best Selling First</option>
                <option value="rating">Highest Customer Rating</option>
              </select>
            </div>

          </div>

          {/* Active Filter Badges */}
          {(filters.category !== 'All' || filters.materials.length > 0 || searchQuery || filters.inStockOnly || filters.ratingMin > 0) && (
            <div className="flex flex-wrap items-center gap-2 pt-1">
              <span className="text-xs text-[#8D9399]">Active Refinements:</span>
              {filters.category !== 'All' && (
                <span className="inline-flex items-center gap-1.5 bg-[#EBD8C6] text-[#964627] text-xs font-semibold px-2.5 py-1 rounded-full">
                  {filters.category}
                  <button onClick={() => setFilters({ ...filters, category: 'All' })} className="hover:text-[#1E1A17]"><X className="w-3 h-3" /></button>
                </span>
              )}
              {searchQuery && (
                <span className="inline-flex items-center gap-1.5 bg-[#EBD8C6] text-[#964627] text-xs font-semibold px-2.5 py-1 rounded-full">
                  "{searchQuery}"
                  <button onClick={() => setSearchQuery('')} className="hover:text-[#1E1A17]"><X className="w-3 h-3" /></button>
                </span>
              )}
              {filters.materials.map(mat => (
                <span key={mat} className="inline-flex items-center gap-1.5 bg-[#EBD8C6] text-[#964627] text-xs font-semibold px-2.5 py-1 rounded-full">
                  {mat}
                  <button onClick={() => setFilters({ ...filters, materials: filters.materials.filter(m => m !== mat) })} className="hover:text-[#1E1A17]"><X className="w-3 h-3" /></button>
                </span>
              ))}
              {filters.inStockOnly && (
                <span className="inline-flex items-center gap-1.5 bg-[#EBD8C6] text-[#964627] text-xs font-semibold px-2.5 py-1 rounded-full">
                  In Stock Only
                  <button onClick={() => setFilters({ ...filters, inStockOnly: false })} className="hover:text-[#1E1A17]"><X className="w-3 h-3" /></button>
                </span>
              )}
              {filters.ratingMin > 0 && (
                <span className="inline-flex items-center gap-1.5 bg-[#EBD8C6] text-[#964627] text-xs font-semibold px-2.5 py-1 rounded-full">
                  {filters.ratingMin}+ Stars
                  <button onClick={() => setFilters({ ...filters, ratingMin: 0 })} className="hover:text-[#1E1A17]"><X className="w-3 h-3" /></button>
                </span>
              )}
              <button onClick={handleResetFilters} className="text-xs text-[#964627] underline ml-1 hover:text-[#1E1A17]">
                Clear All
              </button>
            </div>
          )}

          {/* Product Grid */}
          {paginatedProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {paginatedProducts.map(prod => (
                <ProductCard key={prod.id} product={prod} />
              ))}
            </div>
          ) : (
            <div className="bg-[#F3E5D8]/40 border border-dashed border-[#CCA37E] rounded-2xl p-12 text-center my-8">
              <PackageOpen className="w-12 h-12 text-[#CCA37E] mx-auto mb-3" />
              <h3 className="font-serif font-bold text-xl text-[#1E1A17] mb-1">No catalog pieces match your criteria</h3>
              <p className="text-sm text-[#8D9399] max-w-md mx-auto mb-6">
                Try expanding your price range, clearing refinement filters, or searching for broader architectural terms.
              </p>
              <button
                onClick={handleResetFilters}
                className="px-6 py-2.5 bg-[#964627] hover:bg-[#1E1A17] text-[#F8ECE1] font-semibold text-sm rounded-xl transition-colors shadow-md"
              >
                Reset All Filters
              </button>
            </div>
          )}

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between pt-8 border-t border-[#EBD8C6]">
              <p className="text-xs text-[#8D9399]">
                Page <span className="font-bold text-[#1E1A17]">{currentPage}</span> of <span className="font-bold text-[#1E1A17]">{totalPages}</span>
              </p>
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="p-2 rounded-lg border border-[#CCA37E] disabled:opacity-40 disabled:cursor-not-allowed hover:bg-[#F3E5D8] transition-colors"
                  aria-label="Previous page"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                  <button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    className={`w-9 h-9 rounded-lg font-mono text-sm font-bold transition-all ${
                      currentPage === page 
                        ? 'bg-[#1E1A17] text-[#F8ECE1] shadow-md' 
                        : 'bg-[#F3E5D8] text-[#1E1A17] hover:bg-[#CCA37E]'
                    }`}
                  >
                    {page}
                  </button>
                ))}

                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="p-2 rounded-lg border border-[#CCA37E] disabled:opacity-40 disabled:cursor-not-allowed hover:bg-[#F3E5D8] transition-colors"
                  aria-label="Next page"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

        </div>

      </div>

      {/* Mobile Filter Modal */}
      {isMobileFilterOpen && (
        <div className="lg:hidden fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex justify-end">
          <div className="bg-[#F8ECE1] w-full max-w-sm h-full overflow-y-auto shadow-2xl animate-in slide-in-from-right duration-300">
            <FilterSidebar 
              filters={filters}
              onChange={(updated) => { setFilters(updated); setCurrentPage(1); }}
              onReset={handleResetFilters}
              isMobile={true}
              onCloseMobile={() => setIsMobileFilterOpen(false)}
            />
            <div className="p-4 border-t border-[#EBD8C6] sticky bottom-0 bg-[#F8ECE1]">
              <button
                onClick={() => setIsMobileFilterOpen(false)}
                className="w-full py-3 bg-[#1E1A17] text-[#F8ECE1] font-bold rounded-xl shadow-lg"
              >
                Apply Refinements ({filteredProducts.length} Results)
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
