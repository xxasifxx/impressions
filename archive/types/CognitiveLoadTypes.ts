/**
 * Cognitive Load Types - Supporting the CognitiveLoadEngine
 * 
 * These types specifically support the cognitive load assessment system
 * and its integration with the broader visual evolution framework.
 */

import { CognitiveLoadAssessment, VisualComplexityLevel } from './VisualEvolutionTypes';

/**
 * Content Analysis Result
 * Output from analyzing consultation content for cognitive complexity
 */
export interface ContentAnalysisResult {
  analysis: {
    wordCount: number;
    decisionPoints: number;
    technicalTerms: number;
    instructionSteps: number;
    choiceComplexity: 'simple' | 'moderate' | 'complex' | 'overwhelming';
    timeConstraint: 'relaxed' | 'moderate' | 'urgent';
    emotionalWeight: 'low' | 'medium' | 'high' | 'transformative';
  };
  cognitiveLoad: CognitiveLoadAssessment;
  visualComplexity: VisualComplexityLevel;
  recommendations: VisualAdaptationRecommendations;
}

/**
 * Visual Adaptation Recommendations
 * Specific guidance for visual design based on cognitive load assessment
 */
export interface VisualAdaptationRecommendations {
  layout: {
    structure: 'single-column' | 'two-column' | 'grid' | 'complex-grid';
    density: 'sparse' | 'comfortable' | 'standard' | 'dense' | 'maximum';
    grouping: 'minimal' | 'clear' | 'logical' | 'sophisticated' | 'complex';
  };
  spacing: {
    padding: 'extra-generous' | 'generous' | 'standard' | 'efficient' | 'minimal';
    margins: 'wide' | 'comfortable' | 'balanced' | 'optimized' | 'tight';
    rhythm: 'breathing' | 'organized' | 'visual' | 'tight' | 'premium';
  };
  typography: {
    hierarchy: 'simple' | 'clear' | 'professional' | 'sophisticated' | 'complex';
    contrast: 'high' | 'good' | 'appropriate' | 'nuanced' | 'premium';
    readability: 'maximum' | 'high' | 'standard' | 'refined' | 'luxury';
  };
  interactions: {
    affordances: 'obvious' | 'clear' | 'refined' | 'polished' | 'premium';
    feedback: 'minimal' | 'subtle' | 'smooth' | 'refined' | 'sophisticated';
    complexity: 'simple' | 'clear' | 'standard' | 'nuanced' | 'advanced';
  };
  disclosure: {
    strategy: 'essential-only' | 'progressive' | 'layered' | 'rich' | 'full-access';
    depth: 'minimal' | 'contextual' | 'detailed' | 'expert' | 'advanced';
    control: 'guided' | 'assisted' | 'balanced' | 'flexible' | 'expert';
  };
}

/**
 * Cognitive Load Context
 * Real-time context for cognitive load assessment during consultation
 */
export interface CognitiveLoadContext {
  currentStep: string;
  stepType: 'entry' | 'selection' | 'refinement' | 'confirmation' | 'completion';
  userState: {
    emotionalState: 'uncertain' | 'exploring' | 'engaged' | 'confident' | 'celebratory';
    experienceLevel: 'beginner' | 'intermediate' | 'expert';
    sessionProgress: number; // 0-1
    engagementDepth: number; // 0-1
    previousDecisions: number;
    timeSpent: number; // seconds
  };
  contentContext: {
    serviceCategory?: string;
    complexity: 'low' | 'medium' | 'high';
    decisionWeight: 'minor' | 'moderate' | 'major' | 'critical';
    informationDensity: number; // 0-1
  };
  environmentalFactors: {
    timeConstraint?: 'relaxed' | 'moderate' | 'urgent';
    deviceType: 'mobile' | 'tablet' | 'desktop';
    connectionQuality: 'slow' | 'moderate' | 'fast';
    accessibilityNeeds?: string[];
  };
}

/**
 * Cognitive Load Evolution
 * Tracks how cognitive load changes throughout the consultation
 */
export interface CognitiveLoadEvolution {
  timeline: Array<{
    timestamp: number;
    step: string;
    assessment: CognitiveLoadAssessment;
    visualComplexity: VisualComplexityLevel;
    userAction: string;
    adaptationApplied: boolean;
  }>;
  trends: {
    complexityTrend: 'increasing' | 'decreasing' | 'stable' | 'fluctuating';
    userConfidence: 'building' | 'declining' | 'stable';
    engagementLevel: 'increasing' | 'decreasing' | 'stable';
  };
  predictions: {
    nextLikelyComplexity: VisualComplexityLevel;
    recommendedAdaptation: 'simplify' | 'maintain' | 'enrich' | 'sophisticate';
    confidenceLevel: number; // 0-1
  };
}

/**
 * Integration with Existing Systems
 */
export interface CognitiveLoadIntegration {
  // Integration with Agent B's SmartSearchEngine
  smartSearchContext: {
    searchQuery?: string;
    detectedIntent: string;
    confidenceLevel: number;
    suggestedComplexity: VisualComplexityLevel;
  };
  
  // Integration with existing AestheticEvolution
  aestheticContext: {
    currentEmotionalState: string;
    serviceCategory?: string;
    userMood?: string;
    evolutionStage: number; // 0-1
  };
  
  // Integration with decision tree
  decisionContext: {
    currentNode: string;
    pathTaken: string[];
    remainingDecisions: number;
    criticalDecisionAhead: boolean;
  };
}

/**
 * Cognitive Load Metrics
 * For measuring the effectiveness of cognitive load adaptations
 */
export interface CognitiveLoadMetrics {
  userPerformance: {
    decisionTime: number;
    errorRate: number;
    backtrackingFrequency: number;
    completionRate: number;
  };
  visualEffectiveness: {
    adaptationAccuracy: number; // How well visual complexity matched cognitive load
    userSatisfaction: number;
    comprehensionRate: number;
    taskEfficiency: number;
  };
  systemPerformance: {
    assessmentAccuracy: number;
    adaptationSpeed: number;
    resourceUsage: number;
    errorHandling: number;
  };
}

/**
 * Cognitive Load Configuration
 * Settings for tuning the cognitive load assessment system
 */
export interface CognitiveLoadConfig {
  sensitivity: {
    contentAnalysis: number; // 0-1, how sensitive to content complexity
    userContext: number; // 0-1, how much user context influences assessment
    timeFactors: number; // 0-1, how much time constraints matter
    emotionalFactors: number; // 0-1, how much emotional state influences load
  };
  
  thresholds: {
    minimalComplexity: number; // Threshold for minimal visual complexity
    simpleComplexity: number; // Threshold for simple visual complexity
    balancedComplexity: number; // Threshold for balanced visual complexity
    richComplexity: number; // Threshold for rich visual complexity
    // sophisticated is anything above richComplexity
  };
  
  adaptationSpeed: {
    immediate: boolean; // Apply adaptations immediately
    transitionDuration: number; // Milliseconds for visual transitions
    debounceDelay: number; // Milliseconds to wait before reassessing
  };
  
  fallbackBehavior: {
    onUncertainty: VisualComplexityLevel; // Default when assessment is uncertain
    onError: VisualComplexityLevel; // Default when assessment fails
    gracefulDegradation: boolean; // Whether to degrade gracefully on errors
  };
}

