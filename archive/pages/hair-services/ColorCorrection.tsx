
import React from 'react';
import { AlertTriangle, Shield, Palette } from 'lucide-react';
import ServicePageTemplate from '@/components/templates/ServicePageTemplate';
import HeroSection from '@/components/service-sections/HeroSection';
import ServiceOptionsGrid from '@/components/service-sections/ServiceOptionsGrid';
import ProcessSteps from '@/components/service-sections/ProcessSteps';
import BeforeAfterGallerySection from '@/components/service-sections/BeforeAfterGallery';
import CTASection from '@/components/service-sections/CTASection';
import { colorCorrectionData } from '@/data/services/colorCorrectionData';

const ColorCorrection = () => {
  const { meta, hero, serviceOptions, processSteps, transformations } = colorCorrectionData;

  return (
    <ServicePageTemplate
      backLink={meta.backLink}
      backText={meta.backText}
      title={meta.title}
      subtitle={meta.subtitle}
      ctaText={meta.ctaText}
      prefilledService={{
        name: "Color Correction Consultation",
        price: "$35",
        duration: "45 minutes"
      }}
      theme={meta.theme}
    >
      <HeroSection
        title={hero.title}
        description={hero.description}
        highlight={{
          icon: <AlertTriangle className="w-8 h-8 text-rose-600" />,
          title: hero.highlight.title,
          description: hero.highlight.description,
          theme: "bg-rose-50 border-rose-100"
        }}
      />

      {/* Warning Notice */}
      <section className="py-12 bg-amber-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white border border-amber-200 rounded-xl p-6">
              <div className="flex items-start gap-4">
                <AlertTriangle className="w-8 h-8 text-amber-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-lg font-medium text-amber-800 mb-2">Important Color Correction Notice</h3>
                  <p className="text-amber-700 leading-relaxed">
                    Color correction is a complex process that may require multiple sessions. Severely damaged hair may need 
                    time to recover between treatments. We prioritize hair health above all else and will create a plan 
                    that protects your hair's integrity.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <ServiceOptionsGrid
        title="Correction Services"
        description="Professional color repair for all hair color mishaps"
        options={serviceOptions}
        theme="bg-rose-50"
        buttonClass="bg-rose-600 hover:bg-rose-700"
      />

      <ProcessSteps
        title="Our Correction Process"
        description="Methodical approach to safe, effective color correction"
        steps={processSteps}
        accentColor="bg-rose-600"
      />

      <BeforeAfterGallerySection
        title="Correction Transformations"
        description="See how we fix color mishaps and restore hair health"
        transformations={transformations}
      />

      {/* What We Can Fix */}
      <section className="py-16 bg-stone-50">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h3 className="text-3xl font-light text-center mb-12 text-stone-800" style={{ fontFamily: 'Imperial Script, cursive' }}>
              What We Can Correct
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center p-4">
                <Palette className="w-8 h-8 text-rose-600 mx-auto mb-3" />
                <h4 className="font-medium text-stone-800 mb-2">Brassy Tones</h4>
                <p className="text-stone-600 text-sm">Yellow, orange undertones</p>
              </div>
              <div className="text-center p-4">
                <Shield className="w-8 h-8 text-pink-600 mx-auto mb-3" />
                <h4 className="font-medium text-stone-800 mb-2">Uneven Color</h4>
                <p className="text-stone-600 text-sm">Patchy, streaky results</p>
              </div>
              <div className="text-center p-4">
                <AlertTriangle className="w-8 h-8 text-amber-600 mx-auto mb-3" />
                <h4 className="font-medium text-stone-800 mb-2">Over-Processing</h4>
                <p className="text-stone-600 text-sm">Damaged, brittle hair</p>
              </div>
              <div className="text-center p-4">
                <div className="w-8 h-8 bg-stone-600 rounded-full mx-auto mb-3"></div>
                <h4 className="font-medium text-stone-800 mb-2">Faded Color</h4>
                <p className="text-stone-600 text-sm">Dull, lifeless results</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <CTASection
        title="Need Color Correction?"
        description="Don't let a color mishap ruin your confidence. We're here to help."
        phoneNumber="(732) 613-1942"
        backLink="/hair-services"
        backLinkText="Explore All Services"
        theme="bg-rose-600"
        themeText="text-rose-100"
        additionalInfo="* Consultation fee applied to service cost"
      />
    </ServicePageTemplate>
  );
};

export default ColorCorrection;
