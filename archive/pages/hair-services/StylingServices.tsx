
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowLeft, Sparkles, Crown, Wind, Clock, Star, Gift } from 'lucide-react';

const StylingServices = () => {
  const stylingServices = [
    {
      title: 'Signature Blowouts',
      description: 'Professional styling for smooth, voluminous, camera-ready hair',
      image: 'https://images.unsplash.com/photo-1580618672591-eb180b1a973f?w=400&h=300&fit=crop',
      price: '$45',
      duration: '45-60 minutes',
      includes: ['Gentle cleansing', 'Heat protectant', 'Professional blow dry', 'Finishing spray']
    },
    {
      title: 'Formal Updos',
      description: 'Elegant styles for weddings, proms, and special occasions',
      image: 'https://images.unsplash.com/photo-1594736797933-d0b22e4b7b72?w=400&h=300&fit=crop',
      price: '$75+',
      duration: '60-90 minutes',
      includes: ['Style consultation', 'Professional updo', 'Hair accessories if desired', 'Setting spray for longevity']
    },
    {
      title: 'Roller Sets & Classic Styles',
      description: 'Traditional techniques for timeless, long-lasting results',
      image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=400&h=300&fit=crop',
      price: '$40',
      duration: '60-75 minutes',
      includes: ['Professional roller set', 'Careful styling', 'Classic finishing', 'Style maintenance tips']
    }
  ];

  const bundlePackages = [
    {
      title: 'Full Service Bundle',
      description: 'Wash, cut, style, and finish - the complete experience',
      price: '$85+',
      includes: ['Consultation', 'Shampoo & condition', 'Precision cut', 'Professional styling', 'Finishing products']
    },
    {
      title: 'Color & Style Package',
      description: 'Color service with professional styling finish',
      price: '$125+',
      includes: ['Color consultation', 'Full color service', 'Deep conditioning', 'Blowout styling', 'Take-home care tips']
    },
    {
      title: 'Special Event Package',
      description: 'Complete styling for your most important occasions',
      price: '$150+',
      includes: ['Pre-event consultation', 'Hair preparation', 'Professional styling', 'Touch-up service', 'Photos for memories']
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-stone-200">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <Link to="/hair-services" className="flex items-center gap-3 text-stone-600 hover:text-stone-800 transition-colors">
              <ArrowLeft className="w-5 h-5" />
              <span className="font-medium">Back to Hair Services</span>
            </Link>
            
            <div className="text-center">
              <div className="text-2xl font-light text-stone-800" style={{ fontFamily: 'Imperial Script, cursive' }}>
                Styling & Finishing Services
              </div>
              <div className="text-xs text-stone-500 tracking-wide">Professional Styling • Bundle Packages • Special Occasions</div>
            </div>
            
            <Button size="sm" className="bg-red-700 hover:bg-red-800">
              Book Styling Service
            </Button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="py-20 bg-gradient-to-br from-purple-50 via-white to-pink-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h1 className="text-6xl font-light mb-6 text-stone-800" style={{ fontFamily: 'Imperial Script, cursive' }}>
              Perfect Finishing Touches
            </h1>
            <p className="text-xl text-stone-600 max-w-3xl mx-auto">
              Professional styling that completes your look • From everyday blowouts to special occasion elegance • 
              Bundle packages for the full salon experience
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1580618672591-eb180b1a973f?w=1200&h=600&fit=crop" 
                alt="Professional hair styling"
                className="w-full h-96 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
              <div className="absolute bottom-8 left-8 right-8 text-white">
                <h2 className="text-3xl font-light mb-4">Styling Excellence</h2>
                <p className="text-lg text-white/90">Professional techniques for flawless finishing</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Styling Services */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-light mb-6 text-stone-800" style={{ fontFamily: 'Imperial Script, cursive' }}>
              Signature Styling Services
            </h2>
            <p className="text-lg text-stone-600">Professional finishing for every occasion</p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {stylingServices.map((service, index) => (
              <div key={index} className="bg-purple-50 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
                <div className="h-48 overflow-hidden">
                  <img src={service.image} alt={service.title} className="w-full h-full object-cover" />
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-xl font-medium text-stone-800">{service.title}</h3>
                    <span className="text-lg font-bold text-purple-600">{service.price}</span>
                  </div>
                  <p className="text-stone-600 mb-4">{service.description}</p>
                  <div className="flex items-center gap-2 text-sm text-stone-500 mb-4">
                    <Clock className="w-4 h-4" />
                    <span>{service.duration}</span>
                  </div>
                  <div className="space-y-1 mb-6">
                    {service.includes.map((item, itemIndex) => (
                      <div key={itemIndex} className="flex items-center gap-2 text-sm text-stone-600">
                        <Sparkles className="w-3 h-3 text-purple-600" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                  <Button className="w-full bg-purple-600 hover:bg-purple-700">
                    Book This Service
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bundle Packages */}
      <section className="py-20 bg-pink-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-light mb-6 text-stone-800" style={{ fontFamily: 'Imperial Script, cursive' }}>
              Complete Service Bundles
            </h2>
            <p className="text-lg text-stone-600">Everything you need for the full salon experience</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {bundlePackages.map((bundle, index) => (
              <div key={index} className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
                <div className="flex items-center gap-4 mb-4">
                  <Crown className="w-8 h-8 text-pink-600" />
                  <div>
                    <h3 className="text-2xl font-medium text-stone-800">{bundle.title}</h3>
                    <span className="text-xl font-bold text-pink-600">{bundle.price}</span>
                  </div>
                </div>
                <p className="text-stone-600 mb-6">{bundle.description}</p>
                <div className="space-y-2 mb-6">
                  {bundle.includes.map((item, itemIndex) => (
                    <div key={itemIndex} className="flex items-center gap-2 text-stone-600">
                      <Gift className="w-4 h-4 text-pink-600" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
                <Button className="w-full bg-pink-600 hover:bg-pink-700">
                  Book Bundle Package
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Services */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h3 className="text-3xl font-light text-center mb-12 text-stone-800" style={{ fontFamily: 'Imperial Script, cursive' }}>
              Quick Styling Services
            </h3>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center p-6 bg-purple-50 rounded-xl">
                <Wind className="w-8 h-8 text-purple-600 mx-auto mb-4" />
                <h4 className="text-lg font-medium text-stone-800 mb-2">Express Blowout</h4>
                <p className="text-stone-600 text-sm mb-3">Quick styling for busy schedules</p>
                <p className="text-purple-600 font-bold">$35 • 30 minutes</p>
              </div>
              
              <div className="text-center p-6 bg-pink-50 rounded-xl">
                <Sparkles className="w-8 h-8 text-pink-600 mx-auto mb-4" />
                <h4 className="text-lg font-medium text-stone-800 mb-2">Touch-Up Styling</h4>
                <p className="text-stone-600 text-sm mb-3">Refresh your existing style</p>
                <p className="text-pink-600 font-bold">$25 • 20 minutes</p>
              </div>
              
              <div className="text-center p-6 bg-amber-50 rounded-xl">
                <Crown className="w-8 h-8 text-amber-600 mx-auto mb-4" />
                <h4 className="text-lg font-medium text-stone-800 mb-2">Special Occasion</h4>
                <p className="text-stone-600 text-sm mb-3">Perfect for events and celebrations</p>
                <p className="text-amber-600 font-bold">$75+ • 60+ minutes</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-br from-purple-600 to-pink-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-4xl font-light mb-6" style={{ fontFamily: 'Imperial Script, cursive' }}>
            Perfect Your Look
          </h3>
          <p className="text-xl mb-8 text-purple-100">
            Professional styling and complete service bundles
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-purple-700 hover:bg-purple-50 px-12 py-4 text-lg">
              Book Styling Service - Starting at $25
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 px-12 py-4 text-lg">
              Call (732) 613-1942
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default StylingServices;
