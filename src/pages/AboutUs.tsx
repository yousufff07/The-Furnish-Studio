import React from 'react';
import { useApp } from '../context/AppContext';
import Counter from '../components/common/Counter';
import { Sparkles, ShieldCheck, TreePine, Award, ArrowRight, HeartHandshake, Compass } from 'lucide-react';

export const AboutUs: React.FC = () => {
  const { navigate } = useApp();

  return (
    <div className="space-y-20 pb-16 animate-in fade-in duration-500">
      
      {/* 1. Brand Hero Banner */}
      <section className="relative bg-[#F3E5D8] py-16 lg:py-24 border-b border-[#EBD8C6] overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EBD8C6] text-[#964627] text-xs font-bold tracking-wider uppercase">
            <Compass className="w-3.5 h-3.5" />
            <span>The Studio Heritage</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-[#1E1A17] tracking-tight leading-tight">
            Furniture born from architectural <span className="italic font-normal text-[#964627]">restraint</span> and tactile warmth.
          </h1>

          <p className="text-base sm:text-lg text-[#1E1A17]/80 leading-relaxed font-sans max-w-2xl mx-auto">
            Founded in 2024, The Furnish Studio emerged from a simple observation: modern homes are either cluttered with ephemeral fast-furniture or alienated by sterile, clinical luxury. We exist in the warm, human middle.
          </p>
        </div>
        
        {/* Ambient Blur circles */}
        <div className="absolute top-1/2 left-10 w-72 h-72 bg-[#CCA37E]/20 rounded-full blur-3xl -z-0" />
        <div className="absolute bottom-10 right-10 w-80 h-80 bg-[#964627]/10 rounded-full blur-3xl -z-0" />
      </section>

      {/* 2. Editorial Story Split */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-6">
            <span className="text-xs font-bold uppercase tracking-wider text-[#964627] block">Our Philosophy</span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#1E1A17] leading-tight">
              Honoring the natural grain, weight, and patina of authentic materials.
            </h2>
            <p className="text-base text-[#1E1A17]/80 leading-relaxed font-sans">
              We do not use veneers over particle board or synthetic plastic laminates. Every table leaf, chair spindle, and sideboard plinth is turned from sustainably harvested solid European white oak, American walnut, or kiln-dried ash timber.
            </p>
            <p className="text-base text-[#1E1A17]/80 leading-relaxed font-sans">
              Our performance bouclés and rust velvets are woven in northern Italy, pre-treated with non-toxic botanical repellents to resist daily life without feeling stiff or synthetic.
            </p>
            <div className="pt-2">
              <button
                onClick={() => navigate('shop', { category: 'All' })}
                className="px-8 py-4 bg-[#1E1A17] hover:bg-[#CCA37E] text-[#F8ECE1] hover:text-[#1E1A17] font-serif font-bold rounded-xl transition-all shadow-md inline-flex items-center gap-2"
              >
                <span>Explore Architectural Pieces</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="grid grid-cols-2 gap-4">
              <img
                src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=600&q=80"
                alt="Velvet sofa craftsmanship"
                className="rounded-2xl shadow-xl aspect-[3/4] object-cover w-full"
              />
              <img
                src="https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=600&q=80"
                alt="Minimalist bed frame"
                className="rounded-2xl shadow-xl aspect-[3/4] object-cover w-full mt-8"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 3. Core Values Grid */}
      <section className="bg-[#F3E5D8]/50 py-16 border-y border-[#EBD8C6]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-[#964627] block mb-2">Pillars of Craft</span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#1E1A17]">What Defines a Studio Piece</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-[#F8ECE1] p-8 rounded-3xl border border-[#EBD8C6] shadow-sm space-y-4 group hover:shadow-md transition-all">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 bg-[#964627]/10 text-[#964627] rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                  <TreePine className="w-6 h-6" />
                </div>
                <div className="flex items-baseline font-serif font-bold text-xl text-[#964627] bg-[#F3E5D8] px-3 py-1 rounded-xl border border-[#EBD8C6]">
                  <Counter value={100} fontSize={20} gap={0.5} gradientFrom="#F3E5D8" />
                  <span>%</span>
                </div>
              </div>
              <h3 className="font-serif font-bold text-xl text-[#1E1A17]">FSC-Certified Timbers</h3>
              <p className="text-sm text-[#1E1A17]/80 leading-relaxed font-sans">
                For every oak tree harvested for our dining collections, three saplings are planted in protected European conservancies. We never compromise on ecological stewardship.
              </p>
            </div>

            <div className="bg-[#F8ECE1] p-8 rounded-3xl border border-[#EBD8C6] shadow-sm space-y-4">
              <div className="w-12 h-12 bg-[#CCA37E]/20 text-[#964627] rounded-2xl flex items-center justify-center">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="font-serif font-bold text-xl text-[#1E1A17]">10-Year Structural Promise</h3>
              <p className="text-sm text-[#1E1A17]/80 leading-relaxed font-sans">
                Traditional mortise-and-tenon joinery, reinforced corner blocks, and high-tensile steel suspensions allow us to guarantee our frames for a full decade of daily living.
              </p>
            </div>

            <div className="bg-[#F8ECE1] p-8 rounded-3xl border border-[#EBD8C6] shadow-sm space-y-4">
              <div className="w-12 h-12 bg-[#1E1A17]/10 text-[#1E1A17] rounded-2xl flex items-center justify-center">
                <HeartHandshake className="w-6 h-6" />
              </div>
              <h3 className="font-serif font-bold text-xl text-[#1E1A17]">White-Glove Respect</h3>
              <p className="text-sm text-[#1E1A17]/80 leading-relaxed font-sans">
                Our logistics teams are salaried studio employees—not third-party couriers. They unpack, assemble, and place your furniture with white gloves, leaving zero packaging behind.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Showroom & Studio Callout */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="bg-[#1E1A17] text-[#F8ECE1] rounded-3xl p-10 sm:p-16 shadow-2xl relative overflow-hidden space-y-6">
          <span className="text-xs font-mono uppercase tracking-widest text-[#CCA37E] block">Bandra West & &middot; Cyber Hub</span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
            Experience the tactile warmth in person.
          </h2>
          <p className="text-sm sm:text-base text-[#E2CEBD]/80 max-w-xl mx-auto font-sans">
            Our private flagship showrooms in Mumbai and Gurugram are open for private architectural consultations and material swatch sampling.
          </p>
          <div className="pt-4">
            <button
              onClick={() => navigate('contact')}
              className="px-8 py-4 bg-[#CCA37E] hover:bg-[#EBD8C6] text-[#1E1A17] font-serif font-bold text-base rounded-xl transition-all shadow-lg"
            >
              Book a Private Showroom Consultation
            </button>
          </div>
        </div>
      </section>

    </div>
  );
};
