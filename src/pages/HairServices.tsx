import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowLeft, Phone, ArrowRight, Heart, Shield, Sparkles } from 'lucide-react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const HairServices = () => {
  const customerJourneys = [
    {
      title: 'Color Dreams',
      subtitle: 'Bold & Beautiful',
      image: 'https://images.unsplash.com/photo-1522338242992-e1a54906a8da?w=800&h=600&fit=crop', // Woman with beautiful blonde balayage highlights
      description: 'From subtle highlights to dramatic transformations',
      link: '/hair-services/color-journey'
    },
    {
      title: 'Perfect Cuts',
      subtitle: 'Style That Fits',
      image: 'https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?w=800&h=600&fit=crop', // Professional stylist cutting hair with precision
      description: 'Precision cuts that work with your lifestyle',
      link: '/hair-services/precision-cuts'
    },
    {
      title: 'Family Care',
      subtitle: 'Gentle & Caring',
      image: 'https://images.unsplash.com/photo-1551836022-deb4988cc6c0?w=800&h=600&fit=crop', // Gentle hair styling for elderly woman in salon
      description: 'Special moments for all generations',
      link: '/hair-services/senior-care'
    }
  ];

  const specializedServices = [
    {
      icon: Heart,
      title: 'Children\'s Services',
      image: 'https://images.unsplash.com/photo-1544717297-fa95b6ee9643?w=300&h=200&fit=crop', // Child getting first haircut in salon chair
      price: 'From $25',
      link: '/hair-services/childrens-services'
    },
    {
      icon: Shield,
      title: 'Privacy & Modesty',
      image: 'https://images.unsplash.com/photo-1562004760-aceed7bb0fe3?w=300&h=200&fit=crop', // Private salon suite with curtains for modesty
      price: 'From $45',
      link: '/hair-services/privacy-services'
    },
    {
      icon: Sparkles,
      title: 'Special Occasions',
      image: 'https://images.unsplash.com/photo-1519699047748-de8e457a634e?w=300&h=200&fit=crop', // Elegant updo bridal hairstyle being created
      price: 'From $35',
      link: '/hair-services/styling-services'
    }
  ];

  const expertiseServices = [
    {
      title: 'Balayage',
      image: 'https://images.unsplash.com/photo-1580618672591-eb180b1a973f?w=250&h=180&fit=crop', // Hand-painted balayage technique in progress
      price: '$110+',
      link: '/hair-services/balayage'
    },
    {
      title: 'Color Fix',
      image: 'https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?w=250&h=180&fit=crop', // Color correction from damaged to healthy hair transformation
      price: '$35+',
      link: '/hair-services/color-correction'
    },
    {
      title: 'Extensions',
      image: 'https://images.unsplash.com/photo-1487412912498-0447578fcca8?w=250&h=180&fit=crop', // Hair extension application process showing length transformation
      price: '$150+',
      link: '/hair-services/extensions'
    },
    {
      title: 'Treatments',
      image: 'https://images.unsplash.com/photo-1616847220575-1b875cea11dd?w=250&h=180&fit=crop', // Deep conditioning hair treatment mask being applied
      price: '$35+',
      link: '/hair-services/hair-treatments'
    },
    {
      title: 'Chemical',
      image: 'https://images.unsplash.com/photo-1492106087820-71f1a00d2b11?w=250&h=180&fit=crop', // Professional perm rods and chemical processing
      price: 'Consult',
      link: '/hair-services/chemical-services'
    },
    {
      title: 'Root Touch',
      image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=250&h=180&fit=crop', // Precise root touch-up color application at hairline
      price: '$65+',
      link: '/hair-services/root-touch-up'
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-stone-200 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2 text-stone-600 hover:text-stone-800">
              <ArrowLeft className="w-4 h-4" />
              <span className="text-sm font-medium">Back</span>
            </Link>
            
            <div className="text-center">
              <h1 className="text-2xl font-light text-stone-800" style={{ fontFamily: 'Imperial Script, cursive' }}>
                Your Hair Journey
              </h1>
            </div>
            
            <Button size="sm" className="bg-red-700 hover:bg-red-800">
              <Phone className="w-4 h-4 mr-1" />
              Call Now
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content - Horizontal Layout */}
      <div className="min-h-[calc(100vh-80px)] flex">
        {/* Left Side - Hero & Customer Journeys */}
        <div className="flex-1 bg-gradient-to-br from-red-50 to-white flex flex-col">
          {/* Hero Message */}
          <div className="text-center py-8 px-6">
            <h2 className="text-4xl font-light text-stone-800 mb-3" style={{ fontFamily: 'Imperial Script, cursive' }}>
              This Is About You
            </h2>
            <p className="text-lg text-stone-600 max-w-xl mx-auto">
              Your story • Your style • Your comfort • Your needs
            </p>
          </div>

          {/* Customer Journey Carousel */}
          <div className="flex-1 px-8 pb-8">
            <Carousel className="w-full max-w-4xl mx-auto">
              <CarouselContent>
                {customerJourneys.map((journey, index) => (
                  <CarouselItem key={index}>
                    <Link to={journey.link} className="group block">
                      <div className="relative h-80 rounded-2xl overflow-hidden shadow-xl group-hover:shadow-2xl transition-all duration-500">
                        <img 
                          src={journey.image} 
                          alt={journey.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
                        <div className="absolute bottom-0 left-0 right-0 p-8">
                          <h3 className="text-white text-3xl font-light mb-2" style={{ fontFamily: 'Imperial Script, cursive' }}>
                            {journey.title}
                          </h3>
                          <p className="text-white/90 text-lg mb-2">{journey.subtitle}</p>
                          <p className="text-white/80">{journey.description}</p>
                          <div className="flex items-center mt-4 text-white group-hover:text-red-200">
                            <span className="mr-2">Start your journey</span>
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                          </div>
                        </div>
                      </div>
                    </Link>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="left-4" />
              <CarouselNext className="right-4" />
            </Carousel>
          </div>
        </div>

        {/* Right Side - Services Grid */}
        <div className="flex-1 bg-stone-50 flex flex-col min-h-[calc(100vh-80px)]">
          {/* Special Care Services */}
          <div className="p-6 border-b border-stone-200">
            <h3 className="text-xl font-light text-stone-800 mb-4 text-center" style={{ fontFamily: 'Imperial Script, cursive' }}>
              We See You
            </h3>
            <div className="grid grid-cols-3 gap-4">
              {specializedServices.map((service, index) => (
                <Link key={index} to={service.link} className="group">
                  <div className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group-hover:-translate-y-1">
                    <div className="relative h-24 overflow-hidden">
                      <img 
                        src={service.image} 
                        alt={service.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                    <div className="p-3">
                      <div className="flex items-center gap-2 mb-2">
                        <service.icon className="w-4 h-4 text-red-600" />
                        <h4 className="text-sm font-medium text-stone-800">{service.title}</h4>
                      </div>
                      <p className="text-xs text-red-600 font-medium">{service.price}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Expertise Grid */}
          <div className="flex-1 p-6">
            <h3 className="text-xl font-light text-stone-800 mb-4 text-center" style={{ fontFamily: 'Imperial Script, cursive' }}>
              Our Expertise
            </h3>
            <div className="grid grid-cols-3 gap-3 auto-rows-fr">
              {expertiseServices.map((service, index) => (
                <Link key={index} to={service.link} className="group">
                  <div className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 h-full flex flex-col">
                    <div className="relative flex-1 overflow-hidden min-h-[120px]">
                      <img 
                        src={service.image} 
                        alt={service.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="p-3">
                      <h4 className="text-sm font-medium text-stone-800 mb-1">{service.title}</h4>
                      <p className="text-xs text-red-600 font-medium">{service.price}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Bottom CTA */}
          <div className="p-6 bg-gradient-to-r from-red-600 to-red-700 text-white">
            <div className="text-center">
              <h4 className="text-lg font-light mb-2" style={{ fontFamily: 'Imperial Script, cursive' }}>
                Ready to Begin?
              </h4>
              <div className="flex gap-3 justify-center">
                <Button size="sm" className="bg-white text-red-700 hover:bg-red-50">
                  Book Now
                </Button>
                <Button size="sm" variant="outline" className="border-white text-white hover:bg-white/10">
                  Call (732) 613-1942
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HairServices;
