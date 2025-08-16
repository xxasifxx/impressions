/**
 * useAestheticEvolution Hook - React integration for aesthetic evolution system
 * 
 * Provides React components with access to aesthetic evolution state and controls.
 * Handles integration with Agent B's emotional detection and smooth transitions.
 */

import { useState, useEffect, useCallback, useRef } from 'react';
import { AestheticEvolutionEngine } from '../engine/AestheticEvolutionEngine';
import { 
  AestheticEvolution, 
  EmotionalState, 
  AestheticState,
  AestheticEvolutionConfig 
} from '../types/AestheticTypes';
import { ParsedUserInput } from '../engine/SmartSearchEngine';
import { ConsultationResponse } from '../data/models/ConsultationTypes';

export interface UseAestheticEvolutionOptions {
  config?: Partial<AestheticEvolutionConfig>;
  enableAutoTransitions?: boolean;
  onStateChange?: (evolution: AestheticEvolution) => void;
  onTransitionComplete?: (finalState: AestheticState) => void;
}

export interface AestheticEvolutionControls {
  // Current state
  evolution: AestheticEvolution;
  currentState: AestheticState;
  isTransitioning: boolean;
  transitionProgress: number;
  
  // Control methods
  processEmotionalContext: (parsedInput: ParsedUserInput, progress?: number) => void;
  processConsultationResponse: (response: ConsultationResponse, progress: number) => void;
  evolveToState: (state: EmotionalState, reason?: string) => void;
  triggerCelebratoryState: (reason?: string) => void;
  reset: () => void;
  
  // CSS class helpers
  getStateClassName: () => string;
  getServiceClassName: (serviceCategory?: string) => string;
  getMoodClassName: (mood?: string) => string;
  getTransitionClassName: () => string;
  
  // State history for debugging
  getStateHistory: () => Array<{ state: EmotionalState; timestamp: number; reason: string }>;
}

export function useAestheticEvolution(
  options: UseAestheticEvolutionOptions = {}
): AestheticEvolutionControls {
  const {
    config = {},
    enableAutoTransitions = true,
    onStateChange,
    onTransitionComplete
  } = options;

  // Initialize evolution engine
  const engineRef = useRef<AestheticEvolutionEngine>();
  if (!engineRef.current) {
    engineRef.current = new AestheticEvolutionEngine(config);
  }

  // State management
  const [evolution, setEvolution] = useState<AestheticEvolution>(
    () => engineRef.current!.getCurrentEvolution()
  );

  // Animation frame for smooth transitions
  const animationFrameRef = useRef<number>();
  const transitionStartTimeRef = useRef<number>();

  // Update transition progress with smooth animation
  const updateTransitionProgress = useCallback(() => {
    if (!evolution.isTransitioning || !transitionStartTimeRef.current) {
      return;
    }

    const elapsed = Date.now() - transitionStartTimeRef.current;
    const duration = evolution.currentState.effects.animationDuration 
      ? parseFloat(evolution.currentState.effects.animationDuration) * 1000 
      : 600;
    
    const progress = Math.min(1, elapsed / duration);
    
    const updatedEvolution = engineRef.current!.updateTransitionProgress(progress);
    setEvolution(updatedEvolution);

    if (progress < 1) {
      animationFrameRef.current = requestAnimationFrame(updateTransitionProgress);
    } else {
      // Transition complete
      onTransitionComplete?.(updatedEvolution.currentState);
    }
  }, [evolution.isTransitioning, onTransitionComplete]);

  // Start transition animation when state changes
  useEffect(() => {
    if (evolution.isTransitioning && !animationFrameRef.current) {
      transitionStartTimeRef.current = Date.now();
      animationFrameRef.current = requestAnimationFrame(updateTransitionProgress);
    }

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = undefined;
      }
    };
  }, [evolution.isTransitioning, updateTransitionProgress]);

  // Notify state changes
  useEffect(() => {
    onStateChange?.(evolution);
  }, [evolution, onStateChange]);

  // Control methods
  const processEmotionalContext = useCallback((
    parsedInput: ParsedUserInput, 
    progress: number = 0
  ) => {
    if (!enableAutoTransitions) return;
    
    const newEvolution = engineRef.current!.processEmotionalContext(parsedInput, progress);
    setEvolution(newEvolution);
  }, [enableAutoTransitions]);

  const processConsultationResponse = useCallback((
    response: ConsultationResponse,
    progress: number
  ) => {
    if (!enableAutoTransitions) return;
    
    const newEvolution = engineRef.current!.processConsultationResponse(response, progress);
    setEvolution(newEvolution);
  }, [enableAutoTransitions]);

  const evolveToState = useCallback((
    state: EmotionalState,
    reason: string = 'Manual trigger'
  ) => {
    const newEvolution = engineRef.current!.evolveToState(state, reason);
    setEvolution(newEvolution);
  }, []);

  const triggerCelebratoryState = useCallback((reason: string = 'Cart action') => {
    const newEvolution = engineRef.current!.triggerCelebratoryState(reason);
    setEvolution(newEvolution);
  }, []);

  const reset = useCallback(() => {
    const newEvolution = engineRef.current!.reset();
    setEvolution(newEvolution);
  }, []);

  // CSS class helpers
  const getStateClassName = useCallback((): string => {
    return `aesthetic-state-${evolution.currentState.emotionalState}`;
  }, [evolution.currentState.emotionalState]);

  const getServiceClassName = useCallback((serviceCategory?: string): string => {
    if (!serviceCategory) return '';
    return `aesthetic-service-${serviceCategory}`;
  }, []);

  const getMoodClassName = useCallback((mood?: string): string => {
    if (!mood) return '';
    return `aesthetic-mood-${mood}`;
  }, []);

  const getTransitionClassName = useCallback((): string => {
    return evolution.isTransitioning ? 'aesthetic-transitioning' : '';
  }, [evolution.isTransitioning]);

  const getStateHistory = useCallback(() => {
    return engineRef.current!.getStateHistory();
  }, []);

  return {
    // Current state
    evolution,
    currentState: evolution.currentState,
    isTransitioning: evolution.isTransitioning,
    transitionProgress: evolution.transitionProgress,
    
    // Control methods
    processEmotionalContext,
    processConsultationResponse,
    evolveToState,
    triggerCelebratoryState,
    reset,
    
    // CSS class helpers
    getStateClassName,
    getServiceClassName,
    getMoodClassName,
    getTransitionClassName,
    
    // Debug helpers
    getStateHistory
  };
}

