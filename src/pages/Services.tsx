
import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Search, Calendar, Users, Award } from 'lucide-react';
import { DomainThemeProvider, useDomainTheme } from '@/contexts/DomainThemeContext';
import { ServiceCartProvider } from '@/contexts/ServiceCartContext';
import IntegratedDomainTabs from '@/components/IntegratedDomainTabs';
import ServiceDetailModal from '@/components/ServiceDetailModal';
import ServiceCart from '@/components/ServiceCart';
import UserJourneyFilter from '@/components/UserJourneyFilter';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { 
  allUnifiedServices, 
  getServicesByUserJourney,
  UnifiedService 
} from '@/data/unifiedServicesData';

const ServicesContent = () => {
  const { currentDomain, currentTheme } = useDomainTheme();
  const [selectedService, setSelectedService] = useState<UnifiedService | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedJourney, setSelectedJourney] = useState<string | null>(null);

  const filteredServices = useMemo(() => {
    let services = allUnifiedServices;

    // Apply journey filter
    if (selectedJourney) {
      services = getServicesByUserJourney(currentDomain, selectedJourney);
    }

    // Apply search filter
    if (searchTerm) {
      services = services.filter(service =>
        service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        service.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        service.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        service.domain.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    return services;
  }, [searchTerm, selectedJourney, currentDomain]);

  const handleServiceClick = (service: UnifiedService) => {
    setSelectedService(service);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedService(null);
  };

  const handleJourneySelect = (journeyId: string | null) => {
    setSelectedJourney(journeyId);
    setSearchTerm('');
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    if (e.target.value) {
      setSelectedJourney(null);
    }
  };

  // Add Google Fonts for the domain-specific fonts
  React.useEffect(() => {
    const existingLinks = document.querySelectorAll('link[data-font-link]');
    existingLinks.forEach(link => link.remove());

    const fontLinks = [
      'https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&display=swap',
      'https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400;500;600;700&display=swap',
      'https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;500;600;700&display=swap',
      'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&display=swap',
      'https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600&display=swap',
      'https://fonts.googleapis.com/css2?family=Source+Sans+Pro:wght@300;400;600&display=swap',
      'https://fonts.googleapis.com/css2?family=Fleur+De+Leah&display=swap'
    ];

    fontLinks.forEach(href => {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = href;
      link.setAttribute('data-font-link', 'true');
      document.head.appendChild(link);
    });
  }, []);

  return (
    <div 
      className="min-h-screen transition-all duration-700 ease-in-out"
      style={{ 
        background: `linear-gradient(135deg, ${currentTheme.colors.background}20, ${currentTheme.colors.secondary}10), ${currentTheme.backgroundImage}`,
        fontFamily: currentTheme.fonts.body
      }}
    >
      {/* Header */}
      <header className="bg-white/95 backdrop-blur-sm border-b border-white/30 shadow-sm sticky top-0 z-40">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <Link 
              to="/" 
              className="flex items-center gap-3 text-gray-600 hover:text-gray-800 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="font-medium">Back to Home</span>
            </Link>
            
            <div className="text-center">
              <h1 
                className="text-4xl font-light transition-all duration-700"
                style={{ 
                  fontFamily: currentTheme.fonts.heading,
                  color: currentTheme.colors.primary 
                }}
              >
                Beauty Marketplace
              </h1>
              <p 
                className="text-sm mt-1 transition-all duration-700"
                style={{ 
                  color: currentTheme.colors.muted,
                  fontFamily: currentTheme.fonts.accent
                }}
              >
                Discover, combine, and book your perfect beauty experience
              </p>
            </div>
            
            <div className="flex items-center gap-4">
              <Button 
                size="sm"
                style={{ 
                  backgroundColor: currentTheme.colors.primary,
                  color: 'white'
                }}
                className="hover:opacity-90 transition-opacity"
              >
                (732) 613-1942
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Integrated Domain Tabs */}
        <IntegratedDomainTabs />
        
        {/* Search Section */}
        <div className="max-w-4xl mx-auto mb-12">
          <div className="text-center mb-8">
            <h2 
              className="text-3xl font-light mb-4"
              style={{ 
                fontFamily: currentTheme.fonts.heading,
                color: currentTheme.colors.primary 
              }}
            >
              Search All Services
            </h2>
            <p 
              className="text-lg"
              style={{ 
                color: currentTheme.colors.muted,
                fontFamily: currentTheme.fonts.body
              }}
            >
              Find the perfect combination of services across all our specialties
            </p>
          </div>
          
          <div className="relative mb-6">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input
              placeholder="Search across hair, makeup, and wellness services..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="pl-12 py-4 text-lg bg-white/90 backdrop-blur-sm border-white/50 rounded-2xl shadow-lg focus:shadow-xl transition-all"
            />
          </div>

          {/* Search indicator */}
          {searchTerm && (
            <div className="text-center mb-8">
              <Badge 
                variant="outline"
                className="text-sm px-6 py-3 rounded-full"
                style={{ 
                  borderColor: currentTheme.colors.primary,
                  color: currentTheme.colors.primary,
                  backgroundColor: 'white'
                }}
              >
                Searching across all service categories
              </Badge>
            </div>
          )}
        </div>

        {/* User Journey Filter - only show if not searching */}
        {!searchTerm && (
          <UserJourneyFilter 
            selectedJourney={selectedJourney}
            onJourneySelect={handleJourneySelect}
          />
        )}

        {/* Results Section */}
        {(searchTerm || selectedJourney) && (
          <div className="max-w-7xl mx-auto">
            {filteredServices.length > 0 ? (
              <>
                <div className="text-center mb-8">
                  <p 
                    className="text-xl"
                    style={{ 
                      color: currentTheme.colors.text,
                      fontFamily: currentTheme.fonts.accent
                    }}
                  >
                    {filteredServices.length} service{filteredServices.length !== 1 ? 's' : ''} found
                    {searchTerm && ' across all categories'}
                  </p>
                </div>
                
                <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                  {filteredServices.map((service) => (
                    <Card key={service.id} className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden bg-white/95 backdrop-blur-sm">
                      <div className="aspect-[4/3] overflow-hidden">
                        <img 
                          src={service.imageUrl}
                          alt={service.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                      </div>
                      
                      <CardContent className="p-5">
                        <div className="flex items-start justify-between mb-3">
                          <h3 
                            className="text-lg font-medium cursor-pointer group-hover:text-opacity-80 transition-colors"
                            style={{ color: currentTheme.colors.primary }}
                            onClick={() => handleServiceClick(service)}
                          >
                            {service.name}
                          </h3>
                          <div className="text-right">
                            <div className="font-bold" style={{ color: currentTheme.colors.primary }}>
                              {service.price}
                            </div>
                            <div className="text-xs text-gray-500">{service.duration}</div>
                          </div>
                        </div>

                        <div className="flex items-center gap-3 mb-3 text-sm text-gray-500">
                          <Badge variant="outline" className="text-xs">
                            {service.domain.replace('-', ' ')}
                          </Badge>
                          {service.featured && (
                            <Badge className="bg-yellow-500 text-white text-xs">
                              <Award className="w-3 h-3 mr-1" />
                              Featured
                            </Badge>
                          )}
                        </div>

                        <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                          {service.description}
                        </p>

                        <Button
                          variant="outline"
                          className="w-full"
                          onClick={() => handleServiceClick(service)}
                          style={{ 
                            borderColor: currentTheme.colors.primary,
                            color: currentTheme.colors.primary
                          }}
                        >
                          View Details
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </>
            ) : (
              <div className="text-center py-16">
                <div 
                  className="text-6xl mb-4"
                  style={{ color: currentTheme.colors.muted }}
                >
                  🔍
                </div>
                <h3 
                  className="text-2xl font-light mb-2"
                  style={{ 
                    fontFamily: currentTheme.fonts.heading,
                    color: currentTheme.colors.primary
                  }}
                >
                  No services found
                </h3>
                <p className="text-gray-600 mb-6">
                  Try adjusting your search or explore our service categories above
                </p>
                <Button
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedJourney(null);
                  }}
                  style={{ 
                    backgroundColor: currentTheme.colors.primary,
                    color: 'white'
                  }}
                >
                  Clear Search
                </Button>
              </div>
            )}
          </div>
        )}

        {/* Welcome Message when no search/journey is active */}
        {!searchTerm && !selectedJourney && (
          <div className="max-w-4xl mx-auto text-center py-16">
            <div 
              className="text-6xl mb-6"
              style={{ color: currentTheme.colors.primary }}
            >
              ✨
            </div>
            <h2 
              className="text-4xl font-light mb-4"
              style={{ 
                fontFamily: currentTheme.fonts.heading,
                color: currentTheme.colors.primary
              }}
            >
              Welcome to Your Beauty Marketplace
            </h2>
            <p 
              className="text-xl mb-8"
              style={{ 
                color: currentTheme.colors.muted,
                fontFamily: currentTheme.fonts.body
              }}
            >
              Explore our service categories above, search for specific treatments, or browse by your journey
            </p>
            
            <div className="grid md:grid-cols-3 gap-6 mt-12">
              <Card className="p-6 bg-white/90 backdrop-blur-sm hover:shadow-lg transition-all">
                <Users className="w-12 h-12 mx-auto mb-4" style={{ color: currentTheme.colors.primary }} />
                <h3 className="text-lg font-semibold mb-2">Expert Team</h3>
                <p className="text-sm text-gray-600">Professional stylists and specialists</p>
              </Card>
              
              <Card className="p-6 bg-white/90 backdrop-blur-sm hover:shadow-lg transition-all">
                <Calendar className="w-12 h-12 mx-auto mb-4" style={{ color: currentTheme.colors.primary }} />
                <h3 className="text-lg font-semibold mb-2">Flexible Booking</h3>
                <p className="text-sm text-gray-600">Book single services or create packages</p>
              </Card>
              
              <Card className="p-6 bg-white/90 backdrop-blur-sm hover:shadow-lg transition-all">
                <Award className="w-12 h-12 mx-auto mb-4" style={{ color: currentTheme.colors.primary }} />
                <h3 className="text-lg font-semibold mb-2">Package Deals</h3>
                <p className="text-sm text-gray-600">Save with our curated service combinations</p>
              </Card>
            </div>
          </div>
        )}
      </div>

      <ServiceDetailModal
        service={selectedService}
        isOpen={isModalOpen}
        onClose={handleModalClose}
      />

      <ServiceCart />
    </div>
  );
};

const Services = () => {
  return (
    <DomainThemeProvider>
      <ServiceCartProvider>
        <ServicesContent />
      </ServiceCartProvider>
    </DomainThemeProvider>
  );
};

export default Services;
