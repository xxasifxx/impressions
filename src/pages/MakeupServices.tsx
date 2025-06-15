import React from "react";
import ServicePageTemplate from "@/components/templates/ServicePageTemplate";
import CTASection from "@/components/service-sections/CTASection";
import MakeupServicesCarousel from "@/components/service-sections/MakeupServicesCarousel";
import MakeupCategoryTabs from "@/components/service-sections/MakeupCategoryTabs";
import { occasionServices, bridalServices, innovativePackages } from "@/data/services/makeupServicesData";

// Removed references to .image (fix TS error)
// The mapping below directly passes the correct properties

const allCategories = [
  { name: "Occasion & Party Glam", data: occasionServices },
  { name: "Bridal Packages", data: bridalServices },
  { name: "Innovative Looks & Lessons", data: innovativePackages }
];

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
            Every transformation at Impressions is a unique journey — explore before & afters for every occasion, event, and adventure.
          </p>
        </div>

        {/* Category tab switcher for all makeup */}
        <MakeupCategoryTabs />
      </div>
    </ServicePageTemplate>
  );
};

export default MakeupServices;
