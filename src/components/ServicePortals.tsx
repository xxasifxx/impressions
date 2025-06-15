
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Scissors, Palette, ShoppingBag, Sparkles, Star, Users } from 'lucide-react';

const ServicePortals = () => {
  return (
    <section className="min-h-screen bg-gradient-to-br from-white via-stone-50 to-amber-50/40 flex items-center justify-center py-24">
      <div className="container mx-auto px-4">
        {/* Enhanced Hero Brand Section */}
        <div className="text-center mb-24">
          <h1 className="text-8xl md:text-9xl font-light mb-6 tracking-wider text-stone-800 animate-fade-in" style={{ fontFamily: 'Fleur De Leah, cursive', letterSpacing: '0.1em' }}>
            Impressions
          </h1>
          <div className="w-40 h-1 bg-gradient-to-r from-amber-500 via-amber-400 to-orange-400 mx-auto mb-8 rounded-full animate-scale-in"></div>
          <p className="text-2xl text-stone-600 font-light tracking-wide max-w-2xl mx-auto" style={{ fontFamily: 'Fleur De Leah, cursive' }}>
            Hair Salon • Your journey to beauty begins here • Choose your experience
          </p>
        </div>

        {/* Enhanced Service Portals Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10 max-w-7xl mx-auto">
          {/* Hair Services - Enhanced */}
          <Link to="/hair-services" className="group relative overflow-hidden rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-700 hover:scale-110">
            <div className="aspect-[3/4] relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-700 p-8 flex flex-col justify-between text-white before:absolute before:inset-0 before:bg-gradient-to-br before:from-blue-600/20 before:to-purple-600/20 before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-500">
              <div className="text-center relative z-10">
                <Scissors className="w-16 h-16 text-amber-400 mx-auto mb-8 group-hover:rotate-12 group-hover:scale-125 transition-all duration-500" />
                <h3 className="text-3xl font-bold mb-4 tracking-tight" style={{ fontFamily: 'system-ui, sans-serif' }}>
                  HAIR SERVICES
                </h3>
                <p className="text-sm text-slate-300 mb-8 font-medium uppercase tracking-wide">Expert cuts, coloring & styling</p>
                <div className="space-y-3 text-xs text-slate-400 font-mono">
                  <p className="hover:text-amber-300 transition-colors duration-300">• Kids Cuts from $25</p>
                  <p className="hover:text-amber-300 transition-colors duration-300">• Adult Cuts from $45</p>
                  <p className="hover:text-amber-300 transition-colors duration-300">• Full Color from $85</p>
                  <p className="hover:text-amber-300 transition-colors duration-300">• Highlights from $95</p>
                </div>
              </div>
              <div className="flex items-center gap-2 text-xs text-amber-400 uppercase font-bold tracking-wide relative z-10">
                <Star className="w-3 h-3 fill-current animate-pulse" />
                <span>Professional Stylists</span>
              </div>
            </div>
          </Link>

          {/* Cultural Services - Enhanced */}
          <Link to="/cultural-celebrations" className="group relative overflow-hidden rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-700 hover:scale-110">
            <div className="aspect-[3/4] relative bg-gradient-to-br from-orange-600 via-rose-500 to-pink-600 p-8 flex flex-col justify-between text-white before:absolute before:inset-0 before:bg-gradient-to-br before:from-yellow-400/30 before:to-red-500/30 before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-500">
              <div className="text-center relative z-10">
                <Sparkles className="w-16 h-16 text-yellow-200 mx-auto mb-8 animate-pulse group-hover:animate-spin" />
                <h3 className="text-3xl font-light mb-4 tracking-wide" style={{ fontFamily: 'serif' }}>
                  Cultural Services
                </h3>
                <p className="text-sm text-orange-100 mb-8 italic">Diwali, Ramadan & cultural celebrations</p>
                <div className="space-y-3 text-xs text-orange-200" style={{ fontFamily: 'serif' }}>
                  <p className="hover:text-yellow-200 transition-colors duration-300">• Henna (Mehndi) from $25</p>
                  <p className="hover:text-yellow-200 transition-colors duration-300">• Eyebrow Threading $20</p>
                  <p className="hover:text-yellow-200 transition-colors duration-300">• Cultural Makeup $65</p>
                  <p className="hover:text-yellow-200 transition-colors duration-300">• Special Occasion Packages</p>
                </div>
              </div>
              <div className="flex items-center gap-2 text-xs text-yellow-200 italic relative z-10">
                <Sparkles className="w-3 h-3 animate-pulse" />
                <span>Diwali Special</span>
              </div>
            </div>
          </Link>

          {/* Makeup Services - Enhanced */}
          <Link to="/makeup-services" className="group relative overflow-hidden rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-700 hover:scale-110">
            <div className="aspect-[3/4] relative bg-gradient-to-br from-violet-900 via-purple-800 to-fuchsia-800 p-8 flex flex-col justify-between text-white before:absolute before:inset-0 before:bg-gradient-to-br before:from-pink-500/30 before:to-purple-500/30 before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-500">
              <div className="text-center relative z-10">
                <Palette className="w-16 h-16 text-pink-300 mx-auto mb-8 group-hover:animate-spin group-hover:scale-125 transition-all duration-500" />
                <h3 className="text-3xl font-thin mb-4 tracking-widest uppercase" style={{ fontFamily: 'system-ui, sans-serif', letterSpacing: '0.2em' }}>
                  MAKEUP & LASHES
                </h3>
                <p className="text-sm text-purple-200 mb-8 font-light">Prom, events & everyday glam</p>
                <div className="space-y-3 text-xs text-purple-300 tracking-wide">
                  <p className="hover:text-pink-300 transition-colors duration-300">• Makeup Application $55</p>
                  <p className="hover:text-pink-300 transition-colors duration-300">• Lash Extensions $85</p>
                  <p className="hover:text-pink-300 transition-colors duration-300">• Prom Packages $120</p>
                  <p className="hover:text-pink-300 transition-colors duration-300">• Bridal Makeup from $95</p>
                </div>
              </div>
              <div className="flex items-center gap-2 text-xs text-pink-300 uppercase font-semibold relative z-10">
                <Star className="w-3 h-3 fill-current animate-pulse" />
                <span>Trending</span>
              </div>
            </div>
          </Link>

          {/* Careers - Enhanced */}
          <Link to="/careers" className="group relative overflow-hidden rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-700 hover:scale-110 border-4 border-emerald-300">
            <div className="aspect-[3/4] relative bg-gradient-to-br from-emerald-600 via-teal-600 to-cyan-600 p-8 flex flex-col justify-between text-white before:absolute before:inset-0 before:bg-gradient-to-br before:from-green-400/30 before:to-blue-500/30 before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-500">
              <div className="text-center relative z-10">
                <Users className="w-16 h-16 text-cyan-200 mx-auto mb-8 group-hover:animate-bounce group-hover:scale-125 transition-all duration-500" />
                <h3 className="text-3xl font-semibold mb-4" style={{ fontFamily: 'system-ui, sans-serif' }}>
                  Join Our Team
                </h3>
                <p className="text-sm text-emerald-100 mb-8 font-medium">We're hiring talented stylists</p>
                <div className="space-y-3 text-xs text-emerald-200">
                  <p className="hover:text-cyan-200 transition-colors duration-300">• Junior Hair Stylist</p>
                  <p className="hover:text-cyan-200 transition-colors duration-300">• Competitive Pay</p>
                  <p className="hover:text-cyan-200 transition-colors duration-300">• Professional Environment</p>
                  <p className="hover:text-cyan-200 transition-colors duration-300">• Growth Opportunities</p>
                </div>
              </div>
              <span className="text-xs text-emerald-900 bg-cyan-200 px-4 py-2 rounded-full mx-auto font-bold uppercase tracking-wide animate-pulse relative z-10">Now Hiring</span>
            </div>
          </Link>
        </div>

        {/* Enhanced Transformation Packages */}
        <div className="mt-20 bg-white/80 backdrop-blur-sm rounded-3xl p-10 shadow-2xl max-w-5xl mx-auto border border-stone-200">
          <div className="text-center mb-10">
            <h3 className="text-4xl font-light text-stone-800 mb-4" style={{ fontFamily: 'Fleur De Leah, cursive' }}>
              Complete Transformation Packages
            </h3>
            <div className="w-24 h-1 bg-gradient-to-r from-amber-500 to-orange-400 mx-auto mb-6 rounded-full"></div>
            <p className="text-stone-600 text-lg">Transform your look with our comprehensive packages</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6 bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl border border-amber-200 hover:shadow-xl transition-all duration-300 hover:scale-105 group">
              <h4 className="font-semibold text-stone-800 mb-3 text-xl">Ultimate Package</h4>
              <p className="text-3xl font-light text-amber-600 mb-4 group-hover:text-amber-700 transition-colors duration-300">$185</p>
              <div className="text-stone-600 space-y-2">
                <p className="font-medium">Cut + Color + Style</p>
                <p>Makeup Application</p>
                <p>Eyebrow Threading</p>
              </div>
            </div>
            
            <div className="text-center p-6 bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl border border-purple-200 hover:shadow-xl transition-all duration-300 hover:scale-105 group">
              <h4 className="font-semibold text-stone-800 mb-3 text-xl">Glam Package</h4>
              <p className="text-3xl font-light text-purple-600 mb-4 group-hover:text-purple-700 transition-colors duration-300">$140</p>
              <div className="text-stone-600 space-y-2">
                <p className="font-medium">Cut + Style</p>
                <p>Makeup Application</p>
                <p>Basic Lashes</p>
              </div>
            </div>
            
            <div className="text-center p-6 bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl border border-emerald-200 hover:shadow-xl transition-all duration-300 hover:scale-105 group">
              <h4 className="font-semibold text-stone-800 mb-3 text-xl">Hair Focus</h4>
              <p className="text-3xl font-light text-emerald-600 mb-4 group-hover:text-emerald-700 transition-colors duration-300">$95</p>
              <div className="text-stone-600 space-y-2">
                <p className="font-medium">Cut + Color</p>
                <p>Professional Style</p>
                <p>Hair Treatment</p>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Quick Access */}
        <div className="text-center mt-20">
          <p className="text-stone-600 mb-8 text-xl">Ready to book your transformation?</p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Button size="lg" className="bg-gradient-to-r from-stone-800 to-stone-900 hover:from-stone-900 hover:to-black text-white px-12 py-4 text-lg font-medium rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
              (732) 613-1942
            </Button>
            <Button size="lg" variant="outline" className="border-2 border-stone-300 text-stone-700 hover:bg-stone-100 hover:border-stone-400 px-12 py-4 text-lg font-medium rounded-2xl transition-all duration-300 hover:scale-105 hover:shadow-xl">
              Book Online
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicePortals;
