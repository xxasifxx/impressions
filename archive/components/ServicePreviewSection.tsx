import React from 'react';
import { Button } from '@/components/ui/button';
import { ChevronRight } from 'lucide-react';

interface ServiceCategory {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  domain: 'hair-salon' | 'makeup-studio' | 'med-spa';
}

const ServicePreviewSection: React.FC = () => {
  const serviceCategories: ServiceCategory[] = [
    {
      id: 'hair-transformations',
      name: 'Hair Transformations',
      description: 'From subtle changes to complete makeovers, discover the perfect style for you.',
      imageUrl: '/images/home/hair-preview.jpg',
      domain: 'hair-salon'
    },
    {
      id: 'makeup-artistry',
      name: 'Makeup Artistry',
      description: 'Enhance your natural beauty with personalized makeup services for any occasion.',
      imageUrl: '/images/home/makeup-preview.jpg',
      domain: 'makeup-studio'
    },
    {
      id: 'skin-rejuvenation',
      name: 'Skin Rejuvenation',
      description: 'Revitalize your skin with treatments tailored to your specific needs and concerns.',
      imageUrl: '/images/home/spa-preview.jpg',
      domain: 'med-spa'
    }
  ];
  
  // Temporary placeholder images until real ones are available
  const placeholderImages = {
    'hair-salon': 'https://images.unsplash.com/photo-1560066984-138dadb4c035?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1674&q=80',
    'makeup-studio': 'https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1771&q=80',
    'med-spa': 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80'
  };
  
  return (
    <section className="service-preview-section py-16 md:py-24 bg-gradient-to-br from-stone-50 to-stone-100">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-light text-center mb-4 text-stone-800" style={{ fontFamily: 'Playfair Display, serif' }}>
          Comprehensive Beauty Services
        </h2>
        
        <p className="text-center text-stone-600 max-w-2xl mx-auto mb-12 font-light">
          Our consultation will guide you to the perfect combination of services across all our specialties.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {serviceCategories.map(category => (
            <div 
              key={category.id}
              className="service-category-card group relative overflow-hidden rounded-xl shadow-md"
            >
              {/* Background image */}
              <div className="aspect-w-3 aspect-h-4">
                <img 
                  src={placeholderImages[category.domain]} 
                  alt={category.name}
                  className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              
              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
              
              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <h3 className="text-xl font-medium mb-2">
                  {category.name}
                </h3>
                
                <p className="text-white/80 text-sm mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {category.description}
                </p>
                
                <div className="transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="text-white border-white hover:bg-white hover:text-gray-900"
                  >
                    Learn More
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Button 
            variant="outline"
            className="mx-auto border-stone-300 text-stone-700 hover:bg-stone-100"
          >
            View All Services
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ServicePreviewSection;

