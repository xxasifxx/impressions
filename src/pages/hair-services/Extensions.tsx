
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowLeft, Clock, Star, Zap, Heart } from 'lucide-react';
import AppointmentBookingModal from '@/components/AppointmentBookingModal';

const Extensions = () => {
  const extensionOptions = [
    {
      title: 'Tape-In Extensions',
      description: 'Semi-permanent extensions that last 6-8 weeks',
      image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=400&h=300&fit=crop',
      price: '$150',
      duration: '2-3 hours',
      lifespan: '6-8 weeks'
    },
    {
      title: 'Clip-In Extensions',
      description: 'Temporary extensions for special occasions',
      image: 'https://images.unsplash.com/photo-1580618672591-eb180b1a973f?w=400&h=300&fit=crop',
      price: '$75',
      duration: '1 hour',
      lifespan: 'Same day use'
    },
    {
      title: 'Sew-In Extensions',
      description: 'Long-lasting extensions with natural movement',
      image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=400&h=300&fit=crop',
      price: '$200',
      duration: '3-4 hours',
      lifespan: '2-3 months'
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
                Hair Extensions
              </div>
              <div className="text-xs text-stone-500 tracking-wide">Length & Volume • Instant Transformation</div>
            </div>
            
            <AppointmentBookingModal
              trigger={
                <Button size="sm" className="bg-red-700 hover:bg-red-800">
                  Book Extensions - $75+
                </Button>
              }
              prefilledService={{
                name: "Hair Extensions Service",
                price: "$75+",
                duration: "1-4 hours"
              }}
              sourcePage="extensions-header"
            />
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="py-20 bg-gradient-to-br from-purple-50 via-white to-pink-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h1 className="text-6xl font-light mb-6 text-stone-800" style={{ fontFamily: 'Imperial Script, cursive' }}>
              Hair Extensions
            </h1>
            <p className="text-xl text-stone-600 max-w-3xl mx-auto">
              Add instant length and volume with our professional hair extension services
            </p>
          </div>
        </div>
      </section>

      {/* Extension Options */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-light mb-6 text-stone-800" style={{ fontFamily: 'Imperial Script, cursive' }}>
              Extension Options
            </h2>
            <p className="text-lg text-stone-600">Choose the perfect extension method for your lifestyle</p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {extensionOptions.map((option, index) => (
              <div key={index} className="bg-purple-50 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
                <div className="h-48 overflow-hidden">
                  <img src={option.image} alt={option.title} className="w-full h-full object-cover" />
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-xl font-medium text-stone-800">{option.title}</h3>
                    <span className="text-lg font-bold text-purple-600">{option.price}</span>
                  </div>
                  <p className="text-stone-600 mb-4">{option.description}</p>
                  <div className="space-y-2 mb-6">
                    <div className="flex items-center gap-2 text-sm text-stone-500">
                      <Clock className="w-4 h-4" />
                      <span>{option.duration}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-stone-500">
                      <Heart className="w-4 h-4" />
                      <span>Lasts: {option.lifespan}</span>
                    </div>
                  </div>
                  <AppointmentBookingModal
                    trigger={
                      <Button className="w-full bg-purple-600 hover:bg-purple-700">
                        Book This Service
                      </Button>
                    }
                    prefilledService={{
                      name: option.title,
                      price: option.price,
                      duration: option.duration
                    }}
                    sourcePage={`extensions-${option.title.toLowerCase().replace(/\s+/g, '-')}`}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-purple-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-4xl font-light mb-6" style={{ fontFamily: 'Imperial Script, cursive' }}>
            Ready for Gorgeous Extensions?
          </h3>
          <p className="text-xl mb-8 text-purple-100">
            Choose from our professional extension services above, or call for a consultation
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 px-12 py-4 text-lg">
              Call (732) 613-1942
            </Button>
            <Link to="/hair-services">
              <Button size="lg" className="bg-white text-purple-700 hover:bg-purple-50 px-12 py-4 text-lg">
                Explore All Services
              </Button>
            </Link>
          </div>
          <p className="text-purple-200 mt-6">Professional extensions • Instant length & volume</p>
        </div>
      </section>
    </div>
  );
};

export default Extensions;
