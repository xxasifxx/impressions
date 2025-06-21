
import React from 'react';
import ServiceCard from '@/components/ServiceCard';
import { UnifiedService } from '@/data/unifiedServicesData';

interface ServiceGalleryProps {
  filteredServices: UnifiedService[];
  onServiceClick: (service: UnifiedService) => void;
  activeFilterTitle?: string;
  activeFilterSubtitle?: string;
}

const ServiceGallery = ({ 
  filteredServices, 
  onServiceClick,
  activeFilterTitle,
  activeFilterSubtitle 
}: ServiceGalleryProps) => {
  return (
    <div className="flex-1 p-4 md:p-8">
      <div className="mb-6">
        <h2 className="text-4xl font-light text-stone-800 mb-2" style={{ fontFamily: 'Imperial Script, cursive', letterSpacing: '0.08em' }}>
          {activeFilterTitle || 'All Services'}
        </h2>
        <p className="text-lg text-stone-600">{activeFilterSubtitle || 'Browse our complete service menu'}</p>
        <p className="text-base text-stone-500 mt-1">
          {filteredServices.length} service{filteredServices.length !== 1 ? 's' : ''} available
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredServices.map((service) => (
          <ServiceCard
            key={service.id}
            service={service}
            onDetailsClick={onServiceClick}
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
