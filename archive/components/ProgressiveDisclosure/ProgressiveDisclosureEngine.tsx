/**
 * Progressive Disclosure Engine
 * 
 * Intelligently reveals information based on user readiness, cognitive load,
 * and professional context. Prevents cognitive overload while ensuring users
 * can access deeper information when ready.
 */

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { CognitiveLoadEngine } from '../../engine/CognitiveLoadEngine';
import { useAestheticEvolution } from '../../hooks/useAestheticEvolution';
import { useContextualLayout } from '../ContextualLayout';
import { VisualComplexityLevel, ProfessionalContext } from '../../types/VisualEvolutionTypes';

export type DisclosureLevel = 'essential' | 'helpful' | 'detailed' | 'expert';
export type RevealStrategy = 'immediate' | 'on-demand' | 'progressive' | 'contextual';
export type RevealTrigger = 'engagement' | 'confidence' | 'time' | 'interaction' | 'request';

export interface InformationLayer {
  level: DisclosureLevel;
  content: ReactNode;
  triggerConditions: {
    engagementThreshold?: number; // 0-1
    confidenceLevel?: number; // 0-1
    timeSpent?: number; // seconds
    interactionDepth?: number; // number of interactions
    explicitRequest?: boolean;
  };
  revealAnimation?: {
    timing: 'instant' | 'quick' | 'smooth' | 'deliberate';
    direction: 'fade' | 'slide' | 'expand' | 'unfold';
    easing: string;
  };
  functionalPurpose: string; // Required by charter
}

export interface DisclosureContext {
  currentLevel: DisclosureLevel;
  availableLevels: DisclosureLevel[];
  revealedLevels: Set<DisclosureLevel>;
  userReadiness: {
    engagementLevel: number; // 0-1
    confidenceLevel: number; // 0-1
    timeSpent: number; // seconds
    interactionCount: number;
    cognitiveLoad: 'minimal' | 'low' | 'moderate' | 'high' | 'complex';
  };
  professionalContext: ProfessionalContext;
  visualComplexity: VisualComplexityLevel;
}

interface ProgressiveDisclosureContextType {
  context: DisclosureContext;
  revealLevel: (level: DisclosureLevel, trigger: RevealTrigger) => void;
  hideLevel: (level: DisclosureLevel) => void;
  canReveal: (level: DisclosureLevel) => boolean;
  getRevealStrategy: (level: DisclosureLevel) => RevealStrategy;
  updateUserReadiness: (updates: Partial<DisclosureContext['userReadiness']>) => void;
}

const ProgressiveDisclosureContext = createContext<ProgressiveDisclosureContextType | null>(null);

interface ProgressiveDisclosureProviderProps {
  children: ReactNode;
  initialLevel?: DisclosureLevel;
  strategy?: RevealStrategy;
  respectsCognitiveLoad?: boolean;
}

