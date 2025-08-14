import React from 'react';
import { motion } from 'framer-motion';
import { EnhancedDecisionOption } from '@/data/enhancedConsultationFlow';

interface OptionCardProps {
  option: EnhancedDecisionOption;
  aspectRatio: number;
  totalOptions: number;
  onSelect: (option: EnhancedDecisionOption) => void;
}

/**
 * OptionCard component for displaying a single option in the consultation flow
 * Handles different layouts based on screen size and number of options
 */
const OptionCard: React.FC<OptionCardProps> = ({
  option,
  aspectRatio,
  totalOptions,
  onSelect
}) => {
  // Get appropriate style for cards based on aspect ratio and content
  const getCardStyle = () => {
    // For horizontal layout on wide screens with few options
    if (aspectRatio > 1.5 && totalOptions <= 3) {
      return {
        display: 'flex',
        height: aspectRatio > 2 ? '22vh' : '26vh'
      };
    }
    
    return {};
  };

  // Get image aspect ratio class based on number of options
  const getImageAspectRatioClass = () => {
    // For 2-3 options, use 2:1 aspect ratio
    if (totalOptions <= 3) {
      return 'aspect-[2/1]';
    }
    // For 4+ options, use 4:3 aspect ratio
    return 'aspect-[4/3]';
  };

  return (
    <motion.div
      className="image-choice-option cursor-pointer overflow-hidden rounded-lg shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100"
      style={getCardStyle()}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={() => onSelect(option)}
    >
      {/* For 2-3 options on wide screens: horizontal layout with image on left */}
      {totalOptions <= 3 && aspectRatio > 1.5 ? (
        <div className="flex h-full">
          {/* Image thumbnail */}
          {option.imageUrl && (
            <div className="relative aspect-[2/1] h-full overflow-hidden flex-shrink-0">
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
              <DomainTags domains={option.domains} />
            )}
          </div>
        </div>
      ) : (
        // For 4+ options or non-wide screens: card layout with image on top
        <div className="flex flex-col h-full">
          {/* Image */}
          {option.imageUrl && (
            <div className={`relative ${getImageAspectRatioClass()} overflow-hidden`}>
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
              <DomainTags domains={option.domains} />
            )}
          </div>
        </div>
      )}
    </motion.div>
  );
};

// Extracted component for domain tags
interface DomainTagsProps {
  domains: string[];
}

const DomainTags: React.FC<DomainTagsProps> = ({ domains }) => {
  return (
    <div className="mt-1 flex flex-wrap gap-1">
      {domains.includes('hair-salon') && (
        <span className="text-[10px] bg-red-500/80 text-white px-1 py-0 rounded-full">Hair</span>
      )}
      {domains.includes('makeup-studio') && (
        <span className="text-[10px] bg-pink-500/80 text-white px-1 py-0 rounded-full">Makeup</span>
      )}
      {domains.includes('med-spa') && (
        <span className="text-[10px] bg-blue-500/80 text-white px-1 py-0 rounded-full">Spa</span>
      )}
    </div>
  );
};

export default OptionCard;

