
import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface TransformationImage {
  before: string;
  after: string;
  title: string;
  timeframe?: string;
}

interface BeforeAfterGalleryProps {
  transformations: TransformationImage[];
  className?: string;
}

const BeforeAfterGallery = ({ transformations, className = "" }: BeforeAfterGalleryProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showAfter, setShowAfter] = useState(false);

  const nextTransformation = () => {
    setCurrentIndex((prev) => (prev + 1) % transformations.length);
    setShowAfter(false);
  };

  const prevTransformation = () => {
    setCurrentIndex((prev) => (prev - 1 + transformations.length) % transformations.length);
    setShowAfter(false);
  };

  const currentTransformation = transformations[currentIndex];

  return (
    <div className={`relative group ${className}`}>
      <div className="relative h-48 overflow-hidden rounded-lg">
        <img
          src={showAfter ? currentTransformation.after : currentTransformation.before}
          alt={currentTransformation.title}
          className="w-full h-full object-cover transition-all duration-500"
        />
        
        {/* Before/After Toggle */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="absolute bottom-4 left-4 right-4">
            <button
              onClick={() => setShowAfter(!showAfter)}
              className="w-full bg-white/90 backdrop-blur-sm text-stone-800 py-2 px-4 rounded-lg text-sm font-medium hover:bg-white transition-colors"
            >
              {showAfter ? 'Show Before' : 'Show After'} →
            </button>
          </div>
        </div>

        {/* Navigation Arrows */}
        {transformations.length > 1 && (
          <>
            <button
              onClick={prevTransformation}
              className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/80 backdrop-blur-sm rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center hover:bg-white"
            >
              <ChevronLeft className="w-4 h-4 text-stone-600" />
            </button>
            <button
              onClick={nextTransformation}
              className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/80 backdrop-blur-sm rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center hover:bg-white"
            >
              <ChevronRight className="w-4 h-4 text-stone-600" />
            </button>
          </>
        )}

        {/* Status Indicator */}
        <div className="absolute top-4 left-4">
          <div className="bg-red-600 text-white px-2 py-1 rounded-full text-xs font-medium">
            {showAfter ? 'After' : 'Before'}
          </div>
        </div>

        {/* Transformation Counter */}
        {transformations.length > 1 && (
          <div className="absolute top-4 right-4">
            <div className="bg-black/50 text-white px-2 py-1 rounded-full text-xs">
              {currentIndex + 1}/{transformations.length}
            </div>
          </div>
        )}
      </div>

      {/* Transformation Info */}
      <div className="mt-2">
        <h4 className="text-sm font-medium text-stone-800">{currentTransformation.title}</h4>
        {currentTransformation.timeframe && (
          <p className="text-xs text-stone-500">{currentTransformation.timeframe}</p>
        )}
      </div>
    </div>
  );
};

export default BeforeAfterGallery;
