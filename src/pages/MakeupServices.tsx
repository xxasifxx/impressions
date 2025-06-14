
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowLeft, Palette, Star, Sparkles, Heart } from 'lucide-react';

const MakeupServices = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-fuchsia-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-pink-200">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-3 text-purple-600 hover:text-purple-800 transition-colors">
              <ArrowLeft className="w-5 h-5" />
              <span className="font-medium">Back to Portals</span>
            </Link>
            
            <div className="text-center">
              <div className="text-2xl font-light text-purple-800" style={{ fontFamily: 'system-ui, sans-serif', letterSpacing: '0.2em' }}>
                MAKEUP STUDIO
              </div>
              <div className="text-xs text-pink-500 tracking-wide">Beauty • Glam • Confidence</div>
            </div>
            
            <Button size="sm" className="bg-pink-500 hover:bg-pink-600 text-white">
              Book Now
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h1 className="text-6xl font-thin mb-6 text-purple-900" style={{ letterSpacing: '0.3em' }}>
              GLAM UP
            </h1>
            <p className="text-xl text-purple-700 max-w-3xl mx-auto mb-8 font-light">
              Prom • Events • Everyday Beauty • Professional Makeup & Lashes
            </p>
            <div className="flex items-center justify-center gap-8 text-sm text-purple-600">
              <div className="flex items-center gap-2">
                <Star className="w-4 h-4 text-pink-500 fill-current" />
                <span>Youth Focused</span>
              </div>
              <div className="flex items-center gap-2">
                <Heart className="w-4 h-4 text-rose-500 fill-current" />
                <span>Confidence Building</span>
              </div>
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-fuchsia-500" />
                <span>Trending Looks</span>
              </div>
            </div>
          </div>

          {/* Services Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto mb-16">
            <div className="bg-white/60 backdrop-blur-sm rounded-3xl p-8 shadow-lg border border-pink-200">
              <div className="flex items-center gap-3 mb-4">
                <Palette className="w-6 h-6 text-pink-500" />
                <h3 className="text-2xl font-light text-purple-800" style={{ letterSpacing: '0.1em' }}>
                  Makeup Application
                </h3>
              </div>
              <div className="space-y-3 mb-6">
                <div className="flex justify-between items-center">
                  <span className="text-purple-600">Everyday Look</span>
                  <span className="font-medium text-purple-800">$35</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-purple-600">Full Glam</span>
                  <span className="font-medium text-purple-800">$55</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-purple-600">Prom/Special Event</span>
                  <span className="font-medium text-purple-800">$75</span>
                </div>
              </div>
              <p className="text-sm text-purple-500">Professional products & techniques</p>
            </div>

            <div className="bg-white/60 backdrop-blur-sm rounded-3xl p-8 shadow-lg border border-pink-200">
              <div className="flex items-center gap-3 mb-4">
                <Sparkles className="w-6 h-6 text-fuchsia-500" />
                <h3 className="text-2xl font-light text-purple-800" style={{ letterSpacing: '0.1em' }}>
                  Lash Extensions
                </h3>
              </div>
              <div className="space-y-3 mb-6">
                <div className="flex justify-between items-center">
                  <span className="text-purple-600">Classic Set</span>
                  <span className="font-medium text-purple-800">$85</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-purple-600">Volume Set</span>
                  <span className="font-medium text-purple-800">$120</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-purple-600">Fill (2-3 weeks)</span>
                  <span className="font-medium text-purple-800">$65</span>
                </div>
              </div>
              <p className="text-sm text-purple-500">Long-lasting, natural look</p>
            </div>

            <div className="bg-white/60 backdrop-blur-sm rounded-3xl p-8 shadow-lg border border-pink-200">
              <div className="flex items-center gap-3 mb-4">
                <Star className="w-6 h-6 text-rose-500" />
                <h3 className="text-2xl font-light text-purple-800" style={{ letterSpacing: '0.1em' }}>
                  Special Packages
                </h3>
              </div>
              <div className="space-y-3 mb-6">
                <div className="flex justify-between items-center">
                  <span className="text-purple-600">Prom Package</span>
                  <span className="font-medium text-purple-800">$120</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-purple-600">Birthday Glam</span>
                  <span className="font-medium text-purple-800">$95</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-purple-600">Group Bookings</span>
                  <span className="font-medium text-purple-800">15% off</span>
                </div>
              </div>
              <p className="text-sm text-purple-500">Perfect for special occasions</p>
            </div>
          </div>

          {/* CTA Section */}
          <div className="text-center">
            <Button size="lg" className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white px-12 py-4 text-lg mr-4 rounded-full">
              Book Your Glam Session
            </Button>
            <Button size="lg" variant="outline" className="border-purple-300 text-purple-700 hover:bg-purple-50 px-12 py-4 text-lg rounded-full">
              (732) 613-1942
            </Button>
            <p className="text-purple-500 mt-4">Walk-ins welcome • Same day appointments available</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default MakeupServices;
