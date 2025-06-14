
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Scissors, Palette, ShoppingBag, Sparkles } from 'lucide-react';

const ServicePortals = () => {
  return (
    <section className="min-h-screen bg-gradient-to-br from-white via-stone-50 to-amber-50/30 flex items-center justify-center py-20">
      <div className="container mx-auto px-4">
        {/* Hero Brand Section */}
        <div className="text-center mb-20">
          <h1 className="text-7xl font-light mb-4 tracking-wider text-stone-800" style={{ fontFamily: 'Fleur De Leah, cursive', letterSpacing: '0.1em' }}>
            Impressions
          </h1>
          <div className="w-32 h-0.5 bg-gradient-to-r from-amber-400 to-amber-300 mx-auto mb-6"></div>
          <p className="text-xl text-stone-600 font-light tracking-wide max-w-2xl mx-auto" style={{ fontFamily: 'Fleur De Leah, cursive' }}>
            Your journey to beauty begins here • Choose your experience
          </p>
        </div>

        {/* Service Portals Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
          {/* Legacy Hair Services */}
          <Link to="/hair-services" className="group relative overflow-hidden rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300">
            <div className="aspect-[3/4] relative">
              <img 
                src="/assets/gallery/gallery-01.jpg" 
                alt="Professional hair styling services"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <div className="flex items-center gap-2 mb-2">
                  <Scissors className="w-5 h-5 text-amber-400" />
                  <span className="text-sm font-medium tracking-wide">Since 2010</span>
                </div>
                <h3 className="text-2xl font-light mb-2 tracking-wide" style={{ fontFamily: 'Fleur De Leah, cursive' }}>
                  Hair Services
                </h3>
                <p className="text-sm opacity-90">Expert cuts, coloring & styling</p>
              </div>
            </div>
          </Link>

          {/* Youth Makeup Services */}
          <Link to="/makeup-services" className="group relative overflow-hidden rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300">
            <div className="aspect-[3/4] relative">
              <img 
                src="/lovable-uploads/5b93eca0-6808-4052-af4d-cf567c69ecdf.png" 
                alt="Professional makeup services"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <div className="flex items-center gap-2 mb-2">
                  <Palette className="w-5 h-5 text-amber-400" />
                  <span className="text-sm font-medium tracking-wide">Trending</span>
                </div>
                <h3 className="text-2xl font-light mb-2 tracking-wide" style={{ fontFamily: 'Fleur De Leah, cursive' }}>
                  Makeup & Lashes
                </h3>
                <p className="text-sm opacity-90">Prom, events & everyday glam</p>
              </div>
            </div>
          </Link>

          {/* Product Shop */}
          <Link to="/shop" className="group relative overflow-hidden rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300">
            <div className="aspect-[3/4] relative bg-gradient-to-br from-stone-100 to-amber-50 flex items-center justify-center">
              <div className="text-center text-stone-700">
                <ShoppingBag className="w-12 h-12 text-amber-500 mx-auto mb-4" />
                <h3 className="text-2xl font-light mb-2 tracking-wide" style={{ fontFamily: 'Fleur De Leah, cursive' }}>
                  Product Shop
                </h3>
                <p className="text-sm">Professional hair & beauty products</p>
              </div>
              <div className="absolute bottom-6 left-6 right-6">
                <span className="text-xs text-stone-500 bg-white/80 px-2 py-1 rounded-full">Coming Soon</span>
              </div>
            </div>
          </Link>

          {/* MedSpa - Future */}
          <Link to="/medspa" className="group relative overflow-hidden rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 border-2 border-amber-200">
            <div className="aspect-[3/4] relative bg-gradient-to-br from-white via-stone-50 to-amber-50/50 flex items-center justify-center">
              <div className="text-center text-stone-700">
                <Sparkles className="w-12 h-12 text-amber-500 mx-auto mb-4" />
                <h3 className="text-2xl font-light mb-2 tracking-wide" style={{ fontFamily: 'Fleur De Leah, cursive' }}>
                  MedSpa
                </h3>
                <p className="text-sm mb-4">Advanced skincare & wellness</p>
                <span className="text-xs text-amber-700 bg-amber-100 px-3 py-1 rounded-full">Coming Soon</span>
              </div>
            </div>
          </Link>
        </div>

        {/* Quick Access */}
        <div className="text-center mt-16">
          <p className="text-stone-600 mb-6">Need to book quickly?</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-stone-800 hover:bg-stone-900 text-white px-8">
              (732) 613-1942
            </Button>
            <Button size="lg" variant="outline" className="border-stone-300 text-stone-700 hover:bg-stone-50 px-8">
              Book Online
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicePortals;
