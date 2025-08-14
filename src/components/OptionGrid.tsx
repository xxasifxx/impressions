import React from 'react';
import { EnhancedDecisionOption } from '@/data/enhancedConsultationFlow';
import OptionCard from './OptionCard';

interface OptionGridProps {
  options: EnhancedDecisionOption[];
  aspectRatio: number;
  onSelect: (option: EnhancedDecisionOption) => void;
}

/**
 * OptionGrid component for displaying a grid of options
 * Handles different grid layouts based on screen size and number of options
 */
const OptionGrid: React.FC<OptionGridProps> = ({
  options,
  aspectRatio,
  onSelect
}) => {
  // Determine grid layout based on number of options, orientation and aspect ratio
  const getGridClass = () => {
    const count = options.length;
    
    // For 2-3 options: always use vertical stack for better readability
    if (count <= 3) {
      return 'grid-cols-1';
    } 
    // For 4 options
    else if (count === 4) {
      // Always use 2x2 grid for better proportions
      return 'grid-cols-2';
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

  return (
    <div className={`grid ${getGridClass()} gap-4`}>
      {options.map((option) => (
        <OptionCard
          key={option.id}
          option={option}
          aspectRatio={aspectRatio}
          totalOptions={options.length}
          onSelect={onSelect}
        />
      ))}
    </div>
  );
};

export default OptionGrid;

