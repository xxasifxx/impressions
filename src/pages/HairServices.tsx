
import React, { useState } from 'react';
import HairServicesHeader from '@/components/HairServicesHeader';
import FilterNavigation from '@/components/FilterNavigation';
import ServiceGallery from '@/components/ServiceGallery';
import { filterCategories, allServices } from '@/data/hairServicesData';

const HairServices = () => {
  const [activeFilter, setActiveFilter] = useState('all');

  const filteredServices = activeFilter === 'all' 
    ? allServices 
    : allServices.filter(service => service.categories.includes(activeFilter));

  const activeFilterData = filterCategories.find(cat => cat.id === activeFilter);

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
          activeFilterData={activeFilterData}
        />
      </div>
    </div>
  );
};

export default HairServices;
