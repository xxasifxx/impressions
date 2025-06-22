
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Palette, Star, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';

const MakeupStudioLanding = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-pink-100">
      {/* Header */}
      <header className="bg-white/90 backdrop-blur-sm border-b border-pink-100">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2 text-stone-600 hover:text-stone-800">
              <ArrowLeft className="w-5 h-5" />
              Back to Home
            </Link>
            <div className="text-center">
              <h1 className="text-3xl font-light text-pink-800" style={{ fontFamily: 'Dancing Script, cursive' }}>
                Makeup Studio
              </h1>
            </div>
            <Button className="bg-pink-600 hover:bg-pink-700 text-white">
              (732) 613-1942
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 text-center">
          <Palette className="w-20 h-20 text-pink-600 mx-auto mb-8" />
          <h2 className="text-6xl font-light text-pink-800 mb-6" style={{ fontFamily: 'Dancing Script, cursive' }}>
            Unleash Your Beauty
          </h2>
          <p className="text-xl text-stone-600 max-w-2xl mx-auto mb-8">
            From everyday glam to special occasions, our professional makeup artists create looks that enhance your natural beauty and boost your confidence.
          </p>
          
          {/* Special Offer */}
          <div className="bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-2xl p-6 max-w-md mx-auto mb-8">
            <h3 className="text-2xl font-bold mb-2">Prom Season Special</h3>
            <p className="text-lg">Makeup + Lashes $95</p>
            <p className="text-sm opacity-90">Perfect for your special night</p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/services" className="inline-block">
              <Button className="bg-pink-600 hover:bg-pink-700 text-white px-8 py-3 text-lg">
                Browse All Services
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
            <Button variant="outline" className="border-pink-600 text-pink-600 hover:bg-pink-50 px-8 py-3 text-lg">
              Book Consultation
            </Button>
          </div>
        </div>
      </section>

      {/* Services Preview */}
      <section className="py-16 bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <h3 className="text-4xl font-light text-center text-pink-800 mb-12" style={{ fontFamily: 'Dancing Script, cursive' }}>
            Signature Services
          </h3>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="text-center p-6 bg-pink-50 rounded-2xl border border-pink-100">
              <h4 className="text-xl font-semibold text-pink-800 mb-2">Glam Makeup</h4>
              <p className="text-3xl font-light text-pink-600 mb-3">$65</p>
              <p className="text-stone-600 text-sm">Perfect for nights out & events</p>
              <div className="flex justify-center mt-3">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                ))}
              </div>
            </div>
            
            <div className="text-center p-6 bg-pink-50 rounded-2xl border border-pink-100">
              <h4 className="text-xl font-semibold text-pink-800 mb-2">Bridal Makeup</h4>
              <p className="text-3xl font-light text-pink-600 mb-3">$125</p>
              <p className="text-stone-600 text-sm">Your perfect wedding day look</p>
              <div className="flex justify-center mt-3">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                ))}
              </div>
            </div>
            
            <div className="text-center p-6 bg-pink-50 rounded-2xl border border-pink-100">
              <h4 className="text-xl font-semibold text-pink-800 mb-2">Lash Extensions</h4>
              <p className="text-3xl font-light text-pink-600 mb-3">$85</p>
              <p className="text-stone-600 text-sm">Fuller, longer lashes</p>
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
            <h3 className="text-4xl font-light text-pink-800 mb-8" style={{ fontFamily: 'Dancing Script, cursive' }}>
              Why Choose Our Studio?
            </h3>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="flex items-start gap-4 text-left">
                <Heart className="w-8 h-8 text-pink-600 mt-1" />
                <div>
                  <h4 className="text-xl font-semibold text-pink-800 mb-2">Professional Artists</h4>
                  <p className="text-stone-600">Our certified makeup artists specialize in creating looks that enhance your unique features.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4 text-left">
                <Star className="w-8 h-8 text-pink-600 mt-1" />
                <div>
                  <h4 className="text-xl font-semibold text-pink-800 mb-2">Premium Products</h4>
                  <p className="text-stone-600">We use high-end cosmetics and tools to ensure flawless application and long-lasting results.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-pink-500 to-purple-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-4xl font-light mb-4">Ready to Glow?</h3>
          <p className="text-xl mb-8 opacity-90">Book your makeup session and let us bring out your inner beauty</p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="bg-white text-pink-600 hover:bg-gray-100 px-8 py-3 text-lg">
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

export default MakeupStudioLanding;
