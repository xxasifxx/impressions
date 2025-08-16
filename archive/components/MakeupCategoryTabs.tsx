
import React, { useState } from "react";
import MakeupServicesCarousel from "./MakeupServicesCarousel";
import CTASection from "./CTASection";
import { occasionServices, bridalServices, innovativePackages } from "@/data/services/makeupServicesData";

type CategoryKey = 'Occasion' | 'Bridal' | 'Innovative';

const CATEGORY_CONFIG: {
  [K in CategoryKey]: {
    title: string;
    cta: {
      title: string;
      description: string;
      phoneNumber: string;
      backLink: string;
      backLinkText: string;
      theme: string;
      themeText: string;
      additionalInfo?: string;
    };
    services: any[];
    layout: "horizontal" | "spotlight" | "card-flip";
  };
} = {
  Occasion: {
    title: "Occasion & Party Glam",
    services: occasionServices,
    layout: "horizontal",
    cta: {
      title: "Glam For Every Occasion",
      description: "Perfect for nights out, family events, or stylish gatherings.",
      phoneNumber: "(732) 613-1942",
      backLink: "/services",
      backLinkText: "Explore All Services",
      theme: "bg-gradient-to-r from-rose-600 to-purple-600",
      themeText: "text-rose-100",
      additionalInfo: "Walk-ins available • Express options for parties"
    }
  },
  Bridal: {
    title: "Bridal Packages",
    services: bridalServices,
    layout: "spotlight",
    cta: {
      title: "Bridal Makeup Perfection",
      description: "Book early for your wedding date and ensure a flawless look.",
      phoneNumber: "(732) 613-1942",
      backLink: "/services",
      backLinkText: "See All Services",
      theme: "bg-gradient-to-r from-pink-400 to-rose-500",
      themeText: "text-pink-50",
      additionalInfo: "Bridal previews & consultations available."
    }
  },
  Innovative: {
    title: "Innovative Looks & Lessons",
    services: innovativePackages,
    layout: "card-flip",
    cta: {
      title: "Level Up Your Look",
      description: "Learn stylish techniques or try something totally new.",
      phoneNumber: "(732) 613-1942",
      backLink: "/services",
      backLinkText: "Back to All Services",
      theme: "bg-gradient-to-r from-purple-700 to-indigo-400",
      themeText: "text-indigo-50",
      additionalInfo: "Hands-on lessons and creative makeovers."
    }
  }
};

const categories: CategoryKey[] = ["Occasion", "Bridal", "Innovative"];

const MakeupCategoryTabs = () => {
  const [active, setActive] = useState<CategoryKey>("Occasion");

  return (
    <div>
      {/* Tabs */}
      <div className="flex justify-center gap-4 mb-10">
        {categories.map((cat) => (
          <button
            key={cat}
            onMouseEnter={() => setActive(cat)}
            onClick={() => setActive(cat)}
            className={
              "px-6 py-2 rounded-full text-lg font-bold transition-all shadow " +
              (active === cat
                ? "bg-gradient-to-r from-rose-600 to-purple-600 text-white scale-105"
                : "bg-stone-100 text-stone-600 hover:scale-110")
            }
            style={{ fontFamily: active === cat ? 'Imperial Script, cursive' : undefined }}
            aria-current={active === cat}
          >
            {CATEGORY_CONFIG[cat].title}
          </button>
        ))}
      </div>

      {/* Animated Content Swap */}
      <div className="animate-fade-in">
        <MakeupServicesCarousel
          category={CATEGORY_CONFIG[active].title}
          services={CATEGORY_CONFIG[active].services}
          layout={CATEGORY_CONFIG[active].layout}
        />
        <div id="book-makeup" className="mt-14">
          <CTASection {...CATEGORY_CONFIG[active].cta} />
        </div>
      </div>
    </div>
  );
};

export default MakeupCategoryTabs;
