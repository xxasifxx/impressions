/**
 * AestheticProvider - Context provider for aesthetic evolution system
 * 
 * Wraps consultation modal components and provides aesthetic evolution
 * state and controls throughout the component tree.
 */

import React, { createContext, useContext, useEffect, ReactNode } from 'react';
import { useAestheticEvolution, AestheticEvolutionControls, UseAestheticEvolutionOptions } from '../../hooks/useAestheticEvolution';
import { AestheticEvolution, AestheticState } from '../../types/AestheticTypes';
import { ParsedUserInput } from '../../engine/SmartSearchEngine';
import { ConsultationResponse } from '../../data/models/ConsultationTypes';

// Import aesthetic tokens CSS
import '../../styles/aesthetic-tokens.css';

interface AestheticContextValue extends AestheticEvolutionControls {
  // Additional context-specific methods
  applyToElement: (element: HTMLElement, serviceCategory?: string, mood?: string) => void;
  removeFromElement: (element: HTMLElement) => void;
}

const AestheticContext = createContext<AestheticContextValue | null>(null);

export interface AestheticProviderProps {
  children: ReactNode;
  options?: UseAestheticEvolutionOptions;
  
  // Integration props
  consultationProgress?: number;
  currentServiceCategory?: string;
  currentMood?: string;
  
  // Event handlers
  onAestheticChange?: (evolution: AestheticEvolution) => void;
  onTransitionComplete?: (finalState: AestheticState) => void;
}

export function AestheticProvider({
  children,
  options = {},
  consultationProgress = 0,
  currentServiceCategory,
  currentMood,
  onAestheticChange,
  onTransitionComplete
}: AestheticProviderProps) {
  
  // Initialize aesthetic evolution
  const aestheticControls = useAestheticEvolution({
    ...options,
    onStateChange: (evolution) => {
      onAestheticChange?.(evolution);
      options.onStateChange?.(evolution);
    },
    onTransitionComplete: (finalState) => {
      onTransitionComplete?.(finalState);
      options.onTransitionComplete?.(finalState);
    }
  });

  // Apply aesthetic classes to document root for global theming
  useEffect(() => {
    const root = document.documentElement;
    
    // Remove existing aesthetic classes
    root.classList.forEach(className => {
      if (className.startsWith('aesthetic-')) {
        root.classList.remove(className);
      }
    });

    // Apply current aesthetic classes
    const stateClass = aestheticControls.getStateClassName();
    const serviceClass = aestheticControls.getServiceClassName(currentServiceCategory);
    const moodClass = aestheticControls.getMoodClassName(currentMood);
    const transitionClass = aestheticControls.getTransitionClassName();

    [stateClass, serviceClass, moodClass, transitionClass]
      .filter(Boolean)
      .forEach(className => root.classList.add(className));

    // Cleanup on unmount
    return () => {
      [stateClass, serviceClass, moodClass, transitionClass]
        .filter(Boolean)
        .forEach(className => root.classList.remove(className));
    };
  }, [
    aestheticControls.evolution.currentState.emotionalState,
    aestheticControls.isTransitioning,
    currentServiceCategory,
    currentMood
  ]);

  // Helper methods for direct DOM manipulation
  const applyToElement = (
    element: HTMLElement, 
    serviceCategory?: string, 
    mood?: string
  ) => {
    // Remove existing aesthetic classes
    element.classList.forEach(className => {
      if (className.startsWith('aesthetic-')) {
        element.classList.remove(className);
      }
    });

    // Apply current aesthetic classes
    const classes = [
      aestheticControls.getStateClassName(),
      aestheticControls.getServiceClassName(serviceCategory || currentServiceCategory),
      aestheticControls.getMoodClassName(mood || currentMood),
      aestheticControls.getTransitionClassName()
    ].filter(Boolean);

    element.classList.add(...classes);

    // Apply CSS custom properties
    const state = aestheticControls.currentState;
    const style = element.style;
    
    style.setProperty('--aesthetic-color-primary', state.colors.primary);
    style.setProperty('--aesthetic-color-secondary', state.colors.secondary);
    style.setProperty('--aesthetic-color-accent', state.colors.accent);
    style.setProperty('--aesthetic-color-background', state.colors.background);
    style.setProperty('--aesthetic-color-surface', state.colors.surface);
    style.setProperty('--aesthetic-color-text', state.colors.text);
    style.setProperty('--aesthetic-color-text-secondary', state.colors.textSecondary);
    
    style.setProperty('--aesthetic-font-weight-heading', state.typography.headingWeight.toString());
    style.setProperty('--aesthetic-font-size-heading', state.typography.headingSize);
    style.setProperty('--aesthetic-font-size-body', state.typography.bodySize);
    style.setProperty('--aesthetic-letter-spacing', state.typography.letterSpacing);
    style.setProperty('--aesthetic-line-height', state.typography.lineHeight.toString());
    
    style.setProperty('--aesthetic-container-padding', state.spacing.containerPadding);
    style.setProperty('--aesthetic-element-gap', state.spacing.elementGap);
    style.setProperty('--aesthetic-border-radius', state.spacing.borderRadius);
    
    style.setProperty('--aesthetic-animation-duration', state.effects.animationDuration);
    style.setProperty('--aesthetic-animation-easing', state.effects.animationEasing);
    
    style.setProperty('--aesthetic-max-width', state.layout.maxWidth);
  };

  const removeFromElement = (element: HTMLElement) => {
    // Remove aesthetic classes
    element.classList.forEach(className => {
      if (className.startsWith('aesthetic-')) {
        element.classList.remove(className);
      }
    });

    // Remove CSS custom properties
    const style = element.style;
    const propertiesToRemove = [
      '--aesthetic-color-primary',
      '--aesthetic-color-secondary', 
      '--aesthetic-color-accent',
      '--aesthetic-color-background',
      '--aesthetic-color-surface',
      '--aesthetic-color-text',
      '--aesthetic-color-text-secondary',
      '--aesthetic-font-weight-heading',
      '--aesthetic-font-size-heading',
      '--aesthetic-font-size-body',
      '--aesthetic-letter-spacing',
      '--aesthetic-line-height',
      '--aesthetic-container-padding',
      '--aesthetic-element-gap',
      '--aesthetic-border-radius',
      '--aesthetic-animation-duration',
      '--aesthetic-animation-easing',
      '--aesthetic-max-width'
    ];

    propertiesToRemove.forEach(property => {
      style.removeProperty(property);
    });
  };

  const contextValue: AestheticContextValue = {
    ...aestheticControls,
    applyToElement,
    removeFromElement
  };

  return (
    <AestheticContext.Provider value={contextValue}>
      {children}
    </AestheticContext.Provider>
  );
}

