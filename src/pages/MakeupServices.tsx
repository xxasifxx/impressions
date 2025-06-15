import React from 'react';
import ServicePageTemplate from '@/components/templates/ServicePageTemplate';
import HeroSection from '@/components/service-sections/HeroSection';
import ServiceOptionsGrid from '@/components/service-sections/ServiceOptionsGrid';
import CTASection from '@/components/service-sections/CTASection';
import MakeupVisualJourney from '@/components/service-sections/MakeupVisualJourney';
import { Sparkles, Star, Crown, Heart } from 'lucide-react';

const MakeupServices = () => {
  const occasionServices = [
    {
      title: "Dinner Party Glam",
      description: "Quick and relaxing makeup session perfect for bridal showers or fancy dinners",
      image: "/lovable-uploads/5b93eca0-6808-4052-af4d-cf567c69ecdf.png",
      price: "$55",
      duration: "45 mins",
      details: [
        "Fresh, natural base",
        "Polished eye look",
        "Perfect lip color",
        "Light contouring"
      ],
      prefilledService: {
        name: "Dinner Party Glam",
        price: "$55",
        duration: "45 minutes"
      }
    },
    {
      title: "Formal Party",
      description: "Major event glam for weddings, proms, and special celebrations",
      image: "/lovable-uploads/4b442d70-6a94-4270-b29a-dc3cf4168b64.png",
      price: "$85",
      duration: "75 mins",
      details: [
        "Full glamour makeup",
        "Dramatic eye design",
        "Long-lasting formulas",
        "Photo-ready finish"
      ],
      prefilledService: {
        name: "Formal Party",
        price: "$85",
        duration: "75 minutes"
      }
    },
    {
      title: "Prom Perfection",
      description: "Complete prom transformation with trending looks and photo-ready finish",
      image: "/lovable-uploads/52cae70f-1233-4245-8345-ba3f7d434a46.png",
      price: "$95",
      duration: "90 mins",
      details: [
        "Trending prom styles",
        "Glitter & highlights",
        "Long-wear formulas",
        "Touch-up kit included"
      ],
      prefilledService: {
        name: "Prom Perfection",
        price: "$95",
        duration: "90 minutes"
      }
    }
  ];

  const bridalServices = [
    {
      title: "Bridal Silver",
      description: "Essential bridal beauty with classic elegance",
      image: "/lovable-uploads/88f3df0c-bbb4-4d55-b3d9-06a67281f0c4.png",
      price: "$125",
      duration: "90 mins",
      details: [
        "Consultation included",
        "Airbrush foundation",
        "Timeless bridal look",
        "Basic touch-up kit"
      ],
      prefilledService: {
        name: "Bridal Silver Package",
        price: "$125",
        duration: "90 minutes"
      }
    },
    {
      title: "Bridal Gold",
      description: "Premium bridal package with enhanced features",
      image: "/lovable-uploads/46eaf28c-0012-415c-a930-cc3832c40ac8.png",
      price: "$175",
      duration: "2 hours",
      details: [
        "Pre-wedding consultation",
        "Premium product upgrade",
        "Luxury lash application",
        "Complete touch-up kit"
      ],
      prefilledService: {
        name: "Bridal Gold Package",
        price: "$175",
        duration: "2 hours"
      }
    },
    {
      title: "Bridal Platinum",
      description: "Ultimate bridal experience with full VIP treatment",
      image: "/lovable-uploads/f41c2f8a-628b-41e1-b27c-4fab5011976b.png",
      price: "$225",
      duration: "2.5 hours",
      details: [
        "Trial session included",
        "On-location service",
        "Bridal party discounts",
        "Day-of touch-ups"
      ],
      prefilledService: {
        name: "Bridal Platinum Package",
        price: "$225",
        duration: "2.5 hours"
      }
    }
  ];

  const innovativePackages = [
    {
      title: "Glow Up Session",
      description: "Complete transformation with makeup lesson included",
      image: "/lovable-uploads/5a3307f9-5b20-43a4-a327-3e2d9edf299e.png",
      price: "$120",
      duration: "2 hours",
      details: [
        "Skin analysis & prep",
        "Step-by-step tutorial",
        "Product recommendations",
        "Take-home guide"
      ],
      prefilledService: {
        name: "Glow Up Session",
        price: "$120",
        duration: "2 hours"
      }
    },
    {
      title: "Date Night Ready",
      description: "Perfect look for romantic evenings and special dates",
      image: "/lovable-uploads/fbc6cbfd-042f-414f-bb0d-e91e731efe1f.png",
      price: "$65",
      duration: "60 mins",
      details: [
        "Romantic, sultry look",
        "Long-lasting wear",
        "Subtle contouring",
        "Kiss-proof lips"
      ],
      prefilledService: {
        name: "Date Night Ready",
        price: "$65",
        duration: "60 minutes"
      }
    },
    {
      title: "Confidence Boost",
      description: "Everyday makeup perfected for work and daily confidence",
      image: "/lovable-uploads/88f3df0c-bbb4-4d55-b3d9-06a67281f0c4.png",
      price: "$45",
      duration: "45 mins",
      details: [
        "Professional look",
        "Natural enhancement",
        "Quick application tips",
        "Work-appropriate finish"
      ],
      prefilledService: {
        name: "Confidence Boost",
        price: "$45",
        duration: "45 minutes"
      }
    }
  ];

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

      {/* Transformation Packages */}
      <section className="py-20 bg-gradient-to-br from-rose-50 to-purple-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-light mb-6 text-stone-800" style={{ fontFamily: 'Imperial Script, cursive' }}>
              Complete Beauty Packages
            </h2>
            <p className="text-lg text-stone-600">Combine makeup with other services for the ultimate transformation</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-rose-200 hover:shadow-xl transition-all duration-300 hover:scale-105">
              <div className="flex items-center gap-3 mb-6">
                <Crown className="w-8 h-8 text-amber-600" />
                <h3 className="text-2xl font-light text-stone-800" style={{ fontFamily: 'Imperial Script, cursive' }}>
                  Royal Treatment
                </h3>
              </div>
              <div className="text-3xl font-light text-rose-600 mb-4">$195</div>
              <div className="space-y-3 text-stone-600">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-rose-400 rounded-full"></div>
                  <span>Hair styling & makeup</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-rose-400 rounded-full"></div>
                  <span>Eyebrow threading</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-rose-400 rounded-full"></div>
                  <span>Premium lashes</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-rose-400 rounded-full"></div>
                  <span>Touch-up kit</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg border-2 border-purple-300 hover:shadow-xl transition-all duration-300 hover:scale-105">
              <div className="text-xs text-purple-600 bg-purple-50 px-3 py-1 rounded-full mb-4 inline-block">Most Popular</div>
              <div className="flex items-center gap-3 mb-6">
                <Star className="w-8 h-8 text-purple-600" />
                <h3 className="text-2xl font-light text-stone-800" style={{ fontFamily: 'Imperial Script, cursive' }}>
                  Glow & Go
                </h3>
              </div>
              <div className="text-3xl font-light text-purple-600 mb-4">$140</div>
              <div className="space-y-3 text-stone-600">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                  <span>Makeup application</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                  <span>Hair styling</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                  <span>Basic lashes</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                  <span>Quick touch-ups</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg border border-emerald-200 hover:shadow-xl transition-all duration-300 hover:scale-105">
              <div className="flex items-center gap-3 mb-6">
                <Heart className="w-8 h-8 text-emerald-600" />
                <h3 className="text-2xl font-light text-stone-800" style={{ fontFamily: 'Imperial Script, cursive' }}>
                  Fresh Face
                </h3>
              </div>
              <div className="text-3xl font-light text-emerald-600 mb-4">$85</div>
              <div className="space-y-3 text-stone-600">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
                  <span>Natural makeup</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
                  <span>Eyebrow shaping</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
                  <span>Skincare consultation</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
                  <span>Product samples</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

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
