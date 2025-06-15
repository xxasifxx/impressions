import React, { useState, useRef } from "react";
import CTASection from "./CTASection";
import BeforeAfterReveal from "./BeforeAfterReveal";
import AppointmentBookingModal from "@/components/AppointmentBookingModal";
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
    prefilledService?: {
      name: string;
      price: string;
      duration: string;
    };
    sourcePage?: string;
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
    <section className={`py-10 ${reverse ? 'bg-rose-50/60' : ''} border-b border-stone-200`}>
      <div className="container mx-auto px-2 md:px-6">
        <div className="max-w-5xl mx-auto">
          <div className="mb-6 text-center">
            <h2
              className="text-3xl md:text-4xl font-light mb-2 text-stone-800"
              style={{ fontFamily: 'Imperial Script, cursive' }}
            >
              {title}
            </h2>
          </div>
          <div className={`flex flex-col md:flex-row items-center gap-6 md:gap-10 ${reverse ? "md:flex-row-reverse" : ""} max-w-4xl mx-auto`}>
            {/* Before/After Reveal */}
            <div className="flex-1 flex justify-center">
              <BeforeAfterReveal
                key={activeSvc.title}
                before={activeSvc.before}
                after={activeSvc.after}
                title={activeSvc.title}
              />
            </div>
            {/* Service tab switcher and info */}
            <div className="flex-1 px-0 md:px-2 w-full max-w-md">
              <div className="flex gap-2 md:gap-3 mb-5 flex-wrap justify-center" role="tablist" aria-label={`${title} service selector`}>
                {services.map((svc, idx) => (
                  <button
                    key={svc.title}
                    ref={el => tabRefs.current[idx] = el}
                    onMouseEnter={() => !isMobile && setActiveIdx(idx)}
                    onFocus={() => setActiveIdx(idx)}
                    onClick={() => setActiveIdx(idx)}
                    onKeyDown={e => handleTabKeyDown(e, idx)}
                    className={`px-5 py-2 rounded-full text-base font-semibold transition-all shadow bg-stone-100 text-stone-700 hover:bg-rose-200 hover:scale-105 focus:ring-2 focus:ring-rose-500
                      ${idx === activeIdx ? "bg-gradient-to-r from-rose-600 to-purple-600 text-white font-bold scale-105 shadow-lg" : ""}`}
                    style={{ fontFamily: "inherit" }}
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
                {isMobile ? (
                  <div className="bg-white bg-opacity-80 rounded-lg shadow border border-stone-100 p-3">
                    <h3 className="text-lg font-bold mb-2 text-rose-700">{activeSvc.title}</h3>
                    <div className="flex gap-2 items-center text-stone-600 mb-1 text-sm">
                      <span className="font-semibold">{activeSvc.price}</span>
                      <span className="opacity-60">•</span>
                      <span>{activeSvc.duration}</span>
                    </div>
                    {activeSvc.details && (
                      <ul className="list-disc list-inside text-sm text-stone-600 space-y-1">
                        {activeSvc.details.map((d, i) => (
                          <li key={i}>{d}</li>
                        ))}
                      </ul>
                    )}
                    <AppointmentBookingModal
                      trigger={
                        <button className="w-full bg-rose-600 hover:bg-rose-700 text-white px-5 py-2.5 rounded-xl font-bold mt-4 shadow transition text-base">
                          Book Now
                        </button>
                      }
                      prefilledService={{
                        name: activeSvc.title,
                        price: activeSvc.price,
                        duration: activeSvc.duration
                      }}
                      sourcePage={`makeup-${title.toLowerCase().replace(/\s+/g, '-')}-mobile`}
                    />
                  </div>
                ) : (
                  <div className="pr-2">
                    <h3 className="text-2xl font-bold mb-2 text-rose-700">{activeSvc.title}</h3>
                    <p className="mb-2 text-stone-600 text-base">{activeSvc.description}</p>
                    <div className="flex gap-3 items-center text-stone-500 text-base mb-1">
                      <span className="font-semibold text-stone-800">{activeSvc.price}</span>
                      <span>•</span>
                      <span>{activeSvc.duration}</span>
                    </div>
                    {activeSvc.details && (
                      <ul className="list-disc list-inside text-stone-500 mt-2 text-sm">
                        {activeSvc.details.map((d, i) => (
                          <li key={i}>{d}</li>
                        ))}
                      </ul>
                    )}
                    <AppointmentBookingModal
                      trigger={
                        <button className="bg-rose-600 hover:bg-rose-700 text-white px-8 py-3 rounded-xl font-bold mt-5 shadow hover:scale-105 transition-transform ring-2 ring-rose-300 focus:ring-4 focus:ring-rose-500 text-lg">
                          Book Now
                        </button>
                      }
                      prefilledService={{
                        name: activeSvc.title,
                        price: activeSvc.price,
                        duration: activeSvc.duration
                      }}
                      sourcePage={`makeup-${title.toLowerCase().replace(/\s+/g, '-')}-desktop`}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
          <div id="book-makeup" className="mt-10">
            <CTASection {...cta} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default MakeupCategorySection;
