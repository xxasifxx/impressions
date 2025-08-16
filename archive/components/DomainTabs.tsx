
import React from 'react';
import { useDomainTheme } from '@/contexts/DomainThemeContext';
import { DomainType, domainThemes } from '@/utils/domainThemes';
import { Scissors, Palette, Sparkles } from 'lucide-react';

const DomainTabs = () => {
  const { currentDomain, switchDomain } = useDomainTheme();

  const tabIcons = {
    'hair-salon': Scissors,
    'makeup-studio': Palette,
    'med-spa': Sparkles
  };

  return (
    <div className="flex justify-center mb-8">
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-2 shadow-lg border border-white/20">
        <div className="flex gap-2">
          {Object.values(domainThemes).map((theme) => {
            const Icon = tabIcons[theme.id];
            const isActive = currentDomain === theme.id;
            
            return (
              <button
                key={theme.id}
                onClick={() => switchDomain(theme.id as DomainType)}
                className={`
                  flex items-center gap-3 px-6 py-3 rounded-xl font-medium transition-all duration-300
                  ${isActive 
                    ? 'bg-white shadow-md text-stone-800 scale-105' 
                    : 'text-stone-600 hover:text-stone-800 hover:bg-white/50'
                  }
                `}
              >
                <Icon className={`w-5 h-5 ${isActive ? 'text-' + theme.colors.primary.replace('#', '') : ''}`} />
                <span className="hidden sm:inline">{theme.name}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default DomainTabs;
