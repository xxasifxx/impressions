import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { AestheticProvider } from '@/components/ConsultationModal/AestheticProvider';
import ServiceCard from '@/components/ServiceCard';
import ServiceDetailModal from '@/components/ServiceDetailModal';
import { useCart } from '@/contexts/CartContext';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ShoppingCart } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

/**
 * Personalized results page that displays recommendations based on consultation
 */
const PersonalizedResultsPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { addItem } = useCart();
  
  const [recommendations, setRecommendations] = useState<any>(null);
  const [selectedService, setSelectedService] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // Get recommendations from location state or localStorage
    const storedRecommendations = location.state?.recommendations || 
      JSON.parse(localStorage.getItem('consultationResults') || 'null');
    
    if (storedRecommendations) {
      setRecommendations(storedRecommendations);
      setIsLoading(false);
    } else {
      // Redirect to home if no recommendations
      navigate('/');
    }
  }, [location, navigate]);
  
  // Determine domain focus from recommendations
  const getPrimaryDomain = () => {
    if (!recommendations) return 'hair-salon';
    
    // Get domain with most recommendations
    const domains = Object.keys(recommendations.recommendedServices);
    let primaryDomain = domains[0];
    let maxCount = 0;
    
    domains.forEach(domain => {
      const count = recommendations.recommendedServices[domain].length;
      if (count > maxCount) {
        maxCount = count;
        primaryDomain = domain;
      }
    });
    
    return primaryDomain;
  };
  
  const primaryDomain = getPrimaryDomain();
  
  // Mock function to get service details by ID
  const getServiceById = (serviceId: string) => {
    // In a real implementation, this would fetch from API or data store
    // For now, we'll create mock data
    return {
      id: serviceId,
      name: serviceId.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
      shortDescription: `Professional ${serviceId.replace(/-/g, ' ')} service`,
      fullDescription: `Our expert stylists provide professional ${serviceId.replace(/-/g, ' ')} services tailored to your unique needs and preferences.`,
      price: Math.floor(Math.random() * 100) + 50, // Random price between 50-150
      duration: Math.floor(Math.random() * 60) + 30, // Random duration between 30-90 minutes
      domain: serviceId.split('-')[0] || primaryDomain,
      benefits: [
        'Personalized consultation',
        'Expert techniques',
        'Premium products',
        'Relaxing experience'
      ],
      imageUrl: `https://source.unsplash.com/random/300x200?${serviceId.replace(/-/g, '+')}`
    };
  };
  
  // Get complementary services based on recommendations
  const getComplementaryServices = () => {
    if (!recommendations) return [];
    
    const complementaryServices = [];
    const domains = Object.keys(recommendations.recommendedServices);
    
    // Get services from non-primary domains
    domains.forEach(domain => {
      if (domain !== primaryDomain) {
        recommendations.recommendedServices[domain].forEach((serviceId: string) => {
          complementaryServices.push(getServiceById(serviceId));
        });
      }
    });
    
    return complementaryServices;
  };
  
  // Handle service click
  const handleServiceClick = (service: any) => {
    setSelectedService(service);
    setIsModalOpen(true);
  };
  
  // Handle add to cart
  const handleAddToCart = (service: any) => {
    addItem({
      id: service.id,
      name: service.name,
      price: service.price,
      duration: service.duration,
      domain: service.domain,
      imageUrl: service.imageUrl
    });
    
    toast({
      title: "Added to cart",
      description: `${service.name} has been added to your cart.`,
      duration: 3000,
    });
  };
  
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    );
  }
  
  return (
    <AestheticProvider 
      currentServiceCategory={primaryDomain}
      options={{ initialState: 'confident' }}
    >
      <div className="personalized-results-page min-h-screen">
        <header className="bg-white/90 backdrop-blur-sm border-b sticky top-0 z-10 py-4">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between">
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-gray-600"
                onClick={() => navigate('/')}
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Home
              </Button>
              
              <Button 
                variant="outline"
                onClick={() => navigate('/booking')}
              >
                <ShoppingCart className="w-4 h-4 mr-2" />
                Proceed to Booking
              </Button>
            </div>
          </div>
        </header>
        
        <main className="container mx-auto px-4 py-8">
          <div className="results-header text-center mb-12">
            <h1 className="text-3xl font-light mb-4">Your Personalized Beauty Plan</h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Based on your consultation, we've curated these services just for you. 
              Each recommendation is tailored to your specific needs and preferences.
            </p>
          </div>
          
          {/* Primary Recommendations */}
          <section className="primary-recommendations mb-16">
            <h2 className="text-2xl font-light mb-6 border-b pb-2">Recommended Services for You</h2>
            <div className="service-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recommendations.recommendedServices[primaryDomain].map((serviceId: string) => {
                const service = getServiceById(serviceId);
                return (
                  <ServiceCard 
                    key={serviceId}
                    service={service}
                    onClick={() => handleServiceClick(service)}
                    onAddToCart={() => handleAddToCart(service)}
                    isPrimary={true}
                  />
                );
              })}
            </div>
          </section>
          
          {/* Complementary Recommendations */}
          {getComplementaryServices().length > 0 && (
            <section className="complementary-recommendations mb-16">
              <h2 className="text-2xl font-light mb-6 border-b pb-2">Complete Your Experience</h2>
              <div className="service-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {getComplementaryServices().map(service => (
                  <ServiceCard 
                    key={service.id}
                    service={service}
                    onClick={() => handleServiceClick(service)}
                    onAddToCart={() => handleAddToCart(service)}
                  />
                ))}
              </div>
            </section>
          )}
          
          {/* Cross-Domain Packages */}
          {recommendations.crossDomainPackages && recommendations.crossDomainPackages.length > 0 && (
            <section className="package-recommendations mb-16">
              <h2 className="text-2xl font-light mb-6 border-b pb-2">Save with These Packages</h2>
              <div className="package-grid grid grid-cols-1 md:grid-cols-2 gap-6">
                {recommendations.crossDomainPackages.map((packageId: string) => {
                  // Mock package data
                  const packageData = {
                    id: packageId,
                    name: packageId.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()) + ' Package',
                    description: `Complete ${packageId.replace(/-/g, ' ')} experience with our premium services.`,
                    price: Math.floor(Math.random() * 200) + 100, // Random price between 100-300
                    duration: Math.floor(Math.random() * 120) + 60, // Random duration between 60-180 minutes
                    services: [
                      getServiceById(`${primaryDomain}-service-1`),
                      getServiceById(`${primaryDomain}-service-2`)
                    ],
                    savings: Math.floor(Math.random() * 50) + 20, // Random savings between 20-70
                    imageUrl: `https://source.unsplash.com/random/400x300?${packageId.replace(/-/g, '+')}`
                  };
                  
                  return (
                    <div key={packageId} className="package-card bg-white rounded-lg shadow-md overflow-hidden border border-gray-100">
                      <div className="package-image aspect-video overflow-hidden">
                        <img 
                          src={packageData.imageUrl} 
                          alt={packageData.name} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      
                      <div className="package-content p-6">
                        <h3 className="text-xl font-semibold mb-2">{packageData.name}</h3>
                        <p className="text-gray-600 mb-4">{packageData.description}</p>
                        
                        <div className="package-services mb-4">
                          <h4 className="text-sm font-medium text-gray-500 mb-2">Included Services:</h4>
                          <ul className="space-y-1">
                            {packageData.services.map(service => (
                              <li key={service.id} className="text-sm">• {service.name}</li>
                            ))}
                          </ul>
                        </div>
                        
                        <div className="package-meta flex items-center justify-between mb-4">
                          <div className="price-container">
                            <span className="text-lg font-semibold">${packageData.price}</span>
                            <span className="text-green-600 text-sm ml-2">Save ${packageData.savings}</span>
                          </div>
                          <div className="duration text-sm text-gray-500">
                            <Clock className="w-4 h-4 inline mr-1" />
                            {packageData.duration} min
                          </div>
                        </div>
                        
                        <Button 
                          className="w-full"
                          onClick={() => {
                            // Add all package services to cart
                            packageData.services.forEach(service => handleAddToCart(service));
                            toast({
                              title: "Package added to cart",
                              description: `${packageData.name} has been added to your cart.`,
                              duration: 3000,
                            });
                          }}
                        >
                          Add Package to Cart
                        </Button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>
          )}
        </main>
        
        {/* Service Detail Modal */}
        {isModalOpen && selectedService && (
          <ServiceDetailModal
            service={selectedService}
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            onAddToCart={() => handleAddToCart(selectedService)}
          />
        )}
      </div>
    </AestheticProvider>
  );
};

export default PersonalizedResultsPage;

