import { useState, useEffect, useCallback, useRef } from 'react';
import {
  ConsultationNode,
  ConsultationResponse,
  ConsultationSessionState,
  ConsultationSessionContext,
  ArtEvolutionState
} from '@/data/models/ConsultationTypes';
import { UnifiedService } from '@/data/unifiedServicesData';
import { UnifiedProduct } from '@/data/models/UnifiedProduct';

import { ConsultationSessionManager, ConsultationState } from '@/engine/ConsultationSessionManager';
import { BundleRecommendation } from '@/engine/BundlingIntelligence';
import { CardDisplayDecision } from '@/engine/CardDisplayManager';

export interface UseDecisionTreeConfig {
  availableServices: UnifiedService[];
  availableProducts: UnifiedProduct[];
  autoSave?: boolean;
  enableArtEvolution?: boolean;
  enableBundling?: boolean;
  onSessionComplete?: (sessionState: ConsultationSessionState) => void;
  onNodeTransition?: (node: ConsultationNode | null) => void;
  onCardsDisplay?: (decision: CardDisplayDecision) => void;
}

export interface DecisionTreeState {
  // Session state
  isActive: boolean;
  sessionContext: ConsultationSessionContext | null;
  consultationState: ConsultationState | null;
  
  // Current consultation state
  currentNode: ConsultationNode | null;
  shouldShowCards: boolean;
  cardDisplayDecision: CardDisplayDecision | null;
  
  // Filtered results
  filteredServices: UnifiedService[];
  filteredProducts: UnifiedProduct[];
  bundleRecommendations: BundleRecommendation[];
  
  // Art evolution
  artEvolution: ArtEvolutionState | null;
  
  // Navigation
  canGoBack: boolean;
  navigationStack: string[];
  
  // Analytics
  questionsAnswered: number;
  sessionDuration: number;
  completionRate: number;
}

export interface DecisionTreeActions {
  // Session management
  startConsultation: (initialProfile?: Partial<ConsultationSessionState>) => void;
  completeConsultation: (reason?: string) => void;
  restoreSession: (sessionId: string) => boolean;
  
  // Response handling
  submitResponse: (response: ConsultationResponse) => void;
  
  // Navigation
  goBack: () => void;
  jumpToNode: (nodeId: string) => void;
  
  // Utility
  getSessionAnalytics: () => any;
  exportSessionData: () => ConsultationSessionState | null;
}

