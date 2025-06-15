
import React from "react";
import ServicePageTemplate from "@/components/templates/ServicePageTemplate";
import CTASection from "@/components/service-sections/CTASection";
import MakeupJourneyStep from "@/components/service-sections/MakeupJourneyStep";
import { Eye, Smile, GalleryHorizontal, Camera } from "lucide-react";
import { Button } from "@/components/ui/button";

const journeySteps = [
  {
    icon: <Eye className="w-14 h-14 text-rose-600" />,
    title: "Eyes: The Windows to the Soul",
    image: "/lovable-uploads/52cae70f-1233-4245-8345-ba3f7d434a46.png",
    description: "Our journey begins with the eyes—where artistry defines expression. Precise liners, seamless blending, and show-stopping lashes set the tone for your unique look."
  },
  {
    icon: <Smile className="w-14 h-14 text-rose-600" />,
    title: "Lips: The Perfect Pout",
    image: "/lovable-uploads/88f3df0c-bbb4-4d55-b3d9-06a67281f0c4.png",
    description: "We sculpt, define, and play with color to give you lips that speak volumes. From classic reds to trendy glosses, every smile is elevated and confident."
  },
  {
    icon: <GalleryHorizontal className="w-14 h-14 text-rose-600" />,
    title: "Face: The Flawless Canvas",
    image: "/lovable-uploads/5a3307f9-5b20-43a4-a327-3e2d9edf299e.png",
    description: "Transform your skin into a masterpiece using state-of-the-art techniques—radiant foundation, expert contour, and an ethereal glow that lasts all night."
  },
  {
    icon: <Camera className="w-14 h-14 text-rose-600" />,
    title: "The Final Look: Photoshoot Ready",
    image: "/lovable-uploads/f41c2f8a-628b-41e1-b27c-4fab5011976b.png",
    description: "Bringing it all together for an unforgettable look—photo-ready and absolutely radiant for special moments, milestones, and the unexpected flash."
  }
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
      {/* Visual storytelling header */}
      <div className="container mx-auto px-4 mb-16">
        <div className="text-center mb-5">
          <h1 className="text-5xl md:text-6xl font-light mb-4 text-stone-800" style={{ fontFamily: 'Imperial Script, cursive' }}>
            Discover The Art of Makeup
          </h1>
          <p className="text-xl text-stone-600 max-w-2xl mx-auto">
            Every transformation at Impressions is a unique journey — let us guide you step by step to your most radiant self.
          </p>
        </div>
      </div>

      {/* Step by step journey */}
      <div>
        {journeySteps.map((step, i) => (
          <MakeupJourneyStep
            key={i}
            icon={step.icon}
            step={i + 1}
            title={step.title}
            description={step.description}
            image={step.image}
            reverse={i % 2 === 1}
            cta={
              i === 3 ? (
                <Button size="lg" className="bg-rose-600 hover:bg-rose-700 text-white px-8 py-4 text-lg shadow-lg" asChild>
                  <a href="#book-makeup">Book Your Look</a>
                </Button>
              ) : null
            }
          />
        ))}
      </div>

      {/* Call to action */}
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
