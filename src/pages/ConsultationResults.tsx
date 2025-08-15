import React, { useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft, ShoppingCart, Star, Clock, DollarSign, Package, Sparkles } from 'lucide-react';
import { useAestheticContext } from '@/components/ConsultationModal/AestheticProvider';
import { Button } from '@/components/ui/button';
import { UnifiedConsultationResult } from '@/data/unifiedConsultationFlow';

// Mock service data - in a real app, this would come from an API or data store
const mockServices = {
  'hair-precision-cut': {
    id: 'hair-precision-cut',
    name: 'Precision Haircut',
    description: 'A tailored haircut designed to enhance your features and style.',
    price: '$65',
    duration: '45 min'
  },
  'hair-balayage': {
    id: 'hair-balayage',
    name: 'Balayage',
    description: 'Hand-painted highlights for a natural, sun-kissed look.',
    price: '$150+',
    duration: '2-3 hrs'
  },
  'blowout-styling': {
    id: 'blowout-styling',
    name: 'Blowout & Styling',
    description: 'Professional blow dry and styling for any occasion.',
    price: '$55',
    duration: '45 min'
  },
  'makeup-bridal': {
    id: 'makeup-bridal',
    name: 'Bridal Makeup',
    description: 'Complete bridal makeup application with premium products.',
    price: '$120',
    duration: '90 min'
  },
  'makeup-special-event': {
    id: 'makeup-special-event',
    name: 'Special Event Makeup',
    description: 'Full makeup application perfect for special occasions.',
    price: '$85',
    duration: '60 min'
  },
  'gold-facial': {
    id: 'gold-facial',
    name: 'Gold Facial',
    description: 'Luxurious facial treatment with 24k gold for radiant skin.',
    price: '$120',
    duration: '60 min'
  },
  'hydra-facial': {
    id: 'hydra-facial',
    name: 'HydraFacial',
    description: 'Deep-cleansing, exfoliating, and hydrating treatment.',
    price: '$150',
    duration: '45 min'
  },
  'dermaplaning': {
    id: 'dermaplaning',
    name: 'Dermaplaning',
    description: 'Exfoliation treatment that removes dead skin and peach fuzz.',
    price: '$75',
    duration: '30 min'
  },
  'hair-extensions': {
    id: 'hair-extensions',
    name: 'Hair Extensions',
    description: 'Premium quality hair extensions for added length and volume.',
    price: '$300+',
    duration: '2-3 hrs'
  },
  'lash-extensions': {
    id: 'lash-extensions',
    name: 'Lash Extensions',
    description: 'Full set of individual eyelash extensions for a dramatic look.',
    price: '$150',
    duration: '90 min'
  },
  'keratin-treatment': {
    id: 'keratin-treatment',
    name: 'Keratin Treatment',
    description: 'Smoothing treatment that eliminates frizz and adds shine.',
    price: '$250',
    duration: '2 hrs'
  },
  'brow-styling': {
    id: 'brow-styling',
    name: 'Brow Styling',
    description: 'Professional shaping and styling for perfect brows.',
    price: '$35',
    duration: '30 min'
  },
  'led-light-therapy': {
    id: 'led-light-therapy',
    name: 'LED Light Therapy',
    description: 'Advanced treatment using LED light to treat skin concerns.',
    price: '$85',
    duration: '30 min'
  },
  'eyebrow-threading': {
    id: 'eyebrow-threading',
    name: 'Eyebrow Threading',
    description: 'Precise eyebrow shaping using the threading technique.',
    price: '$25',
    duration: '15 min'
  },
  'deep-conditioning': {
    id: 'deep-conditioning',
    name: 'Deep Conditioning Treatment',
    description: 'Intensive treatment to restore moisture and shine to hair.',
    price: '$45',
    duration: '30 min'
  },
  'hair-color': {
    id: 'hair-color',
    name: 'Hair Color',
    description: 'Professional hair coloring for a fresh new look.',
    price: '$85+',
    duration: '90 min'
  },
  'makeup-natural': {
    id: 'makeup-natural',
    name: 'Natural Makeup',
    description: 'Subtle makeup application for a polished, everyday look.',
    price: '$65',
    duration: '45 min'
  }
};

// Mock package data
const mockPackages = {
  'bridal-complete': {
    id: 'bridal-complete',
    name: 'Bridal Complete Package',
    description: 'Everything you need for your special day.',
    services: ['hair-balayage', 'blowout-styling', 'makeup-bridal', 'gold-facial'],
    originalPrice: 395,
    bundlePrice: 325,
    savings: 70
  },
  'professional-polish': {
    id: 'professional-polish',
    name: 'Professional Polish Package',
    description: 'Look your best for important work events.',
    services: ['hair-precision-cut', 'makeup-natural', 'hydra-facial'],
    originalPrice: 280,
    bundlePrice: 240,
    savings: 40
  },
  'maintenance-package': {
    id: 'maintenance-package',
    name: 'Monthly Maintenance Package',
    description: 'Keep your look fresh with regular maintenance.',
    services: ['hair-precision-cut', 'brow-styling', 'hydra-facial'],
    originalPrice: 245,
    bundlePrice: 210,
    savings: 35
  }
};

