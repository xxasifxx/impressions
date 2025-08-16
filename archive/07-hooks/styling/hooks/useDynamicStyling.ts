import { useMemo } from 'react';
import { ArtEvolutionManager, DynamicStyleContext } from '@/utils/artEvolution';
import { ArtEvolutionState } from '@/data/models';

export interface UseDynamicStylingOptions {
  baseClasses?: string;
  intensityMultiplier?: number;
  enableTransitions?: boolean;
}

export interface DynamicStylingResult {
  styleContext: DynamicStyleContext;
  className: string;
  inlineStyles: React.CSSProperties;
  cssVariables: Record<string, string>;
}

export const useDynamicStyling = (
  artEvolution: ArtEvolutionState,
  options: UseDynamicStylingOptions = {}
): DynamicStylingResult => {
  const {
    baseClasses = '',
    intensityMultiplier = 1,
    enableTransitions = true
  } = options;

  const result = useMemo(() => {
    const styleContext = ArtEvolutionManager.generateStyleContext(artEvolution);
    
    // Apply intensity multiplier
    const adjustedIntensity = styleContext.intensity * intensityMultiplier;
    
    // Generate dynamic className
    const dynamicClasses = [
      baseClasses,
      `theme-${styleContext.theme}`,
      `intensity-${Math.round(adjustedIntensity)}`,
      enableTransitions ? styleContext.transitionClass : ''
    ].filter(Boolean).join(' ');

    // Generate inline styles
    const inlineStyles: React.CSSProperties = {
      backgroundColor: styleContext.colorPalette[0],
      borderColor: styleContext.colorPalette[1],
      color: styleContext.customProperties['--text-color'],
      borderRadius: styleContext.customProperties['--border-radius'],
      transition: enableTransitions ? 'all 0.3s ease-in-out' : undefined,
      transform: adjustedIntensity > 2 ? `scale(${1 + (adjustedIntensity - 2) * 0.02})` : undefined,
      boxShadow: adjustedIntensity > 1.5 ? 
        `0 ${adjustedIntensity * 4}px ${adjustedIntensity * 8}px -${adjustedIntensity * 2}px rgba(0, 0, 0, ${adjustedIntensity * 0.1})` : 
        undefined
    };

    // CSS custom properties for advanced styling
    const cssVariables = {
      ...styleContext.customProperties,
      '--adjusted-intensity': adjustedIntensity.toString()
    };

    return {
      styleContext: {
        ...styleContext,
        intensity: adjustedIntensity
      },
      className: dynamicClasses,
      inlineStyles,
      cssVariables
    };
  }, [artEvolution, baseClasses, intensityMultiplier, enableTransitions]);

  return result;
};

// Hook for container-specific styling
export const useContainerStyling = (
  artEvolution: ArtEvolutionState,
  containerType: 'service' | 'product' | 'consultation' | 'bundle',
  displayMode?: string
) => {
  const baseClasses = useMemo(() => {
    const base = 'rounded-lg border shadow-sm';
    
    switch (containerType) {
      case 'service':
        return `${base} bg-white hover:shadow-md`;
      case 'product':
        return `${base} bg-white hover:shadow-md`;
      case 'consultation':
        return `${base} bg-gradient-to-br from-white to-gray-50`;
      case 'bundle':
        return `${base} bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200`;
      default:
        return base;
    }
  }, [containerType]);

  const intensityMultiplier = useMemo(() => {
    switch (containerType) {
      case 'consultation':
        return 1.2; // Consultation nodes should be more visually prominent
      case 'bundle':
        return 1.1; // Bundle containers slightly enhanced
      default:
        return 1;
    }
  }, [containerType]);

  return useDynamicStyling(artEvolution, {
    baseClasses,
    intensityMultiplier,
    enableTransitions: true
  });
};

