import React, { useState } from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import EnhancedConsultationFlow from '../EnhancedConsultationFlow';
import { AestheticProvider } from './AestheticProvider';

interface EnhancedConsultationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete?: (results: any) => void;
}

/**
 * Modal wrapper for the enhanced image-based consultation flow
 * Integrates the consultation with aesthetic evolution
 */
const EnhancedConsultationModal: React.FC<EnhancedConsultationModalProps> = ({ 
  isOpen, 
  onClose,
  onComplete
}) => {
  const [consultationProgress, setConsultationProgress] = useState(0);
  const [currentDomain, setCurrentDomain] = useState<string | undefined>();
  
  // Track consultation progress for aesthetic evolution
  const handleProgressChange = (progress: number, domain?: string) => {
    setConsultationProgress(progress);
    if (domain) setCurrentDomain(domain);
  };
  
  // Handle consultation completion
  const handleComplete = (results: any) => {
    // Store results in localStorage for persistence
    localStorage.setItem('consultationResults', JSON.stringify(results));
    
    // Call onComplete callback if provided
    if (onComplete) {
      onComplete(results);
    }
    
    // Close the modal
    onClose();
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="p-0 overflow-hidden w-[95vw] max-w-4xl h-[90vh] max-h-[800px] rounded-lg">
        <AestheticProvider 
          consultationProgress={consultationProgress}
          currentServiceCategory={currentDomain}
        >
          <EnhancedConsultationFlow 
            onProgressChange={handleProgressChange}
            onComplete={handleComplete}
          />
        </AestheticProvider>
      </DialogContent>
    </Dialog>
  );
};

export default EnhancedConsultationModal;

