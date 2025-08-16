import React from 'react';
import EnhancedConsultationFlow from '@/components/EnhancedConsultationFlow';
import { useNavigate } from 'react-router-dom';

const EnhancedConsultation: React.FC = () => {
  const navigate = useNavigate();
  
  // Handle consultation completion
  const handleConsultationComplete = (results: any) => {
    // Navigate to results page
    navigate('/consultation-results');
  };
  
  return (
    <div className="enhanced-consultation-page">
      <EnhancedConsultationFlow onComplete={handleConsultationComplete} />
    </div>
  );
};

export default EnhancedConsultation;

