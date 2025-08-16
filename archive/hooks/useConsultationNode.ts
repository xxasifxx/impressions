import { useCallback, useMemo } from 'react';
import { useModalState } from './useModalState';
import { ArtEvolutionManager } from '@/utils/artEvolution';
import {
  ConsultationNode,
  ConsultationResponse,
  ArtEvolutionState
} from '@/data/models';

export interface UseConsultationNodeOptions {
  autoEvolveArt?: boolean;
  persistResponses?: boolean;
}

export interface UseConsultationNodeResult {
  currentNode: ConsultationNode | null;
  artEvolution: ArtEvolutionState;
  handleNodeComplete: (response: ConsultationResponse) => void;
  canGoBack: boolean;
  canGoForward: boolean;
  progressPercentage: number;
  totalResponses: number;
}

export const useConsultationNode = (
  node: ConsultationNode,
  options: UseConsultationNodeOptions = {}
): UseConsultationNodeResult => {
  const {
    autoEvolveArt = true,
    persistResponses = true
  } = options;

  const {
    sessionState,
    updateSession,
    addResponse,
    navigationStack,
    navigate
  } = useModalState();

  // Handle node completion
  const handleNodeComplete = useCallback((response: ConsultationResponse) => {
    // Add response to session
    if (persistResponses) {
      addResponse(response);
    }

    // Evolve art style if enabled
    let newArtEvolution = sessionState.artEvolution;
    if (autoEvolveArt) {
      const updatedResponses = [...sessionState.responses, response];
      newArtEvolution = ArtEvolutionManager.evolveArtStyle(
        sessionState.artEvolution,
        updatedResponses
      );
    }

    // Update session state
    updateSession({
      artEvolution: newArtEvolution,
      lastUpdated: Date.now()
    });

    // Navigate to next node if specified
    const selectedOption = node.options.find(opt => opt.id === response.optionId);
    if (selectedOption?.nextNodeId) {
      navigate('forward', selectedOption.nextNodeId);
    }
  }, [
    node.options,
    sessionState.artEvolution,
    sessionState.responses,
    addResponse,
    updateSession,
    navigate,
    autoEvolveArt,
    persistResponses
  ]);

  // Calculate progress
  const progressPercentage = useMemo(() => {
    const totalExpectedNodes = 10; // This could be dynamic based on consultation flow
    return Math.min((sessionState.responses.length / totalExpectedNodes) * 100, 100);
  }, [sessionState.responses.length]);

  // Navigation state
  const canGoBack = navigationStack.canGoBack;
  const canGoForward = false; // In consultation flow, we don't typically go forward

  return {
    currentNode: node,
    artEvolution: sessionState.artEvolution,
    handleNodeComplete,
    canGoBack,
    canGoForward,
    progressPercentage,
    totalResponses: sessionState.responses.length
  };
};

