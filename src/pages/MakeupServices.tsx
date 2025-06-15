
import React from "react";
import ServicePageTemplate from "@/components/templates/ServicePageTemplate";
import CTASection from "@/components/service-sections/CTASection";
import MakeupServicesCarousel from "@/components/service-sections/MakeupServicesCarousel";
import { occasionServices, bridalServices, innovativePackages } from "@/data/services/makeupServicesData";

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

        {allCategories.map((cat, i) => (
          <MakeupServicesCarousel
            key={cat.name}
            category={cat.name}
            services={cat.data.map((svc) => ({
              before: svc.before || svc.image, // fallback to provided image if before/after split not available
              after: svc.after || svc.image,
              title: svc.title,
              price: svc.price,
              duration: svc.duration,
              description: svc.description,
              details: svc.details,
            }))}
          />
        ))}

      </div>

      <div id="book-makeup">
        <CTASection
          title="Ready for Your Transformation?"
          description="Book your makeup session and discover your most beautiful self"
          phoneNumber="(732) 613-1942"
          backLink="/services"
          backLinkText="Explore All Services"
          theme="bg-gradient-to-r from-rose-600 to-purple-600"
          themeText="text-rose-100"
          additionalInfo="Same day appointments available • Free consultation with every service"
        />
      </div>
    </ServicePageTemplate>
  );
};

export default MakeupServices;
