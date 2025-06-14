
import React from 'react';
import { Link } from 'react-router-dom';
import { Scissors, Palette, ShoppingBag, Sparkles } from 'lucide-react';

const Index = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Minimal Header */}
      <header className="py-8">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-6xl text-stone-800 mb-2" style={{ fontFamily: 'Fleur De Leah, cursive', letterSpacing: '0.1em' }}>
            Impressions
          </h1>
          <div className="w-24 h-0.5 bg-stone-300 mx-auto"></div>
        </div>
      </header>

      {/* Portal Grid */}
      <main className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          
          {/* Hair Salon Portal - Legacy Red/Grey/White */}
          <Link to="/hair-services" className="group">
            <div className="aspect-square bg-gradient-to-br from-red-50 to-grey-50 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-red-100 hover:border-red-200">
              <div className="text-center h-full flex flex-col justify-between">
                <Scissors className="w-12 h-12 text-red-600 mx-auto mb-4 group-hover:scale-110 transition-transform" />
                <div>
                  <h3 className="text-xl font-bold text-grey-800 mb-2">HAIR SALON</h3>
                  <p className="text-sm text-grey-600">Professional cuts, color & styling since 2010</p>
                </div>
                <div className="text-xs text-red-600 font-medium uppercase tracking-wide">
                  Award Winning
                </div>
              </div>
            </div>
          </Link>

          {/* Makeup Studio Portal - Youth Targeted */}
          <Link to="/makeup-services" className="group">
            <div className="aspect-square bg-gradient-to-br from-pink-50 to-purple-50 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-pink-100 hover:border-pink-200">
              <div className="text-center h-full flex flex-col justify-between">
                <Palette className="w-12 h-12 text-pink-500 mx-auto mb-4 group-hover:rotate-12 transition-transform" />
                <div>
                  <h3 className="text-xl font-light text-purple-800 mb-2" style={{ fontFamily: 'system-ui, sans-serif', letterSpacing: '0.15em' }}>
                    MAKEUP STUDIO
                  </h3>
                  <p className="text-sm text-purple-600">Prom, events & everyday glam</p>
                </div>
                <div className="text-xs text-pink-500 font-medium italic">
                  Trending Now
                </div>
              </div>
            </div>
          </Link>

          {/* Product Shop Portal */}
          <Link to="/products" className="group">
            <div className="aspect-square bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-amber-100 hover:border-amber-200">
              <div className="text-center h-full flex flex-col justify-between">
                <ShoppingBag className="w-12 h-12 text-amber-600 mx-auto mb-4 group-hover:scale-110 transition-transform" />
                <div>
                  <h3 className="text-xl font-medium text-orange-800 mb-2">PRODUCT SHOP</h3>
                  <p className="text-sm text-orange-600">Professional hair & beauty products</p>
                </div>
                <div className="text-xs text-amber-600 font-medium">
                  Shop Online
                </div>
              </div>
            </div>
          </Link>

          {/* Med Spa Portal - Olive Green/Gold Future Vision */}
          <Link to="/med-spa" className="group">
            <div className="aspect-square bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-green-200 hover:border-green-300 relative overflow-hidden">
              <div className="absolute top-2 right-2">
                <span className="text-xs bg-yellow-400 text-yellow-900 px-2 py-1 rounded-full font-bold">Coming Soon</span>
              </div>
              <div className="text-center h-full flex flex-col justify-between">
                <Sparkles className="w-12 h-12 text-green-700 mx-auto mb-4 group-hover:animate-pulse" />
                <div>
                  <h3 className="text-xl font-light text-green-800 mb-2" style={{ fontFamily: 'serif', letterSpacing: '0.05em' }}>
                    MED SPA
                  </h3>
                  <p className="text-sm text-green-600">Advanced hair analysis & facial technologies</p>
                </div>
                <div className="text-xs text-green-700 font-medium">
                  Natural Healing
                </div>
              </div>
            </div>
          </Link>

        </div>
      </main>

      {/* Footer */}
      <footer className="py-8 text-center text-stone-500 text-sm">
        <p>(732) 613-1942 • Walk-ins Welcome</p>
      </footer>
    </div>
  );
};

export default Index;
