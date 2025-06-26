/**
 * Aesthetic Evolution Engine - Core system for emotional aesthetic evolution
 * 
 * Integrates with Agent B's SmartSearchEngine to detect emotional context
 * and evolves modal aesthetics to resonate with user's emotional journey.
 */

import { 
  AestheticState, 
  AestheticEvolution, 
  EmotionalState, 
  EmotionalContext,
  ConsultationMood,
  ServiceEmotion,
  AestheticTrigger,
  AestheticConfig,
  AestheticEvolutionPath
} from '../types/AestheticTypes';

import { 
  AESTHETIC_STATES,
  getAestheticState,
  applyServiceModifications,
  applyMoodAdjustments
} from '../styles/EmotionalStates';

import { ParsedUserInput } from './SmartSearchEngine';
import { ConsultationResponse } from '../data/models/ConsultationTypes';

export interface AestheticEvolutionConfig extends AestheticConfig {
  // Evolution timing
  minStateTransitionTime: number; // Minimum time before allowing state change
  maxStateTransitionTime: number; // Maximum time to force evolution
  confidenceThreshold: number;    // Minimum confidence for automatic evolution
  
  // Integration settings
  enableSmartSearchIntegration: boolean;
  enableConsultationPathAdaptation: boolean;
  enableServiceSpecificTheming: boolean;
}

export class AestheticEvolutionEngine {
  private config: AestheticEvolutionConfig;
  private currentEvolution: AestheticEvolution;
  private triggers: Map<string, AestheticTrigger>;
  private evolutionPaths: Map<string, AestheticEvolutionPath>;
  private stateHistory: Array<{ state: EmotionalState; timestamp: number; reason: string }>;
  private lastTransitionTime: number;

  constructor(config: Partial<AestheticEvolutionConfig> = {}) {
    this.config = {
      enableTransitions: true,
      transitionDuration: 600,
      respectsReducedMotion: true,
      fallbackState: 'uncertain',
      debugMode: false,
      minStateTransitionTime: 2000,  // 2 seconds minimum
      maxStateTransitionTime: 30000, // 30 seconds maximum
      confidenceThreshold: 0.7,
      enableSmartSearchIntegration: true,
      enableConsultationPathAdaptation: true,
      enableServiceSpecificTheming: true,
      ...config
    };

    this.triggers = new Map();
    this.evolutionPaths = new Map();
    this.stateHistory = [];
    this.lastTransitionTime = Date.now();
    
    // Initialize with uncertain state
    this.currentEvolution = {
      currentState: AESTHETIC_STATES.uncertain,
      transitionProgress: 1,
      isTransitioning: false,
      transitionStartTime: Date.now()
    };

    this.initializeTriggers();
    this.initializeEvolutionPaths();
  }

  /**
   * Process emotional context from Agent B's SmartSearchEngine
   */
  processEmotionalContext(
    parsedInput: ParsedUserInput,
    consultationProgress: number = 0
  ): AestheticEvolution {
    if (!this.config.enableSmartSearchIntegration) {
      return this.currentEvolution;
    }

    const emotionalContext = this.mapToEmotionalContext(parsedInput, consultationProgress);
    const targetState = this.determineTargetState(emotionalContext);
    
    if (this.shouldTriggerEvolution(targetState, emotionalContext)) {
      return this.evolveToState(targetState, `Smart search: ${parsedInput.suggestedRoute}`);
    }

    return this.currentEvolution;
  }

  /**
   * Process consultation response and evolve aesthetics accordingly
   */
  processConsultationResponse(
    response: ConsultationResponse,
    consultationProgress: number
  ): AestheticEvolution {
    // Check for smart search results in response metadata
    if (response.metadata?.smartSearchResult) {
      return this.processEmotionalContext(
        response.metadata.smartSearchResult,
        consultationProgress
      );
    }

    // Analyze response for emotional indicators
    const emotionalContext = this.analyzeResponseEmotions(response, consultationProgress);
    const targetState = this.determineTargetState(emotionalContext);

    if (this.shouldTriggerEvolution(targetState, emotionalContext)) {
      return this.evolveToState(targetState, `Response analysis: ${response.optionId}`);
    }

    // Check time-based evolution triggers
    return this.checkTimeBasedEvolution(consultationProgress);
  }

