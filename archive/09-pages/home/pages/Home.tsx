import React, { useState } from 'react';
import UnifiedHeroSection from '@/components/home/UnifiedHeroSection';
import BeautyBenefitsSection from '@/components/home/BeautyBenefitsSection';
import ServicePreviewSection from '@/components/home/ServicePreviewSection';
import UnifiedTestimonialsSection from '@/components/home/UnifiedTestimonialsSection';
import ConsultationCTASection from '@/components/home/ConsultationCTASection';
import EnhancedConsultationModal from '@/components/ConsultationModal/EnhancedConsultationModal';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  // State for consultation modal
  const [isConsultationOpen, setIsConsultationOpen] = useState(false);
  const navigate = useNavigate();
  
  // Open consultation modal
  const openConsultation = () => {
    setIsConsultationOpen(true);
  };
  
  // Close consultation modal
  const closeConsultation = () => {
    setIsConsultationOpen(false);
  };
  
  // Handle consultation completion
  const handleConsultationComplete = (results: any) => {
    // Navigate to results page
    navigate('/consultation-results');
  };
  
  return (
    <div className="homepage min-h-screen bg-white">
      {/* Hero Section */}
      <UnifiedHeroSection onConsultationClick={openConsultation} />
      
      {/* Benefits Section */}
      <BeautyBenefitsSection />
      
      {/* Service Preview Section */}
      <ServicePreviewSection />
      
      {/* Testimonials Section */}
      <UnifiedTestimonialsSection />
      
      {/* Consultation CTA Section */}
      <ConsultationCTASection onConsultationClick={openConsultation} />
      
      {/* Footer */}
      <footer className="py-12 text-center">
        <div className="w-32 h-0.5 bg-gradient-to-r from-transparent via-stone-300 to-transparent mx-auto mb-6"></div>
        <p className="text-stone-500 text-sm font-light tracking-wide">(732) 613-1942 • Walk-ins Welcome</p>
      </footer>
      
      {/* Enhanced Consultation Modal */}
      <EnhancedConsultationModal
        isOpen={isConsultationOpen}
        onClose={closeConsultation}
        onComplete={handleConsultationComplete}
      />
    </div>
  );
};

export default Home;

