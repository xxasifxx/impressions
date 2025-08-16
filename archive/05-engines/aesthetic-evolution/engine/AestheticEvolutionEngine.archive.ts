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

import { CognitiveLoadEngine } from './CognitiveLoadEngine';
import { CognitiveLoadContext, ContentAnalysisResult } from '../types/CognitiveLoadTypes';
import { VisualComplexityLevel, ProfessionalContext } from '../types/VisualEvolutionTypes';
import { CONTEXTUAL_VISUAL_LANGUAGES } from '../styles/ContextualVisualLanguage';
import { blendColors, getContextBlendingStrategy } from '../utils/colorBlending';

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
  private cognitiveLoadEngine: CognitiveLoadEngine;
  private currentVisualComplexity: VisualComplexityLevel;
  private currentProfessionalContext: ProfessionalContext;
  private detectedServices: string[];
  private detectedKeywords: string[];
  private currentUrgencyLevel: 'low' | 'medium' | 'high' | 'urgent';

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
    this.cognitiveLoadEngine = CognitiveLoadEngine.getInstance();
    this.currentVisualComplexity = 'balanced';
    this.currentProfessionalContext = 'sophisticated';
    this.detectedServices = [];
    this.detectedKeywords = [];
    this.currentUrgencyLevel = 'low';
    
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

  /**
   * Visual Evolution Orchestrator - The core integration method
   * 
   * Takes base emotional state and applies:
   * 1. Professional context modifications (clinical, artistic, luxury, etc.)
   * 2. Cognitive load adaptations (spacing, complexity)
   * 3. Service-specific overrides (wedding → luxury fonts)
   * 4. Conflict resolution between competing systems
   */
  private applyContextualModifications(baseState: AestheticState): AestheticState {
    let modifiedState = { ...baseState };

    // Step 1: Apply Professional Context Visual Language
    const contextualLanguage = CONTEXTUAL_VISUAL_LANGUAGES[this.currentProfessionalContext];
    const cognitiveAdaptation = contextualLanguage.cognitiveLoadAdaptation[this.currentVisualComplexity];

    // Step 2: Apply Cognitive Load Spacing Adaptations
    modifiedState.spacing = {
      ...modifiedState.spacing,
      containerPadding: cognitiveAdaptation.spacing.containerPadding,
      elementGap: cognitiveAdaptation.spacing.elementGap,
      borderRadius: contextualLanguage.visualProperties.shapes.borderRadius
    };

    // Step 3: Apply Professional Context Color Modifications
    // Blend base emotional colors with professional context palette
    const contextColors = contextualLanguage.colorPalette;
    modifiedState.colors = {
      ...modifiedState.colors,
      // Keep emotional primary, but adjust secondary/accent to professional context
      secondary: this.blendColors(modifiedState.colors.secondary, contextColors.secondary, 0.3),
      accent: this.blendColors(modifiedState.colors.accent, contextColors.accent, 0.4),
      surface: this.blendColors(modifiedState.colors.surface, contextColors.surface, 0.2)
    };

    // Step 4: Apply Professional Context Typography Modifications
    // This is where we resolve font conflicts intelligently
    const resolvedTypography = this.resolveTypographyConflicts(
      modifiedState.typography,
      contextualLanguage,
      baseState.emotionalState
    );
    modifiedState.typography = resolvedTypography;

    // Step 5: Apply Visual Complexity Effects
    modifiedState.effects = {
      ...modifiedState.effects,
      shadowIntensity: cognitiveAdaptation.effects.shadowIntensity,
      gradientIntensity: cognitiveAdaptation.effects.gradientIntensity,
      // Professional context influences animation style
      animationEasing: contextualLanguage.visualProperties.animations.easing
    };

    // Step 6: Apply Layout Adaptations
    modifiedState.layout = {
      ...modifiedState.layout,
      // Cognitive load affects content density
      maxWidth: cognitiveAdaptation.layout.maxWidth,
      verticalSpacing: cognitiveAdaptation.layout.verticalSpacing
    };

    if (this.config.debugMode) {
      console.log('🎨 Contextual Modifications Applied:', {
        originalState: baseState.emotionalState,
        professionalContext: this.currentProfessionalContext,
        visualComplexity: this.currentVisualComplexity,
        modifications: {
          typography: resolvedTypography,
          spacing: modifiedState.spacing,
          colors: modifiedState.colors
        }
      });
    }

    return modifiedState;
  }

  /**
   * Intelligent Typography Conflict Resolution
   * 
   * Resolves conflicts between:
   * - Emotional state fonts (uncertain → Inter, confident → Imperial Script)
   * - Professional context fonts (clinical → geometric, artistic → flowing)
   * - Service overrides (wedding → luxury fonts)
   */
  private resolveTypographyConflicts(
    baseTypography: AestheticState['typography'],
    contextualLanguage: typeof CONTEXTUAL_VISUAL_LANGUAGES[ProfessionalContext],
    emotionalState: EmotionalState
  ): AestheticState['typography'] {
    // System Hierarchy for Typography Conflicts:
    // 1. Service Override (wedding, urgent) - Highest priority
    // 2. Professional Context (clinical, artistic) - Medium priority  
    // 3. Emotional State (uncertain, confident) - Base priority
    // 4. Cognitive Load (technical adjustments) - Lowest priority

    let resolvedTypography = { ...baseTypography };

    // Check for service-specific font overrides
    const serviceOverride = this.getServiceFontOverride();
    if (serviceOverride) {
      // Service override wins - wedding gets luxury fonts regardless of other factors
      resolvedTypography.headingFont = serviceOverride.headingFont;
      resolvedTypography.bodyFont = serviceOverride.bodyFont;
      
      if (this.config.debugMode) {
        console.log('🎯 Service Font Override Applied:', serviceOverride);
      }
      return resolvedTypography;
    }

    // Professional context modifies emotional state fonts
    const contextModification = this.getContextualFontModification(
      emotionalState,
      this.currentProfessionalContext
    );

    if (contextModification) {
      resolvedTypography.headingFont = contextModification.headingFont;
      resolvedTypography.bodyFont = contextModification.bodyFont;
      
      if (this.config.debugMode) {
        console.log('🎨 Professional Context Font Applied:', {
          context: this.currentProfessionalContext,
          modification: contextModification
        });
      }
    }

    // Cognitive load affects technical typography properties (weight, size, spacing)
    const cognitiveAdaptation = contextualLanguage.cognitiveLoadAdaptation[this.currentVisualComplexity];
    resolvedTypography = {
      ...resolvedTypography,
      headingSize: cognitiveAdaptation.typography.headingSize,
      bodySize: cognitiveAdaptation.typography.bodySize,
      lineHeight: cognitiveAdaptation.typography.lineHeight,
      letterSpacing: cognitiveAdaptation.typography.letterSpacing
    };

    return resolvedTypography;
  }

  /**
   * Get service-specific font overrides (highest priority)
   */
  private getServiceFontOverride(): { headingFont: string; bodyFont: string } | null {
    // Check for high-priority service contexts that override everything
    const serviceKeywords = this.getDetectedServiceKeywords();
    
    // Wedding context always gets luxury fonts
    if (serviceKeywords.includes('wedding') || serviceKeywords.includes('bridal')) {
      return {
        headingFont: 'Imperial Script, cursive',
        bodyFont: 'Playfair Display, serif'
      };
    }

    // Urgent/emergency contexts get clean, readable fonts
    if (serviceKeywords.includes('urgent') || serviceKeywords.includes('today') || serviceKeywords.includes('tomorrow')) {
      return {
        headingFont: 'Inter, system-ui, sans-serif',
        bodyFont: 'Inter, system-ui, sans-serif'
      };
    }

    return null;
  }

  /**
   * Get professional context font modifications (medium priority)
   */
  private getContextualFontModification(
    emotionalState: EmotionalState,
    professionalContext: ProfessionalContext
  ): { headingFont: string; bodyFont: string } | null {
    // Professional context influences font choice within emotional state
    const contextFontMap: Record<ProfessionalContext, { headingFont: string; bodyFont: string }> = {
      clinical: {
        headingFont: 'Inter, system-ui, sans-serif',
        bodyFont: 'Inter, system-ui, sans-serif'
      },
      artistic: {
        headingFont: 'Dancing Script, cursive',
        bodyFont: 'Inter, system-ui, sans-serif'
      },
      sophisticated: {
        headingFont: 'Playfair Display, serif',
        bodyFont: 'Inter, system-ui, sans-serif'
      },
      luxury: {
        headingFont: 'Imperial Script, cursive',
        bodyFont: 'Playfair Display, serif'
      },
      wellness: {
        headingFont: 'Fleur De Leah, cursive',
        bodyFont: 'Inter, system-ui, sans-serif'
      },
      precision: {
        headingFont: 'Inter, system-ui, sans-serif',
        bodyFont: 'Inter, system-ui, sans-serif'
      },
      dramatic: {
        headingFont: 'Playfair Display, serif',
        bodyFont: 'Inter, system-ui, sans-serif'
      },
      natural: {
        headingFont: 'Inter, system-ui, sans-serif',
        bodyFont: 'Inter, system-ui, sans-serif'
      }
    };

    return contextFontMap[professionalContext];
  }

  /**
   * Blend two colors with specified ratio using production-grade LAB color space blending
   */
  private blendColors(color1: string, color2: string, ratio: number): string {
    const strategy = getContextBlendingStrategy(this.currentProfessionalContext);
    
    return blendColors(color1, color2, ratio, {
      strategy,
      maintainContrast: true,
      minContrastRatio: 4.5 // WCAG AA compliance
    });
  }

  /**
   * Get detected service keywords from current context
   */
  private getDetectedServiceKeywords(): string[] {
    return [...this.detectedKeywords, ...this.detectedServices];
  }

  /**
   * Update service context from Agent B's smart search results
   * This method allows Agent B to inform the aesthetic system about detected services
   */
  updateServiceContext(
    detectedServices: string[],
    serviceKeywords: string[],
    urgencyLevel: 'low' | 'medium' | 'high' | 'urgent' = 'low'
  ): void {
    // Store detected service information for use in font override decisions
    this.detectedServices = detectedServices;
    this.detectedKeywords = serviceKeywords;
    this.currentUrgencyLevel = urgencyLevel;

    // Auto-detect professional context from primary service
    if (detectedServices.length > 0) {
      const primaryService = detectedServices[0];
      const detectedContext = this.detectProfessionalContext(primaryService);
      this.setProfessionalContext(detectedContext);
    }

    if (this.config.debugMode) {
      console.log('🔍 Service Context Updated:', {
        detectedServices,
        serviceKeywords,
        urgencyLevel,
        professionalContext: this.currentProfessionalContext
      });
    }
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
   * Assess cognitive load and adapt visual complexity
   * Core principle: Visual complexity inversely relates to cognitive load
   */
  assessCognitiveLoadAndAdapt(
    contentText: string,
    userContext: {
      experienceLevel: 'beginner' | 'intermediate' | 'expert';
      currentEmotionalState: EmotionalState;
      sessionProgress: number;
      previousDecisions: number;
      engagementDepth: number;
    },
    contentType: 'decision' | 'information' | 'confirmation' | 'instruction' | 'selection' | 'input' | 'result' | 'celebration'
  ): ContentAnalysisResult {
    // Analyze content complexity
    const contentAnalysis = this.cognitiveLoadEngine.analyzeTextContent(contentText);
    
    // Assess cognitive load
    const cognitiveLoad = this.cognitiveLoadEngine.assessCognitiveLoad(
      contentAnalysis,
      userContext,
      contentType
    );
    
    // Determine appropriate visual complexity (inverse relationship)
    const visualComplexity = this.cognitiveLoadEngine.determineVisualComplexity(cognitiveLoad);
    this.currentVisualComplexity = visualComplexity;
    
    // Get visual adaptation recommendations
    const recommendations = this.cognitiveLoadEngine.getVisualAdaptationRecommendations(cognitiveLoad);
    
    if (this.config.debugMode) {
      console.log('🧠 Cognitive Load Assessment:', {
        contentAnalysis,
        cognitiveLoad,
        visualComplexity,
        recommendations
      });
    }
    
    return {
      analysis: contentAnalysis,
      cognitiveLoad,
      visualComplexity,
      recommendations
    };
  }

  /**
   * Get current visual complexity level
   */
  getCurrentVisualComplexity(): VisualComplexityLevel {
    return this.currentVisualComplexity;
  }

  /**
   * Set professional context for contextual visual language
   */
  setProfessionalContext(context: ProfessionalContext): void {
    this.currentProfessionalContext = context;
    
    if (this.config.debugMode) {
      console.log('🎨 Professional Context Updated:', {
        context,
        visualLanguage: CONTEXTUAL_VISUAL_LANGUAGES[context].functionalPurpose
      });
    }
  }

  /**
   * Get current professional context
   */
  getCurrentProfessionalContext(): ProfessionalContext {
    return this.currentProfessionalContext;
  }

  /**
   * Auto-detect professional context from service category
   */
  detectProfessionalContext(serviceCategory?: string): ProfessionalContext {
    if (!serviceCategory) return this.currentProfessionalContext;

    const contextMapping: Record<string, ProfessionalContext> = {
      'hair': 'sophisticated',
      'makeup': 'artistic', 
      'skincare': 'clinical',
      'facial': 'clinical',
      'wellness': 'wellness',
      'holistic': 'wellness',
      'brows': 'precision',
      'eyebrows': 'precision',
      'lashes': 'dramatic',
      'eyelashes': 'dramatic',
      'natural': 'natural',
      'organic': 'natural',
      'luxury': 'luxury',
      'premium': 'luxury',
      'bridal': 'luxury',
      'wedding': 'luxury'
    };

    const detectedContext = contextMapping[serviceCategory.toLowerCase()];
    if (detectedContext) {
      this.setProfessionalContext(detectedContext);
      return detectedContext;
    }

    return this.currentProfessionalContext;
  }

  /**
   * Apply visual complexity adaptations to aesthetic state
   */
  applyVisualComplexityAdaptations(
    baseState: AestheticState,
    visualComplexity: VisualComplexityLevel
  ): AestheticState {
    const adaptations = {
      minimal: {
        // High cognitive load = minimal visual complexity
        spacing: Math.max(baseState.spacing * 1.5, 24), // Extra generous spacing
        borderRadius: Math.min(baseState.borderRadius, 8), // Simpler shapes
        shadowBlur: Math.min(baseState.shadowBlur, 10), // Subtle shadows
        animationDuration: Math.max(baseState.animationDuration, 400), // Slower, calmer
        maxWidth: Math.min(baseState.maxWidth || 600, 500), // Narrower focus
        verticalSpacing: Math.max(baseState.verticalSpacing, 32) // More breathing room
      },
      simple: {
        // Moderate-high cognitive load = simple visual complexity
        spacing: Math.max(baseState.spacing * 1.2, 20),
        borderRadius: baseState.borderRadius,
        shadowBlur: Math.min(baseState.shadowBlur, 15),
        animationDuration: baseState.animationDuration,
        maxWidth: baseState.maxWidth || 600,
        verticalSpacing: Math.max(baseState.verticalSpacing, 24)
      },
      balanced: {
        // Moderate cognitive load = balanced visual complexity
        spacing: baseState.spacing,
        borderRadius: baseState.borderRadius,
        shadowBlur: baseState.shadowBlur,
        animationDuration: baseState.animationDuration,
        maxWidth: baseState.maxWidth,
        verticalSpacing: baseState.verticalSpacing
      },
      rich: {
        // Low cognitive load = rich visual complexity
        spacing: Math.max(baseState.spacing * 0.9, 12),
        borderRadius: Math.max(baseState.borderRadius, 12),
        shadowBlur: Math.max(baseState.shadowBlur, 20),
        animationDuration: Math.min(baseState.animationDuration, 300),
        maxWidth: Math.max(baseState.maxWidth || 600, 700),
        verticalSpacing: Math.max(baseState.verticalSpacing * 0.9, 16)
      },
      sophisticated: {
        // Minimal cognitive load = sophisticated visual complexity
        spacing: Math.max(baseState.spacing * 0.8, 8),
        borderRadius: Math.max(baseState.borderRadius, 16),
        shadowBlur: Math.max(baseState.shadowBlur, 25),
        animationDuration: Math.min(baseState.animationDuration, 250),
        maxWidth: Math.max(baseState.maxWidth || 600, 800),
        verticalSpacing: Math.max(baseState.verticalSpacing * 0.8, 12)
      }
    };

    const adaptation = adaptations[visualComplexity];
    
    return {
      ...baseState,
      spacing: adaptation.spacing,
      borderRadius: adaptation.borderRadius,
      shadowBlur: adaptation.shadowBlur,
      animationDuration: adaptation.animationDuration,
      maxWidth: adaptation.maxWidth,
      verticalSpacing: adaptation.verticalSpacing
    };
  }

  /**
   * Reset to initial state
   */
  reset(): AestheticEvolution {
    this.stateHistory = [];
    this.lastTransitionTime = Date.now();
    this.currentVisualComplexity = 'balanced';
    this.currentProfessionalContext = 'sophisticated';
    
    this.currentEvolution = {
      currentState: AESTHETIC_STATES.uncertain,
      transitionProgress: 1,
      isTransitioning: false,
      transitionStartTime: Date.now()
    };

    return this.currentEvolution;
  }

  /**
   * Get comprehensive visual evolution state including contextual information
   */
  getComprehensiveState(): {
    aestheticEvolution: AestheticEvolution;
    visualComplexity: VisualComplexityLevel;
    professionalContext: ProfessionalContext;
    contextualLanguage: typeof CONTEXTUAL_VISUAL_LANGUAGES[ProfessionalContext];
    cognitiveLoadAdaptation: any;
  } {
    const contextualLanguage = CONTEXTUAL_VISUAL_LANGUAGES[this.currentProfessionalContext];
    const cognitiveLoadAdaptation = contextualLanguage.cognitiveLoadAdaptation[this.currentVisualComplexity];

    return {
      aestheticEvolution: this.currentEvolution,
      visualComplexity: this.currentVisualComplexity,
      professionalContext: this.currentProfessionalContext,
      contextualLanguage,
      cognitiveLoadAdaptation
    };
  }
}