  /**
   * Force evolution to specific state (for definitive end states)
   */
  evolveToState(
    targetEmotionalState: EmotionalState,
    reason: string = 'Manual trigger'
  ): AestheticEvolution {
    if (this.currentEvolution.currentState.emotionalState === targetEmotionalState) {
      return this.currentEvolution;
    }

    const baseTargetState = getAestheticState(targetEmotionalState);
    
    // Apply service-specific modifications if enabled
    let finalTargetState = baseTargetState;
    if (this.config.enableServiceSpecificTheming) {
      // This would be enhanced with actual service context
      finalTargetState = this.applyContextualModifications(baseTargetState);
    }

    // Record state transition
    this.stateHistory.push({
      state: targetEmotionalState,
      timestamp: Date.now(),
      reason
    });

    // Create new evolution state
    this.currentEvolution = {
      previousState: this.currentEvolution.currentState,
      currentState: finalTargetState,
      targetState: finalTargetState,
      transitionProgress: 0,
      isTransitioning: true,
      transitionStartTime: Date.now()
    };

    this.lastTransitionTime = Date.now();

    if (this.config.debugMode) {
      console.log(`🎨 Aesthetic Evolution: ${this.currentEvolution.previousState?.emotionalState} → ${targetEmotionalState}`, {
        reason,
        targetState: finalTargetState
      });
    }

    return this.currentEvolution;
  }

  /**
   * Update transition progress (called by animation system)
   */
  updateTransitionProgress(progress: number): AestheticEvolution {
    if (!this.currentEvolution.isTransitioning) {
      return this.currentEvolution;
    }

    this.currentEvolution.transitionProgress = Math.max(0, Math.min(1, progress));
    
    if (progress >= 1) {
      this.currentEvolution.isTransitioning = false;
      this.currentEvolution.previousState = undefined;
      this.currentEvolution.targetState = undefined;
    }

    return this.currentEvolution;
  }

  /**
   * Get current aesthetic evolution state
   */
  getCurrentEvolution(): AestheticEvolution {
    return { ...this.currentEvolution };
  }

  /**
   * Get aesthetic state history for analytics
   */
  getStateHistory(): Array<{ state: EmotionalState; timestamp: number; reason: string }> {
    return [...this.stateHistory];
  }

  private mapToEmotionalContext(
    parsedInput: ParsedUserInput,
    consultationProgress: number
  ): EmotionalContext {
    // Map smart search results to emotional context
    const primaryMood = this.determinePrimaryMood(
      parsedInput.emotionalContext,
      parsedInput.urgencyLevel,
      parsedInput.suggestedRoute
    );

    const serviceEmotion = this.determineServiceEmotion(parsedInput.detectedServices);

    return {
      detectedEmotions: parsedInput.emotionalContext,
      urgencyLevel: parsedInput.urgencyLevel,
      consultationPath: parsedInput.suggestedRoute,
      serviceCategories: parsedInput.preFilteredServices,
      primaryMood,
      serviceEmotion,
      confidenceLevel: parsedInput.confidence,
      engagementLevel: Math.min(1, consultationProgress + 0.2) // Boost engagement for text input
    };
  }

  private determineTargetState(context: EmotionalContext): EmotionalState {
    const { confidenceLevel, engagementLevel, urgencyLevel, primaryMood } = context;

    // High confidence + high engagement = confident state
    if (confidenceLevel >= 0.8 && engagementLevel >= 0.7) {
      return 'confident';
    }

    // High urgency = quick progression to engaged
    if (urgencyLevel === 'high' && engagementLevel >= 0.4) {
      return 'engaged';
    }

    // Moderate engagement = exploring
    if (engagementLevel >= 0.3) {
      return 'exploring';
    }

    // Default progression based on current state
    const currentState = this.currentEvolution.currentState.emotionalState;
    
    switch (currentState) {
      case 'uncertain':
        return engagementLevel >= 0.2 ? 'exploring' : 'uncertain';
      case 'exploring':
        return engagementLevel >= 0.5 ? 'engaged' : 'exploring';
      case 'engaged':
        return confidenceLevel >= 0.7 ? 'confident' : 'engaged';
      case 'confident':
        return 'confident'; // Stay confident until cart action
      default:
        return 'uncertain';
    }
  }

