import React from "react";
import ServicePageTemplate from "@/components/templates/ServicePageTemplate";
import MakeupCategorySection from "@/components/service-sections/MakeupCategorySection";
import { occasionServices, bridalServices, innovativePackages } from "@/data/services/makeupServicesData";
import { CATEGORY_CONFIG } from "@/components/service-sections/MakeupCategoryTabs";

// Removed references to .image (fix TS error)
// The mapping below directly passes the correct properties

const MakeupServices = () => {
  return (
    <ServicePageTemplate
      backLink="/services"
      backText="All Services"
      title="Makeup Studio"
      subtitle="Professional Makeup Artistry"
      ctaText="Book Makeup"
      prefilledService={{
        name: "Makeup Services",
        price: "Starting at $45",
        duration: "45-150 minutes"
      }}
      theme="rose"
    >
      <div className="container mx-auto px-4 mb-12">
        <div className="text-center mb-10">
          <h1 className="text-5xl md:text-6xl font-light mb-4 text-stone-800" style={{ fontFamily: 'Imperial Script, cursive' }}>
            Discover The Art of Makeup
          </h1>
          <p className="text-xl text-stone-600 max-w-2xl mx-auto">
            Every transformation at Impressions is a unique journey — hover on each service to reveal before & after.
          </p>
        </div>
      </div>
      {/* Stack the three zig-zag sections */}
      <MakeupCategorySection
        title={CATEGORY_CONFIG.Occasion.title}
        services={CATEGORY_CONFIG.Occasion.services}
        cta={CATEGORY_CONFIG.Occasion.cta}
      />
      <MakeupCategorySection
        title={CATEGORY_CONFIG.Bridal.title}
        services={CATEGORY_CONFIG.Bridal.services}
        cta={CATEGORY_CONFIG.Bridal.cta}
        reverse
      />
      <MakeupCategorySection
        title={CATEGORY_CONFIG.Innovative.title}
        services={CATEGORY_CONFIG.Innovative.services}
        cta={CATEGORY_CONFIG.Innovative.cta}
      />
    </ServicePageTemplate>
  );
};

export default MakeupServices;
