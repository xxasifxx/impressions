import React from 'react';
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
  return (
    <div className="image-choice-question h-full flex flex-col">
      <h2 className="text-lg sm:text-xl font-light mb-3 text-gray-900 flex-shrink-0">
        {question}
      </h2>
      
      {/* Options container - flex-grow to fill available space */}
      <div className="flex-grow overflow-y-auto">
        {/* Mobile view - vertical stack */}
        <div className="grid grid-cols-1 gap-2 sm:hidden">
          {options.map((option) => (
            <motion.div
              key={option.id}
              className="image-choice-option cursor-pointer overflow-hidden rounded-lg shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onSelect(option)}
            >
              <div className="flex items-center h-16">
                {/* Small image thumbnail */}
                {option.imageUrl && (
                  <div className="relative w-16 h-16 overflow-hidden flex-shrink-0">
                    <img 
                      src={option.imageUrl} 
                      alt={option.label}
                      className="object-cover w-full h-full"
                      loading="lazy"
                    />
                  </div>
                )}
                
                {/* Option text */}
                <div className="p-2 flex-1 overflow-hidden">
                  <div className="flex items-center gap-1 mb-0.5">
                    {option.emoji && (
                      <span className="text-base">{option.emoji}</span>
                    )}
                    <h3 className="text-gray-900 font-medium text-sm truncate">{option.label}</h3>
                  </div>
                  
                  {option.description && (
                    <p className="text-gray-600 text-xs line-clamp-1">{option.description}</p>
                  )}
                  
                  {option.domains && option.domains.length > 1 && (
                    <div className="mt-0.5 flex flex-wrap gap-1">
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
            </motion.div>
          ))}
        </div>
        
        {/* Desktop view - grid */}
        <div className="hidden sm:grid sm:grid-cols-2 gap-3">
          {options.map((option) => (
            <motion.div
              key={option.id}
              className="image-choice-option cursor-pointer overflow-hidden rounded-lg shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onSelect(option)}
            >
              <div className="relative aspect-video overflow-hidden">
                {option.imageUrl && (
                  <img 
                    src={option.imageUrl} 
                    alt={option.label}
                    className="object-cover w-full h-full transition-transform duration-500 hover:scale-105"
                    loading="lazy"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex flex-col justify-end p-3">
                  <div className="flex items-center gap-1 mb-0.5">
                    {option.emoji && (
                      <span className="text-lg">{option.emoji}</span>
                    )}
                    <h3 className="text-white font-medium text-base">{option.label}</h3>
                  </div>
                  
                  {option.description && (
                    <p className="text-white/80 text-xs line-clamp-2">{option.description}</p>
                  )}
                  
                  {option.domains && option.domains.length > 1 && (
                    <div className="mt-1 flex flex-wrap gap-1">
                      {option.domains.includes('hair-salon') && (
                        <span className="text-xs bg-red-500/80 text-white px-1.5 py-0.5 rounded-full">Hair</span>
                      )}
                      {option.domains.includes('makeup-studio') && (
                        <span className="text-xs bg-pink-500/80 text-white px-1.5 py-0.5 rounded-full">Makeup</span>
                      )}
                      {option.domains.includes('med-spa') && (
                        <span className="text-xs bg-blue-500/80 text-white px-1.5 py-0.5 rounded-full">Spa</span>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ImageChoiceQuestion;

