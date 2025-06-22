import React from 'react';
import { useDomainTheme } from '@/contexts/DomainThemeContext';
import { DomainType, domainThemes } from '@/utils/domainThemes';
import { Scissors, Palette, Sparkles } from 'lucide-react';

const IntegratedDomainTabs = () => {
  const { currentTheme, currentDomain, switchDomain } = useDomainTheme();

  const tabIcons = {
    'hair-salon': Scissors,
    'makeup-studio': Palette,
    'med-spa': Sparkles
  };

  const handleTabClick = (domain: DomainType) => {
    switchDomain(domain);
  };

  return (
    <>
      <div className="flex justify-center mb-12">
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-3 shadow-xl border border-white/30">
          <div className="flex gap-3">
            {Object.values(domainThemes).map((theme) => {
              const Icon = tabIcons[theme.id];
              const isActive = currentDomain === theme.id;
              
              return (
                <button
                  key={theme.id}
                  onClick={() => handleTabClick(theme.id as DomainType)}
                  className={`group flex items-center gap-4 px-8 py-4 rounded-xl font-medium transition-all duration-300 hover:shadow-lg hover:scale-105 ${
                    isActive 
                      ? 'bg-white shadow-lg text-stone-900 scale-105' 
                      : 'hover:bg-white text-stone-700 hover:text-stone-900'
                  }`}
                >
                  <Icon className="w-6 h-6 group-hover:scale-110 transition-transform" />
                  <div className="text-left">
                    <div className="font-semibold text-lg">{theme.name}</div>
                    <div className="text-xs opacity-70">
                      {isActive ? 'Currently Active' : 'Switch Domain'}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default IntegratedDomainTabs;
