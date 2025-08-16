import React from 'react';
import { Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface UnifiedHeroProps {
  onConsultationClick: () => void;
}

const UnifiedHeroSection: React.FC<UnifiedHeroProps> = ({
  onConsultationClick
}) => {
  return (
    <section className="unified-hero relative overflow-hidden">
      {/* Background with subtle domain elements */}
      <div className="absolute inset-0 z-0">
        <div className="h-full w-full bg-gradient-to-br from-red-50/90 via-stone-50/90 to-pink-50/90">
          {/* Subtle background patterns */}
          <div className="absolute inset-0 opacity-10 bg-[url('/images/home/pattern-bg.png')] bg-repeat"></div>
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-white/0 via-white/0 to-white/80"></div>
      </div>
      
      {/* Hero content */}
      <div className="container mx-auto px-4 pt-24 pb-32 md:pt-32 md:pb-40 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-light text-stone-800 mb-6" style={{ fontFamily: 'Playfair Display, serif' }}>
            Discover Your Most Beautiful Self
          </h1>
          
          <p className="text-xl md:text-2xl text-stone-600 mb-10 font-light">
            A personalized beauty journey tailored to your unique needs and desires.
          </p>
          
          <Button 
            size="lg" 
            onClick={onConsultationClick}
            className="bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white text-lg py-6 px-8 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <Sparkles className="w-5 h-5 mr-2" />
            Start Your Beauty Consultation
          </Button>
          
          <div className="mt-8 flex justify-center gap-8 text-sm text-stone-500">
            <span className="flex items-center">
              <span className="w-3 h-3 rounded-full bg-red-400 mr-2"></span>
              Hair
            </span>
            <span className="flex items-center">
              <span className="w-3 h-3 rounded-full bg-pink-400 mr-2"></span>
              Makeup
            </span>
            <span className="flex items-center">
              <span className="w-3 h-3 rounded-full bg-emerald-400 mr-2"></span>
              Spa
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UnifiedHeroSection;

