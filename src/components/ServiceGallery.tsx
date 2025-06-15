
import React from 'react';
import ServiceCard from '@/components/ServiceCard';

interface Service {
  id: string;
  title: string;
  description: string;
  price: string;
  link: string;
  transformations: Array<{
    before: string;
    after: string;
    title: string;
    timeframe?: string;
  }>;
  difficulty?: 'Easy' | 'Moderate' | 'Complex';
  duration?: string;
  clientStory?: {
    name: string;
    quote: string;
    rating: number;
  };
  specialist?: string;
}

interface FilterCategory {
  id: string;
  title: string;
  subtitle: string;
}

interface ServiceGalleryProps {
  filteredServices: Service[];
  activeFilterData: FilterCategory | undefined;
}

const ServiceGallery = ({ filteredServices, activeFilterData }: ServiceGalleryProps) => {
  return (
    <div className="flex-1 p-8">
      <div className="mb-6">
        <h2 className="text-2xl font-light text-stone-800 mb-2" style={{ fontFamily: 'Imperial Script, cursive' }}>
          {activeFilterData?.title}
        </h2>
        <p className="text-stone-600">{activeFilterData?.subtitle}</p>
        <p className="text-sm text-stone-500 mt-1">
          {filteredServices.length} service{filteredServices.length !== 1 ? 's' : ''} available
        </p>
      </div>

      <div className="grid grid-cols-2 gap-6">
        {filteredServices.map((service) => (
          <ServiceCard
            key={service.id}
            id={service.id}
            title={service.title}
            description={service.description}
            price={service.price}
            link={service.link}
            transformations={service.transformations}
            difficulty={service.difficulty}
            duration={service.duration}
            clientStory={service.clientStory}
            specialist={service.specialist}
          />
        ))}
      </div>

      {filteredServices.length === 0 && (
        <div className="text-center py-12">
          <p className="text-stone-500">No services match your current selection.</p>
        </div>
      )}
    </div>
  );
};

export default ServiceGallery;
