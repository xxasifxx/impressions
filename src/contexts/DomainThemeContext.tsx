
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { DomainType, getDomainTheme, DomainTheme } from '@/utils/domainThemes';

interface DomainThemeContextType {
  currentDomain: DomainType;
  currentTheme: DomainTheme;
  switchDomain: (domain: DomainType) => void;
}

const DomainThemeContext = createContext<DomainThemeContextType | undefined>(undefined);

export const useDomainTheme = () => {
  const context = useContext(DomainThemeContext);
  if (!context) {
    throw new Error('useDomainTheme must be used within a DomainThemeProvider');
  }
  return context;
};

interface DomainThemeProviderProps {
  children: ReactNode;
}

export const DomainThemeProvider = ({ children }: DomainThemeProviderProps) => {
  const [currentDomain, setCurrentDomain] = useState<DomainType>('hair-salon');
  const currentTheme = getDomainTheme(currentDomain);

  const switchDomain = (domain: DomainType) => {
    setCurrentDomain(domain);
  };

  return (
    <DomainThemeContext.Provider value={{ currentDomain, currentTheme, switchDomain }}>
      {children}
    </DomainThemeContext.Provider>
  );
};
