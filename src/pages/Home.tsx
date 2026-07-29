import React, { useState } from 'react';
import { motion } from 'motion/react';
import { useApp } from '../context/AppContext';
import heroSectionalImg from '../assets/images/hero_living_room_sectional_1784999212289.jpg';
import kitchenIslandImg from '../assets/images/kitchen_dining_island_1785070726586.jpg';
import { ProductCard } from '../components/common/ProductCard';
import { Rating } from '../components/common/Rating';
import Counter from '../components/common/Counter';
import { LogoLoop } from '../components/common/LogoLoop';
import SplitText from '../components/common/SplitText';
import { 
  ArrowRight, Sparkles, ChevronRight, ChevronLeft, ShieldCheck, 
  Truck, RefreshCw, Award, Quote 
} from 'lucide-react';

export const Home: React.FC = () => {
  const { products, categories, navigate, showToast } = useApp();
  const [activeTestimonialIdx, setActiveTestimonialIdx] = useState(0);

  // Best selling products
  const bestSellers = products.filter(p => p.isBestSeller).slice(0, 4);
  const newArrivals = products.filter(p => p.isNew).slice(0, 4);

  const testimonials = [
    {
      quote: "The Astrid Velvet Sofa is single-handedly the most complimented piece in my architectural studio. The proportions are immaculate and the rust tone adds immense warmth to raw concrete.",
      author: "Aria Montgomery",
      role: "Principal Architect, Bandra West",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80",
      rating: 5
    },
    {
      quote: "White-glove delivery in Mumbai was flawless. The Køben solid oak dining table arrived without a single scratch, and the wood grain texture is even more sublime in person.",
      author: "Vikramaditya Rao",
      role: "Art Collector & Curator",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80",
      rating: 5
    },
    {
      quote: "As an interior designer, finding sustainable European white oak with genuine craftsmanship at this price point is rare. The Furnish Studio is now my permanent specification partner.",
      author: "Sophia Laurent",
      role: "Founder, Laurent Interiors",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80",
      rating: 5
    }
  ];

  return (
    <div className="space-y-20 pb-16 animate-in fade-in duration-500">
      
      {/* 1. Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#F8ECE1] to-[#F3E5D8] pt-8 pb-16 lg:py-24 border-b border-[#EBD8C6]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Copy */}
            <div className="lg:col-span-6 space-y-6 text-center lg:text-left z-10">
              <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1]" style={{ fontFamily: "'Georgia', serif" }}>
                <SplitText
                  text="Elegance in"
                  className="text-[#1E1A17]"
                  tag="span"
                  delay={50}
                  duration={1.25}
                  splitType="chars,words"
                  textAlign="inherit"
                />
                <br />
                <SplitText
                  text="Every Detail."
                  className="italic font-normal text-[#AD7C52]"
                  tag="span"
                  delay={50}
                  duration={1.25}
                  splitType="chars,words"
                  textAlign="inherit"
                />
              </h1>

              <div className="text-base sm:text-lg text-[#1E1A17]/70 leading-relaxed font-sans max-w-xl mx-auto lg:mx-0 min-h-[56px]">
                <SplitText
                  text="Discover curated furniture that blends timeless craftsmanship with modern sensibilities. Designed for living, built for life."
                  className="text-[#1E1A17]/70"
                  delay={50}
                  duration={1.25}
                  splitType="chars,words"
                  textAlign="inherit"
                />
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4">
                <button
                  onClick={() => navigate('shop', { category: 'All' })}
                  className="w-full sm:w-auto px-8 py-4 bg-[#CCA37E] text-white hover:bg-[#AD7C52] font-serif font-semibold rounded-full shadow-lg shadow-[#CCA37E]/20 transition-all flex items-center justify-center gap-2 group"
                >
                  <span>Shop the Collection</span>
                  <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                </button>
                <button
                  onClick={() => navigate('shop', { category: 'Living Room' })}
                  className="w-full sm:w-auto px-8 py-4 bg-transparent hover:bg-[#CCA37E]/5 border border-[#CCA37E] text-[#CCA37E] font-serif font-semibold rounded-full transition-all text-center"
                >
                  View Lookbook
                </button>
              </div>

              {/* Mini Social Proof */}
              <div className="pt-6 border-t border-[#EBD8C6] flex flex-wrap items-center justify-center lg:justify-start gap-6 sm:gap-8">
                <div>
                  <div className="flex items-baseline font-serif font-bold text-2xl sm:text-3xl text-[#1E1A17]">
                    <Counter value={4.9} fontSize={26} gap={1} gradientFrom="transparent" />
                    <span className="ml-1 text-lg text-[#8D9399] font-normal">/ 5</span>
                  </div>
                  <p className="text-xs text-[#8D9399] flex items-center gap-1 mt-0.5 font-medium">
                    <span>Over</span>
                    <Counter value={1200} fontSize={13} gap={0.5} fontWeight="bold" textColor="#964627" gradientFrom="transparent" />
                    <span>verified reviews</span>
                  </p>
                </div>
                <div className="h-10 w-px bg-[#EBD8C6]" />
                <div>
                  <div className="flex items-baseline font-serif font-bold text-2xl sm:text-3xl text-[#1E1A17]">
                    <Counter value={100} fontSize={26} gap={1} gradientFrom="transparent" />
                    <span className="text-[#964627] ml-0.5">%</span>
                  </div>
                  <p className="text-xs text-[#8D9399] mt-0.5 font-medium">FSC-Certified Timbers</p>
                </div>
              </div>
            </div>

            {/* Right Hero Image with Architectural Fade */}
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, ease: "easeOut", delay: 0.1 }}
              className="lg:col-span-6 relative"
            >
              <div className="relative mx-auto max-w-lg lg:max-w-none">
                <div className="aspect-[4/3] sm:aspect-[16/11] rounded-3xl overflow-hidden shadow-2xl border border-[#EBD8C6]/50 relative group bg-[#1E1A17]">
                  <img
                    src={heroSectionalImg}
                    alt="The Sovereign Modular Sectional in architectural living room"
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-1000 ease-out opacity-95"
                  />
                  
                  {/* Primary Cinematic Gradient Fade Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1E1A17]/85 via-[#1E1A17]/30 to-transparent pointer-events-none transition-opacity duration-700 group-hover:opacity-90" />
                  
                  {/* Warm Architectural Side & Top Fade */}
                  <div className="absolute inset-0 bg-gradient-to-r from-[#1E1A17]/40 via-transparent to-[#1E1A17]/20 pointer-events-none mix-blend-multiply opacity-70" />
                  <div className="absolute inset-0 bg-gradient-to-b from-[#1E1A17]/20 via-transparent to-transparent pointer-events-none opacity-50" />
                  
                  {/* Inner Soft Vignette Shadow */}
                  <div className="absolute inset-0 shadow-[inset_0_0_80px_rgba(30,26,23,0.4)] pointer-events-none rounded-3xl" />

                  {/* Editorial Glassmorphism Badge embedded inside the faded zone */}
                  <div className="absolute bottom-6 left-6 right-6 flex flex-col sm:flex-row sm:items-end justify-between gap-3 pointer-events-none text-white z-10">
                    <div className="backdrop-blur-md bg-[#1E1A17]/60 px-5 py-3.5 rounded-2xl border border-white/15 shadow-xl transition-all duration-300 group-hover:bg-[#1E1A17]/70">
                      <div className="flex items-center gap-2 mb-1.5">
                        <span className="w-2 h-2 rounded-full bg-[#CCA37E] animate-pulse" />
                        <span className="text-[10px] font-mono uppercase tracking-widest text-[#CCA37E]">Architectural Sanctuary</span>
                      </div>
                      <p className="font-serif text-base sm:text-lg font-bold text-[#F8ECE1] leading-tight">The Sovereign Sectional</p>
                      <p className="text-xs text-[#EBD8C6]/85 font-sans mt-0.5">Bespoke modular living in sun-drenched Alabaster fabric</p>
                    </div>
                    <div className="backdrop-blur-md bg-white/15 px-4 py-2 rounded-xl border border-white/20 text-xs font-mono text-[#F8ECE1] self-start sm:self-end shrink-0">
                      Lookbook Vol. IV
                    </div>
                  </div>
                </div>
                
                {/* Decorative Ambient Glow & Fade Pills */}
                <div className="absolute -top-6 -right-6 w-36 h-36 bg-[#EBD8C6]/60 rounded-full blur-3xl -z-10" />
                <div className="absolute -bottom-8 -left-8 w-48 h-48 bg-[#CCA37E]/30 rounded-full blur-3xl -z-10" />
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* Trust Bar */}
      <section className="bg-[#F3E5D8] py-4 px-6 sm:px-12 border-b border-[#EBD8C6]">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-center gap-8 sm:gap-16">
          <div className="flex items-center space-x-2 text-[10px] sm:text-xs uppercase font-bold tracking-widest text-[#AD7C52]">
            <span className="w-2 h-2 rounded-full bg-[#CCA37E]"></span>
            <span>Free Pan-India Delivery</span>
          </div>
          <div className="flex items-center space-x-2 text-[10px] sm:text-xs uppercase font-bold tracking-widest text-[#AD7C52]">
            <span className="w-2 h-2 rounded-full bg-[#CCA37E]"></span>
            <span>Easy Returns</span>
          </div>
          <div className="flex items-center space-x-2 text-[10px] sm:text-xs uppercase font-bold tracking-widest text-[#AD7C52]">
            <span className="w-2 h-2 rounded-full bg-[#CCA37E]"></span>
            <span>Secure Payments</span>
          </div>
          <div className="flex items-center space-x-2 text-[10px] sm:text-xs uppercase font-bold tracking-widest text-[#AD7C52]">
            <span className="w-2 h-2 rounded-full bg-[#CCA37E]"></span>
            <span>Quality Guaranteed</span>
          </div>
        </div>
      </section>

      {/* 2. Category Grid (Studio Divisions) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#964627] block mb-1">Architectural Divisions</span>
            <SplitText text="Shop by Category" tag="h2" className="font-serif text-3xl sm:text-4xl font-bold text-[#1E1A17]" />
          </div>
          <button
            onClick={() => navigate('shop', { category: 'All' })}
            className="text-sm font-semibold text-[#964627] hover:text-[#1E1A17] flex items-center gap-1 transition-colors group"
          >
            <span>View All {categories.length} Divisions</span>
            <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Studio Divisions LogoLoop Marquee */}
        <div className="mb-10 bg-[#F3E5D8]/40 border border-[#EBD8C6] rounded-3xl p-4 shadow-sm overflow-hidden">
          <div className="flex items-center justify-between px-2 mb-3">
            <span className="text-[11px] font-bold uppercase tracking-widest text-[#8D9399]">Live Studio Divisions Loop</span>
            <span className="text-[11px] font-mono text-[#964627]">Click division to explore catalog</span>
          </div>
          <LogoLoop
            logos={categories}
            speed={40}
            direction="left"
            logoHeight={56}
            gap={16}
            pauseOnHover={true}
            scaleOnHover={true}
            fadeOut={true}
            ariaLabel="Architectural Studio Divisions"
            renderItem={(cat: any) => (
              <div
                key={cat.name}
                onClick={() => navigate('shop', { category: cat.name })}
                className="flex items-center gap-3 bg-[#F8ECE1] hover:bg-white border border-[#EBD8C6] hover:border-[#CCA37E] px-4 py-2.5 rounded-2xl cursor-pointer shadow-sm hover:shadow-md transition-all group"
              >
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-10 h-10 rounded-xl object-cover flex-shrink-0 group-hover:scale-105 transition-transform border border-black/10"
                />
                <div className="flex flex-col text-left">
                  <span className="text-[10px] font-mono uppercase font-bold text-[#964627]">{cat.count} Pieces</span>
                  <span className="font-serif font-bold text-sm text-[#1E1A17] group-hover:text-[#964627] transition-colors whitespace-nowrap">{cat.name} Division</span>
                </div>
              </div>
            )}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((cat, idx) => {
            const isWide = idx % 6 === 0 || idx % 6 === 5;
            return (
              <div
                key={cat.name}
                onClick={() => navigate('shop', { category: cat.name })}
                className={`group relative rounded-2xl overflow-hidden cursor-pointer shadow-md hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1.5 ${
                  isWide ? 'sm:col-span-2 lg:col-span-2 aspect-[16/9]' : 'aspect-square sm:aspect-auto sm:h-72'
                }`}
              >
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1E1A17]/80 via-[#1E1A17]/20 to-transparent" />
                
                <div className="absolute bottom-0 inset-x-0 p-6 flex items-end justify-between text-[#F8ECE1]">
                  <div>
                    <p className="text-xs font-mono text-[#EBD8C6] uppercase tracking-wider mb-1">{cat.count} Pieces</p>
                    <h3 className="font-serif text-xl sm:text-2xl font-bold group-hover:text-[#CCA37E] transition-colors">{cat.name}</h3>
                    {isWide && (
                      <p className="text-xs text-[#E2CEBD]/90 mt-1 max-w-md hidden sm:block font-sans">
                        {cat.description}
                      </p>
                    )}
                  </div>
                  <div className="w-10 h-10 rounded-full bg-[#F8ECE1]/20 backdrop-blur-sm group-hover:bg-[#CCA37E] group-hover:text-[#1E1A17] flex items-center justify-center transition-all">
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Material & Craft Studios Feature Row */}
        <div className="mt-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-6">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-[#CCA37E] block mb-1">Architectural Palette</span>
              <SplitText text="Curated Material & Craft Studios" tag="h3" className="font-serif text-2xl font-bold text-[#1E1A17]" />
            </div>
            <p className="text-sm text-[#8D9399] mt-2 md:mt-0 max-w-sm">
              Explore our architectural furniture organized by primary material and tactile finishes.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5 min-h-[220px]">
            <div 
              onClick={() => navigate('shop', { material: 'Wood' })}
              className="group relative rounded-3xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer aspect-[4/3] sm:aspect-auto sm:h-60"
            >
              <img
                src="https://images.unsplash.com/photo-1544457070-4cd773b4d71e?auto=format&fit=crop&w=800&q=80"
                alt="Solid Wood Studio"
                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1E1A17]/90 via-[#1E1A17]/30 to-transparent" />
              <div className="absolute bottom-0 inset-x-0 p-6 flex items-end justify-between text-[#F8ECE1]">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-[#CCA37E] block mb-1">Kiln-Dried Hardwoods</span>
                  <h3 className="font-serif text-xl font-bold text-white group-hover:text-[#CCA37E] transition-colors">Solid Oak & Walnut</h3>
                  <p className="text-xs text-[#EBD8C6] mt-0.5">Steam-Bent & Carved</p>
                </div>
                <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm group-hover:bg-[#CCA37E] group-hover:text-[#1E1A17] flex items-center justify-center transition-all">
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </div>
            
            <div 
              onClick={() => navigate('shop', { material: 'Stone' })}
              className="group relative rounded-3xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer aspect-[4/3] sm:aspect-auto sm:h-60"
            >
              <img
                src={kitchenIslandImg}
                alt="Stone & Marble Studio"
                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1E1A17]/90 via-[#1E1A17]/30 to-transparent" />
              <div className="absolute bottom-0 inset-x-0 p-6 flex items-end justify-between text-[#F8ECE1]">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-[#CCA37E] block mb-1">Monolithic Stone</span>
                  <h3 className="font-serif text-xl font-bold text-white group-hover:text-[#CCA37E] transition-colors">Travertine & Stone</h3>
                  <p className="text-xs text-[#EBD8C6] mt-0.5">Honed Italian Slabs</p>
                </div>
                <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm group-hover:bg-[#CCA37E] group-hover:text-[#1E1A17] flex items-center justify-center transition-all">
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </div>

            <div 
              onClick={() => navigate('shop', { material: 'Leather' })}
              className="group relative rounded-3xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer aspect-[4/3] sm:aspect-auto sm:h-60"
            >
              <img
                src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=800&q=80"
                alt="Supple Leather Studio"
                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1E1A17]/90 via-[#1E1A17]/30 to-transparent" />
              <div className="absolute bottom-0 inset-x-0 p-6 flex items-end justify-between text-[#F8ECE1]">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-[#CCA37E] block mb-1">Full-Grain Hides</span>
                  <h3 className="font-serif text-xl font-bold text-white group-hover:text-[#CCA37E] transition-colors">Saddle Leather</h3>
                  <p className="text-xs text-[#EBD8C6] mt-0.5">Aniline & Top-Grain</p>
                </div>
                <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm group-hover:bg-[#CCA37E] group-hover:text-[#1E1A17] flex items-center justify-center transition-all">
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </div>

            <div 
              onClick={() => navigate('shop', { material: 'Metal' })}
              className="group relative rounded-3xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer aspect-[4/3] sm:aspect-auto sm:h-60"
            >
              <img
                src="https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=800&q=80"
                alt="Patinated Metal Studio"
                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1E1A17]/90 via-[#1E1A17]/30 to-transparent" />
              <div className="absolute bottom-0 inset-x-0 p-6 flex items-end justify-between text-[#F8ECE1]">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-[#CCA37E] block mb-1">Unlacquered Metal</span>
                  <h3 className="font-serif text-xl font-bold text-white group-hover:text-[#CCA37E] transition-colors">Patinated Brass</h3>
                  <p className="text-xs text-[#EBD8C6] mt-0.5">Hand-Spun & Aged</p>
                </div>
                <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm group-hover:bg-[#CCA37E] group-hover:text-[#1E1A17] flex items-center justify-center transition-all">
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </div>

            <div 
              onClick={() => navigate('shop', { material: 'Fabric' })}
              className="group relative rounded-3xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer aspect-[4/3] sm:aspect-auto sm:h-60 sm:col-span-2 lg:col-span-1"
            >
              <img
                src="https://images.unsplash.com/photo-1600121848594-d8644e57abab?auto=format&fit=crop&w=800&q=80"
                alt="Textile & Weaves Studio"
                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1E1A17]/90 via-[#1E1A17]/30 to-transparent" />
              <div className="absolute bottom-0 inset-x-0 p-6 flex items-end justify-between text-[#F8ECE1]">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-[#CCA37E] block mb-1">Hand-Woven Fibers</span>
                  <h3 className="font-serif text-xl font-bold text-white group-hover:text-[#CCA37E] transition-colors">Bouclé & Weaves</h3>
                  <p className="text-xs text-[#EBD8C6] mt-0.5">Belgian Linen & Wool</p>
                </div>
                <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm group-hover:bg-[#CCA37E] group-hover:text-[#1E1A17] flex items-center justify-center transition-all">
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Best-Selling Product Carousel / Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-10">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#964627] block mb-1">Curated Favorites</span>
            <SplitText text="Best-Selling Statements" tag="h2" className="font-serif text-3xl sm:text-4xl font-bold text-[#1E1A17]" />
          </div>
          <button
            onClick={() => navigate('shop', { category: 'All' })}
            className="hidden sm:flex items-center gap-1 text-sm font-semibold text-[#964627] hover:text-[#1E1A17] transition-colors"
          >
            <span>Explore Best Sellers</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {bestSellers.map(prod => (
            <ProductCard key={prod.id} product={prod} />
          ))}
        </div>
      </section>

      {/* 4. Editorial Feature Split Banner */}
      <section className="bg-[#F3E5D8] py-16 border-y border-[#EBD8C6]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 order-2 lg:order-1 space-y-6">
              <span className="text-xs font-bold uppercase tracking-wider text-[#964627] block">Materiality & Form</span>
              <SplitText text="Crafted for a lifetime of comfort and quiet presence." tag="h2" className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1E1A17] leading-tight" />
              <p className="text-base text-[#1E1A17]/80 leading-relaxed font-sans">
                Every piece in our collection is an ode to traditional joinery and modern ergonomics. We partner with family-owned mills across Scandinavia and northern Italy to source unlacquered solid brass, vegetable-tanned saddle leathers, and breathable linen weaves.
              </p>
              <div className="grid grid-cols-2 gap-6 pt-2">
                <div className="border-l-2 border-[#CCA37E] pl-4">
                  <div className="flex items-center gap-1.5 mb-0.5">
                    <span className="inline-flex items-baseline font-serif font-bold text-base text-[#964627] bg-[#F3E5D8] px-1.5 py-0.5 rounded">
                      <Counter value={100} fontSize={15} gap={0.5} gradientFrom="#F3E5D8" />
                      <span>%</span>
                    </span>
                    <h4 className="font-serif font-bold text-lg text-[#1E1A17]">FSC-Certified Timbers</h4>
                  </div>
                  <p className="text-xs text-[#8D9399] mt-1">Sustainably harvested oak, walnut, and ash.</p>
                </div>
                <div className="border-l-2 border-[#CCA37E] pl-4">
                  <h4 className="font-serif font-bold text-lg text-[#1E1A17]">Aniline Leathers</h4>
                  <p className="text-xs text-[#8D9399] mt-1">Organic vegetable tanning that patinas beautifully.</p>
                </div>
              </div>
              <div className="pt-4">
                <button
                  onClick={() => navigate('about')}
                  className="px-6 py-3 bg-[#1E1A17] hover:bg-[#964627] text-[#F8ECE1] font-serif font-bold rounded-xl transition-colors shadow-md inline-flex items-center gap-2"
                >
                  <span>Read The Brand Manifesto</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="lg:col-span-6 order-1 lg:order-2">
              <div className="grid grid-cols-2 gap-4">
                <img
                  src="https://images.unsplash.com/photo-1617806118233-18e1de247200?auto=format&fit=crop&w=600&q=80"
                  alt="Oak table joinery"
                  className="rounded-2xl shadow-lg aspect-[3/4] object-cover w-full transform -rotate-1 hover:rotate-0 transition-transform duration-500"
                />
                <img
                  src="https://images.unsplash.com/photo-1600121848594-d8644e57abab?auto=format&fit=crop&w=600&q=80"
                  alt="Artisanal textile and bouclé weave"
                  className="rounded-2xl shadow-lg aspect-[3/4] object-cover w-full transform translate-y-6 rotate-1 hover:rotate-0 transition-transform duration-500"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. New Arrivals Grid */}
      {newArrivals.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-10">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#964627] block mb-1">Just Arrived</span>
              <SplitText text="The 2026 Spring Additions" tag="h2" className="font-serif text-3xl sm:text-4xl font-bold text-[#1E1A17]" />
            </div>
            <button
              onClick={() => navigate('shop', { category: 'All' })}
              className="text-sm font-semibold text-[#964627] hover:text-[#1E1A17] flex items-center gap-1 transition-colors"
            >
              <span>View All New Arrivals</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {newArrivals.map(prod => (
              <ProductCard key={prod.id} product={prod} />
            ))}
          </div>
        </section>
      )}

      {/* 6. Testimonials Section */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <span className="text-xs font-bold uppercase tracking-wider text-[#964627] block mb-2">Voices of our Patrons</span>
        <SplitText text="Praise from Discerning Homes" tag="h2" className="font-serif text-3xl sm:text-4xl font-bold text-[#1E1A17] mb-12" />

        <div className="bg-[#F3E5D8]/80 rounded-3xl p-8 sm:p-12 shadow-xl border border-[#EBD8C6] relative">
          <Quote className="w-12 h-12 text-[#CCA37E]/30 mx-auto mb-6" />
          
          <div className="min-h-[140px] flex items-center justify-center">
            <p className="font-serif italic text-lg sm:text-2xl text-[#1E1A17] leading-relaxed max-w-3xl">
              "{testimonials[activeTestimonialIdx].quote}"
            </p>
          </div>

          <div className="mt-8 flex items-center justify-center gap-3">
            <img
              src={testimonials[activeTestimonialIdx].avatar}
              alt={testimonials[activeTestimonialIdx].author}
              className="w-12 h-12 rounded-full object-cover ring-2 ring-[#CCA37E]"
            />
            <div className="text-left">
              <h4 className="font-serif font-bold text-base text-[#1E1A17]">{testimonials[activeTestimonialIdx].author}</h4>
              <p className="text-xs text-[#8D9399] font-sans">{testimonials[activeTestimonialIdx].role}</p>
            </div>
          </div>

          <div className="mt-6 flex items-center justify-center gap-2">
            {testimonials.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setActiveTestimonialIdx(idx)}
                className={`h-2 rounded-full transition-all ${
                  activeTestimonialIdx === idx ? 'w-8 bg-[#964627]' : 'w-2 bg-[#CCA37E]/40 hover:bg-[#CCA37E]'
                }`}
                aria-label={`Go to testimonial ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* 7. Newsletter CTA Band */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-[#5E402B] to-[#964627] rounded-3xl p-8 sm:p-14 text-center text-[#F8ECE1] shadow-2xl relative overflow-hidden">
          <div className="relative z-10 max-w-2xl mx-auto space-y-6">
            <span className="text-xs font-mono uppercase tracking-widest text-[#EBD8C6] block">The Studio Journal</span>
            <SplitText text="An invitation to mindful design." tag="h2" className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight" />
            <p className="text-sm sm:text-base text-[#E2CEBD]/90 font-sans">
              Join our architectural newsletter for first access to limited editions, bespoke material swatches, and private showroom events.
            </p>
            <div className="pt-2">
              <button
                onClick={() => {
                  showToast('Thank you! A complimentary design journal and welcome discount code have been dispatched to your email.', 'success', 'Welcome to The Studio');
                }}
                className="px-8 py-4 bg-[#CCA37E] hover:bg-[#EBD8C6] text-[#1E1A17] font-serif font-bold text-base rounded-xl shadow-lg transition-all"
              >
                Claim Your 10% Welcome Voucher
              </button>
            </div>
          </div>
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-[#CCA37E]/20 rounded-full blur-3xl pointer-events-none" />
        </div>
      </section>

    </div>
  );
};
