
import React, { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

interface TransformationService {
  before: string;
  after: string;
  title: string;
  price: string;
  duration: string;
  description?: string;
  details?: string[];
}

interface MakeupServicesCarouselProps {
  category: string;
  services: TransformationService[];
}

const MakeupServicesCarousel = ({ category, services }: MakeupServicesCarouselProps) => {
  // Default to first tab
  const [selectedTab, setSelectedTab] = useState<string>(services[0]?.title || "");

  // Switch on hover as well as click
  const handleTabHover = (title: string) => {
    setSelectedTab(title);
  };

  return (
    <section className="mb-20">
      <h2 className="text-3xl md:text-4xl mb-6 font-light" style={{ fontFamily: "Imperial Script, cursive" }}>
        {category}
      </h2>
      <Tabs
        value={selectedTab}
        onValueChange={(v) => setSelectedTab(v)}
        className="w-full"
      >
        <TabsList className="mb-8 space-x-2 md:space-x-5 bg-stone-100/80 rounded-lg px-1 py-1 flex w-fit mx-auto shadow animate-fade-in">
          {services.map((svc) => (
            <TabsTrigger
              key={svc.title}
              value={svc.title}
              className="px-5 py-2 text-lg rounded-md font-semibold data-[state=active]:bg-gradient-to-r data-[state=active]:from-rose-600 data-[state=active]:to-purple-500 data-[state=active]:text-white transition-colors"
              onMouseEnter={() => handleTabHover(svc.title)}
            >
              {svc.title}
            </TabsTrigger>
          ))}
        </TabsList>
        <div>
          {services.map((svc, idx) => (
            <TabsContent
              key={svc.title}
              value={svc.title}
              forceMount
              className="w-full animate-fade-in"
            >
              {/* Zig-zag visual storytelling: alternate image/text side */}
              <div className={`flex flex-col md:flex-row items-center gap-10 md:gap-20 mb-8
                ${idx % 2 === 1 ? "md:flex-row-reverse" : ""}`}>
                <div className="flex-1 flex justify-center">
                  {/* Before/After Reveal inspired by hair services */}
                  <div
                    className="relative group w-72 h-80 rounded-3xl shadow-xl overflow-hidden"
                  >
                    {/* Before image */}
                    <img
                      src={svc.before}
                      alt={svc.title + " Before"}
                      className="w-full h-full object-cover absolute inset-0 z-10 transition-all duration-700"
                      style={{ opacity: 1 }}
                    />
                    {/* After reveal on hover/tap */}
                    <img
                      src={svc.after}
                      alt={svc.title + " After"}
                      className="w-full h-full object-cover absolute inset-0 z-20 transition-all duration-700 group-hover:translate-x-0 group-active:translate-x-0 translate-x-full"
                    />
                    {/* Before/After tags */}
                    <span className="absolute left-4 bottom-4 z-30 px-2 py-1 rounded-full bg-stone-800/70 text-xs text-white font-medium">
                      Before
                    </span>
                    <span className="absolute right-4 bottom-4 z-30 px-2 py-1 rounded-full bg-rose-600/90 text-xs text-white font-medium opacity-0 group-hover:opacity-100 group-active:opacity-100 transition-opacity">
                      After
                    </span>
                    {/* Reveal instruction */}
                    <span className="absolute top-2 left-1/2 -translate-x-1/2 z-30 bg-white/80 px-3 py-1 rounded-full text-xs text-stone-700 opacity-75 pointer-events-none">
                      Hover or Tap to Reveal
                    </span>
                  </div>
                </div>
                {/* Service Details */}
                <div className="flex-1 px-2">
                  <h3 className="text-2xl font-bold mb-2 text-rose-700">{svc.title}</h3>
                  <p className="mb-3 text-stone-600">{svc.description}</p>
                  <div className="flex gap-4 items-center text-stone-500 text-base mb-2">
                    <span className="font-semibold text-stone-800">{svc.price}</span>
                    <span>•</span>
                    <span>{svc.duration}</span>
                  </div>
                  {svc.details && (
                    <ul className="list-disc list-inside text-stone-500 mt-3">
                      {svc.details.map((d, i) => (
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
            </TabsContent>
          ))}
        </div>
      </Tabs>
    </section>
  );
};

export default MakeupServicesCarousel;