export function useDecisionTree(config: UseDecisionTreeConfig): [DecisionTreeState, DecisionTreeActions] {
  const sessionManagerRef = useRef<ConsultationSessionManager | null>(null);
  const [state, setState] = useState<DecisionTreeState>({
    isActive: false,
    sessionContext: null,
    consultationState: null,
    currentNode: null,
    shouldShowCards: false,
    cardDisplayDecision: null,
    filteredServices: config.availableServices,
    filteredProducts: config.availableProducts,
    bundleRecommendations: [],
    artEvolution: null,
    canGoBack: false,
    navigationStack: [],
    questionsAnswered: 0,
    sessionDuration: 0,
    completionRate: 0
  });

  // Initialize session manager
  useEffect(() => {
    sessionManagerRef.current = new ConsultationSessionManager(
      config.availableServices,
      config.availableProducts,
      {
        enableArtEvolution: config.enableArtEvolution ?? true,
        enableBundling: config.enableBundling ?? true,
        autoSaveInterval: config.autoSave ? 30000 : 0
      }
    );
  }, [config.availableServices, config.availableProducts, config.enableArtEvolution, config.enableBundling, config.autoSave]);

  // Update state from session manager
  const updateStateFromSession = useCallback(() => {
    if (!sessionManagerRef.current) return;

    const sessionContext = sessionManagerRef.current.getSessionContext();
    const consultationState = sessionManagerRef.current.getConsultationState();
    const analytics = sessionManagerRef.current.getSessionAnalytics();

    setState(prevState => ({
      ...prevState,
      sessionContext,
      consultationState,
      currentNode: consultationState.currentNode,
      shouldShowCards: consultationState.shouldShowCards,
      cardDisplayDecision: consultationState.cardDisplayDecision,
      filteredServices: consultationState.filteredServices,
      filteredProducts: consultationState.filteredProducts,
      bundleRecommendations: consultationState.bundleRecommendations,
      artEvolution: sessionContext?.sessionState.artEvolution || null,
      canGoBack: sessionContext?.sessionState.navigationStack.length > 1,
      navigationStack: sessionContext?.sessionState.navigationStack || [],
      questionsAnswered: analytics.questionsAnswered,
      sessionDuration: analytics.duration,
      completionRate: analytics.completionRate
    }));
  }, []);

  // Start consultation
  const startConsultation = useCallback((initialProfile?: Partial<ConsultationSessionState>) => {
    if (!sessionManagerRef.current) return;

    const sessionContext = sessionManagerRef.current.startSession(initialProfile);
    
    setState(prevState => ({
      ...prevState,
      isActive: true,
      sessionContext
    }));

    updateStateFromSession();

    // Trigger callback
    if (config.onNodeTransition && sessionContext.sessionState.currentNodeId) {
      const currentNode = sessionManagerRef.current.getConsultationState().currentNode;
      config.onNodeTransition(currentNode);
    }
  }, [config.onNodeTransition, updateStateFromSession]);

  // Complete consultation
  const completeConsultation = useCallback((reason: string = 'user_completed') => {
    if (!sessionManagerRef.current) return;

    sessionManagerRef.current.completeConsultation(reason);
    
    setState(prevState => ({
      ...prevState,
      isActive: false
    }));

    // Trigger callback
    if (config.onSessionComplete) {
      const sessionContext = sessionManagerRef.current.getSessionContext();
      if (sessionContext) {
        config.onSessionComplete(sessionContext.sessionState);
      }
    }
  }, [config.onSessionComplete]);

  // Submit response
  const submitResponse = useCallback((response: ConsultationResponse) => {
    if (!sessionManagerRef.current) return;

    const result = sessionManagerRef.current.processResponse(response);
    
    updateStateFromSession();

    // Trigger callbacks
    if (config.onNodeTransition) {
      config.onNodeTransition(result.nextNode);
    }

    if (config.onCardsDisplay && result.shouldShowCards) {
      const consultationState = sessionManagerRef.current.getConsultationState();
      if (consultationState.cardDisplayDecision) {
        config.onCardsDisplay(consultationState.cardDisplayDecision);
      }
    }
  }, [config.onNodeTransition, config.onCardsDisplay, updateStateFromSession]);

  // Go back
  const goBack = useCallback(() => {
    if (!sessionManagerRef.current) return;

    const previousNode = sessionManagerRef.current.navigateBack();
    
    updateStateFromSession();

    if (config.onNodeTransition) {
      config.onNodeTransition(previousNode);
    }
  }, [config.onNodeTransition, updateStateFromSession]);

  // Jump to specific node
  const jumpToNode = useCallback((nodeId: string) => {
    if (!sessionManagerRef.current) return;

    const sessionContext = sessionManagerRef.current.getSessionContext();
    if (sessionContext) {
      sessionContext.navigateToNode(nodeId);
      updateStateFromSession();

      if (config.onNodeTransition) {
        const consultationState = sessionManagerRef.current.getConsultationState();
        config.onNodeTransition(consultationState.currentNode);
      }
    }
  }, [config.onNodeTransition, updateStateFromSession]);

  // Restore session
  const restoreSession = useCallback((sessionId: string): boolean => {
    if (!sessionManagerRef.current) return false;

    const sessionContext = sessionManagerRef.current.getSessionContext();
    if (sessionContext) {
      sessionContext.restoreSession(sessionId);
      
      setState(prevState => ({
        ...prevState,
        isActive: true
      }));

      updateStateFromSession();
      return true;
    }

    return false;
  }, [updateStateFromSession]);

  // Get session analytics
  const getSessionAnalytics = useCallback(() => {
    if (!sessionManagerRef.current) return null;
    return sessionManagerRef.current.getSessionAnalytics();
  }, []);

  // Export session data
  const exportSessionData = useCallback((): ConsultationSessionState | null => {
    if (!sessionManagerRef.current) return null;
    
    const sessionContext = sessionManagerRef.current.getSessionContext();
    return sessionContext ? sessionContext.sessionState : null;
  }, []);

  // Auto-update session duration
  useEffect(() => {
    if (!state.isActive) return;

    const interval = setInterval(() => {
      updateStateFromSession();
    }, 1000);

    return () => clearInterval(interval);
  }, [state.isActive, updateStateFromSession]);

  const actions: DecisionTreeActions = {
    startConsultation,
    completeConsultation,
    restoreSession,
    submitResponse,
    goBack,
    jumpToNode,
    getSessionAnalytics,
    exportSessionData
  };

  return [state, actions];
}

