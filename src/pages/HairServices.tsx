
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowLeft, Scissors, Star, Clock, Phone, Palette, Users } from 'lucide-react';

const HairServices = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-stone-200">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-3 text-stone-600 hover:text-stone-800 transition-colors">
              <ArrowLeft className="w-5 h-5" />
              <span className="font-medium">Back to Main</span>
            </Link>
            
            <div className="text-center">
              <div className="text-2xl font-light text-stone-800" style={{ fontFamily: 'Imperial Script, cursive' }}>
                Impressions Hair Salon
              </div>
              <div className="text-xs text-stone-500 tracking-wide">Professional Hair Services</div>
            </div>
            
            <div className="flex items-center gap-4">
              <Button size="sm" className="bg-green-800 hover:bg-green-900">
                <Phone className="w-4 h-4 mr-2" />
                (732) 613-1942
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-white via-stone-50 to-green-50/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h1 className="text-6xl font-light mb-6 text-stone-800" style={{ fontFamily: 'Imperial Script, cursive', letterSpacing: '0.05em' }}>
              Professional Hair Services
            </h1>
            <p className="text-xl text-stone-600 max-w-3xl mx-auto mb-8">
              Expert cuts, coloring, and styling for all ages • Quality service since 2010
            </p>
            <div className="flex items-center justify-center gap-6 text-sm text-stone-500">
              <div className="flex items-center gap-2">
                <Star className="w-4 h-4 text-amber-500 fill-current" />
                <span>Professional Stylists</span>
              </div>
              <div className="flex items-center gap-2">
                <Scissors className="w-4 h-4 text-green-700" />
                <span>All Hair Types</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-stone-400" />
                <span>Now Hiring</span>
              </div>
            </div>
          </div>

          {/* Services & Pricing Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto mb-16">
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-stone-100">
              <div className="flex items-center gap-3 mb-4">
                <Scissors className="w-6 h-6 text-green-700" />
                <h3 className="text-2xl font-light text-stone-800" style={{ fontFamily: 'Imperial Script, cursive' }}>
                  Hair Cuts
                </h3>
              </div>
              <div className="space-y-3 mb-6">
                <div className="flex justify-between items-center">
                  <span className="text-stone-600">Kids Cut (12 & under)</span>
                  <span className="font-medium text-stone-800">$25</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-stone-600">Adult Cut</span>
                  <span className="font-medium text-stone-800">$45+</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-stone-600">Wash & Blowout</span>
                  <span className="font-medium text-stone-800">$35</span>
                </div>
              </div>
              <p className="text-sm text-stone-500">Includes consultation, precision cutting, and basic styling</p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg border border-stone-100">
              <div className="flex items-center gap-3 mb-4">
                <Palette className="w-6 h-6 text-amber-600" />
                <h3 className="text-2xl font-light text-stone-800" style={{ fontFamily: 'Imperial Script, cursive' }}>
                  Hair Color
                </h3>
              </div>
              <div className="space-y-3 mb-6">
                <div className="flex justify-between items-center">
                  <span className="text-stone-600">Full Color</span>
                  <span className="font-medium text-stone-800">$85+</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-stone-600">Highlights/Lowlights</span>
                  <span className="font-medium text-stone-800">$95+</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-stone-600">Root Touch-up</span>
                  <span className="font-medium text-stone-800">$65+</span>
                </div>
              </div>
              <p className="text-sm text-stone-500">Professional color consultation included</p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg border border-stone-100">
              <div className="flex items-center gap-3 mb-4">
                <Star className="w-6 h-6 text-rose-500" />
                <h3 className="text-2xl font-light text-stone-800" style={{ fontFamily: 'Imperial Script, cursive' }}>
                  Special Styling
                </h3>
              </div>
              <div className="space-y-3 mb-6">
                <div className="flex justify-between items-center">
                  <span className="text-stone-600">Formal Updo</span>
                  <span className="font-medium text-stone-800">$75+</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-stone-600">Prom/Wedding Hair</span>
                  <span className="font-medium text-stone-800">$95+</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-stone-600">Hair Extensions</span>
                  <span className="font-medium text-stone-800">$150+</span>
                </div>
              </div>
              <p className="text-sm text-stone-500">Perfect for special occasions and events</p>
            </div>
          </div>

          {/* Transformation Packages */}
          <div className="bg-gradient-to-br from-amber-50 to-white rounded-2xl p-8 shadow-lg max-w-4xl mx-auto mb-16">
            <h3 className="text-3xl font-light text-center mb-8 text-stone-800" style={{ fontFamily: 'Imperial Script, cursive' }}>
              Complete Transformation Packages
            </h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center p-6 bg-white rounded-xl shadow-sm">
                <h4 className="text-xl font-medium text-stone-800 mb-3">Hair Focus</h4>
                <p className="text-3xl font-light text-amber-600 mb-4">$95</p>
                <div className="text-sm text-stone-600 space-y-2">
                  <p>• Cut + Color</p>
                  <p>• Professional Style</p>
                  <p>• Hair Treatment</p>
                </div>
              </div>
              
              <div className="text-center p-6 bg-white rounded-xl shadow-sm border-2 border-amber-200">
                <div className="text-xs text-amber-600 bg-amber-50 px-2 py-1 rounded-full mb-2 inline-block">Most Popular</div>
                <h4 className="text-xl font-medium text-stone-800 mb-3">Glam Package</h4>
                <p className="text-3xl font-light text-amber-600 mb-4">$140</p>
                <div className="text-sm text-stone-600 space-y-2">
                  <p>• Cut + Style</p>
                  <p>• Makeup Application</p>
                  <p>• Basic Lashes</p>
                </div>
              </div>
              
              <div className="text-center p-6 bg-white rounded-xl shadow-sm">
                <h4 className="text-xl font-medium text-stone-800 mb-3">Ultimate Package</h4>
                <p className="text-3xl font-light text-amber-600 mb-4">$185</p>
                <div className="text-sm text-stone-600 space-y-2">
                  <p>• Cut + Color + Style</p>
                  <p>• Makeup Application</p>
                  <p>• Eyebrow Threading</p>
                </div>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="text-center">
            <Button size="lg" className="bg-green-800 hover:bg-green-900 text-white px-12 py-4 text-lg mr-4">
              Book Your Appointment
            </Button>
            <Button size="lg" variant="outline" className="border-stone-300 text-stone-700 hover:bg-stone-50 px-12 py-4 text-lg">
              Call (732) 613-1942
            </Button>
            <p className="text-stone-500 mt-4">Walk-ins welcome • Same day appointments often available</p>
          </div>
        </div>
      </section>

      {/* Video Showcase Section */}
      <section className="py-16 bg-stone-50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-light text-center mb-12 text-stone-800" style={{ fontFamily: 'Imperial Script, cursive' }}>
            See Our Work in Action
          </h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="aspect-video rounded-2xl overflow-hidden shadow-lg">
              <video 
                src="/assets/videos/showcase-video-01.mp4"
                className="w-full h-full object-cover"
                controls
                poster="/assets/videos/showcase-video-01.mp4"
              />
            </div>
            <div className="aspect-video rounded-2xl overflow-hidden shadow-lg">
              <video 
                src="/assets/videos/showcase-video-02.mp4"
                className="w-full h-full object-cover"
                controls
                poster="/assets/videos/showcase-video-02.mp4"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HairServices;
