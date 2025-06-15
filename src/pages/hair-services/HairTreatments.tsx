
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowLeft, Clock, Star, Droplets, Sparkles } from 'lucide-react';
import AppointmentBookingModal from '@/components/AppointmentBookingModal';

const HairTreatments = () => {
  const treatmentOptions = [
    {
      title: 'Deep Conditioning',
      description: 'Intensive moisture treatment for dry, damaged hair',
      image: 'https://images.unsplash.com/photo-1580618672591-eb180b1a973f?w=400&h=300&fit=crop',
      price: '$35',
      duration: '30 minutes',
      benefits: 'Moisture & Repair'
    },
    {
      title: 'Keratin Treatment',
      description: 'Smoothing treatment for frizz-free, manageable hair',
      image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=400&h=300&fit=crop',
      price: '$150',
      duration: '2-3 hours',
      benefits: 'Frizz Control'
    },
    {
      title: 'Scalp Treatment',
      description: 'Therapeutic treatment for healthy hair growth',
      image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=400&h=300&fit=crop',
      price: '$45',
      duration: '45 minutes',
      benefits: 'Scalp Health'
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
                Hair Treatments
              </div>
              <div className="text-xs text-stone-500 tracking-wide">Repair & Nourish • Professional Care</div>
            </div>
            
            <AppointmentBookingModal
              trigger={
                <Button size="sm" className="bg-red-700 hover:bg-red-800">
                  Book Treatment - $35+
                </Button>
              }
              prefilledService={{
                name: "Hair Treatment Service",
                price: "$35+",
                duration: "30 minutes - 3 hours"
              }}
              sourcePage="treatments-header"
            />
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="py-20 bg-gradient-to-br from-teal-50 via-white to-cyan-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h1 className="text-6xl font-light mb-6 text-stone-800" style={{ fontFamily: 'Imperial Script, cursive' }}>
              Hair Treatments
            </h1>
            <p className="text-xl text-stone-600 max-w-3xl mx-auto">
              Restore and nourish your hair with our professional treatment services
            </p>
          </div>
        </div>
      </section>

      {/* Treatment Options */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-light mb-6 text-stone-800" style={{ fontFamily: 'Imperial Script, cursive' }}>
              Treatment Options
            </h2>
            <p className="text-lg text-stone-600">Choose the perfect treatment for your hair's needs</p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {treatmentOptions.map((option, index) => (
              <div key={index} className="bg-teal-50 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
                <div className="h-48 overflow-hidden">
                  <img src={option.image} alt={option.title} className="w-full h-full object-cover" />
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-xl font-medium text-stone-800">{option.title}</h3>
                    <span className="text-lg font-bold text-teal-600">{option.price}</span>
                  </div>
                  <p className="text-stone-600 mb-4">{option.description}</p>
                  <div className="space-y-2 mb-6">
                    <div className="flex items-center gap-2 text-sm text-stone-500">
                      <Clock className="w-4 h-4" />
                      <span>{option.duration}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-stone-500">
                      <Sparkles className="w-4 h-4" />
                      <span>{option.benefits}</span>
                    </div>
                  </div>
                  <AppointmentBookingModal
                    trigger={
                      <Button className="w-full bg-teal-600 hover:bg-teal-700">
                        Book This Treatment
                      </Button>
                    }
                    prefilledService={{
                      name: option.title,
                      price: option.price,
                      duration: option.duration
                    }}
                    sourcePage={`treatments-${option.title.toLowerCase().replace(/\s+/g, '-')}`}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-teal-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-4xl font-light mb-6" style={{ fontFamily: 'Imperial Script, cursive' }}>
            Ready to Restore Your Hair?
          </h3>
          <p className="text-xl mb-8 text-teal-100">
            Choose from our professional treatment services above, or call for a consultation
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 px-12 py-4 text-lg">
              Call (732) 613-1942
            </Button>
            <Link to="/hair-services">
              <Button size="lg" className="bg-white text-teal-700 hover:bg-teal-50 px-12 py-4 text-lg">
                Explore All Services
              </Button>
            </Link>
          </div>
          <p className="text-teal-200 mt-6">Professional hair repair • 30 minutes to 3 hours</p>
        </div>
      </section>
    </div>
  );
};

export default HairTreatments;