// Additional hook for simplified consultation flow
export function useSimpleConsultation(
  availableServices: UnifiedService[],
  availableProducts: UnifiedProduct[]
) {
  const [state, actions] = useDecisionTree({
    availableServices,
    availableProducts,
    autoSave: true,
    enableArtEvolution: true,
    enableBundling: true
  });

  // Simplified interface for basic usage
  return {
    // State
    isActive: state.isActive,
    currentQuestion: state.currentNode?.question,
    currentOptions: state.currentNode?.options || [],
    shouldShowResults: state.shouldShowCards,
    filteredServices: state.filteredServices,
    filteredProducts: state.filteredProducts,
    bundles: state.bundleRecommendations,
    canGoBack: state.canGoBack,
    progress: state.completionRate,
    
    // Actions
    start: actions.startConsultation,
    answer: (optionId: string, value: any) => {
      if (state.currentNode) {
        actions.submitResponse({
          nodeId: state.currentNode.id,
          optionId,
          value,
          timestamp: Date.now()
        });
      }
    },
    goBack: actions.goBack,
    complete: actions.completeConsultation
  };
}

// Hook for consultation analytics
export function useConsultationAnalytics(sessionManager: ConsultationSessionManager | null) {
  const [analytics, setAnalytics] = useState<any>(null);

  useEffect(() => {
    if (!sessionManager) return;

    const updateAnalytics = () => {
      setAnalytics(sessionManager.getSessionAnalytics());
    };

    updateAnalytics();
    const interval = setInterval(updateAnalytics, 5000);

    return () => clearInterval(interval);
  }, [sessionManager]);

  return analytics;
}

// Hook for art evolution integration
export function useArtEvolution(artEvolution: ArtEvolutionState | null) {
  const [cssVariables, setCssVariables] = useState<Record<string, string>>({});

  useEffect(() => {
    if (!artEvolution) return;

    const variables: Record<string, string> = {
      '--consultation-theme': artEvolution.currentTheme,
      '--consultation-intensity': artEvolution.styleIntensity.toString(),
      '--consultation-transition': artEvolution.transitionDirection,
      '--consultation-stage': artEvolution.evolutionStage.toString()
    };

    // Add color palette variables
    artEvolution.colorPalette.forEach((color, index) => {
      variables[`--consultation-color-${index + 1}`] = color;
    });

    setCssVariables(variables);

    // Apply to document root
    const root = document.documentElement;
    Object.entries(variables).forEach(([key, value]) => {
      root.style.setProperty(key, value);
    });

    return () => {
      // Cleanup
      Object.keys(variables).forEach(key => {
        root.style.removeProperty(key);
      });
    };
  }, [artEvolution]);

  return cssVariables;
}

