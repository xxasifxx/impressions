
import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Search, Filter } from 'lucide-react';
import { DomainThemeProvider, useDomainTheme } from '@/contexts/DomainThemeContext';
import DomainTabs from '@/components/DomainTabs';
import ServiceDetailModal from '@/components/ServiceDetailModal';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  allUnifiedServices, 
  getServicesByDomain, 
  getServiceCategories,
  UnifiedService 
} from '@/data/unifiedServicesData';

const ServicesContent = () => {
  const { currentDomain, currentTheme } = useDomainTheme();
  const [selectedService, setSelectedService] = useState<UnifiedService | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const domainServices = getServicesByDomain(currentDomain);
  const categories = getServiceCategories(currentDomain);

  const filteredServices = useMemo(() => {
    let services = domainServices;

    if (searchTerm) {
      services = services.filter(service =>
        service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        service.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedCategory !== 'all') {
      services = services.filter(service => service.category === selectedCategory);
    }

    return services;
  }, [domainServices, searchTerm, selectedCategory]);

  const handleServiceClick = (service: UnifiedService) => {
    setSelectedService(service);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedService(null);
  };

  return (
    <div 
      className="min-h-screen transition-all duration-500"
      style={{ 
        background: `${currentTheme.gradients.hero}, ${currentTheme.backgroundImage}` 
      }}
    >
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-white/20">
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
                className="text-4xl font-light transition-all duration-500"
                style={{ 
                  fontFamily: currentTheme.fonts.heading,
                  color: currentTheme.colors.primary 
                }}
              >
                {currentTheme.name}
              </h1>
              <p 
                className="text-sm transition-all duration-500"
                style={{ color: currentTheme.colors.muted }}
              >
                {currentTheme.tagline}
              </p>
            </div>
            
            <div className="flex items-center gap-4">
              <Button 
                size="sm"
                style={{ 
                  backgroundColor: currentTheme.colors.primary,
                  color: 'white'
                }}
              >
                (732) 613-1942
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Domain Tabs */}
      <div className="container mx-auto px-4 py-8">
        <DomainTabs />
        
        {/* Search and Filter */}
        <div className="max-w-4xl mx-auto mb-8">
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                placeholder="Search services..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-white/80 backdrop-blur-sm"
              />
            </div>
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-gray-500" />
              <span className="text-sm text-gray-600">Filter:</span>
            </div>
          </div>

          {/* Category Tags */}
          <div className="flex flex-wrap gap-2 mb-8">
            <Badge
              variant={selectedCategory === 'all' ? 'default' : 'outline'}
              className="cursor-pointer transition-colors"
              onClick={() => setSelectedCategory('all')}
              style={selectedCategory === 'all' ? { 
                backgroundColor: currentTheme.colors.primary,
                color: 'white'
              } : {}}
            >
              All Services
            </Badge>
            {categories.map((category) => (
              <Badge
                key={category}
                variant={selectedCategory === category ? 'default' : 'outline'}
                className="cursor-pointer transition-colors"
                onClick={() => setSelectedCategory(category)}
                style={selectedCategory === category ? { 
                  backgroundColor: currentTheme.colors.primary,
                  color: 'white'
                } : {}}
              >
                {category}
              </Badge>
            ))}
          </div>
        </div>

        {/* Services Grid */}
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredServices.map((service) => (
              <div
                key={service.id}
                className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer group hover:-translate-y-1"
                onClick={() => handleServiceClick(service)}
                style={{ 
                  borderColor: currentTheme.colors.primary + '20'
                }}
              >
                {service.featured && (
                  <Badge 
                    className="mb-3"
                    style={{ 
                      backgroundColor: currentTheme.colors.accent,
                      color: 'white'
                    }}
                  >
                    Featured
                  </Badge>
                )}
                
                <h3 
                  className="text-xl font-medium mb-2 group-hover:scale-105 transition-transform"
                  style={{ color: currentTheme.colors.primary }}
                >
                  {service.name}
                </h3>
                
                <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                  {service.description}
                </p>
                
                <div className="flex justify-between items-center">
                  <div>
                    <span 
                      className="text-lg font-bold"
                      style={{ color: currentTheme.colors.primary }}
                    >
                      {service.price}
                    </span>
                    <p className="text-xs text-gray-500">{service.duration}</p>
                  </div>
                  
                  <Button
                    size="sm"
                    style={{ 
                      backgroundColor: currentTheme.colors.primary,
                      color: 'white'
                    }}
                    className="group-hover:scale-105 transition-transform"
                  >
                    Learn More
                  </Button>
                </div>
              </div>
            ))}
          </div>

          {filteredServices.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No services found matching your criteria.</p>
              <Button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('all');
                }}
                className="mt-4"
                variant="outline"
              >
                Clear Filters
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
    </div>
  );
};

const Services = () => {
  return (
    <DomainThemeProvider>
      <ServicesContent />
    </DomainThemeProvider>
  );
};

export default Services;