  private shouldTriggerEvolution(
    targetState: EmotionalState,
    context: EmotionalContext
  ): boolean {
    const currentState = this.currentEvolution.currentState.emotionalState;
    
    // Don't evolve to same state
    if (currentState === targetState) {
      return false;
    }

    // Respect minimum transition time
    const timeSinceLastTransition = Date.now() - this.lastTransitionTime;
    if (timeSinceLastTransition < this.config.minStateTransitionTime) {
      return false;
    }

    // Don't evolve backwards unless confidence is very high
    const stateOrder: EmotionalState[] = ['uncertain', 'exploring', 'engaged', 'confident', 'celebratory'];
    const currentIndex = stateOrder.indexOf(currentState);
    const targetIndex = stateOrder.indexOf(targetState);
    
    if (targetIndex < currentIndex && context.confidenceLevel < 0.9) {
      return false;
    }

    // Require minimum confidence for evolution
    if (context.confidenceLevel < this.config.confidenceThreshold) {
      return false;
    }

    return true;
  }

  private determinePrimaryMood(
    emotions: string[],
    urgency: 'low' | 'medium' | 'high',
    consultationPath: string
  ): ConsultationMood {
    // Urgency-based mood
    if (urgency === 'high') return 'urgent';
    
    // Emotion-based mood detection
    if (emotions.includes('tired') || emotions.includes('dull')) return 'rejuvenating';
    if (emotions.includes('professional') || emotions.includes('polished')) return 'professional';
    if (emotions.includes('glamorous') || emotions.includes('dramatic')) return 'glamorous';
    if (emotions.includes('transformation') || emotions.includes('change')) return 'transformative';
    if (emotions.includes('natural') || emotions.includes('subtle')) return 'natural';
    
    // Path-based mood
    if (consultationPath === 'quick_service') return 'professional';
    if (consultationPath === 'guided_consultation') return 'exploratory';
    
    return 'exploratory';
  }

  private determineServiceEmotion(services: any[]): ServiceEmotion | undefined {
    if (!services.length) return undefined;
    
    // Map service categories to emotions
    const serviceMap: Record<string, ServiceEmotion> = {
      hair: 'transformation',
      makeup: 'confidence',
      skincare: 'renewal',
      brows: 'polish',
      lashes: 'glamour'
    };

    const primaryService = services[0]?.id;
    return serviceMap[primaryService] || 'confidence';
  }

  private analyzeResponseEmotions(
    response: ConsultationResponse,
    progress: number
  ): EmotionalContext {
    // Basic emotional context from response analysis
    return {
      detectedEmotions: [],
      urgencyLevel: 'medium',
      consultationPath: 'guided_consultation',
      serviceCategories: [],
      primaryMood: 'exploratory',
      confidenceLevel: Math.min(0.9, progress + 0.1),
      engagementLevel: Math.min(1, progress + 0.15)
    };
  }

  private checkTimeBasedEvolution(progress: number): AestheticEvolution {
    const timeSinceLastTransition = Date.now() - this.lastTransitionTime;
    
    // Force evolution if stuck too long
    if (timeSinceLastTransition > this.config.maxStateTransitionTime) {
      const currentState = this.currentEvolution.currentState.emotionalState;
      const nextState = this.getNextProgressiveState(currentState);
      
      if (nextState !== currentState) {
        return this.evolveToState(nextState, 'Time-based progression');
      }
    }

    return this.currentEvolution;
  }

  private getNextProgressiveState(current: EmotionalState): EmotionalState {
    const progression: Record<EmotionalState, EmotionalState> = {
      uncertain: 'exploring',
      exploring: 'engaged',
      engaged: 'confident',
      confident: 'confident', // Stay until cart action
      celebratory: 'celebratory'
    };
    
    return progression[current] || current;
  }

  private applyContextualModifications(baseState: AestheticState): AestheticState {
    // This would be enhanced with actual service and mood context
    // For now, return base state
    return baseState;
  }

  private initializeTriggers(): void {
    // Define aesthetic evolution triggers
    // This would be expanded with more sophisticated trigger logic
  }

  private initializeEvolutionPaths(): void {
    // Define evolution paths for different consultation types
    // This would be expanded with predefined evolution sequences
  }

  /**
   * Trigger celebratory state for cart actions
   */
  triggerCelebratoryState(reason: string = 'Cart action'): AestheticEvolution {
    return this.evolveToState('celebratory', reason);
  }

  /**
   * Reset to initial state
   */
  reset(): AestheticEvolution {
    this.stateHistory = [];
    this.lastTransitionTime = Date.now();
    
    this.currentEvolution = {
      currentState: AESTHETIC_STATES.uncertain,
      transitionProgress: 1,
      isTransitioning: false,
      transitionStartTime: Date.now()
    };

    return this.currentEvolution;
  }
}

