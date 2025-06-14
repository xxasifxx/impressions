
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowLeft, Droplets, Leaf, Sparkles, Clock, Star, Heart } from 'lucide-react';

const HairTreatments = () => {
  const treatments = [
    {
      title: 'Deep Conditioning Therapy',
      description: 'Intensive moisture restoration for dry, damaged, or chemically-treated hair',
      image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=400&h=300&fit=crop',
      price: '$35+',
      duration: '30-45 minutes',
      includes: ['Hair analysis', 'Custom conditioning mask', 'Scalp massage', 'Heat therapy application']
    },
    {
      title: 'Protein Reconstruction',
      description: 'Strengthening treatment for weak, brittle, or over-processed hair',
      image: 'https://images.unsplash.com/photo-1616847220575-1b875cea11dd?w=400&h=300&fit=crop',
      price: '$45+',
      duration: '45-60 minutes',
      includes: ['Hair porosity test', 'Protein treatment application', 'Strengthening mask', 'Protective styling']
    },
    {
      title: 'Scalp Health Treatment',
      description: 'Specialized care for scalp conditions and overall hair health',
      image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=400&h=300&fit=crop',
      price: '$40+',
      duration: '45 minutes',
      includes: ['Scalp analysis', 'Therapeutic scalp treatment', 'Gentle massage therapy', 'Product recommendations']
    }
  ];

  const maintenanceServices = [
    {
      title: 'Monthly Maintenance Package',
      description: 'Regular treatments to keep your hair healthy and strong',
      price: '$120',
      includes: ['Monthly deep conditioning', 'Scalp treatment', 'Trim if needed', 'Home care consultation']
    },
    {
      title: 'Damage Repair Program',
      description: 'Comprehensive restoration for severely damaged hair',
      price: '$200+',
      includes: ['Initial assessment', 'Series of 4 treatments', 'Custom product regimen', 'Progress monitoring']
    }
  ];

  const treatmentTypes = [
    {
      icon: Droplets,
      title: 'Moisture Restoration',
      description: 'Deep hydration for dry, thirsty hair'
    },
    {
      icon: Leaf,
      title: 'Natural Treatments',
      description: 'Organic and gentle formulations'
    },
    {
      icon: Sparkles,
      title: 'Shine Enhancement',
      description: 'Treatments that restore natural luster'
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
                Hair Treatments & Conditioning
              </div>
              <div className="text-xs text-stone-500 tracking-wide">Restoration • Strengthening • Maintenance</div>
            </div>
            
            <Button size="sm" className="bg-red-700 hover:bg-red-800">
              Book Treatment
            </Button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="py-20 bg-gradient-to-br from-teal-50 via-white to-green-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h1 className="text-6xl font-light mb-6 text-stone-800" style={{ fontFamily: 'Imperial Script, cursive' }}>
              Restore & Rejuvenate
            </h1>
            <p className="text-xl text-stone-600 max-w-3xl mx-auto">
              Professional treatments that heal, strengthen, and revitalize • Custom conditioning for every hair type • 
              Maintenance programs for lasting health
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=1200&h=600&fit=crop" 
                alt="Hair treatment therapy"
                className="w-full h-96 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
              <div className="absolute bottom-8 left-8 right-8 text-white">
                <h2 className="text-3xl font-light mb-4">Therapeutic Hair Care</h2>
                <p className="text-lg text-white/90">Professional treatments for healthier, stronger hair</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Treatment Services */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-light mb-6 text-stone-800" style={{ fontFamily: 'Imperial Script, cursive' }}>
              Professional Hair Treatments
            </h2>
            <p className="text-lg text-stone-600">Therapeutic care for every hair concern</p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {treatments.map((treatment, index) => (
              <div key={index} className="bg-teal-50 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
                <div className="h-48 overflow-hidden">
                  <img src={treatment.image} alt={treatment.title} className="w-full h-full object-cover" />
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-xl font-medium text-stone-800">{treatment.title}</h3>
                    <span className="text-lg font-bold text-teal-600">{treatment.price}</span>
                  </div>
                  <p className="text-stone-600 mb-4">{treatment.description}</p>
                  <div className="flex items-center gap-2 text-sm text-stone-500 mb-4">
                    <Clock className="w-4 h-4" />
                    <span>{treatment.duration}</span>
                  </div>
                  <div className="space-y-1 mb-6">
                    {treatment.includes.map((item, itemIndex) => (
                      <div key={itemIndex} className="flex items-center gap-2 text-sm text-stone-600">
                        <Droplets className="w-3 h-3 text-teal-600" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                  <Button className="w-full bg-teal-600 hover:bg-teal-700">
                    Book Treatment
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Maintenance Programs */}
      <section className="py-20 bg-green-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-light mb-6 text-stone-800" style={{ fontFamily: 'Imperial Script, cursive' }}>
              Maintenance Programs
            </h2>
            <p className="text-lg text-stone-600">Ongoing care for lasting hair health</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {maintenanceServices.map((service, index) => (
              <div key={index} className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
                <div className="flex items-center gap-4 mb-4">
                  <Heart className="w-8 h-8 text-green-600" />
                  <div>
                    <h3 className="text-2xl font-medium text-stone-800">{service.title}</h3>
                    <span className="text-xl font-bold text-green-600">{service.price}</span>
                  </div>
                </div>
                <p className="text-stone-600 mb-6">{service.description}</p>
                <div className="space-y-2 mb-6">
                  {service.includes.map((item, itemIndex) => (
                    <div key={itemIndex} className="flex items-center gap-2 text-stone-600">
                      <Star className="w-4 h-4 text-green-600" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
                <Button className="w-full bg-green-600 hover:bg-green-700">
                  Start Program
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Treatment Types */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-3xl font-light mb-8 text-stone-800" style={{ fontFamily: 'Imperial Script, cursive' }}>
              Treatment Specialties
            </h3>
            <div className="grid md:grid-cols-3 gap-8">
              {treatmentTypes.map((type, index) => (
                <div key={index} className="p-6">
                  <type.icon className="w-8 h-8 text-teal-600 mx-auto mb-4" />
                  <h4 className="text-lg font-medium text-stone-800 mb-3">{type.title}</h4>
                  <p className="text-stone-600">{type.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-br from-teal-600 to-green-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-4xl font-light mb-6" style={{ fontFamily: 'Imperial Script, cursive' }}>
            Invest in Hair Health
          </h3>
          <p className="text-xl mb-8 text-teal-100">
            Professional treatments for stronger, healthier hair
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-teal-700 hover:bg-teal-50 px-12 py-4 text-lg">
              Book Treatment - Starting at $35
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

export default HairTreatments;
