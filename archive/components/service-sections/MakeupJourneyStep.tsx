
import React from "react";
import { cn } from "@/lib/utils";

interface MakeupJourneyStepProps {
  icon: React.ReactNode;
  step: number;
  title: string;
  description: string;
  image: string;
  cta?: React.ReactNode;
  reverse?: boolean;
}

const MakeupJourneyStep: React.FC<MakeupJourneyStepProps> = ({
  icon,
  step,
  title,
  description,
  image,
  cta,
  reverse = false,
}) => (
  <section
    className={cn(
      "flex flex-col md:flex-row items-center justify-between gap-8 py-12 md:py-20",
      reverse && "md:flex-row-reverse"
    )}
  >
    {/* Visual & icon */}
    <div className="relative w-full md:w-1/2 flex-shrink-0 flex flex-col items-center">
      <div className="mb-4">{icon}</div>
      <img
        src={image}
        alt={title}
        className="w-full max-w-xs md:max-w-sm rounded-3xl shadow-lg border-4 border-rose-100 object-cover animate-fade-in"
        style={{
          animationDelay: `${step * 0.2}s`,
          animationFillMode: "backwards",
        }}
      />
    </div>
    {/* Content */}
    <div className="w-full md:w-1/2 px-2 md:px-10 text-center md:text-left">
      <div className="mb-3 flex items-center gap-2 justify-center md:justify-start">
        <span className="text-rose-600 font-bold text-lg">{step}.</span>
        <span className="text-2xl font-light" style={{ fontFamily: "Imperial Script, cursive" }}>{title}</span>
      </div>
      <p className="text-stone-600 text-lg mb-6">{description}</p>
      {cta}
    </div>
  </section>
);

export default MakeupJourneyStep;
