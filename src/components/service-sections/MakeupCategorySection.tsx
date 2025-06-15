
import React, { useState } from "react";
import CTASection from "./CTASection";

// Service type definition
interface TransformationService {
  before: string;
  after: string;
  title: string;
  price: string;
  duration: string;
  description?: string;
  details?: string[];
}

// Props
interface MakeupCategorySectionProps {
  title: string;
  services: TransformationService[];
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
  reverse?: boolean; // for zig-zag alignment
}

const MakeupCategorySection: React.FC<MakeupCategorySectionProps> = ({
  title,
  services,
  cta,
  reverse = false
}) => {
  const [activeIdx, setActiveIdx] = useState(0);
  const activeSvc = services[activeIdx];

  return (
    <section className={`py-16 ${reverse ? 'bg-rose-50/60' : ''}`}>
      <div className="container mx-auto px-4">
        <div className="mb-10 text-center">
          <h2 className="text-4xl font-light mb-4 text-stone-800" style={{ fontFamily: 'Imperial Script, cursive' }}>
            {title}
          </h2>
        </div>

        {/* Zig-zag row: image left/right alternating by reverse prop */}
        <div className={`flex flex-col md:flex-row items-center gap-10 md:gap-20 ${reverse ? "md:flex-row-reverse" : ""}`}>
          {/* Before/After reveal for current tab */}
          <div className="flex-1 flex justify-center">
            <div className="relative group w-80 h-96 rounded-3xl shadow-xl overflow-hidden hover-scale bg-white border border-stone-100">
              <img
                src={activeSvc.before}
                alt={activeSvc.title + " Before"}
                className="w-full h-full object-cover absolute inset-0 z-10 transition-all duration-700"
              />
              <img
                src={activeSvc.after}
                alt={activeSvc.title + " After"}
                className="w-full h-full object-cover absolute inset-0 z-20 transition-all duration-700 translate-x-full group-hover:translate-x-0 group-active:translate-x-0"
              />
              {/* Labels */}
              <span className="absolute left-4 bottom-4 z-30 px-2 py-1 rounded-full bg-stone-800/70 text-xs text-white font-medium">
                Before
              </span>
              <span className="absolute right-4 bottom-4 z-30 px-2 py-1 rounded-full bg-rose-600/90 text-xs text-white font-medium opacity-0 group-hover:opacity-100 group-active:opacity-100 transition-opacity">
                After
              </span>
              <span className="absolute top-2 left-1/2 -translate-x-1/2 z-30 bg-white/80 px-3 py-1 rounded-full text-xs text-stone-700 opacity-75 pointer-events-none">
                Hover or Tap to Reveal
              </span>
            </div>
          </div>

          {/* Service tab switcher and info */}
          <div className="flex-1 px-2">
            <div className="flex gap-3 mb-8 flex-wrap">
              {services.map((svc, idx) => (
                <button
                  key={svc.title}
                  onMouseEnter={() => setActiveIdx(idx)}
                  onClick={() => setActiveIdx(idx)}
                  className={`px-6 py-2 rounded-full text-base font-bold transition-all shadow 
                    ${idx === activeIdx
                      ? "bg-gradient-to-r from-rose-600 to-purple-600 text-white scale-105"
                      : "bg-stone-100 text-stone-600 hover:scale-110"}`}
                  style={{ fontFamily: idx === activeIdx ? 'Imperial Script, cursive' : undefined }}
                  aria-current={idx === activeIdx}
                  type="button"
                >
                  {svc.title}
                </button>
              ))}
            </div>
            <h3 className="text-2xl font-bold mb-2 text-rose-700">{activeSvc.title}</h3>
            <p className="mb-3 text-stone-600">{activeSvc.description}</p>
            <div className="flex gap-4 items-center text-stone-500 text-base mb-2">
              <span className="font-semibold text-stone-800">{activeSvc.price}</span>
              <span>•</span>
              <span>{activeSvc.duration}</span>
            </div>
            {activeSvc.details && (
              <ul className="list-disc list-inside text-stone-500 mt-3">
                {activeSvc.details.map((d, i) => (
                  <li key={i}>{d}</li>
                ))}
              </ul>
            )}
            <a href="#book-makeup">
              <button className="bg-rose-600 hover:bg-rose-700 text-white px-8 py-3 rounded-xl font-bold mt-7 shadow hover:scale-105 transition-transform">
                Book Now
              </button>
            </a>
          </div>
        </div>
        {/* CTA */}
        <div id="book-makeup" className="mt-14">
          <CTASection {...cta} />
        </div>
      </div>
    </section>
  );
};

export default MakeupCategorySection;
