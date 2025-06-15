
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowLeft, Clock, Star, Palette, Zap } from 'lucide-react';
import AppointmentBookingModal from '@/components/AppointmentBookingModal';

const Balayage = () => {
  const balayageOptions = [
    {
      title: 'Natural Balayage',
      description: 'Subtle highlights for a sun-kissed look',
      image: 'https://images.unsplash.com/photo-1580618672591-eb180b1a973f?w=400&h=300&fit=crop',
      price: '$110',
      duration: '3-4 hours',
      maintenance: 'Every 3-4 months'
    },
    {
      title: 'Bold Balayage',
      description: 'Dramatic contrast for maximum impact',
      image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=400&h=300&fit=crop',
      price: '$140',
      duration: '4-5 hours',
      maintenance: 'Every 2-3 months'
    },
    {
      title: 'Corrective Balayage',
      description: 'Fix previous color work with expert technique',
      image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=400&h=300&fit=crop',
      price: '$160',
      duration: '5-6 hours',
      maintenance: 'Every 3-4 months'
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
                Balayage Services
              </div>
              <div className="text-xs text-stone-500 tracking-wide">Hand-Painted Highlights • Natural Dimension</div>
            </div>
            
            <AppointmentBookingModal
              trigger={
                <Button size="sm" className="bg-red-700 hover:bg-red-800">
                  Book Balayage - $110+
                </Button>
              }
              prefilledService={{
                name: "Balayage Service",
                price: "$110+",
                duration: "3-5 hours"
              }}
              sourcePage="balayage-header"
            />
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="py-20 bg-gradient-to-br from-amber-50 via-white to-yellow-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h1 className="text-6xl font-light mb-6 text-stone-800" style={{ fontFamily: 'Imperial Script, cursive' }}>
              Hand-Painted Balayage
            </h1>
            <p className="text-xl text-stone-600 max-w-3xl mx-auto">
              Achieve natural-looking highlights with our expert balayage technique for beautiful, dimensional color
            </p>
          </div>
        </div>
      </section>

      {/* Service Options */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-light mb-6 text-stone-800" style={{ fontFamily: 'Imperial Script, cursive' }}>
              Balayage Options
            </h2>
            <p className="text-lg text-stone-600">Choose the perfect balayage style for your hair goals</p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {balayageOptions.map((option, index) => (
              <div key={index} className="bg-amber-50 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
                <div className="h-48 overflow-hidden">
                  <img src={option.image} alt={option.title} className="w-full h-full object-cover" />
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-xl font-medium text-stone-800">{option.title}</h3>
                    <span className="text-lg font-bold text-amber-600">{option.price}</span>
                  </div>
                  <p className="text-stone-600 mb-4">{option.description}</p>
                  <div className="space-y-2 mb-6">
                    <div className="flex items-center gap-2 text-sm text-stone-500">
                      <Clock className="w-4 h-4" />
                      <span>{option.duration}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-stone-500">
                      <Palette className="w-4 h-4" />
                      <span>Maintenance: {option.maintenance}</span>
                    </div>
                  </div>
                  <AppointmentBookingModal
                    trigger={
                      <Button className="w-full bg-amber-600 hover:bg-amber-700">
                        Book This Service
                      </Button>
                    }
                    prefilledService={{
                      name: option.title,
                      price: option.price,
                      duration: option.duration
                    }}
                    sourcePage={`balayage-${option.title.toLowerCase().replace(/\s+/g, '-')}`}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-amber-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-4xl font-light mb-6" style={{ fontFamily: 'Imperial Script, cursive' }}>
            Ready for Beautiful Balayage?
          </h3>
          <p className="text-xl mb-8 text-amber-100">
            Choose from our expert balayage services above, or call for a consultation
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 px-12 py-4 text-lg">
              Call (732) 613-1942
            </Button>
            <Link to="/hair-services">
              <Button size="lg" className="bg-white text-amber-700 hover:bg-amber-50 px-12 py-4 text-lg">
                Explore All Services
              </Button>
            </Link>
          </div>
          <p className="text-amber-200 mt-6">Expert hand-painted highlights • 3-6 hour appointments</p>
        </div>
      </section>
    </div>
  );
};

export default Balayage;
