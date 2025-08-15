import {
  ConsultationResponse,
  ConsultationSessionState,
  UserProfile
} from '@/data/models/ConsultationTypes';
import { UnifiedService } from '@/data/unifiedServicesData';
import { UnifiedProduct } from '@/data/models/UnifiedProduct';
import { RulesEngine, MotivationProfile, ExperienceProfile } from './RulesEngine';
import { CatalogFilter, FilterResult } from './CatalogFilter';

export interface CardDisplayDecision {
  shouldShowCards: boolean;
  reasoning: string;
  confidence: number;
  triggerType: 'question_limit' | 'catalog_size' | 'clear_direction' | 'user_request' | 'timeout';
  recommendedDisplayMode: 'grid' | 'list' | 'featured' | 'comparison';
  additionalContext?: {
    questionsAsked: number;
    catalogSize: number;
    hasServiceDirection: boolean;
    sessionDuration: number;
  };
}

export interface DisplayTriggerConfig {
  maxQuestionsBeforeCards: number;
  targetCatalogSize: { min: number; max: number };
  sessionTimeoutMinutes: number;
  requireServiceDirection: boolean;
  allowEarlyTrigger: boolean;
}

export interface ServiceDirectionSignals {
  hasDomainPreference: boolean;
  hasStylePreference: boolean;
  hasMotivationClarity: boolean;
  hasExperienceLevel: boolean;
  hasTimelineClarity: boolean;
  overallClarity: number; // 0-1 scale
}

export class CardDisplayManager {
  private rulesEngine: RulesEngine;
  private config: DisplayTriggerConfig;

  constructor(
    rulesEngine: RulesEngine,
    config: Partial<DisplayTriggerConfig> = {}
  ) {
    this.rulesEngine = rulesEngine;
    this.config = {
      maxQuestionsBeforeCards: 6,
      targetCatalogSize: { min: 8, max: 20 },
      sessionTimeoutMinutes: 10,
      requireServiceDirection: true,
      allowEarlyTrigger: true,
      ...config
    };
  }

  /**
   * Determine if consultation should show cards instead of more questions
   */
  shouldShowCards(
    sessionState: ConsultationSessionState,
    currentCatalogSize: number
  ): CardDisplayDecision {
    const questionsAsked = sessionState.responses.length;
    const sessionDuration = Date.now() - sessionState.startTime;
    const sessionMinutes = sessionDuration / (1000 * 60);

    // Check all trigger conditions
    const triggers = this.evaluateAllTriggers(
      sessionState,
      currentCatalogSize,
      questionsAsked,
      sessionMinutes
    );

    // Find the highest priority trigger that fires
    const activeTrigger = this.selectActiveTrigger(triggers);

    if (activeTrigger) {
      return {
        shouldShowCards: true,
        reasoning: activeTrigger.reasoning,
        confidence: activeTrigger.confidence,
        triggerType: activeTrigger.type,
        recommendedDisplayMode: this.getRecommendedDisplayMode(sessionState, currentCatalogSize),
        additionalContext: {
          questionsAsked,
          catalogSize: currentCatalogSize,
          hasServiceDirection: this.hasServiceDirection(sessionState),
          sessionDuration: sessionMinutes
        }
      };
    }

    return {
      shouldShowCards: false,
      reasoning: 'Continue consultation to better understand preferences',
      confidence: 0.8,
      triggerType: 'question_limit', // Default type
      recommendedDisplayMode: 'grid',
      additionalContext: {
        questionsAsked,
        catalogSize: currentCatalogSize,
        hasServiceDirection: this.hasServiceDirection(sessionState),
        sessionDuration: sessionMinutes
      }
    };
  }

  /**
   * Analyze service direction clarity from responses
   */
  analyzeServiceDirection(sessionState: ConsultationSessionState): ServiceDirectionSignals {
    const responses = sessionState.responses;
    
    const hasDomainPreference = responses.some(r => 
      r.metadata?.category === 'domain' && r.value !== 'exploration' && r.value !== 'unsure'
    );

    const hasStylePreference = responses.some(r => 
      r.metadata?.category === 'style' && r.value !== 'unsure'
    );

    const hasMotivationClarity = responses.some(r => 
      r.metadata?.category === 'motivation' && r.value !== 'exploration'
    );

    const hasExperienceLevel = responses.some(r => 
      r.metadata?.category === 'experience'
    );

    const hasTimelineClarity = responses.some(r => 
      r.metadata?.category === 'timeline'
    );

    // Calculate overall clarity score
    const clarityFactors = [
      hasDomainPreference,
      hasStylePreference,
      hasMotivationClarity,
      hasExperienceLevel,
      hasTimelineClarity
    ];

    const overallClarity = clarityFactors.filter(Boolean).length / clarityFactors.length;

    return {
      hasDomainPreference,
      hasStylePreference,
      hasMotivationClarity,
      hasExperienceLevel,
      hasTimelineClarity,
      overallClarity
    };
  }

