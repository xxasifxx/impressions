
import React from "react";
import ServicePageTemplate from "@/components/templates/ServicePageTemplate";
import MakeupCategorySection from "@/components/service-sections/MakeupCategorySection";
import { occasionServices, bridalServices, innovativePackages } from "@/data/services/makeupServicesData";

// Direct CTA config for each category
const CTA_CONFIGS = {
  Occasion: {
    title: "Glam For Every Occasion",
    description: "Perfect for nights out, family events, or stylish gatherings.",
    phoneNumber: "(732) 613-1942",
    backLink: "/services",
    backLinkText: "Explore All Services",
    theme: "bg-gradient-to-r from-rose-600 to-purple-600",
    themeText: "text-rose-100",
    additionalInfo: "Walk-ins available • Express options for parties"
  },
  Bridal: {
    title: "Bridal Makeup Perfection",
    description: "Book early for your wedding date and ensure a flawless look.",
    phoneNumber: "(732) 613-1942",
    backLink: "/services",
    backLinkText: "See All Services",
    theme: "bg-gradient-to-r from-pink-400 to-rose-500",
    themeText: "text-pink-50",
    additionalInfo: "Bridal previews & consultations available."
  },
  Innovative: {
    title: "Level Up Your Look",
    description: "Learn stylish techniques or try something totally new.",
    phoneNumber: "(732) 613-1942",
    backLink: "/services",
    backLinkText: "Back to All Services",
    theme: "bg-gradient-to-r from-purple-700 to-indigo-400",
    themeText: "text-indigo-50",
    additionalInfo: "Hands-on lessons and creative makeovers."
  }
};

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
      <MakeupCategorySection
        title="Occasion & Party Glam"
        services={occasionServices}
        cta={CTA_CONFIGS.Occasion}
      />
      <MakeupCategorySection
        title="Bridal Packages"
        services={bridalServices}
        cta={CTA_CONFIGS.Bridal}
        reverse
      />
      <MakeupCategorySection
        title="Innovative Looks & Lessons"
        services={innovativePackages}
        cta={CTA_CONFIGS.Innovative}
      />
    </ServicePageTemplate>
  );
};

export default MakeupServices;
