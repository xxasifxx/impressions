import React, { useState, useEffect } from 'react';
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
  const [modalWidth, setModalWidth] = useState('95vw');
  
  // Dynamically adjust modal width based on viewport
  useEffect(() => {
    const updateModalWidth = () => {
      const width = window.innerWidth;
      if (width >= 1920) {
        setModalWidth('1400px');
      } else if (width >= 1440) {
        setModalWidth('1200px');
      } else if (width >= 1024) {
        setModalWidth('900px');
      } else if (width >= 768) {
        setModalWidth('700px');
      } else {
        setModalWidth('95vw');
      }
    };
    
    updateModalWidth();
    window.addEventListener('resize', updateModalWidth);
    return () => window.removeEventListener('resize', updateModalWidth);
  }, []);
  
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
      <DialogContent 
        className="p-0 rounded-lg overflow-hidden max-h-[90vh]"
        style={{ width: modalWidth, maxWidth: '95vw', height: 'min(90vh, 800px)' }}
      >
        <div className="w-full h-full overflow-hidden">
          <AestheticProvider 
            consultationProgress={consultationProgress}
            currentServiceCategory={currentDomain}
          >
            <EnhancedConsultationFlow 
              onProgressChange={handleProgressChange}
              onComplete={handleComplete}
            />
          </AestheticProvider>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EnhancedConsultationModal;

