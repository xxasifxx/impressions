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
    <div className="image-choice-question">
      <h2 className="text-xl md:text-2xl font-light mb-4 md:mb-6 text-gray-900">
        {question}
      </h2>
      
      {/* Mobile view - vertical stack */}
      <div className="grid grid-cols-1 gap-3 md:hidden">
        {options.map((option) => (
          <motion.div
            key={option.id}
            className="image-choice-option cursor-pointer overflow-hidden rounded-lg shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onSelect(option)}
          >
            <div className="flex items-center">
              {/* Small image thumbnail */}
              {option.imageUrl && (
                <div className="relative w-24 h-24 overflow-hidden flex-shrink-0">
                  <img 
                    src={option.imageUrl} 
                    alt={option.label}
                    className="object-cover w-full h-full"
                  />
                </div>
              )}
              
              {/* Option text */}
              <div className="p-3 flex-1">
                <div className="flex items-center gap-2 mb-1">
                  {option.emoji && (
                    <span className="text-lg">{option.emoji}</span>
                  )}
                  <h3 className="text-gray-900 font-medium text-base">{option.label}</h3>
                </div>
                
                {option.description && (
                  <p className="text-gray-600 text-xs line-clamp-2">{option.description}</p>
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
      
      {/* Desktop view - grid */}
      <div className="hidden md:grid md:grid-cols-2 gap-4">
        {options.map((option) => (
          <motion.div
            key={option.id}
            className="image-choice-option cursor-pointer overflow-hidden rounded-lg shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onSelect(option)}
          >
            <div className="relative aspect-w-16 aspect-h-9 overflow-hidden">
              {option.imageUrl && (
                <img 
                  src={option.imageUrl} 
                  alt={option.label}
                  className="object-cover w-full h-full transition-transform duration-500 hover:scale-105"
                  loading="lazy" // Add lazy loading for better performance
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex flex-col justify-end p-4">
                <div className="flex items-center gap-2 mb-1">
                  {option.emoji && (
                    <span className="text-xl">{option.emoji}</span>
                  )}
                  <h3 className="text-white font-medium text-lg">{option.label}</h3>
                </div>
                
                {option.description && (
                  <p className="text-white/80 text-sm line-clamp-2">{option.description}</p>
                )}
                
                {option.domains && option.domains.length > 1 && (
                  <div className="mt-2 flex flex-wrap gap-1">
                    {option.domains.includes('hair-salon') && (
                      <span className="text-xs bg-red-500/80 text-white px-2 py-0.5 rounded-full">Hair</span>
                    )}
                    {option.domains.includes('makeup-studio') && (
                      <span className="text-xs bg-pink-500/80 text-white px-2 py-0.5 rounded-full">Makeup</span>
                    )}
                    {option.domains.includes('med-spa') && (
                      <span className="text-xs bg-blue-500/80 text-white px-2 py-0.5 rounded-full">Spa</span>
                    )}
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ImageChoiceQuestion;

