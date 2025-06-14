
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowLeft, Shield, Users, MapPin, Heart, Clock, Star } from 'lucide-react';

const PrivacyServices = () => {
  const privacyServices = [
    {
      title: 'Private Booth Sessions',
      description: 'Complete privacy with our dedicated booth and secondary entrance',
      image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=400&h=300&fit=crop',
      price: '$65+',
      duration: '60-90 minutes',
      includes: ['Private booth access', 'Secondary entrance', 'Personal consultation', 'Respectful, discrete service']
    },
    {
      title: 'Modesty-Focused Styling',
      description: 'Hair services that honor your values and comfort level',
      image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=400&h=300&fit=crop',
      price: '$45+',
      duration: '45-75 minutes',
      includes: ['Respectful consultation', 'Modest styling options', 'Cultural sensitivity', 'Comfortable environment']
    },
    {
      title: 'Family Privacy Sessions',
      description: 'Private time for families who value discretion and modesty',
      image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=300&fit=crop',
      price: '$120+',
      duration: '90+ minutes',
      includes: ['Exclusive booth time', 'Multiple family members', 'Cultural understanding', 'Flexible scheduling']
    }
  ];

  const privacyFeatures = [
    {
      icon: MapPin,
      title: 'Secondary Entrance',
      description: 'Direct access to private booth without going through main salon'
    },
    {
      icon: Shield,
      title: 'Complete Privacy',
      description: 'Dedicated booth with full privacy and discretion'
    },
    {
      icon: Heart,
      title: 'Cultural Respect',
      description: 'Understanding and honoring diverse modesty requirements'
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
                Privacy & Modesty Services
              </div>
              <div className="text-xs text-stone-500 tracking-wide">Respectful Care • Complete Privacy • Cultural Understanding</div>
            </div>
            
            <Button size="sm" className="bg-red-700 hover:bg-red-800">
              Book Private Service
            </Button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="py-20 bg-gradient-to-br from-green-50 via-white to-teal-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h1 className="text-6xl font-light mb-6 text-stone-800" style={{ fontFamily: 'Imperial Script, cursive' }}>
              Honoring Your Values
            </h1>
            <p className="text-xl text-stone-600 max-w-3xl mx-auto">
              Complete privacy and cultural respect • Secondary entrance for discretion • 
              Professional service that understands modesty and family values
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1560066984-138dadb4c035?w=1200&h=600&fit=crop" 
                alt="Private salon booth"
                className="w-full h-96 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
              <div className="absolute bottom-8 left-8 right-8 text-white">
                <h2 className="text-3xl font-light mb-4">Your Comfort, Our Priority</h2>
                <p className="text-lg text-white/90">Professional hair services with complete privacy and respect</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-light mb-6 text-stone-800" style={{ fontFamily: 'Imperial Script, cursive' }}>
              Private & Respectful Services
            </h2>
            <p className="text-lg text-stone-600">Professional care in a comfortable, private environment</p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {privacyServices.map((service, index) => (
              <div key={index} className="bg-green-50 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
                <div className="h-48 overflow-hidden">
                  <img src={service.image} alt={service.title} className="w-full h-full object-cover" />
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-xl font-medium text-stone-800">{service.title}</h3>
                    <span className="text-lg font-bold text-green-600">{service.price}</span>
                  </div>
                  <p className="text-stone-600 mb-4">{service.description}</p>
                  <div className="flex items-center gap-2 text-sm text-stone-500 mb-4">
                    <Clock className="w-4 h-4" />
                    <span>{service.duration}</span>
                  </div>
                  <div className="space-y-1 mb-6">
                    {service.includes.map((item, itemIndex) => (
                      <div key={itemIndex} className="flex items-center gap-2 text-sm text-stone-600">
                        <Shield className="w-3 h-3 text-green-600" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                  <Button className="w-full bg-green-600 hover:bg-green-700">
                    Book Private Service
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Privacy Features */}
      <section className="py-16 bg-teal-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-3xl font-light mb-8 text-stone-800" style={{ fontFamily: 'Imperial Script, cursive' }}>
              Privacy & Respect Features
            </h3>
            <div className="grid md:grid-cols-3 gap-8">
              {privacyFeatures.map((feature, index) => (
                <div key={index} className="p-6">
                  <feature.icon className="w-8 h-8 text-teal-600 mx-auto mb-4" />
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
                "Finally found a salon that truly understands and respects our family's values. 
                The private entrance and booth made all the difference. Professional service with complete discretion."
              </blockquote>
              <cite className="text-stone-600">— A satisfied family</cite>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-green-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-4xl font-light mb-6" style={{ fontFamily: 'Imperial Script, cursive' }}>
            Book Your Private Experience
          </h3>
          <p className="text-xl mb-8 text-green-100">
            Professional hair services with complete privacy and cultural respect
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-green-700 hover:bg-green-50 px-12 py-4 text-lg">
              Book Private Service - Starting at $45
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 px-12 py-4 text-lg">
              Call (732) 613-1942
            </Button>
          </div>
          <p className="text-green-200 mt-6">Secondary entrance • Private booth • Respectful, discrete service</p>
        </div>
      </section>
    </div>
  );
};

export default PrivacyServices;
