
import React from 'react';
import { useDomainTheme } from '@/contexts/DomainThemeContext';
import { userJourneys } from '@/data/unifiedServicesData';
import { Badge } from '@/components/ui/badge';

interface UserJourneyFilterProps {
  selectedJourney: string | null;
  onJourneySelect: (journeyId: string | null) => void;
}

const UserJourneyFilter = ({ selectedJourney, onJourneySelect }: UserJourneyFilterProps) => {
  const { currentDomain, currentTheme } = useDomainTheme();
  
  const journeys = userJourneys[currentDomain] || [];

  if (journeys.length === 0) return null;

  return (
    <div className="max-w-6xl mx-auto mb-8">
      <div className="text-center mb-6">
        <h3 
          className="text-2xl font-light mb-2"
          style={{ 
            fontFamily: currentTheme.fonts.heading,
            color: currentTheme.colors.primary 
          }}
        >
          What brings you in today?
        </h3>
        <p 
          className="text-sm"
          style={{ 
            color: currentTheme.colors.muted,
            fontFamily: currentTheme.fonts.body
          }}
        >
          Choose your journey to see personalized service recommendations
        </p>
      </div>
      
      <div className="flex flex-wrap justify-center gap-3">
        <Badge
          variant={selectedJourney === null ? 'default' : 'outline'}
          className="cursor-pointer transition-all duration-300 hover:scale-105 px-4 py-2"
          onClick={() => onJourneySelect(null)}
          style={selectedJourney === null ? { 
            backgroundColor: currentTheme.colors.primary,
            color: 'white'
          } : {
            borderColor: currentTheme.colors.primary + '40',
            color: currentTheme.colors.primary
          }}
        >
          All Services
        </Badge>
        
        {journeys.map((journey) => (
          <Badge
            key={journey.id}
            variant={selectedJourney === journey.id ? 'default' : 'outline'}
            className="cursor-pointer transition-all duration-300 hover:scale-105 px-4 py-2 text-center"
            onClick={() => onJourneySelect(journey.id)}
            style={selectedJourney === journey.id ? { 
              backgroundColor: currentTheme.colors.primary,
              color: 'white'
            } : {
              borderColor: currentTheme.colors.primary + '40',
              color: currentTheme.colors.primary
            }}
          >
            <div>
              <div className="font-medium">{journey.title}</div>
              <div className="text-xs opacity-80">{journey.description}</div>
            </div>
          </Badge>
        ))}
      </div>
    </div>
  );
};

export default UserJourneyFilter;
