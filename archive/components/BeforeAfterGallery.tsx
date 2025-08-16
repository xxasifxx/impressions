
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

  const currentTransformation = transformations[currentIndex];

  const nextTransformation = () => {
    setCurrentIndex((prev) => (prev + 1) % transformations.length);
  };

  const prevTransformation = () => {
    setCurrentIndex((prev) => (prev - 1 + transformations.length) % transformations.length);
  };

  return (
    <div className={`relative group ${className}`}>
      <div 
        className="relative h-48 overflow-hidden rounded-lg select-none"
        style={{ 
          background: `linear-gradient(135deg, 
            rgba(239, 68, 68, 0.1) 0%, 
            rgba(168, 85, 247, 0.1) 50%, 
            rgba(59, 130, 246, 0.1) 100%)` 
        }}
      >
        {/* Before Image (Base Layer) */}
        <div className="absolute inset-0">
          <img
            src={currentTransformation.before}
            alt={`${currentTransformation.title} - Before`}
            className="w-full h-full object-cover"
            style={{
              filter: 'saturate(0.8) brightness(0.9)'
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-br from-stone-900/20 via-transparent to-transparent" />
        </div>

        {/* After Image (Revealing Layer) */}
        <div 
          className="absolute inset-0 transition-all duration-1000 ease-out group-hover:translate-x-0 translate-x-full"
          style={{
            filter: 'saturate(1.1) brightness(1.05)'
          }}
        >
          <img
            src={currentTransformation.after}
            alt={`${currentTransformation.title} - After`}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-bl from-red-500/10 via-transparent to-transparent" />
        </div>

        {/* Reveal Line */}
        <div 
          className="absolute top-0 bottom-0 right-0 w-0.5 bg-white shadow-lg transition-all duration-1000 ease-out group-hover:right-full group-hover:left-0"
          style={{
            background: 'linear-gradient(to bottom, rgba(255,255,255,0.9) 0%, rgba(255,255,255,1) 50%, rgba(255,255,255,0.9) 100%)',
            boxShadow: '0 0 10px rgba(0,0,0,0.3), inset 0 0 2px rgba(255,255,255,0.8)',
            opacity: 1
          }}
        />

        {/* Before/After Labels */}
        <div className="absolute bottom-4 left-4">
          <div 
            className="bg-stone-800/80 backdrop-blur-sm text-white px-2 py-1 rounded-full text-xs font-medium transition-opacity duration-300 group-hover:opacity-30"
          >
            Before
          </div>
        </div>
        <div className="absolute bottom-4 right-4">
          <div 
            className="bg-red-600/80 backdrop-blur-sm text-white px-2 py-1 rounded-full text-xs font-medium transition-opacity duration-300 opacity-0 group-hover:opacity-100"
          >
            After
          </div>
        </div>

        {/* Navigation Arrows */}
        {transformations.length > 1 && (
          <>
            <button
              onClick={prevTransformation}
              className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center hover:bg-white hover:scale-110 shadow-lg"
            >
              <ChevronLeft className="w-4 h-4 text-stone-600" />
            </button>
            <button
              onClick={nextTransformation}
              className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center hover:bg-white hover:scale-110 shadow-lg"
            >
              <ChevronRight className="w-4 h-4 text-stone-600" />
            </button>
          </>
        )}

        {/* Transformation Counter */}
        {transformations.length > 1 && (
          <div className="absolute top-4 right-4">
            <div className="bg-black/50 backdrop-blur-sm text-white px-2 py-1 rounded-full text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              {currentIndex + 1}/{transformations.length}
            </div>
          </div>
        )}

        {/* Floating Timeframe Badge */}
        {currentTransformation.timeframe && (
          <div 
            className="absolute top-4 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300"
            style={{ 
              background: 'linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(248,250,252,0.95) 100%)',
              backdropFilter: 'blur(8px)'
            }}
          >
            <div className="px-3 py-1 rounded-full text-xs font-medium text-stone-700 border border-white/50 shadow-lg">
              {currentTransformation.timeframe}
            </div>
          </div>
        )}

        {/* Hover Instruction */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-0 transition-opacity duration-300 pointer-events-none">
          <div className="bg-black/50 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs opacity-50 group-hover:opacity-0 transition-opacity duration-500">
            Hover to reveal transformation
          </div>
        </div>
      </div>

      {/* Transformation Info */}
      <div className="mt-3">
        <h4 className="text-sm font-medium text-stone-800">{currentTransformation.title}</h4>
        <div className="flex items-center gap-2 mt-1">
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 bg-red-500 rounded-full"></div>
            <span className="text-xs text-stone-500">Hover to see transformation</span>
          </div>
          {currentTransformation.timeframe && (
            <>
              <div className="w-1 h-1 bg-stone-300 rounded-full"></div>
              <span className="text-xs text-stone-500">{currentTransformation.timeframe}</span>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default BeforeAfterGallery;
