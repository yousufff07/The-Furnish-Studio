import React from 'react';
import { FilterState, CategoryName } from '../../types';
import { useApp } from '../../context/AppContext';
import SplitText from './SplitText';
import { RotateCcw, Check, X } from 'lucide-react';

interface FilterSidebarProps {
  filters: FilterState;
  onChange: (updated: FilterState) => void;
  onReset: () => void;
  isMobile?: boolean;
  onCloseMobile?: () => void;
}

export const FilterSidebar: React.FC<FilterSidebarProps> = ({
  filters,
  onChange,
  onReset,
  isMobile = false,
  onCloseMobile
}) => {
  const { categories } = useApp();

  const materialsList = ['Wood', 'Metal', 'Glass', 'Fabric', 'Leather', 'Mixed', 'Ceramic', 'Stone'];

  const handleCategoryChange = (cat: string) => {
    onChange({ ...filters, category: cat });
  };

  const handlePriceMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange({ ...filters, priceRange: [0, Number(e.target.value)] });
  };

  const handleMaterialToggle = (mat: string) => {
    const exists = filters.materials.includes(mat);
    const updated = exists 
      ? filters.materials.filter(m => m !== mat)
      : [...filters.materials, mat];
    onChange({ ...filters, materials: updated });
  };

  return (
    <div className={`space-y-6 ${isMobile ? 'p-4' : ''}`}>
      {/* Header / Reset */}
      <div className="flex items-center justify-between pb-4 border-b border-[#EBD8C6]">
        <SplitText text="Refine Catalog" tag="h3" className="font-serif font-bold text-lg text-[#1E1A17]" />
        <div className="flex items-center gap-2">
          <button
            onClick={onReset}
            className="text-xs font-semibold text-[#964627] hover:text-[#1E1A17] flex items-center gap-1 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset</span>
          </button>
          {isMobile && onCloseMobile && (
            <button onClick={onCloseMobile} className="p-1 text-[#1E1A17]">
              <X className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>

      {/* 1. Category Filter */}
      <div className="space-y-2.5">
        <h4 className="font-serif font-semibold text-sm text-[#1E1A17] uppercase tracking-wider">Category</h4>
        <div className="space-y-1">
          <button
            onClick={() => handleCategoryChange('All')}
            className={`w-full text-left px-3 py-1.5 rounded-lg text-sm transition-colors flex items-center justify-between ${
              filters.category === 'All' ? 'bg-[#1E1A17] text-[#F8ECE1] font-semibold' : 'text-[#1E1A17]/80 hover:bg-[#F3E5D8]'
            }`}
          >
            <span>All Divisions</span>
            <span className="text-xs opacity-70 font-mono">ALL</span>
          </button>
          {categories.map(cat => (
            <button
              key={cat.name}
              onClick={() => handleCategoryChange(cat.name)}
              className={`w-full text-left px-3 py-2 rounded-xl text-sm transition-all flex items-center justify-between gap-2 ${
                filters.category === cat.name ? 'bg-[#1E1A17] text-[#F8ECE1] font-bold shadow-sm scale-[1.02]' : 'text-[#1E1A17]/80 hover:bg-[#F3E5D8]/80 hover:text-[#964627]'
              }`}
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-6 h-6 rounded-md object-cover flex-shrink-0 border border-black/10 shadow-sm"
                />
                <span className="truncate">{cat.name}</span>
              </div>
              <span className="text-xs opacity-80 font-mono flex-shrink-0">({cat.count})</span>
            </button>
          ))}
        </div>
      </div>

      {/* 2. Price Range Slider */}
      <div className="space-y-3 pt-4 border-t border-[#EBD8C6]">
        <div className="flex items-center justify-between">
          <h4 className="font-serif font-semibold text-sm text-[#1E1A17] uppercase tracking-wider">Max Price</h4>
          <span className="font-serif font-bold text-sm text-[#964627]">
            ₹{filters.priceRange[1].toLocaleString('en-IN')}
          </span>
        </div>
        <input
          type="range"
          min="10000"
          max="1500000"
          step="10000"
          value={filters.priceRange[1]}
          onChange={handlePriceMaxChange}
          className="w-full accent-[#964627] cursor-pointer"
        />
        <div className="flex justify-between text-[11px] text-[#8D9399] font-mono">
          <span>₹10,000</span>
          <span>₹15,00,000</span>
        </div>
      </div>

      {/* 3. Primary Material Filter */}
      <div className="space-y-2.5 pt-4 border-t border-[#EBD8C6]">
        <h4 className="font-serif font-semibold text-sm text-[#1E1A17] uppercase tracking-wider">Primary Material</h4>
        <div className="grid grid-cols-2 gap-2">
          {materialsList.map(mat => {
            const isSelected = filters.materials.includes(mat);
            return (
              <button
                key={mat}
                onClick={() => handleMaterialToggle(mat)}
                className={`px-3 py-2 rounded-lg text-xs font-medium border transition-all flex items-center justify-center gap-1.5 ${
                  isSelected 
                    ? 'bg-[#964627] border-[#964627] text-[#F8ECE1] shadow-sm' 
                    : 'bg-[#F8ECE1] border-[#EBD8C6] text-[#1E1A17]/80 hover:border-[#CCA37E]'
                }`}
              >
                {isSelected && <Check className="w-3 h-3" />}
                <span>{mat}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 4. Stock & Rating */}
      <div className="space-y-3 pt-4 border-t border-[#EBD8C6]">
        <label className="flex items-center justify-between cursor-pointer">
          <span className="text-sm font-medium text-[#1E1A17]">In Stock Only</span>
          <input
            type="checkbox"
            checked={filters.inStockOnly}
            onChange={(e) => onChange({ ...filters, inStockOnly: e.target.checked })}
            className="w-4 h-4 accent-[#964627] rounded cursor-pointer"
          />
        </label>

        <div className="space-y-1.5 pt-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#8D9399] block">Min Customer Rating</span>
          <select
            value={filters.ratingMin}
            onChange={(e) => onChange({ ...filters, ratingMin: Number(e.target.value) })}
            className="w-full bg-[#F3E5D8] border border-[#EBD8C6] rounded-lg p-2 text-sm text-[#1E1A17] focus:outline-none focus:border-[#CCA37E]"
          >
            <option value={0}>All Ratings</option>
            <option value={4.5}>4.5 Stars & Above (&starf;&starf;&starf;&starf;&half;)</option>
            <option value={4.8}>4.8 Stars & Above (&starf;&starf;&starf;&starf;&starf;)</option>
          </select>
        </div>
      </div>

    </div>
  );
};
