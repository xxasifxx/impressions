
import React from 'react';
import { Zap, Palette, RefreshCw } from 'lucide-react';
import ServicePageTemplate from '@/components/templates/ServicePageTemplate';
import HeroSection from '@/components/service-sections/HeroSection';
import ServiceOptionsGrid from '@/components/service-sections/ServiceOptionsGrid';
import ProcessSteps from '@/components/service-sections/ProcessSteps';
import BeforeAfterGallerySection from '@/components/service-sections/BeforeAfterGallery';
import CTASection from '@/components/service-sections/CTASection';
import { rootTouchUpData } from '@/data/services/rootTouchUpData';

const RootTouchUp = () => {
  const { meta, hero, serviceOptions, processSteps, transformations } = rootTouchUpData;

  return (
    <ServicePageTemplate
      backLink={meta.backLink}
      backText={meta.backText}
      title={meta.title}
      subtitle={meta.subtitle}
      ctaText={meta.ctaText}
      prefilledService={{
        name: "Root Touch-Up Service",
        price: "$65+",
        duration: "45-75 minutes"
      }}
      theme={meta.theme}
    >
      <HeroSection
        title={hero.title}
        description={hero.description}
        highlight={{
          icon: <Zap className="w-8 h-8 text-emerald-600" />,
          title: hero.highlight.title,
          description: hero.highlight.description,
          theme: "bg-emerald-50 border-emerald-100"
        }}
      />

      <ServiceOptionsGrid
        title="Root Touch-Up Options"
        description="Choose the perfect maintenance service for your needs"
        options={serviceOptions}
        theme="bg-emerald-50"
        buttonClass="bg-emerald-600 hover:bg-emerald-700"
      />

      <ProcessSteps
        title="The Touch-Up Process"
        description="Efficient service without compromising quality"
        steps={processSteps}
        accentColor="bg-emerald-600"
      />

      <BeforeAfterGallerySection
        title="Touch-Up Transformations"
        description="See the difference a professional touch-up makes"
        transformations={transformations}
      />

      {/* Maintenance Tips */}
      <section className="py-16 bg-emerald-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-3xl font-light mb-8 text-stone-800" style={{ fontFamily: 'Imperial Script, cursive' }}>
              Between Touch-Ups
            </h3>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="p-6 bg-white rounded-xl shadow-sm">
                <Palette className="w-8 h-8 text-emerald-600 mx-auto mb-4" />
                <h4 className="text-lg font-medium text-stone-800 mb-3">Color-Safe Products</h4>
                <p className="text-stone-600">Use sulfate-free shampoos to extend your color</p>
              </div>
              <div className="p-6 bg-white rounded-xl shadow-sm">
                <RefreshCw className="w-8 h-8 text-teal-600 mx-auto mb-4" />
                <h4 className="text-lg font-medium text-stone-800 mb-3">Regular Schedule</h4>
                <p className="text-stone-600">Book touch-ups every 4-6 weeks for best results</p>
              </div>
              <div className="p-6 bg-white rounded-xl shadow-sm">
                <Zap className="w-8 h-8 text-stone-600 mx-auto mb-4" />
                <h4 className="text-lg font-medium text-stone-800 mb-3">Heat Protection</h4>
                <p className="text-stone-600">Always use heat protectant when styling</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <CTASection
        title="Ready for Your Touch-Up?"
        description="Choose from our specialized root maintenance services above, or call for a consultation"
        phoneNumber="(732) 613-1942"
        backLink="/hair-services"
        backLinkText="Explore All Services"
        theme="bg-emerald-600"
        themeText="text-emerald-200"
        additionalInfo="Professional color maintenance • Quick 45-75 minute appointments"
      />
    </ServicePageTemplate>
  );
};

export default RootTouchUp;