/**
 * Hook for applying aesthetic evolution styles to DOM elements
 */
export function useAestheticStyles(
  evolution: AestheticEvolution,
  serviceCategory?: string,
  mood?: string
): {
  className: string;
  style: React.CSSProperties;
} {
  const className = [
    `aesthetic-state-${evolution.currentState.emotionalState}`,
    serviceCategory ? `aesthetic-service-${serviceCategory}` : '',
    mood ? `aesthetic-mood-${mood}` : '',
    evolution.isTransitioning ? 'aesthetic-transitioning' : ''
  ].filter(Boolean).join(' ');

  // Convert aesthetic state to CSS custom properties
  const style: React.CSSProperties = {
    '--aesthetic-color-primary': evolution.currentState.colors.primary,
    '--aesthetic-color-secondary': evolution.currentState.colors.secondary,
    '--aesthetic-color-accent': evolution.currentState.colors.accent,
    '--aesthetic-color-background': evolution.currentState.colors.background,
    '--aesthetic-color-surface': evolution.currentState.colors.surface,
    '--aesthetic-color-text': evolution.currentState.colors.text,
    '--aesthetic-color-text-secondary': evolution.currentState.colors.textSecondary,
    
    '--aesthetic-font-weight-heading': evolution.currentState.typography.headingWeight,
    '--aesthetic-font-size-heading': evolution.currentState.typography.headingSize,
    '--aesthetic-font-size-body': evolution.currentState.typography.bodySize,
    '--aesthetic-letter-spacing': evolution.currentState.typography.letterSpacing,
    '--aesthetic-line-height': evolution.currentState.typography.lineHeight,
    
    '--aesthetic-container-padding': evolution.currentState.spacing.containerPadding,
    '--aesthetic-element-gap': evolution.currentState.spacing.elementGap,
    '--aesthetic-border-radius': evolution.currentState.spacing.borderRadius,
    
    '--aesthetic-animation-duration': evolution.currentState.effects.animationDuration,
    '--aesthetic-animation-easing': evolution.currentState.effects.animationEasing,
    
    '--aesthetic-max-width': evolution.currentState.layout.maxWidth,
    '--aesthetic-vertical-spacing': evolution.currentState.layout.verticalSpacing === 'compact' ? '1.2rem' : 
                                   evolution.currentState.layout.verticalSpacing === 'spacious' ? '2rem' : '1.6rem'
  } as React.CSSProperties;

  return { className, style };
}

/**
 * Hook for debugging aesthetic evolution
 */
export function useAestheticDebug(evolution: AestheticEvolution) {
  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      console.log('🎨 Aesthetic Evolution State:', {
        currentState: evolution.currentState.emotionalState,
        isTransitioning: evolution.isTransitioning,
        transitionProgress: evolution.transitionProgress,
        colors: evolution.currentState.colors,
        typography: evolution.currentState.typography
      });
    }
  }, [evolution]);

  return {
    logCurrentState: () => console.log('Current Aesthetic State:', evolution),
    logStateHistory: (getHistory: () => any[]) => console.log('State History:', getHistory())
  };
}

