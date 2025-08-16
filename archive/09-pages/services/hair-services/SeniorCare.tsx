
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowLeft, Heart, Users, Clock, Star, Armchair, Gift } from 'lucide-react';

const SeniorCare = () => {
  const seniorServices = [
    {
      title: 'Gentle Styling & Sets',
      description: 'Classic styles with careful attention to delicate hair and scalp',
      image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=300&fit=crop',
      price: '$35+',
      duration: '45-60 minutes',
      includes: ['Gentle wash', 'Conditioning treatment', 'Classic styling', 'Take-home care tips']
    },
    {
      title: 'Roller Sets & Traditional Styles',
      description: 'Time-honored techniques for beautiful, lasting results',
      image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=400&h=300&fit=crop',
      price: '$40+',
      duration: '60-75 minutes',
      includes: ['Professional roller set', 'Styling & finish', 'Hair spray application', 'Style maintenance tips']
    },
    {
      title: 'Color Touch-Ups',
      description: 'Gentle color services to maintain your beautiful look',
      image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=400&h=300&fit=crop',
      price: '$45+',
      duration: '45-90 minutes',
      includes: ['Color consultation', 'Gentle application', 'Deep conditioning', 'Style finish']
    }
  ];

  const comfortFeatures = [
    {
      icon: Armchair,
      title: 'Comfortable Seating',
      description: 'Supportive chairs and easy access to all services'
    },
    {
      icon: Clock,
      title: 'Unhurried Service',
      description: 'We take our time - no rushing, just relaxing care'
    },
    {
      icon: Heart,
      title: 'Gentle Touch',
      description: 'Extra care for sensitive scalps and delicate hair'
    }
  ];

  const motherDaughterPackages = [
    {
      title: 'Classic Mother-Daughter Day',
      description: 'A special bonding experience with side-by-side styling',
      price: '$120+',
      includes: ['Two styling services', 'Complimentary refreshments', 'Photo opportunity', 'Shared memories']
    },
    {
      title: 'Three Generation Special',
      description: 'Grandmother, mother, and daughter - three generations of beauty',
      price: '$180+',
      includes: ['Three services of choice', 'Group photo session', 'Special occasion styling', 'Family memories']
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
                Senior Care Services
              </div>
              <div className="text-xs text-stone-500 tracking-wide">Gentle Care • Timeless Beauty • Family Moments</div>
            </div>
            
            <Button size="sm" className="bg-red-700 hover:bg-red-800">
              Book Senior Service
            </Button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="py-20 bg-gradient-to-br from-rose-50 via-white to-amber-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h1 className="text-6xl font-light mb-6 text-stone-800" style={{ fontFamily: 'Imperial Script, cursive' }}>
              Honoring Beauty at Every Age
            </h1>
            <p className="text-xl text-stone-600 max-w-3xl mx-auto">
              Where experience meets elegance • Gentle care for graceful beauty • Creating memories that span generations
            </p>
          </div>

          {/* Mother Daughter Hero Image */}
          <div className="max-w-4xl mx-auto mb-16">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=1200&h=600&fit=crop" 
                alt="Mother and daughter at salon"
                className="w-full h-96 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
              <div className="absolute bottom-8 left-8 right-8 text-white">
                <h2 className="text-3xl font-light mb-4">Generations of Beauty</h2>
                <p className="text-lg text-white/90">Where mothers and daughters create lasting memories together</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Senior Services */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-light mb-6 text-stone-800" style={{ fontFamily: 'Imperial Script, cursive' }}>
              Services Designed for You
            </h2>
            <p className="text-lg text-stone-600">Classic techniques with modern comfort and care</p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {seniorServices.map((service, index) => (
              <div key={index} className="bg-rose-50 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
                <div className="h-48 overflow-hidden">
                  <img src={service.image} alt={service.title} className="w-full h-full object-cover" />
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-xl font-medium text-stone-800">{service.title}</h3>
                    <span className="text-lg font-bold text-rose-600">{service.price}</span>
                  </div>
                  <p className="text-stone-600 mb-4">{service.description}</p>
                  <div className="flex items-center gap-2 text-sm text-stone-500 mb-4">
                    <Clock className="w-4 h-4" />
                    <span>{service.duration}</span>
                  </div>
                  <div className="space-y-1 mb-6">
                    {service.includes.map((item, itemIndex) => (
                      <div key={itemIndex} className="flex items-center gap-2 text-sm text-stone-600">
                        <div className="w-1.5 h-1.5 bg-rose-600 rounded-full"></div>
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                  <Button className="w-full bg-rose-600 hover:bg-rose-700">
                    Book This Service
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mother-Daughter Packages */}
      <section className="py-20 bg-amber-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-light mb-6 text-stone-800" style={{ fontFamily: 'Imperial Script, cursive' }}>
              Mother-Daughter Moments
            </h2>
            <p className="text-lg text-stone-600">Special packages for creating beautiful memories together</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {motherDaughterPackages.map((pkg, index) => (
              <div key={index} className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
                <div className="flex items-center gap-4 mb-4">
                  <Users className="w-8 h-8 text-amber-600" />
                  <div>
                    <h3 className="text-2xl font-medium text-stone-800">{pkg.title}</h3>
                    <span className="text-xl font-bold text-amber-600">{pkg.price}</span>
                  </div>
                </div>
                <p className="text-stone-600 mb-6">{pkg.description}</p>
                <div className="space-y-2 mb-6">
                  {pkg.includes.map((item, itemIndex) => (
                    <div key={itemIndex} className="flex items-center gap-2 text-stone-600">
                      <Gift className="w-4 h-4 text-amber-600" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
                <Button className="w-full bg-amber-600 hover:bg-amber-700">
                  Book Mother-Daughter Experience
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Comfort Features */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-3xl font-light mb-8 text-stone-800" style={{ fontFamily: 'Imperial Script, cursive' }}>
              Your Comfort is Our Priority
            </h3>
            <div className="grid md:grid-cols-3 gap-8">
              {comfortFeatures.map((feature, index) => (
                <div key={index} className="p-6">
                  <feature.icon className="w-8 h-8 text-rose-600 mx-auto mb-4" />
                  <h4 className="text-lg font-medium text-stone-800 mb-3">{feature.title}</h4>
                  <p className="text-stone-600">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonial */}
      <section className="py-16 bg-stone-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="bg-white rounded-xl p-8 shadow-sm">
              <Star className="w-8 h-8 text-amber-500 mx-auto mb-4" />
              <blockquote className="text-xl text-stone-700 mb-6 italic">
                "My mother and I have been coming here for years. They treat us like family and always make us feel beautiful. 
                The staff is so patient and gentle - it's our special time together."
              </blockquote>
              <cite className="text-stone-600">— Margaret & Linda, loyal clients since 2015</cite>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-rose-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-4xl font-light mb-6" style={{ fontFamily: 'Imperial Script, cursive' }}>
            Let Us Pamper You
          </h3>
          <p className="text-xl mb-8 text-rose-100">
            Book your appointment for gentle, caring service
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-rose-700 hover:bg-rose-50 px-12 py-4 text-lg">
              Book Senior Service - Starting at $35
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 px-12 py-4 text-lg">
              Call (732) 613-1942
            </Button>
          </div>
          <p className="text-rose-200 mt-6">Wheelchair accessible • Patient, gentle care • Family-friendly atmosphere</p>
        </div>
      </section>
    </div>
  );
};

export default SeniorCare;
