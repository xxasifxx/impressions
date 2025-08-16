import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import UnifiedConsultationModal from './ConsultationModal/UnifiedConsultationModal';
import { useNavigate } from 'react-router-dom';

interface ConsultationEntryButtonProps {
  buttonText?: string;
  buttonVariant?: 'default' | 'outline' | 'ghost';
  buttonSize?: 'default' | 'sm' | 'lg';
  className?: string;
  redirectToResults?: boolean;
}

/**
 * Entry point button that launches the consultation modal
 */
const ConsultationEntryButton: React.FC<ConsultationEntryButtonProps> = ({
  buttonText = 'Find Your Perfect Services',
  buttonVariant = 'default',
  buttonSize = 'default',
  className = '',
  redirectToResults = true
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  
  const handleConsultationComplete = (results: any) => {
    if (redirectToResults) {
      // Navigate to personalized results page
      navigate('/personalized-results', { state: { recommendations: results } });
    }
  };
  
  return (
    <>
      <Button 
        onClick={() => setIsModalOpen(true)}
        variant={buttonVariant as any}
        size={buttonSize as any}
        className={`consultation-entry-button ${className}`}
      >
        {buttonText}
      </Button>
      
      {isModalOpen && (
        <UnifiedConsultationModal 
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onComplete={handleConsultationComplete}
        />
      )}
    </>
  );
};

export default ConsultationEntryButton;

