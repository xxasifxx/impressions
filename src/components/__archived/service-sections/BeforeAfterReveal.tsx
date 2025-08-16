
import React, { useState, useRef } from "react";
import { useIsMobile } from "@/hooks/use-mobile";

interface BeforeAfterRevealProps {
  before: string;
  after: string;
  title: string;
  className?: string;
}

const BeforeAfterReveal: React.FC<BeforeAfterRevealProps> = ({
  before,
  after,
  title,
  className = ""
}) => {
  const isMobile = useIsMobile();
  const [revealed, setRevealed] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  // Accessibility: keyboard toggle support
  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === " " || e.key === "Enter") {
      e.preventDefault();
      setRevealed((r) => !r);
    }
  };

  // For mobile, toggle on tap/click
  const handleClick = () => {
    if (isMobile) setRevealed((r) => !r);
  };

  // Mouse hover controls for desktop
  const handleMouseEnter = () => {
    if (!isMobile) setRevealed(true);
  };
  const handleMouseLeave = () => {
    if (!isMobile) setRevealed(false);
  };

  return (
    <div
      ref={cardRef}
      tabIndex={0}
      role="button"
      aria-label={`Reveal transformation: ${title}`}
      className={`relative group w-80 h-96 rounded-3xl shadow-xl overflow-hidden hover-scale bg-white border border-stone-100 focus:outline-none focus:ring-2 focus:ring-rose-500 ${className}`}
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onKeyDown={handleKeyDown}
      aria-pressed={revealed}
    >
      {/* Before */}
      <img
        src={before}
        alt={`${title} Before transformation`}
        className={`w-full h-full object-cover absolute inset-0 z-10 transition-all duration-700 rounded-3xl ${revealed ? "opacity-0 scale-105" : "opacity-100 scale-100"}`}
        loading="lazy"
      />
      {/* After */}
      <img
        src={after}
        alt={`${title} After transformation`}
        className={`w-full h-full object-cover absolute inset-0 z-20 transition-all duration-700 rounded-3xl ${revealed ? "opacity-100 scale-100" : "opacity-0 scale-95"}`}
        loading="lazy"
      />
      {/* Labels */}
      <span className="absolute left-4 bottom-4 z-30 px-2 py-1 rounded-full bg-stone-800/70 text-xs text-white font-medium select-none pointer-events-none">
        Before
      </span>
      <span className={`absolute right-4 bottom-4 z-30 px-2 py-1 rounded-full bg-rose-600/90 text-xs text-white font-medium transition-opacity select-none pointer-events-none
        ${revealed ? "opacity-100" : "opacity-0"}`}>
        After
      </span>
      {/* Instruction */}
      <span className="absolute top-2 left-1/2 -translate-x-1/2 z-30 bg-white/90 px-3 py-1 rounded-full text-xs text-stone-700 opacity-70 select-none pointer-events-none">
        {isMobile ? "Tap to reveal" : "Hover or press Enter/Space"}
      </span>
    </div>
  );
};

export default BeforeAfterReveal;