const ConsultationResults = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const aesthetic = useAestheticContext();
  
  // Get results from location state or redirect to consultation
  const results = location.state?.results as UnifiedConsultationResult;
  
  useEffect(() => {
    if (!results) {
      navigate('/consultation');
      return;
    }
    
    // Maintain the aesthetic state from the consultation
    if (aesthetic.currentState.emotionalState !== 'celebratory') {
      aesthetic.evolveToState('confident', 'Viewing recommendations');
    }
    
    // Apply service category if available
    if (results.primaryServiceCategory) {
      aesthetic.applyToElement(
        document.documentElement,
        results.primaryServiceCategory
      );
    }
    
    // Apply mood if available
    if (results.customerMood) {
      aesthetic.applyToElement(
        document.documentElement,
        undefined,
        results.customerMood
      );
    }
  }, [results, aesthetic, navigate]);

  if (!results) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your personalized recommendations...</p>
          <p className="text-sm text-gray-500 mt-4">
            If you haven't completed a consultation, please 
            <Link to="/consultation" className="text-red-600 hover:text-red-700 ml-1">
              start one here
            </Link>.
          </p>
        </div>
      </div>
    );
  }

  const handleAddToCart = (serviceId: string) => {
    // In a real app, this would add the service to the cart
    console.log('Adding to cart:', serviceId);
    
    // Trigger celebratory animation
    aesthetic.triggerCelebratoryState('Added to cart');
  };

  const ServiceCard = ({ serviceId, isPrimary = false }: { serviceId: string; isPrimary?: boolean }) => {
    const service = mockServices[serviceId as keyof typeof mockServices];
    if (!service) return null;
    
    return (
      <div className={`bg-white rounded-xl shadow-lg border-2 transition-all duration-300 hover:shadow-xl ${
        isPrimary ? 'border-red-200 bg-gradient-to-br from-red-50 to-white' : 'border-gray-200 hover:border-gray-300'
      }`}>
        <div className="p-6">
          <div className="flex justify-between items-start mb-4">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <h3 className={`text-xl font-semibold ${isPrimary ? 'text-red-800' : 'text-gray-800'}`}>
                  {service.name}
                </h3>
                {isPrimary && (
                  <span className="px-2 py-1 text-xs font-medium bg-red-100 text-red-700 rounded-full">
                    Top Pick
                  </span>
                )}
              </div>
              <p className="text-gray-600 text-sm mb-3">{service.description}</p>
              
              <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  <span>{service.duration}</span>
                </div>
                <div className="flex items-center gap-1">
                  <DollarSign className="w-4 h-4" />
                  <span className="font-medium text-gray-700">{service.price}</span>
                </div>
              </div>
            </div>
          </div>
          
          <button
            onClick={() => handleAddToCart(service.id)}
            className={`w-full py-3 px-4 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center gap-2 ${
              isPrimary 
                ? 'bg-red-600 hover:bg-red-700 text-white' 
                : 'border-2 border-red-200 text-red-700 hover:bg-red-50'
            }`}
          >
            <ShoppingCart className="w-4 h-4" />
            Add to Cart
          </button>
        </div>
      </div>
    );
  };

  const PackageCard = ({ packageId }: { packageId: string }) => {
    const pkg = mockPackages[packageId as keyof typeof mockPackages];
    if (!pkg) return null;
    
    return (
      <div className="bg-gradient-to-br from-red-50 via-white to-red-50 rounded-xl shadow-lg border-2 border-red-200">
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Package className="w-5 h-5 text-red-600" />
              <h3 className="text-xl font-semibold text-red-800">{pkg.name}</h3>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-500 line-through">
                ${pkg.originalPrice}
              </div>
              <div className="text-xl font-bold text-red-700">
                ${pkg.bundlePrice}
              </div>
            </div>
          </div>
          
          <div className="bg-green-100 border border-green-200 rounded-lg p-3 mb-4">
            <div className="flex items-center justify-between">
              <span className="text-green-800 font-medium">
                You Save: ${pkg.savings}
              </span>
              <span className="text-green-700 text-sm">
                {Math.round((pkg.savings / pkg.originalPrice) * 100)}% off
              </span>
            </div>
          </div>
          
          <div className="space-y-2 mb-4">
            <h4 className="text-sm font-medium text-gray-700">Includes:</h4>
            {pkg.services.map((serviceId) => {
              const service = mockServices[serviceId as keyof typeof mockServices];
              return (
                <div key={serviceId} className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">{service?.name}</span>
                  <span className="text-gray-500">{service?.price}</span>
                </div>
              );
            })}
          </div>
          
          <p className="text-sm text-gray-600 mb-4">{pkg.description}</p>
          
          <button 
            onClick={() => {
              console.log('Adding package to cart:', pkg.id);
              aesthetic.triggerCelebratoryState('Added package to cart');
            }}
            className="w-full py-3 px-4 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-colors duration-200 flex items-center justify-center gap-2"
          >
            <ShoppingCart className="w-4 h-4" />
            Add Bundle to Cart
          </button>
        </div>
      </div>
    );
  };

  // Get all recommended services across domains
  const allRecommendedServices = [
    ...results.recommendedServices['hair-salon'],
    ...results.recommendedServices['makeup-studio'],
    ...results.recommendedServices['med-spa']
  ];

  return (
    <div className={`min-h-screen bg-gray-50 ${aesthetic.getStateClassName()}`}>
      {/* Hero Section with Personalized Summary */}
      <section className="bg-gradient-to-r from-red-50 to-pink-50 py-12 px-4 rounded-xl mb-8">
        <div className="max-w-4xl mx-auto">
          <Link 
            to="/consultation"
            className="inline-flex items-center gap-2 text-red-600 hover:text-red-700 mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Consultation
          </Link>
          
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Your Personalized Beauty Journey
          </h1>
          <p className="text-xl text-gray-700 mb-6">
            Based on your consultation, we've created a personalized experience for your {results.customerMotivation.replace(/-/g, ' ')} goals.
          </p>
          <div className="flex flex-wrap gap-3 mb-6">
            {results.recommendedServices['hair-salon'].length > 0 && (
              <span className="bg-white/70 px-3 py-1 rounded-full text-sm font-medium text-gray-700">
                Hair Services
              </span>
            )}
            {results.recommendedServices['makeup-studio'].length > 0 && (
              <span className="bg-white/70 px-3 py-1 rounded-full text-sm font-medium text-gray-700">
                Makeup Services
              </span>
            )}
            {results.recommendedServices['med-spa'].length > 0 && (
              <span className="bg-white/70 px-3 py-1 rounded-full text-sm font-medium text-gray-700">
                Med Spa Services
              </span>
            )}
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button size="lg" className="bg-red-600 hover:bg-red-700 text-white">
              Book Your First Service
            </Button>
            <Button size="lg" variant="outline">
              Save Your Recommendations
            </Button>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8">
        {/* Primary Recommendations */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">Recommended Just for You</h2>
            <Button variant="ghost" className="text-red-600">
              View All <ArrowRight className="w-4 h-4 ml-1" />
            </Button>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {allRecommendedServices.slice(0, 3).map((serviceId, index) => (
              <ServiceCard 
                key={serviceId} 
                serviceId={serviceId} 
                isPrimary={index === 0}
              />
            ))}
          </div>
        </section>

        {/* Package Recommendations */}
        {results.crossDomainPackages.length > 0 && (
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6">
              Save with these packages:
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {results.crossDomainPackages.map((packageId) => (
                <PackageCard key={packageId} packageId={packageId} />
              ))}
            </div>
          </section>
        )}

        {/* Domain-Specific Recommendations */}
        {results.recommendedServices['hair-salon'].length > 0 && (
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6">Hair Salon Services</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {results.recommendedServices['hair-salon'].map((serviceId) => (
                <ServiceCard key={serviceId} serviceId={serviceId} />
              ))}
            </div>
          </section>
        )}

        {results.recommendedServices['makeup-studio'].length > 0 && (
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6">Makeup Studio Services</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {results.recommendedServices['makeup-studio'].map((serviceId) => (
                <ServiceCard key={serviceId} serviceId={serviceId} />
              ))}
            </div>
          </section>
        )}

        {results.recommendedServices['med-spa'].length > 0 && (
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6">Med Spa Services</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {results.recommendedServices['med-spa'].map((serviceId) => (
                <ServiceCard key={serviceId} serviceId={serviceId} />
              ))}
            </div>
          </section>
        )}

        {/* Call to Action */}
        <section className="bg-gradient-to-r from-red-50 to-red-100 rounded-xl p-8 text-center">
          <h2 className="text-2xl font-bold text-red-800 mb-4">
            Ready to book your transformation?
          </h2>
          <p className="text-gray-600 mb-6">
            Our expert stylists are ready to bring your vision to life. 
            Book now to secure your preferred time slot.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-colors duration-200">
              Book Appointment
            </button>
            <Link 
              to="/services"
              className="px-8 py-3 border-2 border-red-200 text-red-700 hover:bg-red-50 rounded-lg font-medium transition-colors duration-200"
            >
              Browse All Services
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ConsultationResults;

