
import React, { useState, useRef } from "react";
import CTASection from "./CTASection";
import BeforeAfterReveal from "./BeforeAfterReveal";
import { useIsMobile } from "@/hooks/use-mobile";

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
  const isMobile = useIsMobile();

  // Keyboard arrow navigation for service tab buttons
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);

  const handleTabKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>, idx: number) => {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      const next = (idx + 1) % services.length;
      tabRefs.current[next]?.focus();
      setActiveIdx(next);
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      const prev = (idx - 1 + services.length) % services.length;
      tabRefs.current[prev]?.focus();
      setActiveIdx(prev);
    }
  };

  return (
    <section className={`py-16 ${reverse ? 'bg-rose-50/60' : ''} border-b border-stone-200`}>
      <div className="container mx-auto px-4">
        <div className="mb-10 text-center">
          <h2 className="text-4xl font-light mb-4 text-stone-800" style={{ fontFamily: 'Imperial Script, cursive' }}>
            {title}
          </h2>
        </div>

        <div className={`flex flex-col md:flex-row items-center gap-10 md:gap-20 ${reverse ? "md:flex-row-reverse" : ""}`}>
          {/* Before/After Reveal: modular, accessible, animated */}
          <div className="flex-1 flex justify-center">
            <BeforeAfterReveal
              key={activeSvc.title} // Force unmount/remount for instant swap
              before={activeSvc.before}
              after={activeSvc.after}
              title={activeSvc.title}
            />
          </div>

          {/* Service tab switcher and info */}
          <div className="flex-1 px-2">
            <div className="flex gap-3 mb-8 flex-wrap" role="tablist" aria-label={`${title} service selector`}>
              {services.map((svc, idx) => (
                <button
                  key={svc.title}
                  ref={el => tabRefs.current[idx] = el}
                  onMouseEnter={() => !isMobile && setActiveIdx(idx)}
                  onFocus={() => setActiveIdx(idx)}
                  onClick={() => setActiveIdx(idx)}
                  onKeyDown={e => handleTabKeyDown(e, idx)}
                  className={`px-6 py-2 rounded-full text-base font-bold transition-all shadow 
                    ${idx === activeIdx
                      ? "bg-gradient-to-r from-rose-600 to-purple-600 text-white scale-105"
                      : "bg-stone-100 text-stone-600 hover:scale-110 focus:ring-2 focus:ring-rose-500"}`}
                  style={{ fontFamily: idx === activeIdx ? 'Imperial Script, cursive' : undefined }}
                  aria-current={idx === activeIdx}
                  aria-selected={idx === activeIdx}
                  aria-controls={`panel-${title}-${idx}`}
                  tabIndex={idx === activeIdx ? 0 : -1}
                  role="tab"
                  type="button"
                >
                  {svc.title}
                </button>
              ))}
            </div>
            <div
              id={`panel-${title}-${activeIdx}`}
              role="tabpanel"
              aria-labelledby={`tab-${title}-${activeIdx}`}
              tabIndex={0}
              className="animate-fade-in"
            >
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
                <button className="bg-rose-600 hover:bg-rose-700 text-white px-8 py-3 rounded-xl font-bold mt-7 shadow hover:scale-110 animate-pulse transition-transform ring-2 ring-rose-300 focus:ring-4 focus:ring-rose-500">
                  Book Now
                </button>
              </a>
            </div>
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