/**
 * Hook to access aesthetic evolution context
 */
export function useAestheticContext(): AestheticContextValue {
  const context = useContext(AestheticContext);
  
  if (!context) {
    throw new Error('useAestheticContext must be used within an AestheticProvider');
  }
  
  return context;
}

/**
 * Higher-order component for aesthetic evolution
 */
export function withAestheticEvolution<P extends object>(
  Component: React.ComponentType<P>,
  options?: {
    serviceCategory?: string;
    mood?: string;
    autoApplyStyles?: boolean;
  }
) {
  const WrappedComponent = (props: P) => {
    const aesthetic = useAestheticContext();
    const elementRef = React.useRef<HTMLDivElement>(null);

    // Auto-apply styles if enabled
    useEffect(() => {
      if (options?.autoApplyStyles && elementRef.current) {
        aesthetic.applyToElement(
          elementRef.current,
          options.serviceCategory,
          options.mood
        );
      }

      return () => {
        if (options?.autoApplyStyles && elementRef.current) {
          aesthetic.removeFromElement(elementRef.current);
        }
      };
    }, [aesthetic.evolution.currentState, options?.serviceCategory, options?.mood]);

    const enhancedProps = {
      ...props,
      aesthetic,
      aestheticRef: elementRef
    } as P & {
      aesthetic: AestheticContextValue;
      aestheticRef: React.RefObject<HTMLDivElement>;
    };

    return options?.autoApplyStyles ? (
      <div ref={elementRef}>
        <Component {...enhancedProps} />
      </div>
    ) : (
      <Component {...enhancedProps} />
    );
  };

  WrappedComponent.displayName = `withAestheticEvolution(${Component.displayName || Component.name})`;
  
  return WrappedComponent;
}

/**
 * Component for debugging aesthetic evolution
 */
export function AestheticDebugPanel() {
  const aesthetic = useAestheticContext();

  if (process.env.NODE_ENV !== 'development') {
    return null;
  }

  return (
    <div style={{
      position: 'fixed',
      top: '10px',
      right: '10px',
      background: 'rgba(0, 0, 0, 0.8)',
      color: 'white',
      padding: '10px',
      borderRadius: '5px',
      fontSize: '12px',
      fontFamily: 'monospace',
      zIndex: 9999,
      maxWidth: '300px'
    }}>
      <h4>🎨 Aesthetic Evolution Debug</h4>
      <div>State: {aesthetic.currentState.emotionalState}</div>
      <div>Transitioning: {aesthetic.isTransitioning ? 'Yes' : 'No'}</div>
      <div>Progress: {Math.round(aesthetic.transitionProgress * 100)}%</div>
      <div>Primary Color: {aesthetic.currentState.colors.primary}</div>
      <div>Accent Color: {aesthetic.currentState.colors.accent}</div>
      
      <div style={{ marginTop: '10px' }}>
        <button onClick={() => aesthetic.evolveToState('uncertain')}>Uncertain</button>
        <button onClick={() => aesthetic.evolveToState('exploring')}>Exploring</button>
        <button onClick={() => aesthetic.evolveToState('engaged')}>Engaged</button>
        <button onClick={() => aesthetic.evolveToState('confident')}>Confident</button>
        <button onClick={() => aesthetic.triggerCelebratoryState()}>Celebrate</button>
      </div>
    </div>
  );
}

