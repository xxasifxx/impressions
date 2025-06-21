
import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Search } from 'lucide-react';
import { DomainThemeProvider, useDomainTheme } from '@/contexts/DomainThemeContext';
import { ServiceCartProvider } from '@/contexts/ServiceCartContext';
import DomainTabs from '@/components/DomainTabs';
import ServiceDetailModal from '@/components/ServiceDetailModal';
import ServiceCard from '@/components/ServiceCard';
import ServiceCart from '@/components/ServiceCart';
import UserJourneyFilter from '@/components/UserJourneyFilter';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  allUnifiedServices, 
  getServicesByDomain, 
  getServiceCategories,
  getServicesByUserJourney,
  UnifiedService 
} from '@/data/unifiedServicesData';

const ServicesContent = () => {
  const { currentDomain, currentTheme } = useDomainTheme();
  const [selectedService, setSelectedService] = useState<UnifiedService | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedJourney, setSelectedJourney] = useState<string | null>(null);
  const [searchAllDomains, setSearchAllDomains] = useState(false);

  const domainServices = getServicesByDomain(currentDomain);
  const categories = getServiceCategories(currentDomain);

  const filteredServices = useMemo(() => {
    // Base services - either domain-specific or all services if searching across domains
    let services = searchAllDomains ? allUnifiedServices : domainServices;

    // Apply journey filter only if not searching all domains
    if (selectedJourney && !searchAllDomains) {
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
      // Auto-enable cross-domain search if searching
      if (!searchAllDomains) {
        setSearchAllDomains(true);
      }
    } else {
      setSearchAllDomains(false);
    }

    // Apply category filter (only for domain-specific view)
    if (selectedCategory !== 'all' && !searchAllDomains) {
      services = services.filter(service => service.category === selectedCategory);
    }

    return services;
  }, [domainServices, searchTerm, selectedCategory, selectedJourney, currentDomain, searchAllDomains]);

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
    setSelectedCategory('all');
    setSearchTerm(''); // Clear search when selecting journey
    setSearchAllDomains(false);
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
        background: currentTheme.backgroundImage,
        fontFamily: currentTheme.fonts.body
      }}
    >
      {/* Header */}
      <header className="bg-white/90 backdrop-blur-sm border-b border-white/30 shadow-sm">
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
                Service Marketplace
              </h1>
              <p 
                className="text-sm mt-1 transition-all duration-700"
                style={{ 
                  color: currentTheme.colors.muted,
                  fontFamily: currentTheme.fonts.accent
                }}
              >
                Book multiple services, get package deals
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
        {/* Domain Tabs */}
        <DomainTabs />
        
        {/* User Journey Filter - only show if not searching all domains */}
        {!searchAllDomains && (
          <UserJourneyFilter 
            selectedJourney={selectedJourney}
            onJourneySelect={handleJourneySelect}
          />
        )}
        
        {/* Search and Category Filters */}
        <div className="max-w-4xl mx-auto mb-8">
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                placeholder={searchAllDomains ? "Search all services..." : `Search ${currentTheme.name.toLowerCase()} services...`}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-white/90 backdrop-blur-sm border-white/50"
              />
            </div>
          </div>

          {/* Search indicator */}
          {searchAllDomains && (
            <div className="mb-4 text-center">
              <Badge 
                variant="outline"
                className="text-sm px-4 py-2"
                style={{ 
                  borderColor: currentTheme.colors.primary,
                  color: currentTheme.colors.primary
                }}
              >
                Searching across all service categories
              </Badge>
            </div>
          )}

          {/* Category Tags - only show for domain-specific view */}
          {!selectedJourney && !searchAllDomains && (
            <div className="flex flex-wrap gap-2 mb-8">
              <Badge
                variant={selectedCategory === 'all' ? 'default' : 'outline'}
                className="cursor-pointer transition-all duration-300 hover:scale-105"
                onClick={() => setSelectedCategory('all')}
                style={selectedCategory === 'all' ? { 
                  backgroundColor: currentTheme.colors.primary,
                  color: 'white'
                } : {
                  borderColor: currentTheme.colors.primary + '40',
                  color: currentTheme.colors.primary
                }}
              >
                All Categories
              </Badge>
              {categories.map((category) => (
                <Badge
                  key={category}
                  variant={selectedCategory === category ? 'default' : 'outline'}
                  className="cursor-pointer transition-all duration-300 hover:scale-105"
                  onClick={() => setSelectedCategory(category)}
                  style={selectedCategory === category ? { 
                    backgroundColor: currentTheme.colors.primary,
                    color: 'white'
                  } : {
                    borderColor: currentTheme.colors.primary + '40',
                    color: currentTheme.colors.primary
                  }}
                >
                  {category}
                </Badge>
              ))}
            </div>
          )}
        </div>

        {/* Services Grid */}
        <div className="max-w-7xl mx-auto">
          {filteredServices.length > 0 ? (
            <>
              <div className="text-center mb-8">
                <p 
                  className="text-lg"
                  style={{ 
                    color: currentTheme.colors.text,
                    fontFamily: currentTheme.fonts.accent
                  }}
                >
                  {filteredServices.length} service{filteredServices.length !== 1 ? 's' : ''} available
                  {searchAllDomains && ' across all categories'}
                </p>
              </div>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredServices.map((service) => (
                  <ServiceCard
                    key={service.id}
                    service={service}
                    onDetailsClick={handleServiceClick}
                  />
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
                Try adjusting your search or browse our other amazing services
              </p>
              <Button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('all');
                  setSelectedJourney(null);
                  setSearchAllDomains(false);
                }}
                style={{ 
                  backgroundColor: currentTheme.colors.primary,
                  color: 'white'
                }}
              >
                View All Services
              </Button>
            </div>
          )}
        </div>
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