  /**
   * Get recommended display mode based on context
   */
  getRecommendedDisplayMode(
    sessionState: ConsultationSessionState,
    catalogSize: number
  ): 'grid' | 'list' | 'featured' | 'comparison' {
    const motivation = this.rulesEngine.detectMotivation(sessionState.responses);
    const experience = this.rulesEngine.detectExperience(sessionState.responses);

    // Small catalog - use grid for visual appeal
    if (catalogSize <= 6) {
      return 'grid';
    }

    // Large catalog - use list for easier scanning
    if (catalogSize > 15) {
      return 'list';
    }

    // Wedding/special events - featured display for impact
    if (motivation.primary === 'wedding' || motivation.primary === 'special_event') {
      return 'featured';
    }

    // Expert users - comparison mode for detailed analysis
    if (experience.level === 'expert') {
      return 'comparison';
    }

    // Default to grid for most cases
    return 'grid';
  }

  /**
   * Check if user has indicated readiness to see options
   */
  hasUserRequestedOptions(sessionState: ConsultationSessionState): boolean {
    const responses = sessionState.responses;
    
    return responses.some(r => 
      r.value.toString().toLowerCase().includes('show') ||
      r.value.toString().toLowerCase().includes('see') ||
      r.value.toString().toLowerCase().includes('options') ||
      r.optionId.includes('show_all') ||
      r.optionId.includes('see_options')
    );
  }

  /**
   * Determine optimal timing for card display
   */
  getOptimalDisplayTiming(sessionState: ConsultationSessionState): {
    isOptimal: boolean;
    reasoning: string;
    suggestedDelay?: number;
  } {
    const motivation = this.rulesEngine.detectMotivation(sessionState.responses);
    const experience = this.rulesEngine.detectExperience(sessionState.responses);
    const questionsAsked = sessionState.responses.length;

    // High urgency - show cards earlier
    if (motivation.urgency >= 8) {
      return {
        isOptimal: questionsAsked >= 3,
        reasoning: 'High urgency detected, showing options early to respect timeline'
      };
    }

    // Beginners need more guidance
    if (experience.level === 'beginner') {
      return {
        isOptimal: questionsAsked >= 5,
        reasoning: 'Beginner user benefits from more guidance before seeing options'
      };
    }

    // Experts can handle options earlier
    if (experience.level === 'expert') {
      return {
        isOptimal: questionsAsked >= 3,
        reasoning: 'Expert user can evaluate options with minimal guidance'
      };
    }

    // Standard timing for most users
    return {
      isOptimal: questionsAsked >= 4,
      reasoning: 'Standard consultation depth reached for most users'
    };
  }

  // Private helper methods

  private evaluateAllTriggers(
    sessionState: ConsultationSessionState,
    catalogSize: number,
    questionsAsked: number,
    sessionMinutes: number
  ): Array<{
    type: CardDisplayDecision['triggerType'];
    fires: boolean;
    reasoning: string;
    confidence: number;
    priority: number;
  }> {
    const triggers = [];

    // Question limit trigger
    triggers.push({
      type: 'question_limit' as const,
      fires: questionsAsked >= this.config.maxQuestionsBeforeCards,
      reasoning: `Reached maximum questions (${questionsAsked}/${this.config.maxQuestionsBeforeCards}) - time to show options`,
      confidence: 0.95,
      priority: 8
    });

    // Catalog size trigger
    triggers.push({
      type: 'catalog_size' as const,
      fires: catalogSize >= this.config.targetCatalogSize.min && catalogSize <= this.config.targetCatalogSize.max,
      reasoning: `Catalog filtered to optimal size (${catalogSize} items) - ready to display options`,
      confidence: 0.9,
      priority: 9
    });

    // Clear direction trigger
    const hasDirection = this.hasServiceDirection(sessionState);
    triggers.push({
      type: 'clear_direction' as const,
      fires: hasDirection && questionsAsked >= 3,
      reasoning: 'Clear service direction established - user knows what they want',
      confidence: 0.85,
      priority: 7
    });

    // User request trigger
    const userRequested = this.hasUserRequestedOptions(sessionState);
    triggers.push({
      type: 'user_request' as const,
      fires: userRequested,
      reasoning: 'User explicitly requested to see options',
      confidence: 1.0,
      priority: 10
    });

    // Session timeout trigger
    triggers.push({
      type: 'timeout' as const,
      fires: sessionMinutes >= this.config.sessionTimeoutMinutes,
      reasoning: `Session duration (${sessionMinutes.toFixed(1)} min) suggests user needs to see options`,
      confidence: 0.7,
      priority: 6
    });

    return triggers;
  }

