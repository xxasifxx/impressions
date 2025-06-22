import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
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

// Helper function to get domain from URL parameters
const getDomainFromURL = (): DomainType => {
  if (typeof window === 'undefined') return 'hair-salon'; // SSR fallback
  
  const urlParams = new URLSearchParams(window.location.search);
  const domainParam = urlParams.get('domain') as DomainType;
  
  // Validate domain parameter
  const validDomains: DomainType[] = ['hair-salon', 'makeup-studio', 'med-spa'];
  if (domainParam && validDomains.includes(domainParam)) {
    return domainParam;
  }
  
  return 'hair-salon'; // Default fallback
};

export const DomainThemeProvider = ({ children }: DomainThemeProviderProps) => {
  const [currentDomain, setCurrentDomain] = useState<DomainType>(getDomainFromURL());
  const currentTheme = getDomainTheme(currentDomain);

  // Update domain when URL changes
  useEffect(() => {
    const handleURLChange = () => {
      const newDomain = getDomainFromURL();
      setCurrentDomain(newDomain);
    };

    // Listen for popstate events (back/forward navigation)
    window.addEventListener('popstate', handleURLChange);
    
    return () => {
      window.removeEventListener('popstate', handleURLChange);
    };
  }, []);

  const switchDomain = (domain: DomainType) => {
    setCurrentDomain(domain);
    
    // Update URL without page reload
    const url = new URL(window.location.href);
    url.searchParams.set('domain', domain);
    window.history.pushState({}, '', url.toString());
  };

  return (
    <DomainThemeContext.Provider value={{ currentDomain, currentTheme, switchDomain }}>
      {children}
    </DomainThemeContext.Provider>
  );
};
