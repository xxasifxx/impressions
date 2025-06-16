
import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useDomainTheme } from '@/contexts/DomainThemeContext';
import { DomainType } from '@/utils/domainThemes';

interface UserJourney {
  id: string;
  title: string;
  description: string;
  icon: string;
}

const journeysByDomain: Record<DomainType, UserJourney[]> = {
  'hair-salon': [
    {
      id: 'complete-transformation',
      title: 'Complete Transformation',
      description: 'Ready for a dramatic new look',
      icon: '✨'
    },
    {
      id: 'color-refresh',
      title: 'Color Refresh',
      description: 'Update and brighten your current color',
      icon: '🎨'
    },
    {
      id: 'maintenance',
      title: 'Regular Maintenance',
      description: 'Keep your look fresh and polished',
      icon: '💇‍♀️'
    },
    {
      id: 'special-event',
      title: 'Special Event',
      description: 'Perfect look for an important occasion',
      icon: '🌟'
    }
  ],
  'makeup-studio': [
    {
      id: 'special-event',
      title: 'Special Event Glam',
      description: 'Stunning makeup for your big night',
      icon: '💄'
    },
    {
      id: 'learning',
      title: 'Learn New Skills',
      description: 'Master makeup techniques',
      icon: '📚'
    },
    {
      id: 'wedding',
      title: 'Wedding Beauty',
      description: 'Bridal perfection for your day',
      icon: '👰'
    }
  ],
  'med-spa': [
    {
      id: 'brow-perfection',
      title: 'Perfect Brows',
      description: 'Beautifully shaped eyebrows',
      icon: '👁️'
    },
    {
      id: 'smooth-skin',
      title: 'Smooth Skin',
      description: 'Hair removal and skin smoothing',
      icon: '✨'
    },
    {
      id: 'facial-glow',
      title: 'Radiant Glow',
      description: 'Rejuvenating facial treatments',
      icon: '🌟'
    },
    {
      id: 'lash-enhancement',
      title: 'Lash Enhancement',
      description: 'Beautiful, full eyelashes',
      icon: '👁️‍🗨️'
    }
  ]
};

interface UserJourneyFilterProps {
  selectedJourney: string | null;
  onJourneySelect: (journeyId: string | null) => void;
}

const UserJourneyFilter = ({ selectedJourney, onJourneySelect }: UserJourneyFilterProps) => {
  const { currentDomain, currentTheme } = useDomainTheme();
  const journeys = journeysByDomain[currentDomain];

  return (
    <div className="mb-8">
      <div className="text-center mb-6">
        <h3 
          className="text-2xl font-light mb-2"
          style={{ 
            fontFamily: currentTheme.fonts.heading,
            color: currentTheme.colors.primary 
          }}
        >
          What's Your Beauty Journey?
        </h3>
        <p className="text-gray-600">
          Tell us what you're looking for and we'll show you the perfect services
        </p>
      </div>

      <div className="flex flex-wrap justify-center gap-3 mb-4">
        <Button
          variant={selectedJourney === null ? 'default' : 'outline'}
          onClick={() => onJourneySelect(null)}
          className="flex items-center gap-2"
          style={selectedJourney === null ? { 
            backgroundColor: currentTheme.colors.primary,
            color: 'white'
          } : {}}
        >
          🔍 Browse All Services
        </Button>
        
        {journeys.map((journey) => (
          <Button
            key={journey.id}
            variant={selectedJourney === journey.id ? 'default' : 'outline'}
            onClick={() => onJourneySelect(journey.id)}
            className="flex items-center gap-2"
            style={selectedJourney === journey.id ? { 
              backgroundColor: currentTheme.colors.primary,
              color: 'white'
            } : {}}
          >
            <span className="text-lg">{journey.icon}</span>
            <div className="text-left">
              <div className="font-medium">{journey.title}</div>
              <div className="text-xs opacity-75">{journey.description}</div>
            </div>
          </Button>
        ))}
      </div>

      {selectedJourney && (
        <div className="text-center">
          <Badge 
            variant="outline"
            className="text-sm px-4 py-2"
            style={{ 
              borderColor: currentTheme.colors.primary,
              color: currentTheme.colors.primary
            }}
          >
            Showing services perfect for: {journeys.find(j => j.id === selectedJourney)?.title}
          </Badge>
        </div>
      )}
    </div>
  );
};

export default UserJourneyFilter;
