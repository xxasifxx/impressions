
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowLeft, Scissors, Heart, Star, Gift, Camera, Users } from 'lucide-react';
import AppointmentBookingModal from '@/components/AppointmentBookingModal';

const ChildrensServices = () => {
  const childrenServices = [
    {
      title: 'First Haircut Special',
      description: 'Making their very first salon experience magical and memorable',
      image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=300&fit=crop',
      price: '$25',
      duration: '30-45 minutes',
      includes: ['Certificate of first cut', 'Lock of hair keepsake', 'Photo opportunity', 'Special chair for little ones']
    },
    {
      title: 'Kids Cut & Style',
      description: 'Fun, trendy cuts that work with their lifestyle and personality',
      image: 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=400&h=300&fit=crop',
      price: '$25',
      duration: '30 minutes',
      includes: ['Age-appropriate consultation', 'Gentle washing', 'Precision cut', 'Fun styling']
    },
    {
      title: 'Special Occasion Styling',
      description: 'Beautiful styles for birthdays, holidays, and special events',
      image: 'https://images.unsplash.com/photo-1485833077593-4278bba3f11f?w=400&h=300&fit=crop',
      price: '$35+',
      duration: '45 minutes',
      includes: ['Event consultation', 'Gentle styling', 'Hair accessories if desired', 'Photos for memory book']
    }
  ];

  const comfortFeatures = [
    {
      icon: Heart,
      title: 'Patient & Gentle',
      description: 'We take our time and never rush little ones'
    },
    {
      icon: Gift,
      title: 'Fun Experience',
      description: 'Special chairs, entertainment, and treats to make it enjoyable'
    },
    {
      icon: Camera,
      title: 'Memory Making',
      description: 'Photo opportunities and keepsakes for special moments'
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
                Children's Services
              </div>
              <div className="text-xs text-stone-500 tracking-wide">Gentle Care • Fun Experience • Memory Making</div>
            </div>
            
            <AppointmentBookingModal
              trigger={
                <Button size="sm" className="bg-red-700 hover:bg-red-800">
                  Book Kids Service
                </Button>
              }
              sourcePage="childrens-services-header"
            />
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="py-20 bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h1 className="text-6xl font-light mb-6 text-stone-800" style={{ fontFamily: 'Imperial Script, cursive' }}>
              Little Ones, Big Smiles
            </h1>
            <p className="text-xl text-stone-600 max-w-3xl mx-auto">
              Where first haircuts become cherished memories • Patient, gentle care for growing personalities • 
              Making every visit a fun adventure
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=1200&h=600&fit=crop" 
                alt="Child getting first haircut"
                className="w-full h-96 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
              <div className="absolute bottom-8 left-8 right-8 text-white">
                <h2 className="text-3xl font-light mb-4">Creating Happy Memories</h2>
                <p className="text-lg text-white/90">Every child deserves a magical first salon experience</p>
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
              Services for Little Stars
            </h2>
            <p className="text-lg text-stone-600">Age-appropriate care with patience and fun</p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {childrenServices.map((service, index) => (
              <div key={index} className="bg-blue-50 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
                <div className="h-48 overflow-hidden">
                  <img src={service.image} alt={service.title} className="w-full h-full object-cover" />
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-xl font-medium text-stone-800">{service.title}</h3>
                    <span className="text-lg font-bold text-blue-600">{service.price}</span>
                  </div>
                  <p className="text-stone-600 mb-4">{service.description}</p>
                  <div className="space-y-1 mb-6">
                    {service.includes.map((item, itemIndex) => (
                      <div key={itemIndex} className="flex items-center gap-2 text-sm text-stone-600">
                        <Star className="w-3 h-3 text-blue-600" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                  <AppointmentBookingModal
                    trigger={
                      <Button className="w-full bg-blue-600 hover:bg-blue-700">
                        Book This Service
                      </Button>
                    }
                    sourcePage={`childrens-services-${service.title.toLowerCase().replace(/\s+/g, '-')}`}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Comfort Features */}
      <section className="py-16 bg-purple-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-3xl font-light mb-8 text-stone-800" style={{ fontFamily: 'Imperial Script, cursive' }}>
              Making It Fun & Comfortable
            </h3>
            <div className="grid md:grid-cols-3 gap-8">
              {comfortFeatures.map((feature, index) => (
                <div key={index} className="p-6">
                  <feature.icon className="w-8 h-8 text-purple-600 mx-auto mb-4" />
                  <h4 className="text-lg font-medium text-stone-800 mb-3">{feature.title}</h4>
                  <p className="text-stone-600">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-4xl font-light mb-6" style={{ fontFamily: 'Imperial Script, cursive' }}>
            Book Their Special Day
          </h3>
          <p className="text-xl mb-8 text-blue-100">
            Create magical memories with gentle, patient care
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <AppointmentBookingModal
              trigger={
                <Button size="lg" className="bg-white text-blue-700 hover:bg-blue-50 px-12 py-4 text-lg">
                  Book Children's Service - $25
                </Button>
              }
              sourcePage="childrens-services-cta"
            />
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 px-12 py-4 text-lg">
              Call (732) 613-1942
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ChildrensServices;
