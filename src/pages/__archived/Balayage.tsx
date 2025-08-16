
import React from 'react';
import { Sun, Palette, Sparkles } from 'lucide-react';
import ServicePageTemplate from '@/components/templates/ServicePageTemplate';
import HeroSection from '@/components/service-sections/HeroSection';
import ServiceOptionsGrid from '@/components/service-sections/ServiceOptionsGrid';
import ProcessSteps from '@/components/service-sections/ProcessSteps';
import BeforeAfterGallerySection from '@/components/service-sections/BeforeAfterGallery';
import CTASection from '@/components/service-sections/CTASection';
import { balayageData } from '@/data/services/balayageData';

const Balayage = () => {
  const { meta, hero, serviceOptions, processSteps, transformations } = balayageData;

  return (
    <ServicePageTemplate
      backLink={meta.backLink}
      backText={meta.backText}
      title={meta.title}
      subtitle={meta.subtitle}
      ctaText={meta.ctaText}
      prefilledService={{
        name: "Balayage Service",
        price: "$110+",
        duration: "3-6 hours"
      }}
      theme={meta.theme}
    >
      <HeroSection
        title={hero.title}
        description={hero.description}
        highlight={{
          icon: <Sun className="w-8 h-8 text-amber-600" />,
          title: hero.highlight.title,
          description: hero.highlight.description,
          theme: "bg-amber-50 border-amber-100"
        }}
      />

      <ServiceOptionsGrid
        title="Balayage Options"
        description="Choose the perfect balayage style for your hair goals"
        options={serviceOptions}
        theme="bg-amber-50"
        buttonClass="bg-amber-600 hover:bg-amber-700"
      />

      <ProcessSteps
        title="Our Balayage Process"
        description="Hand-painted technique for natural-looking highlights"
        steps={processSteps}
        accentColor="bg-amber-600"
      />

      <BeforeAfterGallerySection
        title="Balayage Transformations"
        description="See the beautiful, natural dimension our balayage creates"
        transformations={transformations}
      />

      {/* Maintenance Tips */}
      <section className="py-16 bg-amber-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-3xl font-light mb-8 text-stone-800" style={{ fontFamily: 'Imperial Script, cursive' }}>
              Maintaining Your Balayage
            </h3>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="p-6 bg-white rounded-xl shadow-sm">
                <Palette className="w-8 h-8 text-amber-600 mx-auto mb-4" />
                <h4 className="text-lg font-medium text-stone-800 mb-3">Color-Safe Products</h4>
                <p className="text-stone-600">Use sulfate-free shampoos to preserve your highlights</p>
              </div>
              <div className="p-6 bg-white rounded-xl shadow-sm">
                <Sparkles className="w-8 h-8 text-yellow-600 mx-auto mb-4" />
                <h4 className="text-lg font-medium text-stone-800 mb-3">Touch-Up Schedule</h4>
                <p className="text-stone-600">Balayage grows out beautifully - refresh every 3-4 months</p>
              </div>
              <div className="p-6 bg-white rounded-xl shadow-sm">
                <Sun className="w-8 h-8 text-stone-600 mx-auto mb-4" />
                <h4 className="text-lg font-medium text-stone-800 mb-3">UV Protection</h4>
                <p className="text-stone-600">Use UV-protecting products to prevent fading</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <CTASection
        title="Ready for Beautiful Balayage?"
        description="Choose from our expert balayage services above, or call for a consultation"
        phoneNumber="(732) 613-1942"
        backLink="/hair-services"
        backLinkText="Explore All Services"
        theme="bg-amber-600"
        themeText="text-amber-100"
        additionalInfo="Expert hand-painted highlights • 3-6 hour appointments"
      />
    </ServicePageTemplate>
  );
};

export default Balayage;
