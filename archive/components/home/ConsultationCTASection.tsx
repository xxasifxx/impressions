import React from 'react';
import { Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ConsultationCTAProps {
  onConsultationClick: () => void;
}

const ConsultationCTASection: React.FC<ConsultationCTAProps> = ({
  onConsultationClick
}) => {
  return (
    <section className="consultation-cta-section py-16 md:py-24 relative overflow-hidden">
      {/* Background with subtle domain elements */}
      <div className="absolute inset-0 z-0">
        <div className="bg-gradient-to-r from-red-500/90 to-pink-500/70 h-full w-full"></div>
        <div className="absolute inset-0 bg-pattern opacity-10"></div>
      </div>
      
      {/* Content */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-2xl mx-auto text-center text-white">
          <h2 className="text-3xl md:text-4xl font-light mb-6" style={{ fontFamily: 'Playfair Display, serif' }}>
            Ready to Discover Your Perfect Beauty Journey?
          </h2>
          
          <p className="text-xl mb-8 text-white/90 font-light">
            Our personalized consultation will guide you to the services that will help you look and feel your best.
          </p>
          
          <Button 
            size="lg" 
            className="bg-white text-red-500 hover:bg-white/90 text-lg py-6 px-8 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
            onClick={onConsultationClick}
          >
            <Sparkles className="w-5 h-5 mr-2" />
            Start Your Consultation
          </Button>
          
          <div className="mt-8 flex justify-center gap-8 text-sm text-white/80">
            <span>✨ Takes only 2 minutes</span>
            <span>🎯 Personalized recommendations</span>
            <span>🛒 Easy booking</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ConsultationCTASection;

