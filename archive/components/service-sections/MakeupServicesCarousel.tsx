
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
  layout: "horizontal" | "spotlight" | "card-flip";
}

const MakeupServicesCarousel = ({ category, services, layout }: MakeupServicesCarouselProps) => {
  const [selectedTab, setSelectedTab] = useState<string>(services[0]?.title || "");

  // Handle hover or click to switch tabs
  const handleTabHover = (title: string) => setSelectedTab(title);

  // Category-specific container
  let contentLayout: React.ReactNode;

  if (layout === "horizontal") {
    // Elegant horizontal flow (Occasion)
    contentLayout = (
      <Tabs
        value={selectedTab}
        onValueChange={v => setSelectedTab(v)}
        className="w-full"
      >
        <TabsList className="mb-8 space-x-2 md:space-x-5 bg-rose-50/80 rounded-lg px-1 py-1 flex w-fit mx-auto shadow animate-fade-in">
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
              <div className={`flex flex-col md:flex-row items-center gap-10 md:gap-20 mb-8
                ${idx % 2 === 1 ? "md:flex-row-reverse" : ""}`}>
                {/* Before/After Reveal */}
                <div className="flex-1 flex justify-center">
                  <div className="relative group w-72 h-80 rounded-3xl shadow-lg overflow-hidden hover-scale">
                    {/* Before image */}
                    <img
                      src={svc.before}
                      alt={svc.title + " Before"}
                      className="w-full h-full object-cover absolute inset-0 z-10 transition-all duration-700"
                    />
                    {/* After reveal on hover/tap */}
                    <img
                      src={svc.after}
                      alt={svc.title + " After"}
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
                {/* Details */}
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
    );
  } else if (layout === "spotlight") {
    // Bridal: radiant spotlight, large centered reveal
    contentLayout = (
      <Tabs
        value={selectedTab}
        onValueChange={v => setSelectedTab(v)}
        className="w-full"
      >
        <TabsList className="mb-7 space-x-3 bg-rose-50/80 rounded-full px-2 py-1 flex w-fit mx-auto shadow-lg">
          {services.map((svc) => (
            <TabsTrigger
              key={svc.title}
              value={svc.title}
              className="px-7 py-3 text-xl rounded-full font-bold data-[state=active]:bg-gradient-to-r data-[state=active]:from-pink-400 data-[state=active]:to-rose-500 data-[state=active]:text-white"
              onMouseEnter={() => handleTabHover(svc.title)}
            >
              {svc.title}
            </TabsTrigger>
          ))}
        </TabsList>
        <div>
          {services.map((svc) => (
            <TabsContent
              key={svc.title}
              value={svc.title}
              forceMount
              className="w-full animate-fade-in"
            >
              <div className="flex flex-col items-center gap-7 mb-10">
                <div className="relative group w-96 h-[26rem] rounded-full shadow-2xl overflow-hidden border-4 border-rose-300 hover-scale">
                  {/* Before image */}
                  <img
                    src={svc.before}
                    alt={svc.title + " Before"}
                    className="w-full h-full object-cover absolute inset-0 z-10 transition-all"
                  />
                  {/* After reveal on hover/tap */}
                  <img
                    src={svc.after}
                    alt={svc.title + " After"}
                    className="w-full h-full object-cover absolute inset-0 z-20 transition-all duration-700 translate-x-full group-hover:translate-x-0 group-active:translate-x-0"
                  />
                  {/* Labels */}
                  <span className="absolute left-4 bottom-4 z-30 px-3 py-2 rounded-full bg-stone-900/70 text-sm text-white font-bold shadow">
                    Before
                  </span>
                  <span className="absolute right-4 bottom-4 z-30 px-3 py-2 rounded-full bg-pink-500/80 text-sm text-white font-bold shadow opacity-0 group-hover:opacity-100 transition-opacity">
                    After
                  </span>
                  <span className="absolute top-3 left-1/2 -translate-x-1/2 z-30 bg-white/90 px-4 py-2 rounded-full text-base text-stone-700 shadow opacity-80 pointer-events-none">
                    Hover or Tap to Reveal
                  </span>
                </div>
                <div className="max-w-xl text-center">
                  <h3 className="text-3xl font-bold mb-2 text-pink-700">{svc.title}</h3>
                  <p className="mb-4 text-stone-700">{svc.description}</p>
                  <div className="flex gap-4 justify-center items-center text-stone-500 text-lg mb-3">
                    <span className="font-bold text-rose-800">{svc.price}</span>
                    <span>•</span>
                    <span>{svc.duration}</span>
                  </div>
                  {svc.details && (
                    <ul className="list-disc list-inside text-stone-500 mb-5">
                      {svc.details.map((d, i) => (
                        <li key={i}>{d}</li>
                      ))}
                    </ul>
                  )}
                  <a href="#book-makeup">
                    <button className="bg-gradient-to-r from-pink-500 to-rose-400 hover:from-rose-500 hover:to-pink-500 text-white px-10 py-4 rounded-full font-bold shadow-lg mt-1 hover:scale-105 transition-transform">
                      Reserve Bridal Experience
                    </button>
                  </a>
                </div>
              </div>
            </TabsContent>
          ))}
        </div>
      </Tabs>
    );
  } else {
    // Innovative: Card flip effect
    contentLayout = (
      <Tabs
        value={selectedTab}
        onValueChange={v => setSelectedTab(v)}
        className="w-full"
      >
        <TabsList className="mb-7 space-x-4 bg-indigo-50/80 rounded-full px-2 py-1 flex w-fit mx-auto shadow">
          {services.map((svc) => (
            <TabsTrigger
              key={svc.title}
              value={svc.title}
              className="px-6 py-2 text-lg rounded-full font-bold data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-700 data-[state=active]:to-indigo-400 data-[state=active]:text-white transition-all"
              onMouseEnter={() => handleTabHover(svc.title)}
            >
              {svc.title}
            </TabsTrigger>
          ))}
        </TabsList>
        <div>
          {services.map((svc) => (
            <TabsContent
              key={svc.title}
              value={svc.title}
              forceMount
              className="w-full flex flex-col items-center py-5 animate-fade-in"
            >
              <div className="group perspective-1000 mb-8">
                {/* Card flip - before is front, after is back (on hover/tap) */}
                <div className="relative w-80 h-[24rem] transition-transform duration-700 transform-style-preserve-3d group-hover:rotate-y-180 group-active:rotate-y-180">
                  {/* Front (before) */}
                  <div className="absolute w-full h-full backface-hidden rounded-2xl shadow-lg overflow-hidden bg-stone-100 flex flex-col items-center justify-center">
                    <img
                      src={svc.before}
                      alt={svc.title + " Before"}
                      className="w-full h-56 object-cover"
                    />
                    <div className="mt-5 flex flex-col items-center">
                      <span className="bg-indigo-300/70 px-2 py-1 rounded-full font-sm tracking-wide text-indigo-900">Before</span>
                      <span className="block mt-2 text-base text-indigo-700 font-bold">{svc.title}</span>
                    </div>
                  </div>
                  {/* Back (after) */}
                  <div className="absolute w-full h-full backface-hidden rounded-2xl shadow-lg overflow-hidden bg-white flex flex-col items-center justify-center rotate-y-180">
                    <img
                      src={svc.after}
                      alt={svc.title + " After"}
                      className="w-full h-56 object-cover"
                    />
                    <div className="mt-5 flex flex-col items-center">
                      <span className="bg-indigo-600/80 px-2 py-1 rounded-full font-xs tracking-wide text-white">After</span>
                      <span className="block mt-2 text-base text-indigo-800 font-bold">{svc.title}</span>
                    </div>
                  </div>
                </div>
                <div className="w-80 mx-auto mt-4">
                  <p className="mb-2 text-stone-700 text-center">{svc.description}</p>
                  <div className="flex gap-3 items-center justify-center text-indigo-600 text-base mb-2">
                    <span className="font-semibold">{svc.price}</span>
                    <span>•</span>
                    <span>{svc.duration}</span>
                  </div>
                  <ul className="list-disc list-inside text-stone-500 my-2 text-sm">
                    {svc.details && svc.details.map((d, i) => (
                      <li key={i}>{d}</li>
                    ))}
                  </ul>
                  <div className="text-center mt-3">
                    <a href="#book-makeup">
                      <button className="bg-gradient-to-tr from-purple-600 to-indigo-400 hover:bg-indigo-500 text-white px-7 py-3 rounded-xl font-bold shadow hover:scale-105 transition-transform">
                        Try this Look
                      </button>
                    </a>
                  </div>
                </div>
              </div>
            </TabsContent>
          ))}
        </div>
      </Tabs>
    );
  }

  return (
    <section className="mb-20">
      {contentLayout}
    </section>
  );
};

export default MakeupServicesCarousel;
