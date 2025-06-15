
import React from 'react';
import ServicePageTemplate from '@/components/templates/ServicePageTemplate';
import HeroSection from '@/components/service-sections/HeroSection';
import ServiceOptionsGrid from '@/components/service-sections/ServiceOptionsGrid';
import CTASection from '@/components/service-sections/CTASection';
import MakeupVisualJourney from '@/components/service-sections/MakeupVisualJourney';
import { Sparkles } from 'lucide-react';
import { occasionServices, bridalServices, innovativePackages } from '@/data/services/makeupServicesData';
import CompleteBeautyPackages from '@/components/service-sections/CompleteBeautyPackages';

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
      <HeroSection
        title="Makeup & Beauty Studio"
        description="Professional makeup artistry for every occasion • From everyday confidence to bridal elegance"
        highlight={{
          icon: <Sparkles className="w-8 h-8 text-rose-600" />,
          title: "Trending Now: Glow Up Sessions",
          description: "Complete transformation with personalized makeup lesson - learn the techniques while getting glammed up!",
          theme: "bg-rose-50 border-rose-100"
        }}
      />

      <ServiceOptionsGrid
        title="Special Occasions"
        description="Perfect looks for life's memorable moments"
        options={occasionServices}
        theme="bg-white border border-rose-100"
        buttonClass="bg-rose-600 hover:bg-rose-700 text-white"
      />

      <ServiceOptionsGrid
        title="Bridal Collections"
        description="Your perfect day deserves the perfect look"
        options={bridalServices}
        theme="bg-gradient-to-br from-rose-50 to-pink-50 border border-rose-200"
        buttonClass="bg-rose-600 hover:bg-rose-700 text-white"
      />

      <ServiceOptionsGrid
        title="Signature Experiences"
        description="Innovative packages designed for modern beauty needs"
        options={innovativePackages}
        theme="bg-white border border-purple-100"
        buttonClass="bg-purple-600 hover:bg-purple-700 text-white"
      />

      <CompleteBeautyPackages />

      <MakeupVisualJourney />

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
    </ServicePageTemplate>
  );
};

export default MakeupServices;
