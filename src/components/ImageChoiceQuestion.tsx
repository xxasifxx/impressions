import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { UnifiedDecisionOption } from '@/data/unifiedConsultationFlow';

interface ImageChoiceQuestionProps {
  question: string;
  options: UnifiedDecisionOption[];
  onSelect: (option: UnifiedDecisionOption) => void;
}

const ImageChoiceQuestion: React.FC<ImageChoiceQuestionProps> = ({
  question,
  options,
  onSelect
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
  
  // Determine grid layout based on number of options and orientation
  const getGridClass = () => {
    const count = options.length;
    
    if (count <= 3) {
      // 2-3 options: Full-width vertical stack
      return 'grid-cols-1';
    } else if (count === 4) {
      // 4 options: 2×2 grid
      return 'grid-cols-2';
    } else {
      // 5+ options: Adapt based on orientation
      return isPortrait ? 'grid-cols-2' : 'grid-cols-3';
    }
  };
  
  return (
    <div className="image-choice-question h-full flex flex-col">
      <h2 className="text-lg sm:text-xl font-light mb-3 text-gray-900 flex-shrink-0">
        {question}
      </h2>
      
      {/* Options container - flex-grow to fill available space */}
      <div className="flex-grow overflow-y-auto">
        {/* Adaptive grid layout */}
        <div className={`grid ${getGridClass()} gap-3`}>
          {options.map((option) => (
            <motion.div
              key={option.id}
              className="image-choice-option cursor-pointer overflow-hidden rounded-lg shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onSelect(option)}
            >
              {/* For 2-3 options: horizontal layout with image on left */}
              {options.length <= 3 ? (
                <div className="flex items-stretch h-24 sm:h-28">
                  {/* Image thumbnail */}
                  {option.imageUrl && (
                    <div className="relative w-24 sm:w-28 overflow-hidden flex-shrink-0">
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
                      <p className="text-gray-600 text-xs line-clamp-2">{option.description}</p>
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
                // For 4+ options: card layout with image on top
                <div className="flex flex-col">
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
                  <div className="p-2 bg-white">
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

