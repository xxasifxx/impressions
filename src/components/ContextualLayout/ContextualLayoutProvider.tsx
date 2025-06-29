/**
 * Contextual Layout Provider
 * 
 * Applies professional visual vocabularies based on beauty service context
 * and cognitive load assessment. Integrates with existing aesthetic evolution.
 */

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { ProfessionalContext, VisualComplexityLevel } from '../../types/VisualEvolutionTypes';
import { CONTEXTUAL_VISUAL_LANGUAGES, ContextualVisualLanguage, VisualVocabulary } from '../../styles/ContextualVisualLanguage';
import { useAestheticEvolution } from '../../hooks/useAestheticEvolution';

interface ContextualLayoutState {
  currentContext: ProfessionalContext;
  visualLanguage: ContextualVisualLanguage;
  adaptedVocabulary: VisualVocabulary;
  visualComplexity: VisualComplexityLevel;
  isTransitioning: boolean;
}

interface ContextualLayoutContextType {
  state: ContextualLayoutState;
  setContext: (context: ProfessionalContext) => void;
  setVisualComplexity: (complexity: VisualComplexityLevel) => void;
  applyContextualStyling: (element: HTMLElement) => void;
  getContextualCSS: () => Record<string, string>;
}

const ContextualLayoutContext = createContext<ContextualLayoutContextType | null>(null);

interface ContextualLayoutProviderProps {
  children: ReactNode;
  initialContext?: ProfessionalContext;
  enableTransitions?: boolean;
  transitionDuration?: number;
}

