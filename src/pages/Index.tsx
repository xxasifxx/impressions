import React from 'react';
import { Link } from 'react-router-dom';
import { Scissors, Palette, ShoppingBag, Sparkles } from 'lucide-react';

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
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10 max-w-7xl mx-auto">
          
          {/* Hair Salon Portal - Legacy Red/Grey/White */}
          <Link to="/hair-services" className="group">
            <div className="aspect-square bg-gradient-to-br from-red-50 via-stone-50 to-red-50/30 rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 border border-red-100/50 hover:border-red-200 backdrop-blur-sm relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 to-stone-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative text-center h-full flex flex-col justify-between">
                <div className="mb-6">
                  <Scissors className="w-14 h-14 text-red-600 mx-auto mb-4 group-hover:scale-110 group-hover:rotate-12 transition-all duration-500" />
                </div>
                <div className="flex-1 flex flex-col justify-center">
                  <h3 className="text-2xl font-light text-stone-800 mb-3" style={{ fontFamily: 'Imperial Script, cursive', letterSpacing: '0.05em' }}>
                    Hair Salon
                  </h3>
                  <p className="text-sm text-stone-600 font-light leading-relaxed">Professional cuts, color & styling since 2010</p>
                </div>
                <div className="text-xs text-red-600 font-medium uppercase tracking-widest border-t border-red-100 pt-4 mt-4">
                  Award Winning
                </div>
              </div>
            </div>
          </Link>

          {/* Makeup Studio Portal - Youth Targeted */}
          <Link to="/makeup-services" className="group">
            <div className="aspect-square bg-gradient-to-br from-rose-50 via-pink-50 to-purple-50/40 rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 border border-pink-100/50 hover:border-rose-200 backdrop-blur-sm relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-rose-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative text-center h-full flex flex-col justify-between">
                <div className="mb-6">
                  <Palette className="w-14 h-14 text-rose-500 mx-auto mb-4 group-hover:rotate-12 group-hover:scale-110 transition-all duration-500" />
                </div>
                <div className="flex-1 flex flex-col justify-center">
                  <h3 className="text-2xl font-light text-purple-800 mb-3" style={{ fontFamily: 'Imperial Script, cursive', letterSpacing: '0.05em' }}>
                    Makeup Studio
                  </h3>
                  <p className="text-sm text-purple-600 font-light leading-relaxed">Prom, events & everyday glam</p>
                </div>
                <div className="text-xs text-rose-500 font-medium italic border-t border-rose-100 pt-4 mt-4">
                  Trending Now
                </div>
              </div>
            </div>
          </Link>

          {/* Product Shop Portal */}
          <Link to="/products" className="group">
            <div className="aspect-square bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50/40 rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 border border-amber-100/50 hover:border-amber-200 backdrop-blur-sm relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 to-orange-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative text-center h-full flex flex-col justify-between">
                <div className="mb-6">
                  <ShoppingBag className="w-14 h-14 text-amber-600 mx-auto mb-4 group-hover:scale-110 group-hover:-rotate-6 transition-all duration-500" />
                </div>
                <div className="flex-1 flex flex-col justify-center">
                  <h3 className="text-2xl font-light text-orange-800 mb-3" style={{ fontFamily: 'Imperial Script, cursive', letterSpacing: '0.05em' }}>
                    Product Shop
                  </h3>
                  <p className="text-sm text-orange-600 font-light leading-relaxed">Professional hair & beauty products</p>
                </div>
                <div className="text-xs text-amber-600 font-medium border-t border-amber-100 pt-4 mt-4">
                  Shop Online
                </div>
              </div>
            </div>
          </Link>

          {/* Med Spa Portal - Olive Green/Gold Future Vision */}
          <Link to="/med-spa" className="group">
            <div className="aspect-square bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50/40 rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 border border-emerald-100/50 hover:border-emerald-200 backdrop-blur-sm relative overflow-hidden">
              <div className="absolute top-3 right-3">
                <span className="text-xs bg-gradient-to-r from-yellow-400 to-amber-400 text-yellow-900 px-3 py-1.5 rounded-full font-medium shadow-sm">Coming Soon</span>
              </div>
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-teal-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative text-center h-full flex flex-col justify-between">
                <div className="mb-6">
                  <Sparkles className="w-14 h-14 text-emerald-600 mx-auto mb-4 group-hover:animate-pulse group-hover:scale-110 transition-all duration-500" />
                </div>
                <div className="flex-1 flex flex-col justify-center">
                  <h3 className="text-2xl font-light text-emerald-800 mb-3" style={{ fontFamily: 'Imperial Script, cursive', letterSpacing: '0.05em' }}>
                    Med Spa
                  </h3>
                  <p className="text-sm text-emerald-600 font-light leading-relaxed">Advanced hair analysis & facial technologies</p>
                </div>
                <div className="text-xs text-emerald-700 font-medium border-t border-emerald-100 pt-4 mt-4">
                  Natural Healing
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
