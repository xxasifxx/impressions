import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useDomainTheme } from '@/contexts/DomainThemeContext';
import { userJourneys } from '@/data/unifiedServicesData';
import { ArrowRight, Sparkles } from 'lucide-react';

interface ConsultationEntryProps {
  domain: 'hair-salon' | 'makeup-studio' | 'med-spa';
  className?: string;
}

const ConsultationEntry = ({ domain, className = "" }: ConsultationEntryProps) => {
  const { currentTheme } = useDomainTheme();
  const navigate = useNavigate();
  
  const journeys = userJourneys[domain] || [];

  const startConsultation = (journeyId: string) => {
    // For now, navigate to services with journey filter
    // In Phase 2, this will navigate to consultation flow
    navigate(`/services?domain=${domain}&journey=${journeyId}`);
  };

  const getDomainDisplayName = (domain: string) => {
    switch (domain) {
      case 'hair-salon': return 'Hair Salon';
      case 'makeup-studio': return 'Makeup Studio';
      case 'med-spa': return 'Med Spa';
      default: return domain;
    }
  };

  if (journeys.length === 0) {
    // Fallback to original behavior if no journeys defined
    return (
      <div className={`consultation-entry-fallback ${className}`}>
        <Link to={`/services?domain=${domain}`} className="inline-block">
          <Button 
            variant="outline" 
            className="border-white text-white hover:bg-white/10 px-8 py-3 text-lg"
          >
            View All Services
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className={`consultation-entry ${className}`}>
      {/* Main Consultation Question */}
      <div className="text-center mb-8">
        <div className="flex items-center justify-center gap-2 mb-4">
          <Sparkles className="w-6 h-6 text-white" />
          <h3 
            className="text-3xl font-light text-white"
            style={{ fontFamily: currentTheme.fonts.heading }}
          >
            What brings you in today?
          </h3>
          <Sparkles className="w-6 h-6 text-white" />
        </div>
        <p className="text-lg text-white/90 mb-2">
          Let us guide you to the perfect services for your needs
        </p>
        <p className="text-sm text-white/70">
          Get personalized recommendations from our expert team
        </p>
      </div>

      {/* Journey Selection Buttons */}
      <div className="grid gap-4 mb-8">
        {journeys.map((journey) => (
          <Button
            key={journey.id}
            onClick={() => startConsultation(journey.id)}
            className="group relative overflow-hidden bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20 hover:border-white/40 transition-all duration-300 p-6 h-auto"
            style={{ 
              fontFamily: currentTheme.fonts.body
            }}
          >
            <div className="flex items-center justify-between w-full">
              <div className="text-left">
                <div className="text-xl font-medium mb-1">
                  {journey.title}
                </div>
                <div className="text-sm text-white/80">
                  {journey.description}
                </div>
              </div>
              <ArrowRight className="w-5 h-5 ml-4 group-hover:translate-x-1 transition-transform" />
            </div>
            
            {/* Subtle hover effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </Button>
        ))}
      </div>

      {/* Secondary Option - Browse All Services */}
      <div className="text-center">
        <p className="text-white/60 text-sm mb-3">
          Prefer to browse on your own?
        </p>
        <Link to={`/services?domain=${domain}`} className="inline-block">
          <Button 
            variant="ghost" 
            className="text-white/80 hover:text-white hover:bg-white/10 px-6 py-2 text-sm border border-white/20 hover:border-white/40 transition-all"
          >
            Browse All {getDomainDisplayName(domain)} Services
          </Button>
        </Link>
      </div>

      {/* Trust Indicators */}
      <div className="mt-8 pt-6 border-t border-white/20">
        <div className="flex items-center justify-center gap-6 text-white/60 text-xs">
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 bg-green-400 rounded-full"></div>
            <span>Expert Guidance</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
            <span>Personalized Experience</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
            <span>Premium Results</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConsultationEntry;

