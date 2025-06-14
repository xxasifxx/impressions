
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowLeft, Palette, Star, Clock, Phone, Sparkles, Users, Heart } from 'lucide-react';

const MakeupServices = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-pink-200">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-3 text-pink-600 hover:text-pink-800 transition-colors">
              <ArrowLeft className="w-5 h-5" />
              <span className="font-medium">Back to Main</span>
            </Link>
            
            <div className="text-center">
              <div className="text-2xl font-light text-pink-800" style={{ fontFamily: 'Imperial Script, cursive' }}>
                Makeup Studio
              </div>
              <div className="text-xs text-pink-500 tracking-wide">Professional Beauty Services</div>
            </div>
            
            <div className="flex items-center gap-4">
              <Button size="sm" className="bg-pink-600 hover:bg-pink-700">
                <Phone className="w-4 h-4 mr-2" />
                (732) 613-1942
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-white via-pink-50 to-purple-50/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h1 className="text-6xl font-light mb-6 text-pink-800" style={{ fontFamily: 'Imperial Script, cursive', letterSpacing: '0.05em' }}>
              Makeup & Beauty Studio
            </h1>
            <p className="text-xl text-pink-600 max-w-3xl mx-auto mb-8">
              Professional makeup artistry for every occasion • Prom, weddings, special events & everyday glam
            </p>
            <div className="flex items-center justify-center gap-6 text-sm text-pink-500">
              <div className="flex items-center gap-2">
                <Star className="w-4 h-4 text-amber-500 fill-current" />
                <span>Expert Artists</span>
              </div>
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-pink-600" />
                <span>Latest Trends</span>
              </div>
              <div className="flex items-center gap-2">
                <Heart className="w-4 h-4 text-purple-400" />
                <span>All Skin Tones</span>
              </div>
            </div>
          </div>

          {/* Services & Pricing Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto mb-16">
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-pink-100">
              <div className="flex items-center gap-3 mb-4">
                <Palette className="w-6 h-6 text-pink-600" />
                <h3 className="text-2xl font-light text-pink-800" style={{ fontFamily: 'Imperial Script, cursive' }}>
                  Special Events
                </h3>
              </div>
              <div className="space-y-3 mb-6">
                <div className="flex justify-between items-center">
                  <span className="text-pink-600">Prom Makeup</span>
                  <span className="font-medium text-pink-800">$65</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-pink-600">Bridal Makeup</span>
                  <span className="font-medium text-pink-800">$85+</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-pink-600">Special Occasion</span>
                  <span className="font-medium text-pink-800">$55+</span>
                </div>
              </div>
              <p className="text-sm text-pink-500">Includes consultation and touch-up kit</p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg border border-pink-100">
              <div className="flex items-center gap-3 mb-4">
                <Sparkles className="w-6 h-6 text-purple-600" />
                <h3 className="text-2xl font-light text-pink-800" style={{ fontFamily: 'Imperial Script, cursive' }}>
                  Lash Services
                </h3>
              </div>
              <div className="space-y-3 mb-6">
                <div className="flex justify-between items-center">
                  <span className="text-pink-600">Classic Lash Extensions</span>
                  <span className="font-medium text-pink-800">$75</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-pink-600">Volume Lashes</span>
                  <span className="font-medium text-pink-800">$95</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-pink-600">Lash Fill</span>
                  <span className="font-medium text-pink-800">$45</span>
                </div>
              </div>
              <p className="text-sm text-pink-500">Professional grade lashes and adhesive</p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg border border-pink-100">
              <div className="flex items-center gap-3 mb-4">
                <Star className="w-6 h-6 text-amber-600" />
                <h3 className="text-2xl font-light text-pink-800" style={{ fontFamily: 'Imperial Script, cursive' }}>
                  Specialty Services
                </h3>
              </div>
              <div className="space-y-3 mb-6">
                <div className="flex justify-between items-center">
                  <span className="text-pink-600">Eyebrow Threading</span>
                  <span className="font-medium text-pink-800">$25</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-pink-600">Eyebrow Shaping</span>
                  <span className="font-medium text-pink-800">$35</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-pink-600">Makeup Lesson</span>
                  <span className="font-medium text-pink-800">$65</span>
                </div>
              </div>
              <p className="text-sm text-pink-500">Learn techniques for everyday application</p>
            </div>
          </div>

          {/* Package Deals */}
          <div className="bg-gradient-to-br from-purple-50 to-white rounded-2xl p-8 shadow-lg max-w-4xl mx-auto mb-16">
            <h3 className="text-3xl font-light text-center mb-8 text-pink-800" style={{ fontFamily: 'Imperial Script, cursive' }}>
              Beauty Packages
            </h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center p-6 bg-white rounded-xl shadow-sm">
                <h4 className="text-xl font-medium text-pink-800 mb-3">Glam Starter</h4>
                <p className="text-3xl font-light text-purple-600 mb-4">$85</p>
                <div className="text-sm text-pink-600 space-y-2">
                  <p>• Makeup Application</p>
                  <p>• Basic Lashes</p>
                  <p>• Eyebrow Shaping</p>
                </div>
              </div>
              
              <div className="text-center p-6 bg-white rounded-xl shadow-sm border-2 border-purple-200">
                <div className="text-xs text-purple-600 bg-purple-50 px-2 py-1 rounded-full mb-2 inline-block">Most Popular</div>
                <h4 className="text-xl font-medium text-pink-800 mb-3">Full Glam</h4>
                <p className="text-3xl font-light text-purple-600 mb-4">$125</p>
                <div className="text-sm text-pink-600 space-y-2">
                  <p>• Complete Makeup</p>
                  <p>• Volume Lashes</p>
                  <p>• Eyebrow Threading</p>
                </div>
              </div>
              
              <div className="text-center p-6 bg-white rounded-xl shadow-sm">
                <h4 className="text-xl font-medium text-pink-800 mb-3">Bridal Ready</h4>
                <p className="text-3xl font-light text-purple-600 mb-4">$165</p>
                <div className="text-sm text-pink-600 space-y-2">
                  <p>• Bridal Makeup</p>
                  <p>• Premium Lashes</p>
                  <p>• Touch-up Kit</p>
                </div>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="text-center">
            <Button size="lg" className="bg-pink-600 hover:bg-pink-700 text-white px-12 py-4 text-lg mr-4">
              Book Your Session
            </Button>
            <Button size="lg" variant="outline" className="border-pink-300 text-pink-700 hover:bg-pink-50 px-12 py-4 text-lg">
              Call (732) 613-1942
            </Button>
            <p className="text-pink-500 mt-4">Same day appointments available • Free consultation included</p>
          </div>
        </div>
      </section>

      {/* Trending Looks Section */}
      <section className="py-16 bg-pink-50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-light text-center mb-12 text-pink-800" style={{ fontFamily: 'Imperial Script, cursive' }}>
            Trending Looks
          </h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="bg-white rounded-2xl overflow-hidden shadow-lg">
              <div className="h-48 bg-gradient-to-br from-pink-200 to-purple-200 flex items-center justify-center">
                <span className="text-purple-700 font-medium">Natural Glow</span>
              </div>
              <div className="p-6">
                <h3 className="text-lg font-medium text-pink-800 mb-2">Everyday Radiance</h3>
                <p className="text-pink-600 text-sm">Perfect for school, work, and daily activities</p>
              </div>
            </div>
            
            <div className="bg-white rounded-2xl overflow-hidden shadow-lg">
              <div className="h-48 bg-gradient-to-br from-purple-200 to-pink-200 flex items-center justify-center">
                <span className="text-pink-700 font-medium">Smoky Eyes</span>
              </div>
              <div className="p-6">
                <h3 className="text-lg font-medium text-pink-800 mb-2">Evening Drama</h3>
                <p className="text-pink-600 text-sm">Bold looks for special occasions and nights out</p>
              </div>
            </div>
            
            <div className="bg-white rounded-2xl overflow-hidden shadow-lg">
              <div className="h-48 bg-gradient-to-br from-amber-200 to-pink-200 flex items-center justify-center">
                <span className="text-amber-700 font-medium">Bridal Elegance</span>
              </div>
              <div className="p-6">
                <h3 className="text-lg font-medium text-pink-800 mb-2">Timeless Beauty</h3>
                <p className="text-pink-600 text-sm">Classic looks that photograph beautifully</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default MakeupServices;