export const ProgressiveDisclosureProvider: React.FC<ProgressiveDisclosureProviderProps> = ({
  children,
  initialLevel = 'essential',
  strategy = 'progressive',
  respectsCognitiveLoad = true
}) => {
  const { evolution } = useAestheticEvolution();
  const { state: contextualState } = useContextualLayout();
  const cognitiveEngine = CognitiveLoadEngine.getInstance();

  const [context, setContext] = useState<DisclosureContext>(() => ({
    currentLevel: initialLevel,
    availableLevels: ['essential', 'helpful', 'detailed', 'expert'],
    revealedLevels: new Set([initialLevel]),
    userReadiness: {
      engagementLevel: 0.1,
      confidenceLevel: 0.1,
      timeSpent: 0,
      interactionCount: 0,
      cognitiveLoad: 'moderate'
    },
    professionalContext: contextualState.currentContext,
    visualComplexity: contextualState.visualComplexity
  }));

  /**
   * Determine if user is ready for a disclosure level
   */
  const canReveal = (level: DisclosureLevel): boolean => {
    const { userReadiness } = context;
    
    // Essential information is always available
    if (level === 'essential') return true;
    
    // Respect cognitive load - high load restricts disclosure
    if (respectsCognitiveLoad && userReadiness.cognitiveLoad === 'complex') {
      return level === 'essential';
    }
    if (respectsCognitiveLoad && userReadiness.cognitiveLoad === 'high') {
      return level === 'essential' || level === 'helpful';
    }

    // Progressive readiness requirements
    const requirements = {
      helpful: {
        engagementThreshold: 0.2,
        confidenceLevel: 0.1,
        timeSpent: 10,
        interactionCount: 2
      },
      detailed: {
        engagementThreshold: 0.4,
        confidenceLevel: 0.3,
        timeSpent: 30,
        interactionCount: 5
      },
      expert: {
        engagementThreshold: 0.7,
        confidenceLevel: 0.6,
        timeSpent: 60,
        interactionCount: 10
      }
    };

    const requirement = requirements[level as keyof typeof requirements];
    if (!requirement) return false;

    return (
      userReadiness.engagementLevel >= requirement.engagementThreshold &&
      userReadiness.confidenceLevel >= requirement.confidenceLevel &&
      userReadiness.timeSpent >= requirement.timeSpent &&
      userReadiness.interactionCount >= requirement.interactionCount
    );
  };

  /**
   * Reveal a disclosure level
   */
  const revealLevel = (level: DisclosureLevel, trigger: RevealTrigger) => {
    if (!canReveal(level)) {
      console.warn(`Progressive Disclosure: Cannot reveal ${level} - user not ready`);
      return;
    }

    setContext(prev => ({
      ...prev,
      currentLevel: level,
      revealedLevels: new Set([...prev.revealedLevels, level])
    }));

    // Track revelation for analytics
    console.log('📖 Progressive Disclosure:', {
      level,
      trigger,
      userReadiness: context.userReadiness,
      professionalContext: context.professionalContext
    });
  };

  /**
   * Hide a disclosure level
   */
  const hideLevel = (level: DisclosureLevel) => {
    if (level === 'essential') {
      console.warn('Progressive Disclosure: Cannot hide essential information');
      return;
    }

    setContext(prev => {
      const newRevealed = new Set(prev.revealedLevels);
      newRevealed.delete(level);
      
      return {
        ...prev,
        revealedLevels: newRevealed,
        currentLevel: prev.currentLevel === level ? 'essential' : prev.currentLevel
      };
    });
  };

  /**
   * Get appropriate reveal strategy for a level
   */
  const getRevealStrategy = (level: DisclosureLevel): RevealStrategy => {
    const { userReadiness, professionalContext } = context;

    // High cognitive load = immediate essential info only
    if (userReadiness.cognitiveLoad === 'complex' || userReadiness.cognitiveLoad === 'high') {
      return level === 'essential' ? 'immediate' : 'on-demand';
    }

    // Professional context influences strategy
    const contextStrategies: Record<ProfessionalContext, Record<DisclosureLevel, RevealStrategy>> = {
      clinical: {
        essential: 'immediate',
        helpful: 'progressive',
        detailed: 'on-demand',
        expert: 'on-demand'
      },
      artistic: {
        essential: 'immediate',
        helpful: 'contextual',
        detailed: 'progressive',
        expert: 'on-demand'
      },
      sophisticated: {
        essential: 'immediate',
        helpful: 'progressive',
        detailed: 'progressive',
        expert: 'contextual'
      },
      luxury: {
        essential: 'immediate',
        helpful: 'contextual',
        detailed: 'contextual',
        expert: 'progressive'
      },
      wellness: {
        essential: 'immediate',
        helpful: 'progressive',
        detailed: 'contextual',
        expert: 'on-demand'
      },
      precision: {
        essential: 'immediate',
        helpful: 'immediate',
        detailed: 'progressive',
        expert: 'on-demand'
      },
      dramatic: {
        essential: 'immediate',
        helpful: 'contextual',
        detailed: 'progressive',
        expert: 'progressive'
      },
      natural: {
        essential: 'immediate',
        helpful: 'progressive',
        detailed: 'contextual',
        expert: 'on-demand'
      }
    };

    return contextStrategies[professionalContext]?.[level] || 'progressive';
  };

  /**
   * Update user readiness metrics
   */
  const updateUserReadiness = (updates: Partial<DisclosureContext['userReadiness']>) => {
    setContext(prev => ({
      ...prev,
      userReadiness: {
        ...prev.userReadiness,
        ...updates
      }
    }));
  };

  // Auto-update context from other systems
  useEffect(() => {
    setContext(prev => ({
      ...prev,
      professionalContext: contextualState.currentContext,
      visualComplexity: contextualState.visualComplexity
    }));
  }, [contextualState.currentContext, contextualState.visualComplexity]);

  // Auto-update cognitive load from aesthetic evolution
  useEffect(() => {
    const emotionalToCognitive = {
      uncertain: 'high' as const,
      exploring: 'moderate' as const,
      engaged: 'low' as const,
      confident: 'low' as const,
      celebratory: 'minimal' as const
    };

    const cognitiveLoad = emotionalToCognitive[evolution.currentState.emotionalState] || 'moderate';
    
    updateUserReadiness({ cognitiveLoad });
  }, [evolution.currentState.emotionalState]);

  // Track time spent
  useEffect(() => {
    const startTime = Date.now();
    const interval = setInterval(() => {
      const timeSpent = Math.floor((Date.now() - startTime) / 1000);
      updateUserReadiness({ timeSpent });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const contextValue: ProgressiveDisclosureContextType = {
    context,
    revealLevel,
    hideLevel,
    canReveal,
    getRevealStrategy,
    updateUserReadiness
  };

  return (
    <ProgressiveDisclosureContext.Provider value={contextValue}>
      {children}
    </ProgressiveDisclosureContext.Provider>
  );
};

/**
 * Hook to use progressive disclosure functionality
 */
export const useProgressiveDisclosure = (): ProgressiveDisclosureContextType => {
  const context = useContext(ProgressiveDisclosureContext);
  if (!context) {
    throw new Error('useProgressiveDisclosure must be used within a ProgressiveDisclosureProvider');
  }
  return context;
};

