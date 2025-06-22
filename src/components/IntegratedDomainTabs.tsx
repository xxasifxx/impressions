
import React, { useState } from 'react';
import { useDomainTheme } from '@/contexts/DomainThemeContext';
import { DomainType, domainThemes } from '@/utils/domainThemes';
import { getServicesByDomain } from '@/data/unifiedServicesData';
import { Scissors, Palette, Sparkles } from 'lucide-react';
import DomainModal from './DomainModal';

const IntegratedDomainTabs = () => {
  const { currentTheme } = useDomainTheme();
  const [activeModal, setActiveModal] = useState<DomainType | null>(null);

  const tabIcons = {
    'hair-salon': Scissors,
    'makeup-studio': Palette,
    'med-spa': Sparkles
  };

  const handleTabClick = (domain: DomainType) => {
    setActiveModal(domain);
  };

  return (
    <>
      <div className="flex justify-center mb-12">
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-3 shadow-xl border border-white/30">
          <div className="flex gap-3">
            {Object.values(domainThemes).map((theme) => {
              const Icon = tabIcons[theme.id];
              
              return (
                <button
                  key={theme.id}
                  onClick={() => handleTabClick(theme.id as DomainType)}
                  className="group flex items-center gap-4 px-8 py-4 rounded-xl font-medium transition-all duration-300 hover:bg-white hover:shadow-lg hover:scale-105 text-stone-700 hover:text-stone-900"
                >
                  <Icon className="w-6 h-6 group-hover:scale-110 transition-transform" />
                  <div className="text-left">
                    <div className="font-semibold text-lg">{theme.name}</div>
                    <div className="text-xs opacity-70">Explore Services</div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Domain Modals */}
      {Object.values(domainThemes).map((theme) => (
        <DomainModal
          key={theme.id}
          isOpen={activeModal === theme.id}
          onClose={() => setActiveModal(null)}
          domain={theme.id}
          services={getServicesByDomain(theme.id as DomainType)}
          theme={theme}
        />
      ))}
    </>
  );
};

export default IntegratedDomainTabs;
