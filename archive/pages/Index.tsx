
import React from 'react';
import { Link } from 'react-router-dom';
import { Scissors, Palette, Sparkles, ShoppingBag } from 'lucide-react';

const Index = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Minimal Header */}
      <header className="py-12 md:py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-6xl md:text-7xl text-stone-800 mb-4" style={{ fontFamily: 'Imperial Script, cursive', letterSpacing: '0.08em' }}>
            Impressions Beauty
          </h1>
          <p className="text-lg text-stone-600 mb-6 font-light">Choose your experience</p>
          <div className="w-32 h-0.5 bg-gradient-to-r from-transparent via-stone-300 to-transparent mx-auto"></div>
        </div>
      </header>

      {/* Portal Grid */}
      <main className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10 max-w-6xl mx-auto">
          
          {/* Unified Services Portal */}
          <Link to="/services" className="group lg:col-span-3">
            <div className="aspect-[3/1] bg-gradient-to-br from-stone-50 via-gray-50 to-stone-100 rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 border border-stone-200/50 hover:border-stone-300 backdrop-blur-sm relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-stone-500/5 to-gray-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative h-full flex items-center justify-between">
                <div className="flex-1">
                  <h3 className="text-4xl md:text-5xl font-light text-stone-800 mb-3" style={{ fontFamily: 'Imperial Script, cursive', letterSpacing: '0.05em' }}>
                    All Services
                  </h3>
                  <p className="text-lg text-stone-600 font-light leading-relaxed mb-4">
                    Hair • Makeup • Body Treatments • Skincare
                  </p>
                  <p className="text-sm text-stone-500 mb-6">
                    Explore our complete range of beauty services in one unified experience
                  </p>
                  <div className="text-xs text-stone-600 font-medium uppercase tracking-widest border-t border-stone-200 pt-4">
                    All Specialties
                  </div>
                </div>
                
                <div className="flex flex-col md:flex-row gap-4 md:gap-8 items-center">
                  <div className="flex gap-4">
                    <Scissors className="w-8 h-8 text-red-600 group-hover:scale-110 group-hover:rotate-12 transition-all duration-500" />
                    <Palette className="w-8 h-8 text-pink-500 group-hover:rotate-12 group-hover:scale-110 transition-all duration-500" />
                    <Sparkles className="w-8 h-8 text-emerald-600 group-hover:animate-pulse group-hover:scale-110 transition-all duration-500" />
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-light text-stone-700">3 Studios</div>
                    <div className="text-sm text-stone-500">One Experience</div>
                  </div>
                </div>
              </div>
            </div>
          </Link>

          {/* Product Shop Portal */}
          <Link to="/products" className="group lg:col-span-3">
            <div className="aspect-[3/1] bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50/40 rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 border border-amber-100/50 hover:border-amber-200 backdrop-blur-sm relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 to-orange-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative h-full flex items-center justify-between">
                <div className="flex-1">
                  <h3 className="text-4xl md:text-5xl font-light text-orange-800 mb-3" style={{ fontFamily: 'Imperial Script, cursive', letterSpacing: '0.05em' }}>
                    Product Shop
                  </h3>
                  <p className="text-lg text-orange-600 font-light leading-relaxed mb-4">
                    Professional hair & beauty products for home care
                  </p>
                  <p className="text-sm text-orange-500 mb-6">
                    Take the salon experience home with our curated product selection
                  </p>
                  <div className="text-xs text-amber-600 font-medium border-t border-amber-100 pt-4">
                    Shop Online & In-Store
                  </div>
                </div>
                
                <div className="flex items-center">
                  <ShoppingBag className="w-12 h-12 text-amber-600 group-hover:scale-110 group-hover:-rotate-6 transition-all duration-500" />
                </div>
              </div>
            </div>
          </Link>

        </div>
      </main>

      {/* Footer */}
      <footer className="py-12 text-center">
        <div className="w-32 h-0.5 bg-gradient-to-r from-transparent via-stone-300 to-transparent mx-auto mb-6"></div>
        <p className="text-stone-500 text-sm font-light tracking-wide">(732) 613-1942 • Walk-ins Welcome</p>
      </footer>
    </div>
  );
};

export default Index;