  private selectActiveTrigger(triggers: Array<{
    type: CardDisplayDecision['triggerType'];
    fires: boolean;
    reasoning: string;
    confidence: number;
    priority: number;
  }>): {
    type: CardDisplayDecision['triggerType'];
    reasoning: string;
    confidence: number;
  } | null {
    // Find all firing triggers
    const firingTriggers = triggers.filter(t => t.fires);
    
    if (firingTriggers.length === 0) {
      return null;
    }

    // Return highest priority trigger
    const selectedTrigger = firingTriggers.reduce((highest, current) => 
      current.priority > highest.priority ? current : highest
    );

    return {
      type: selectedTrigger.type,
      reasoning: selectedTrigger.reasoning,
      confidence: selectedTrigger.confidence
    };
  }

  private hasServiceDirection(sessionState: ConsultationSessionState): boolean {
    const signals = this.analyzeServiceDirection(sessionState);
    
    // Consider direction clear if we have motivation + domain OR style preference
    return signals.hasMotivationClarity && 
           (signals.hasDomainPreference || signals.hasStylePreference) &&
           signals.overallClarity >= 0.6;
  }

  /**
   * Predict when cards should be shown based on current trajectory
   */
  predictCardDisplayTiming(
    sessionState: ConsultationSessionState,
    currentCatalogSize: number
  ): {
    questionsRemaining: number;
    estimatedTrigger: CardDisplayDecision['triggerType'];
    confidence: number;
  } {
    const questionsAsked = sessionState.responses.length;
    const maxQuestions = this.config.maxQuestionsBeforeCards;
    const questionsRemaining = Math.max(0, maxQuestions - questionsAsked);

    // If catalog is already in target range
    if (currentCatalogSize >= this.config.targetCatalogSize.min && 
        currentCatalogSize <= this.config.targetCatalogSize.max) {
      return {
        questionsRemaining: Math.min(questionsRemaining, 1),
        estimatedTrigger: 'catalog_size',
        confidence: 0.9
      };
    }

    // If user has clear direction
    if (this.hasServiceDirection(sessionState)) {
      return {
        questionsRemaining: Math.min(questionsRemaining, 2),
        estimatedTrigger: 'clear_direction',
        confidence: 0.8
      };
    }

    // Default to question limit
    return {
      questionsRemaining,
      estimatedTrigger: 'question_limit',
      confidence: 0.7
    };
  }

  /**
   * Generate explanation for why cards are being shown
   */
  generateDisplayExplanation(decision: CardDisplayDecision): string {
    const { triggerType, additionalContext } = decision;

    switch (triggerType) {
      case 'question_limit':
        return `I've gathered enough information about your preferences (${additionalContext?.questionsAsked} questions). Let me show you the services that match what you're looking for.`;

      case 'catalog_size':
        return `Perfect! I've filtered our services down to ${additionalContext?.catalogSize} options that are ideal for your needs. Here are your personalized recommendations.`;

      case 'clear_direction':
        return `I can see you have a clear vision of what you want. Based on your preferences, here are the services I recommend for you.`;

      case 'user_request':
        return `Of course! Here are the options that match your preferences. I think you'll love what I've selected for you.`;

      case 'timeout':
        return `Let me show you some great options based on what we've discussed so far. You can always refine these choices as we continue.`;

      default:
        return `Based on our conversation, here are the services I think would be perfect for you.`;
    }
  }
}

