
import React from 'react';

interface HeroSectionProps {
  title: string;
  description: string;
  highlight?: {
    icon: React.ReactNode;
    title: string;
    description: string;
    theme: string;
  };
}

const HeroSection = ({ title, description, highlight }: HeroSectionProps) => {
  return (
    <div className="container mx-auto px-4">
      <div className="text-center mb-16">
        <h1 className="text-6xl font-light mb-6 text-stone-800" style={{ fontFamily: 'Imperial Script, cursive' }}>
          {title}
        </h1>
        <p className="text-xl text-stone-600 max-w-3xl mx-auto">
          {description}
        </p>
      </div>

      {highlight && (
        <div className="max-w-4xl mx-auto mb-16">
          <div className={`${highlight.theme} rounded-2xl p-8 border`}>
            <div className="flex items-center justify-center gap-4 mb-6">
              {highlight.icon}
              <h2 className="text-2xl font-light text-stone-800">{highlight.title}</h2>
            </div>
            <p className="text-center text-stone-600 text-lg">
              {highlight.description}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default HeroSection;