export const ContextualLayoutProvider: React.FC<ContextualLayoutProviderProps> = ({
  children,
  initialContext = 'sophisticated',
  enableTransitions = true,
  transitionDuration = 600
}) => {
  const { evolution } = useAestheticEvolution();
  
  const [state, setState] = useState<ContextualLayoutState>(() => {
    const initialLanguage = CONTEXTUAL_VISUAL_LANGUAGES[initialContext];
    return {
      currentContext: initialContext,
      visualLanguage: initialLanguage,
      adaptedVocabulary: initialLanguage.vocabulary,
      visualComplexity: 'balanced',
      isTransitioning: false
    };
  });

  /**
   * Set professional context and update visual language
   */
  const setContext = (context: ProfessionalContext) => {
    if (context === state.currentContext) return;

    setState(prev => ({
      ...prev,
      isTransitioning: enableTransitions,
      currentContext: context,
      visualLanguage: CONTEXTUAL_VISUAL_LANGUAGES[context]
    }));

    // Update adapted vocabulary based on current visual complexity
    updateAdaptedVocabulary(context, state.visualComplexity);

    if (enableTransitions) {
      setTimeout(() => {
        setState(prev => ({ ...prev, isTransitioning: false }));
      }, transitionDuration);
    }
  };

  /**
   * Set visual complexity and adapt vocabulary accordingly
   */
  const setVisualComplexity = (complexity: VisualComplexityLevel) => {
    if (complexity === state.visualComplexity) return;

    setState(prev => ({
      ...prev,
      visualComplexity: complexity,
      isTransitioning: enableTransitions
    }));

    updateAdaptedVocabulary(state.currentContext, complexity);

    if (enableTransitions) {
      setTimeout(() => {
        setState(prev => ({ ...prev, isTransitioning: false }));
      }, transitionDuration);
    }
  };

  /**
   * Update adapted vocabulary based on context and complexity
   */
  const updateAdaptedVocabulary = (context: ProfessionalContext, complexity: VisualComplexityLevel) => {
    const baseLanguage = CONTEXTUAL_VISUAL_LANGUAGES[context];
    const adaptation = baseLanguage.cognitiveLoadAdaptation[complexity];
    
    const adaptedVocabulary: VisualVocabulary = {
      ...baseLanguage.vocabulary,
      ...adaptation
    };

    setState(prev => ({
      ...prev,
      adaptedVocabulary
    }));
  };

  /**
   * Apply contextual styling to DOM element
   */
  const applyContextualStyling = (element: HTMLElement) => {
    const cssProperties = getContextualCSS();
    
    Object.entries(cssProperties).forEach(([property, value]) => {
      element.style.setProperty(property, value);
    });
  };

  /**
   * Get CSS custom properties for current contextual styling
   */
  const getContextualCSS = (): Record<string, string> => {
    const { adaptedVocabulary, visualLanguage } = state;
    
    return {
      // Shape properties
      '--contextual-border-radius-small': `${adaptedVocabulary.shapes.borderRadius.small}px`,
      '--contextual-border-radius-medium': `${adaptedVocabulary.shapes.borderRadius.medium}px`,
      '--contextual-border-radius-large': `${adaptedVocabulary.shapes.borderRadius.large}px`,
      '--contextual-shape-primary': adaptedVocabulary.shapes.primary,
      '--contextual-shape-secondary': adaptedVocabulary.shapes.secondary,
      
      // Texture properties
      '--contextual-surface': adaptedVocabulary.textures.surface,
      '--contextual-depth': adaptedVocabulary.textures.depth,
      '--contextual-finish': adaptedVocabulary.textures.finish,
      
      // Rhythm properties
      '--contextual-pacing': adaptedVocabulary.rhythm.pacing,
      '--contextual-spacing': adaptedVocabulary.rhythm.spacing,
      '--contextual-grouping': adaptedVocabulary.rhythm.grouping,
      
      // Precision properties
      '--contextual-alignment': adaptedVocabulary.precision.alignment,
      '--contextual-consistency': adaptedVocabulary.precision.consistency,
      '--contextual-detailing': adaptedVocabulary.precision.detailing,
      
      // Color approach properties
      '--contextual-palette': adaptedVocabulary.colorApproach.palette,
      '--contextual-saturation': adaptedVocabulary.colorApproach.saturation,
      '--contextual-contrast': adaptedVocabulary.colorApproach.contrast,
      '--contextual-temperature': adaptedVocabulary.colorApproach.temperature,
      
      // Context metadata
      '--contextual-context': visualLanguage.context,
      '--contextual-visual-complexity': state.visualComplexity,
      '--contextual-functional-purpose': visualLanguage.functionalPurpose,
      
      // Transition properties
      '--contextual-transition-duration': enableTransitions ? `${transitionDuration}ms` : '0ms',
      '--contextual-is-transitioning': state.isTransitioning ? '1' : '0'
    };
  };

  // Apply CSS custom properties to document root
  useEffect(() => {
    const cssProperties = getContextualCSS();
    const root = document.documentElement;
    
    Object.entries(cssProperties).forEach(([property, value]) => {
      root.style.setProperty(property, value);
    });
  }, [state, enableTransitions, transitionDuration]);

  // Auto-detect context from service category in aesthetic evolution
  useEffect(() => {
    if (evolution.currentState.serviceCategory) {
      const contextMapping: Record<string, ProfessionalContext> = {
        'hair': 'sophisticated',
        'makeup': 'artistic',
        'skincare': 'clinical',
        'wellness': 'wellness',
        'brows': 'precision',
        'lashes': 'dramatic',
        'natural': 'natural',
        'luxury': 'luxury'
      };
      
      const detectedContext = contextMapping[evolution.currentState.serviceCategory];
      if (detectedContext && detectedContext !== state.currentContext) {
        setContext(detectedContext);
      }
    }
  }, [evolution.currentState.serviceCategory]);

  const contextValue: ContextualLayoutContextType = {
    state,
    setContext,
    setVisualComplexity,
    applyContextualStyling,
    getContextualCSS
  };

  return (
    <ContextualLayoutContext.Provider value={contextValue}>
      {children}
    </ContextualLayoutContext.Provider>
  );
};

/**
 * Hook to use contextual layout functionality
 */
export const useContextualLayout = (): ContextualLayoutContextType => {
  const context = useContext(ContextualLayoutContext);
  if (!context) {
    throw new Error('useContextualLayout must be used within a ContextualLayoutProvider');
  }
  return context;
};

/**
 * Hook to get contextual styling for specific elements
 */
export const useContextualStyling = (elementRef: React.RefObject<HTMLElement>) => {
  const { applyContextualStyling, state } = useContextualLayout();
  
  useEffect(() => {
    if (elementRef.current) {
      applyContextualStyling(elementRef.current);
    }
  }, [state.adaptedVocabulary, state.isTransitioning]);
  
  return {
    contextualCSS: state.adaptedVocabulary,
    isTransitioning: state.isTransitioning,
    currentContext: state.currentContext,
    visualComplexity: state.visualComplexity
  };
};

