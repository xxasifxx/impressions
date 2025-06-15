
import React from 'react';
import { Zap, Heart, Clock } from 'lucide-react';
import ServicePageTemplate from '@/components/templates/ServicePageTemplate';
import HeroSection from '@/components/service-sections/HeroSection';
import ServiceOptionsGrid from '@/components/service-sections/ServiceOptionsGrid';
import ProcessSteps from '@/components/service-sections/ProcessSteps';
import BeforeAfterGallerySection from '@/components/service-sections/BeforeAfterGallery';
import CTASection from '@/components/service-sections/CTASection';
import { extensionsData } from '@/data/services/extensionsData';

const Extensions = () => {
  const { meta, hero, serviceOptions, processSteps, transformations } = extensionsData;

  return (
    <ServicePageTemplate
      backLink={meta.backLink}
      backText={meta.backText}
      title={meta.title}
      subtitle={meta.subtitle}
      ctaText={meta.ctaText}
      prefilledService={{
        name: "Hair Extensions Service",
        price: "$75+",
        duration: "1-4 hours"
      }}
      theme={meta.theme}
    >
      <HeroSection
        title={hero.title}
        description={hero.description}
        highlight={{
          icon: <Zap className="w-8 h-8 text-purple-600" />,
          title: hero.highlight.title,
          description: hero.highlight.description,
          theme: "bg-purple-50 border-purple-100"
        }}
      />

      <ServiceOptionsGrid
        title="Extension Options"
        description="Choose the perfect extension method for your lifestyle"
        options={serviceOptions}
        theme="bg-purple-50"
        buttonClass="bg-purple-600 hover:bg-purple-700"
      />

      <ProcessSteps
        title="Extension Application Process"
        description="Professional application for natural, beautiful results"
        steps={processSteps}
        accentColor="bg-purple-600"
      />

      <BeforeAfterGallerySection
        title="Extension Transformations"
        description="See the dramatic difference extensions can make"
        transformations={transformations}
      />

      {/* Care Tips */}
      <section className="py-16 bg-purple-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-3xl font-light mb-8 text-stone-800" style={{ fontFamily: 'Imperial Script, cursive' }}>
              Extension Care Tips
            </h3>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="p-6 bg-white rounded-xl shadow-sm">
                <Heart className="w-8 h-8 text-purple-600 mx-auto mb-4" />
                <h4 className="text-lg font-medium text-stone-800 mb-3">Gentle Care</h4>
                <p className="text-stone-600">Brush gently and avoid tugging at attachment points</p>
              </div>
              <div className="p-6 bg-white rounded-xl shadow-sm">
                <Clock className="w-8 h-8 text-pink-600 mx-auto mb-4" />
                <h4 className="text-lg font-medium text-stone-800 mb-3">Regular Maintenance</h4>
                <p className="text-stone-600">Follow your maintenance schedule for best results</p>
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
        title="Ready for Gorgeous Extensions?"
        description="Choose from our professional extension services above, or call for a consultation"
        phoneNumber="(732) 613-1942"
        backLink="/hair-services"
        backLinkText="Explore All Services"
        theme="bg-purple-600"
        themeText="text-purple-200"
        additionalInfo="Professional extensions • Instant length & volume"
      />
    </ServicePageTemplate>
  );
};

export default Extensions;
