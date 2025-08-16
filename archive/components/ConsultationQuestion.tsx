import React from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { EnhancedDecisionNode, EnhancedDecisionOption } from '@/data/enhancedConsultationFlow';
import OptionGrid from './OptionGrid';

interface ConsultationQuestionProps {
  node: EnhancedDecisionNode;
  aspectRatio: number;
  isTransitioning: boolean;
  onSelect: (option: EnhancedDecisionOption) => void;
  onGoBack: () => void;
  showBackButton: boolean;
}

/**
 * ConsultationQuestion component for displaying a question and its options
 */
const ConsultationQuestion: React.FC<ConsultationQuestionProps> = ({
  node,
  aspectRatio,
  isTransitioning,
  onSelect,
  onGoBack,
  showBackButton
}) => {
  return (
    <motion.div
      key="question"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: isTransitioning ? 0 : 1, y: isTransitioning ? 10 : 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.4 }}
      className="flex-grow flex"
    >
      <Card className="p-4 bg-white/90 backdrop-blur-sm flex-grow">
        <div className="h-full flex flex-col">
          <h2 className="text-lg sm:text-xl font-light mb-3 text-gray-900 flex-shrink-0">
            {node.question}
          </h2>
          
          {/* Options container - flex-grow to fill available space */}
          <div className="flex-grow">
            <OptionGrid 
              options={node.options}
              aspectRatio={aspectRatio}
              onSelect={onSelect}
            />
          </div>
          
          {/* Back Button */}
          {showBackButton && (
            <div className="flex justify-start mt-3">
              <Button
                onClick={onGoBack}
                variant="ghost"
                size="sm"
                className="text-gray-600 hover:text-gray-800 text-xs h-8"
                disabled={isTransitioning}
              >
                <ArrowLeft className="w-3 h-3 mr-1" />
                Go Back
              </Button>
            </div>
          )}
        </div>
      </Card>
    </motion.div>
  );
};

export default ConsultationQuestion;

