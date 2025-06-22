
import React from 'react';
import { Link } from 'react-router-dom';
import { Scissors, Palette, Sparkles, ShoppingBag } from 'lucide-react';

const Home = () => {
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
          
          {/* Hair Salon Portal */}
          <Link to="/hair-salon" className="group">
            <div className="aspect-[3/4] bg-gradient-to-br from-red-50 via-stone-50 to-red-100 rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 border border-red-200/50 hover:border-red-300 backdrop-blur-sm relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 to-stone-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative h-full flex flex-col justify-between">
                <div className="text-center">
                  <Scissors className="w-16 h-16 text-red-600 mx-auto mb-6 group-hover:scale-110 group-hover:rotate-12 transition-all duration-500" />
                  <h3 className="text-3xl font-light text-red-800 mb-3" style={{ fontFamily: 'Playfair Display, serif' }}>
                    Hair Salon
                  </h3>
                  <p className="text-sm text-red-600 mb-4">Cuts • Color • Styling</p>
                </div>
                <div className="text-xs text-red-700 font-medium uppercase tracking-widest">
                  Expert Stylists
                </div>
              </div>
            </div>
          </Link>

          {/* Makeup Studio Portal */}
          <Link to="/makeup-studio" className="group">
            <div className="aspect-[3/4] bg-gradient-to-br from-pink-50 via-purple-50 to-pink-100 rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 border border-pink-200/50 hover:border-pink-300 backdrop-blur-sm relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-pink-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative h-full flex flex-col justify-between">
                <div className="text-center">
                  <Palette className="w-16 h-16 text-pink-600 mx-auto mb-6 group-hover:scale-110 group-hover:rotate-12 transition-all duration-500" />
                  <h3 className="text-3xl font-light text-pink-800 mb-3" style={{ fontFamily: 'Dancing Script, cursive' }}>
                    Makeup Studio
                  </h3>
                  <p className="text-sm text-pink-600 mb-4">Glam • Events • Bridal</p>
                </div>
                <div className="text-xs text-pink-700 font-medium uppercase tracking-widest">
                  Professional Artists
                </div>
              </div>
            </div>
          </Link>

          {/* Med Spa Portal */}
          <Link to="/med-spa" className="group">
            <div className="aspect-[3/4] bg-gradient-to-br from-emerald-50 via-green-50 to-emerald-100 rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 border border-emerald-200/50 hover:border-emerald-300 backdrop-blur-sm relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-green-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative h-full flex flex-col justify-between">
                <div className="text-center">
                  <Sparkles className="w-16 h-16 text-emerald-600 mx-auto mb-6 group-hover:scale-110 transition-all duration-500" />
                  <h3 className="text-3xl font-light text-emerald-800 mb-3" style={{ fontFamily: 'Fleur De Leah, cursive' }}>
                    Med Spa
                  </h3>
                  <p className="text-sm text-emerald-600 mb-4">Treatments • Wellness • Healing</p>
                </div>
                <div className="text-xs text-emerald-700 font-medium uppercase tracking-widest">
                  Natural Wellness
                </div>
              </div>
            </div>
          </Link>

          {/* Unified Services Marketplace */}
          <Link to="/services" className="group lg:col-span-3">
            <div className="aspect-[3/1] bg-gradient-to-br from-stone-50 via-gray-50 to-stone-100 rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 border border-stone-200/50 hover:border-stone-300 backdrop-blur-sm relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-stone-500/5 to-gray-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative h-full flex items-center justify-between">
                <div className="flex-1">
                  <h3 className="text-4xl md:text-5xl font-light text-stone-800 mb-3" style={{ fontFamily: 'Imperial Script, cursive', letterSpacing: '0.05em' }}>
                    Service Marketplace
                  </h3>
                  <p className="text-lg text-stone-600 font-light leading-relaxed mb-4">
                    Book Multiple Services • Package Deals • Shopping Cart Experience
                  </p>
                  <p className="text-sm text-stone-500 mb-6">
                    Browse all services across Hair, Makeup & Med Spa with smart recommendations
                  </p>
                  <div className="text-xs text-stone-600 font-medium uppercase tracking-widest border-t border-stone-200 pt-4">
                    Unified Shopping Experience
                  </div>
                </div>
                
                <div className="flex flex-col md:flex-row gap-4 md:gap-8 items-center">
                  <div className="flex gap-4">
                    <Scissors className="w-8 h-8 text-red-600 group-hover:scale-110 group-hover:rotate-12 transition-all duration-500" />
                    <Palette className="w-8 h-8 text-pink-500 group-hover:rotate-12 group-hover:scale-110 transition-all duration-500" />
                    <Sparkles className="w-8 h-8 text-emerald-600 group-hover:animate-pulse group-hover:scale-110 transition-all duration-500" />
                    <ShoppingBag className="w-8 h-8 text-amber-600 group-hover:scale-110 transition-all duration-500" />
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-light text-stone-700">All Services</div>
                    <div className="text-sm text-stone-500">One Cart</div>
                  </div>
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

export default Home;
