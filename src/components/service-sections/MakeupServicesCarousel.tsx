
import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

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
  const [index, setIndex] = useState(0);
  const active = services[index];

  const next = () => setIndex((prev) => (prev + 1) % services.length);
  const prev = () => setIndex((prev) => (prev - 1 + services.length) % services.length);

  return (
    <section className="mb-16">
      <h2 className="text-3xl md:text-4xl mb-6 font-light" style={{ fontFamily: "Imperial Script, cursive" }}>
        {category}
      </h2>
      <div className="flex flex-col md:flex-row gap-8 items-center">
        <div className="relative group w-full max-w-md h-80 rounded-2xl overflow-hidden shadow-lg mb-4 md:mb-0">
          {/* Before image */}
          <img
            src={active.before}
            alt={active.title + " Before"}
            className="w-full h-full object-cover absolute inset-0 z-10 transition-all duration-700"
            style={{ opacity: 1 }}
          />
          {/* After reveal on hover/tap */}
          <img
            src={active.after}
            alt={active.title + " After"}
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
          {/* Navigation controls */}
          {services.length > 1 && (
            <>
              <button onClick={prev} className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/80 rounded-full flex items-center justify-center z-40 shadow hover:bg-white/100 transition-all">
                <ChevronLeft className="w-4 h-4 text-rose-700" />
              </button>
              <button onClick={next} className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/80 rounded-full flex items-center justify-center z-40 shadow hover:bg-white/100 transition-all">
                <ChevronRight className="w-4 h-4 text-rose-700" />
              </button>
              <span className="absolute top-3 right-5 text-xs bg-black/40 text-white px-2 py-1 rounded-full z-40">{index + 1}/{services.length}</span>
            </>
          )}
        </div>
        {/* Details card */}
        <div className="flex-1 text-center md:text-left px-2">
          <h3 className="text-2xl font-medium mb-2 text-rose-700">{active.title}</h3>
          <p className="mb-2 text-stone-600">{active.description}</p>
          <div className="flex gap-3 justify-center md:justify-start text-stone-500 text-sm mb-2">
            <span className="font-semibold text-stone-800">{active.price}</span>
            <span>•</span>
            <span>{active.duration}</span>
          </div>
          {active.details && (
            <ul className="list-disc list-inside text-stone-500">
              {active.details.map((d, i) => (
                <li key={i}>{d}</li>
              ))}
            </ul>
          )}
          <a href="#book-makeup">
            <Button size="lg" className="bg-rose-600 hover:bg-rose-700 text-white px-8 py-3 mt-4">Book Now</Button>
          </a>
        </div>
      </div>
    </section>
  );
};

export default MakeupServicesCarousel;

