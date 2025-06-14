
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Scissors, Palette, ShoppingBag, Sparkles, Star, Users } from 'lucide-react';

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
            Hair Salon • Your journey to beauty begins here • Choose your experience
          </p>
        </div>

        {/* Service Portals Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
          {/* Hair Services - Classic & Professional */}
          <Link to="/hair-services" className="group relative overflow-hidden rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105">
            <div className="aspect-[3/4] relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-700 p-8 flex flex-col justify-between text-white">
              <div className="text-center">
                <Scissors className="w-14 h-14 text-amber-400 mx-auto mb-6 group-hover:rotate-12 transition-transform duration-300" />
                <h3 className="text-3xl font-bold mb-3 tracking-tight" style={{ fontFamily: 'system-ui, sans-serif' }}>
                  HAIR SERVICES
                </h3>
                <p className="text-sm text-slate-300 mb-6 font-medium uppercase tracking-wide">Expert cuts, coloring & styling</p>
                <div className="space-y-2 text-xs text-slate-400 font-mono">
                  <p>• Kids Cuts from $25</p>
                  <p>• Adult Cuts from $45</p>
                  <p>• Full Color from $85</p>
                  <p>• Highlights from $95</p>
                </div>
              </div>
              <div className="flex items-center gap-2 text-xs text-amber-400 uppercase font-bold tracking-wide">
                <Star className="w-3 h-3 fill-current" />
                <span>Professional Stylists</span>
              </div>
            </div>
          </Link>

          {/* Cultural & Special Services - Warm & Celebratory */}
          <Link to="/cultural-celebrations" className="group relative overflow-hidden rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105">
            <div className="aspect-[3/4] relative bg-gradient-to-br from-orange-600 via-rose-500 to-pink-600 p-8 flex flex-col justify-between text-white">
              <div className="text-center">
                <Sparkles className="w-14 h-14 text-yellow-200 mx-auto mb-6 animate-pulse" />
                <h3 className="text-3xl font-light mb-3 tracking-wide" style={{ fontFamily: 'serif' }}>
                  Cultural Services
                </h3>
                <p className="text-sm text-orange-100 mb-6 italic">Diwali, Ramadan & cultural celebrations</p>
                <div className="space-y-2 text-xs text-orange-200" style={{ fontFamily: 'serif' }}>
                  <p>• Henna (Mehndi) from $25</p>
                  <p>• Eyebrow Threading $20</p>
                  <p>• Cultural Makeup $65</p>
                  <p>• Special Occasion Packages</p>
                </div>
              </div>
              <div className="flex items-center gap-2 text-xs text-yellow-200 italic">
                <Sparkles className="w-3 h-3" />
                <span>Diwali Special</span>
              </div>
            </div>
          </Link>

          {/* Makeup & Beauty - Glamorous & Modern */}
          <Link to="/makeup-services" className="group relative overflow-hidden rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105">
            <div className="aspect-[3/4] relative bg-gradient-to-br from-violet-900 via-purple-800 to-fuchsia-800 p-8 flex flex-col justify-between text-white">
              <div className="text-center">
                <Palette className="w-14 h-14 text-pink-300 mx-auto mb-6 group-hover:animate-spin" />
                <h3 className="text-3xl font-thin mb-3 tracking-widest uppercase" style={{ fontFamily: 'system-ui, sans-serif', letterSpacing: '0.2em' }}>
                  MAKEUP & LASHES
                </h3>
                <p className="text-sm text-purple-200 mb-6 font-light">Prom, events & everyday glam</p>
                <div className="space-y-2 text-xs text-purple-300 tracking-wide">
                  <p>• Makeup Application $55</p>
                  <p>• Lash Extensions $85</p>
                  <p>• Prom Packages $120</p>
                  <p>• Bridal Makeup from $95</p>
                </div>
              </div>
              <div className="flex items-center gap-2 text-xs text-pink-300 uppercase font-semibold">
                <Star className="w-3 h-3 fill-current animate-pulse" />
                <span>Trending</span>
              </div>
            </div>
          </Link>

          {/* Career Opportunities - Fresh & Professional */}
          <Link to="/careers" className="group relative overflow-hidden rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105 border-4 border-emerald-300">
            <div className="aspect-[3/4] relative bg-gradient-to-br from-emerald-600 via-teal-600 to-cyan-600 p-8 flex flex-col justify-between text-white">
              <div className="text-center">
                <Users className="w-14 h-14 text-cyan-200 mx-auto mb-6 group-hover:animate-bounce" />
                <h3 className="text-3xl font-semibold mb-3" style={{ fontFamily: 'system-ui, sans-serif' }}>
                  Join Our Team
                </h3>
                <p className="text-sm text-emerald-100 mb-6 font-medium">We're hiring talented stylists</p>
                <div className="space-y-2 text-xs text-emerald-200">
                  <p>• Junior Hair Stylist</p>
                  <p>• Competitive Pay</p>
                  <p>• Professional Environment</p>
                  <p>• Growth Opportunities</p>
                </div>
              </div>
              <span className="text-xs text-emerald-900 bg-cyan-200 px-3 py-2 rounded-full mx-auto font-bold uppercase tracking-wide">Now Hiring</span>
            </div>
          </Link>
        </div>

        {/* Spring Transformation Packages */}
        <div className="mt-16 bg-white rounded-2xl p-8 shadow-lg max-w-4xl mx-auto">
          <div className="text-center mb-6">
            <h3 className="text-3xl font-light text-stone-800 mb-2" style={{ fontFamily: 'Fleur De Leah, cursive' }}>
              Complete Transformation Packages
            </h3>
            <p className="text-stone-600">Transform your look with our comprehensive packages</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center p-4 bg-stone-50 rounded-xl">
              <h4 className="font-medium text-stone-800 mb-2">Ultimate Package</h4>
              <p className="text-2xl font-light text-amber-600 mb-2">$185</p>
              <div className="text-sm text-stone-600 space-y-1">
                <p>Cut + Color + Style</p>
                <p>Makeup Application</p>
                <p>Eyebrow Threading</p>
              </div>
            </div>
            
            <div className="text-center p-4 bg-stone-50 rounded-xl">
              <h4 className="font-medium text-stone-800 mb-2">Glam Package</h4>
              <p className="text-2xl font-light text-amber-600 mb-2">$140</p>
              <div className="text-sm text-stone-600 space-y-1">
                <p>Cut + Style</p>
                <p>Makeup Application</p>
                <p>Basic Lashes</p>
              </div>
            </div>
            
            <div className="text-center p-4 bg-stone-50 rounded-xl">
              <h4 className="font-medium text-stone-800 mb-2">Hair Focus</h4>
              <p className="text-2xl font-light text-amber-600 mb-2">$95</p>
              <div className="text-sm text-stone-600 space-y-1">
                <p>Cut + Color</p>
                <p>Professional Style</p>
                <p>Hair Treatment</p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Access */}
        <div className="text-center mt-16">
          <p className="text-stone-600 mb-6">Ready to book your transformation?</p>
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
