
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Scissors, Star, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';

const HairSalonLanding = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-stone-50 to-red-50/30">
      {/* Header */}
      <header className="bg-white/90 backdrop-blur-sm border-b border-red-100">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2 text-stone-600 hover:text-stone-800">
              <ArrowLeft className="w-5 h-5" />
              Back to Home
            </Link>
            <div className="text-center">
              <h1 className="text-3xl font-light text-red-800" style={{ fontFamily: 'Playfair Display, serif' }}>
                Hair Salon
              </h1>
            </div>
            <Button className="bg-red-600 hover:bg-red-700 text-white">
              (732) 613-1942
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 text-center">
          <Scissors className="w-20 h-20 text-red-600 mx-auto mb-8" />
          <h2 className="text-6xl font-light text-red-800 mb-6" style={{ fontFamily: 'Playfair Display, serif' }}>
            Transform Your Look
          </h2>
          <p className="text-xl text-stone-600 max-w-2xl mx-auto mb-8">
            Expert cuts, professional coloring, and stunning styles. Our master stylists bring over 15 years of experience to every transformation.
          </p>
          
          {/* Special Offer */}
          <div className="bg-red-600 text-white rounded-2xl p-6 max-w-md mx-auto mb-8">
            <h3 className="text-2xl font-bold mb-2">New Client Special</h3>
            <p className="text-lg">Cut + Style for $45</p>
            <p className="text-sm opacity-90">Save $15 on your first visit</p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/services" className="inline-block">
              <Button className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 text-lg">
                Browse All Services
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
            <Button variant="outline" className="border-red-600 text-red-600 hover:bg-red-50 px-8 py-3 text-lg">
              Book Consultation
            </Button>
          </div>
        </div>
      </section>

      {/* Services Preview */}
      <section className="py-16 bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <h3 className="text-4xl font-light text-center text-red-800 mb-12" style={{ fontFamily: 'Playfair Display, serif' }}>
            Popular Services
          </h3>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="text-center p-6 bg-red-50 rounded-2xl border border-red-100">
              <h4 className="text-xl font-semibold text-red-800 mb-2">Precision Cuts</h4>
              <p className="text-3xl font-light text-red-600 mb-3">$45</p>
              <p className="text-stone-600 text-sm">Expert styling for every face shape</p>
              <div className="flex justify-center mt-3">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                ))}
              </div>
            </div>
            
            <div className="text-center p-6 bg-red-50 rounded-2xl border border-red-100">
              <h4 className="text-xl font-semibold text-red-800 mb-2">Balayage</h4>
              <p className="text-3xl font-light text-red-600 mb-3">$120</p>
              <p className="text-stone-600 text-sm">Natural-looking highlights</p>
              <div className="flex justify-center mt-3">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                ))}
              </div>
            </div>
            
            <div className="text-center p-6 bg-red-50 rounded-2xl border border-red-100">
              <h4 className="text-xl font-semibold text-red-800 mb-2">Full Color</h4>
              <p className="text-3xl font-light text-red-600 mb-3">$85</p>
              <p className="text-stone-600 text-sm">Complete color transformation</p>
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
            <h3 className="text-4xl font-light text-red-800 mb-8" style={{ fontFamily: 'Playfair Display, serif' }}>
              Why Choose Our Salon?
            </h3>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="flex items-start gap-4 text-left">
                <Clock className="w-8 h-8 text-red-600 mt-1" />
                <div>
                  <h4 className="text-xl font-semibold text-red-800 mb-2">Expert Stylists</h4>
                  <p className="text-stone-600">Our team has over 15 years of combined experience in the latest cutting and coloring techniques.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4 text-left">
                <Star className="w-8 h-8 text-red-600 mt-1" />
                <div>
                  <h4 className="text-xl font-semibold text-red-800 mb-2">Premium Products</h4>
                  <p className="text-stone-600">We use only professional-grade products from leading brands to ensure lasting, beautiful results.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-red-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-4xl font-light mb-4">Ready for Your Transformation?</h3>
          <p className="text-xl mb-8 opacity-90">Book your appointment today and discover your new look</p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="bg-white text-red-600 hover:bg-gray-100 px-8 py-3 text-lg">
              Call (732) 613-1942
            </Button>
            <Link to="/services" className="inline-block">
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

export default HairSalonLanding;
