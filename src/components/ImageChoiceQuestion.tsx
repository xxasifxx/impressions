import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { UnifiedDecisionOption } from '@/data/unifiedConsultationFlow';

interface ImageChoiceQuestionProps {
  question: string;
  options: UnifiedDecisionOption[];
  onSelect: (option: UnifiedDecisionOption) => void;
  aspectRatio?: number;
}

const ImageChoiceQuestion: React.FC<ImageChoiceQuestionProps> = ({
  question,
  options,
  onSelect,
  aspectRatio = 1
}) => {
  // State to track viewport orientation
  const [isPortrait, setIsPortrait] = useState(window.innerHeight > window.innerWidth);
  
  // Update orientation on resize
  useEffect(() => {
    const handleResize = () => {
      setIsPortrait(window.innerHeight > window.innerWidth);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  // Determine grid layout based on number of options, orientation and aspect ratio
  const getGridClass = () => {
    const count = options.length;
    
    // For 2-3 options: always use vertical stack for better readability
    if (count <= 3) {
      return 'grid-cols-1';
    } 
    // For 4 options
    else if (count === 4) {
      // On very wide screens (ultrawide), use 2x2 grid for better proportions
      if (aspectRatio > 1.8) {
        return 'grid-cols-2';
      }
      // On medium-wide screens
      else if (aspectRatio > 1.2) {
        return 'grid-cols-2';
      }
      // On portrait screens
      else {
        return 'grid-cols-2';
      }
    } 
    // For 5+ options
    else {
      // On very wide screens
      if (aspectRatio > 1.8) {
        return 'grid-cols-3';  // Max 3 columns for readability
      }
      // On wide screens
      else if (aspectRatio > 1.2) {
        return 'grid-cols-3';
      }
      // On portrait screens
      else {
        return 'grid-cols-2';
      }
    }
  };
  
  // Get appropriate style for cards based on aspect ratio and content
  const getCardStyle = () => {
    // For horizontal layout on wide screens with few options
    if (aspectRatio > 1.5 && options.length <= 3) {
      return {
        display: 'flex',
        height: aspectRatio > 2 ? '22vh' : '26vh'
      };
    }
    
    return {};
  };
  
  return (
    <div className="image-choice-question h-full flex flex-col">
      <h2 className="text-lg sm:text-xl font-light mb-3 text-gray-900 flex-shrink-0">
        {question}
      </h2>
      
      {/* Options container - flex-grow to fill available space */}
      <div className="flex-grow">
        {/* Adaptive grid layout */}
        <div className={`grid ${getGridClass()} gap-4`}>
          {options.map((option) => (
            <motion.div
              key={option.id}
              className="image-choice-option cursor-pointer overflow-hidden rounded-lg shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100"
              style={getCardStyle()}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onSelect(option)}
            >
              {/* For 2-3 options on wide screens: horizontal layout with image on left */}
              {options.length <= 3 && aspectRatio > 1.5 ? (
                <div className="flex h-full">
                  {/* Image thumbnail */}
                  {option.imageUrl && (
                    <div className="relative aspect-square h-full overflow-hidden flex-shrink-0">
                      <img 
                        src={option.imageUrl} 
                        alt={option.label}
                        className="object-cover w-full h-full"
                        loading="lazy"
                      />
                    </div>
                  )}
                  
                  {/* Option text */}
                  <div className="p-3 flex-1 flex flex-col justify-center">
                    <div className="flex items-center gap-1 mb-1">
                      {option.emoji && (
                        <span className="text-base sm:text-lg">{option.emoji}</span>
                      )}
                      <h3 className="text-gray-900 font-medium text-sm sm:text-base">{option.label}</h3>
                    </div>
                    
                    {option.description && (
                      <p className="text-gray-600 text-xs sm:text-sm line-clamp-2">{option.description}</p>
                    )}
                    
                    {option.domains && option.domains.length > 1 && (
                      <div className="mt-1 flex flex-wrap gap-1">
                        {option.domains.includes('hair-salon') && (
                          <span className="text-[10px] bg-red-500/80 text-white px-1 py-0 rounded-full">Hair</span>
                        )}
                        {option.domains.includes('makeup-studio') && (
                          <span className="text-[10px] bg-pink-500/80 text-white px-1 py-0 rounded-full">Makeup</span>
                        )}
                        {option.domains.includes('med-spa') && (
                          <span className="text-[10px] bg-blue-500/80 text-white px-1 py-0 rounded-full">Spa</span>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                // For 4+ options or non-wide screens: card layout with image on top
                <div className="flex flex-col h-full">
                  {/* Image */}
                  {option.imageUrl && (
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <img 
                        src={option.imageUrl} 
                        alt={option.label}
                        className="object-cover w-full h-full"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                    </div>
                  )}
                  
                  {/* Option text */}
                  <div className="p-2 bg-white flex-grow">
                    <div className="flex items-center gap-1">
                      {option.emoji && (
                        <span className="text-base">{option.emoji}</span>
                      )}
                      <h3 className="text-gray-900 font-medium text-sm truncate">{option.label}</h3>
                    </div>
                    
                    {option.domains && option.domains.length > 1 && (
                      <div className="mt-1 flex flex-wrap gap-1">
                        {option.domains.includes('hair-salon') && (
                          <span className="text-[10px] bg-red-500/80 text-white px-1 py-0 rounded-full">Hair</span>
                        )}
                        {option.domains.includes('makeup-studio') && (
                          <span className="text-[10px] bg-pink-500/80 text-white px-1 py-0 rounded-full">Makeup</span>
                        )}
                        {option.domains.includes('med-spa') && (
                          <span className="text-[10px] bg-blue-500/80 text-white px-1 py-0 rounded-full">Spa</span>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ImageChoiceQuestion;

