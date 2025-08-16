
import React, { useState } from 'react';
import HairServicesHeader from '@/components/HairServicesHeader';
import FilterNavigation from '@/components/FilterNavigation';
import ServiceGallery from '@/components/ServiceGallery';
import { filterCategories } from '@/data/hairServicesData';
import { getServicesByDomain } from '@/data/unifiedServicesData';

const HairServices = () => {
  const [activeFilter, setActiveFilter] = useState('all');

  // Get hair salon services from unified data
  const allHairServices = getServicesByDomain('hair-salon');
  
  const filteredServices = activeFilter === 'all' 
    ? allHairServices 
    : allHairServices.filter(service => service.category === activeFilter);

  const activeFilterData = filterCategories.find(cat => cat.id === activeFilter);

  const handleServiceClick = (service: any) => {
    console.log('Service clicked:', service);
    // Handle service click - could open modal or navigate
  };

  return (
    <div className="min-h-screen bg-white">
      <HairServicesHeader />

      <div className="flex flex-col md:flex-row min-h-[calc(100vh-80px)]">
        <FilterNavigation 
          filterCategories={filterCategories}
          activeFilter={activeFilter}
          onFilterChange={setActiveFilter}
        />
        
        <ServiceGallery 
          filteredServices={filteredServices}
          onServiceClick={handleServiceClick}
          activeFilterTitle={activeFilterData?.title}
          activeFilterSubtitle={activeFilterData?.subtitle}
        />
      </div>
    </div>
  );
};

export default HairServices;
