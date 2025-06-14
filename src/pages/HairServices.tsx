
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowLeft, Scissors, Star, Clock, Phone } from 'lucide-react';

const HairServices = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Header with Logo */}
      <header className="bg-white shadow-sm border-b border-stone-200">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-3 text-stone-600 hover:text-stone-800 transition-colors">
              <ArrowLeft className="w-5 h-5" />
              <span className="font-medium">Back to Main</span>
            </Link>
            
            {/* Hair Salon Logo */}
            <div className="text-center">
              <img 
                src="/assets/gallery/gallery-09.jpg" 
                alt="Hair Salon Logo"
                className="h-16 w-auto mx-auto mb-2 rounded-lg shadow-sm"
              />
              <div className="text-2xl font-light text-stone-800" style={{ fontFamily: 'Fleur De Leah, cursive' }}>
                Legacy Hair Services
              </div>
              <div className="text-xs text-stone-500 tracking-wide">Since 2010</div>
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
            <h1 className="text-6xl font-light mb-6 text-stone-800" style={{ fontFamily: 'Fleur De Leah, cursive', letterSpacing: '0.05em' }}>
              Professional Hair Services
            </h1>
            <p className="text-xl text-stone-600 max-w-3xl mx-auto mb-8">
              Award-winning salon with over a decade of experience • Expert cuts, coloring, and styling
            </p>
            <div className="flex items-center justify-center gap-6 text-sm text-stone-500">
              <div className="flex items-center gap-2">
                <Star className="w-4 h-4 text-amber-500 fill-current" />
                <span>Best Salon Winner</span>
              </div>
              <div className="flex items-center gap-2">
                <Scissors className="w-4 h-4 text-green-700" />
                <span>Expert Stylists</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-stone-400" />
                <span>Established 2010</span>
              </div>
            </div>
          </div>

          {/* Services Grid */}
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-16">
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-stone-100">
              <h3 className="text-2xl font-light mb-4 text-stone-800" style={{ fontFamily: 'Fleur De Leah, cursive' }}>
                Precision Cuts
              </h3>
              <p className="text-stone-600 mb-6">
                Expert precision cutting tailored to your face shape and lifestyle
              </p>
              <ul className="space-y-2 text-sm text-stone-500">
                <li>• Consultation & Analysis</li>
                <li>• Precision Cutting</li>
                <li>• Styling & Finishing</li>
              </ul>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg border border-stone-100">
              <h3 className="text-2xl font-light mb-4 text-stone-800" style={{ fontFamily: 'Fleur De Leah, cursive' }}>
                Color Services
              </h3>
              <p className="text-stone-600 mb-6">
                Professional coloring from subtle highlights to complete transformations
              </p>
              <ul className="space-y-2 text-sm text-stone-500">
                <li>• Color Consultation</li>
                <li>• Highlights & Lowlights</li>
                <li>• Full Color & Balayage</li>
              </ul>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg border border-stone-100">
              <h3 className="text-2xl font-light mb-4 text-stone-800" style={{ fontFamily: 'Fleur De Leah, cursive' }}>
                Special Occasions
              </h3>
              <p className="text-stone-600 mb-6">
                Elegant styling for weddings, events, and special celebrations
              </p>
              <ul className="space-y-2 text-sm text-stone-500">
                <li>• Bridal Styling</li>
                <li>• Event Updos</li>
                <li>• Special Occasion Styling</li>
              </ul>
            </div>
          </div>

          {/* CTA Section */}
          <div className="text-center">
            <Button size="lg" className="bg-green-800 hover:bg-green-900 text-white px-12 py-4 text-lg">
              Book Your Appointment
            </Button>
            <p className="text-stone-500 mt-4">Call (732) 613-1942 or book online</p>
          </div>
        </div>
      </section>

      {/* Gallery Preview */}
      <section className="py-16 bg-stone-50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-light text-center mb-12 text-stone-800" style={{ fontFamily: 'Fleur De Leah, cursive' }}>
            Our Work
          </h2>
          <div className="grid md:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="aspect-square rounded-2xl overflow-hidden shadow-lg">
                <img 
                  src={`/assets/gallery/gallery-0${i}.jpg`}
                  alt={`Hair transformation ${i}`}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default HairServices;
