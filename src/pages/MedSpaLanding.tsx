import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Sparkles, Star, Leaf } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ConsultationEntry from '@/components/ConsultationEntry';

const MedSpaLanding = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-green-50 to-emerald-100">
      {/* Header */}
      <header className="bg-white/90 backdrop-blur-sm border-b border-emerald-100">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2 text-stone-600 hover:text-stone-800">
              <ArrowLeft className="w-5 h-5" />
              Back to Home
            </Link>
            <div className="text-center">
              <h1 className="text-3xl font-light text-emerald-800" style={{ fontFamily: 'Fleur De Leah, cursive' }}>
                Med Spa
              </h1>
            </div>
            <Button className="bg-emerald-600 hover:bg-emerald-700 text-white">
              (732) 613-1942
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 text-center">
          <Sparkles className="w-20 h-20 text-emerald-600 mx-auto mb-8" />
          <h2 className="text-6xl font-light text-emerald-800 mb-6" style={{ fontFamily: 'Fleur De Leah, cursive' }}>
            Natural Wellness & Beauty
          </h2>
          <p className="text-xl text-stone-600 max-w-2xl mx-auto mb-8">
            Experience the perfect blend of advanced skincare treatments and natural healing. Our holistic approach enhances your natural beauty from within.
          </p>
          
          {/* Special Offer */}
          <div className="bg-emerald-600 text-white rounded-2xl p-6 max-w-md mx-auto mb-8">
            <h3 className="text-2xl font-bold mb-2">First Visit Special</h3>
            <p className="text-lg">Gold Facial $75</p>
            <p className="text-sm opacity-90">Regularly $95 - Save $20</p>
          </div>

          {/* Consultation Entry Component */}
          <ConsultationEntry domain="med-spa" />
          
          {/* Phone CTA */}
          <div className="text-center mt-12 pt-8 border-t border-emerald-200">
            <p className="text-emerald-700 text-sm mb-4">
              Prefer to speak with someone directly?
            </p>
            <Button className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-3 text-lg">
              Call (732) 613-1942
            </Button>
          </div>
        </div>
      </section>

      {/* Services Preview */}
      <section className="py-16 bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <h3 className="text-4xl font-light text-center text-emerald-800 mb-12" style={{ fontFamily: 'Fleur De Leah, cursive' }}>
            Healing Services
          </h3>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="text-center p-6 bg-emerald-50 rounded-2xl border border-emerald-100">
              <h4 className="text-xl font-semibold text-emerald-800 mb-2">Gold Facial</h4>
              <p className="text-3xl font-light text-emerald-600 mb-3">$95</p>
              <p className="text-stone-600 text-sm">Luxurious anti-aging treatment</p>
              <div className="flex justify-center mt-3">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                ))}
              </div>
            </div>
            
            <div className="text-center p-6 bg-emerald-50 rounded-2xl border border-emerald-100">
              <h4 className="text-xl font-semibold text-emerald-800 mb-2">Eyebrow Threading</h4>
              <p className="text-3xl font-light text-emerald-600 mb-3">$20</p>
              <p className="text-stone-600 text-sm">Precise natural hair removal</p>
              <div className="flex justify-center mt-3">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                ))}
              </div>
            </div>
            
            <div className="text-center p-6 bg-emerald-50 rounded-2xl border border-emerald-100">
              <h4 className="text-xl font-semibold text-emerald-800 mb-2">Brazilian Wax</h4>
              <p className="text-3xl font-light text-emerald-600 mb-3">$65</p>
              <p className="text-stone-600 text-sm">Professional body treatments</p>
              <div className="flex justify-center mt-3">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-4xl font-light text-emerald-800 mb-8" style={{ fontFamily: 'Fleur De Leah, cursive' }}>
              Natural Approach to Beauty
            </h3>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="flex items-start gap-4 text-left">
                <Leaf className="w-8 h-8 text-emerald-600 mt-1" />
                <div>
                  <h4 className="text-xl font-semibold text-emerald-800 mb-2">Natural Products</h4>
                  <p className="text-stone-600">We use organic and natural products that nourish your skin without harsh chemicals.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4 text-left">
                <Star className="w-8 h-8 text-emerald-600 mt-1" />
                <div>
                  <h4 className="text-xl font-semibold text-emerald-800 mb-2">Holistic Treatments</h4>
                  <p className="text-stone-600">Our treatments focus on overall wellness, combining ancient wisdom with modern techniques.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-emerald-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-4xl font-light mb-4">Begin Your Wellness Journey</h3>
          <p className="text-xl mb-8 opacity-90">Discover the healing power of natural beauty treatments</p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="bg-white text-emerald-600 hover:bg-gray-100 px-8 py-3 text-lg">
              Call (732) 613-1942
            </Button>
            <Link to="/services?domain=med-spa" className="inline-block">
              <Button variant="outline" className="border-white text-white hover:bg-white/10 px-8 py-3 text-lg">
                View All Services
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default MedSpaLanding;
