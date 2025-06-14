
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowLeft, Heart, Users, Baby, Star, Shield, Lock } from 'lucide-react';

const FamilyCare = () => {
  const familyServices = [
    {
      title: 'First Haircut Experience',
      description: 'Making your little one\'s first haircut a magical memory',
      image: 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=600&h=400&fit=crop',
      price: '$25',
      includes: ['Certificate & photo', 'Lock of hair keepsake', 'Gentle approach', 'Parent participation']
    },
    {
      title: 'Children\'s Cuts & Styling',
      description: 'Fun, age-appropriate cuts that kids love and parents appreciate',
      image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=600&h=400&fit=crop',
      price: '$25-30',
      includes: ['School-friendly styles', 'Easy maintenance', 'Fun accessories', 'Patient stylists']
    },
    {
      title: 'Family Package Deals',
      description: 'Special pricing when the whole family gets pampered together',
      image: 'https://images.unsplash.com/photo-1609220136736-443140cffec6?w=600&h=400&fit=crop',
      price: 'Save 15%',
      includes: ['Multiple services', 'Coordinated appointments', 'Group photos', 'Memory making']
    }
  ];

  const specialNeeds = [
    {
      icon: Shield,
      title: 'Sensory-Friendly Environment',
      description: 'Quiet spaces and gentle techniques for children with sensory sensitivities'
    },
    {
      icon: Heart,
      title: 'Patience & Understanding',
      description: 'Our stylists are trained to work with children of all temperaments'
    },
    {
      icon: Users,
      title: 'Parent Involvement',
      description: 'Parents can stay close and be part of the experience'
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
                Family Care
              </div>
              <div className="text-xs text-stone-500 tracking-wide">Creating Beautiful Memories Together</div>
            </div>
            
            <Button size="sm" className="bg-red-700 hover:bg-red-800">
              Book Family Visit
            </Button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="py-20 bg-gradient-to-br from-pink-50 via-white to-purple-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h1 className="text-6xl font-light mb-6 text-stone-800" style={{ fontFamily: 'Imperial Script, cursive' }}>
              A Salon for Every Family
            </h1>
            <p className="text-xl text-stone-600 max-w-3xl mx-auto">
              From first haircuts to family celebrations, we create beautiful memories in a welcoming, comfortable environment for all ages
            </p>
          </div>

          {/* Featured Family Moment */}
          <div className="max-w-4xl mx-auto mb-16">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?w=1200&h=600&fit=crop" 
                alt="Family getting hair done together"
                className="w-full h-96 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
              <div className="absolute bottom-8 left-8 right-8 text-white">
                <h2 className="text-3xl font-light mb-4">Making Memories Together</h2>
                <p className="text-lg text-white/90">Every family has a story - let us help you look and feel your best for every chapter</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Private Booth Section */}
      <section className="py-20 bg-stone-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <Lock className="w-8 h-8 text-purple-600" />
                  <h2 className="text-4xl font-light text-stone-800" style={{ fontFamily: 'Imperial Script, cursive' }}>
                    Private Booth Experience
                  </h2>
                </div>
                <p className="text-lg text-stone-600 mb-6">
                  For our privacy-focused customers, we offer a completely private booth where you can enjoy our services 
                  in complete comfort and discretion. Perfect for those who prefer a more intimate salon experience.
                </p>
                <div className="space-y-4 mb-8">
                  <div className="flex items-center gap-3">
                    <Shield className="w-5 h-5 text-purple-600" />
                    <span className="text-stone-700">Complete privacy and discretion</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Heart className="w-5 h-5 text-purple-600" />
                    <span className="text-stone-700">Comfortable, welcoming environment</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Users className="w-5 h-5 text-purple-600" />
                    <span className="text-stone-700">Perfect for families or individual appointments</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Star className="w-5 h-5 text-purple-600" />
                    <span className="text-stone-700">All services available in private setting</span>
                  </div>
                </div>
                <Button className="bg-purple-600 hover:bg-purple-700 px-8 py-3">
                  Reserve Private Booth
                </Button>
              </div>
              <div className="relative">
                <img 
                  src="https://images.unsplash.com/photo-1560066984-138dadb4c035?w=600&h=500&fit=crop" 
                  alt="Private salon booth"
                  className="w-full h-96 object-cover rounded-2xl shadow-xl"
                />
                <div className="absolute top-4 right-4 bg-purple-600/90 text-white px-3 py-1 rounded-full text-sm">
                  Private & Discreet
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Family Services */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-light mb-6 text-stone-800" style={{ fontFamily: 'Imperial Script, cursive' }}>
              Family Services
            </h2>
            <p className="text-lg text-stone-600">Specialized care for every member of your family</p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {familyServices.map((service, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-lg border border-stone-100 overflow-hidden hover:shadow-xl transition-shadow">
                <div className="h-48 overflow-hidden">
                  <img src={service.image} alt={service.title} className="w-full h-full object-cover" />
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-medium text-stone-800">{service.title}</h3>
                    <span className="text-lg font-bold text-pink-600">{service.price}</span>
                  </div>
                  <p className="text-stone-600 mb-4">{service.description}</p>
                  <div className="space-y-2 mb-6">
                    {service.includes.map((item, itemIndex) => (
                      <div key={itemIndex} className="flex items-center gap-2 text-sm text-stone-500">
                        <Baby className="w-3 h-3" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                  <Button className="w-full bg-pink-600 hover:bg-pink-700">
                    Book This Service
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Special Needs Support */}
      <section className="py-16 bg-pink-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-3xl font-light mb-8 text-stone-800" style={{ fontFamily: 'Imperial Script, cursive' }}>
              Special Needs & Considerations
            </h3>
            <p className="text-lg text-stone-600 mb-12">
              We believe every child deserves a positive salon experience, regardless of their unique needs
            </p>
            <div className="grid md:grid-cols-3 gap-8">
              {specialNeeds.map((need, index) => (
                <div key={index} className="p-6 bg-white rounded-xl shadow-sm">
                  <need.icon className="w-8 h-8 text-pink-600 mx-auto mb-4" />
                  <h4 className="text-lg font-medium text-stone-800 mb-3">{need.title}</h4>
                  <p className="text-stone-600">{need.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-pink-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-4xl font-light mb-6" style={{ fontFamily: 'Imperial Script, cursive' }}>
            Ready for a Family Hair Day?
          </h3>
          <p className="text-xl mb-8 text-pink-100">
            Book your family appointment and create beautiful memories together
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-pink-700 hover:bg-pink-50 px-12 py-4 text-lg">
              Book Family Package
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-pink-700 px-12 py-4 text-lg">
              Reserve Private Booth
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FamilyCare;
