/**
 * Visual Evolution Types - Sophisticated Visual Adaptation System
 * 
 * These types define the framework for meaningful visual evolution that serves
 * functional purposes rather than decorative ones. All visual changes must
 * pass the quality gates defined in the Sophisticated Visual Charter.
 */

export type CognitiveLoadLevel = 'minimal' | 'low' | 'moderate' | 'high' | 'complex';

export type ProfessionalContext = 
  | 'clinical'      // Skincare analysis, technical consultations
  | 'artistic'      // Makeup artistry, creative expression
  | 'sophisticated' // Hair styling, elegant transformations
  | 'luxury'        // Premium services, high-end experiences
  | 'wellness'      // Holistic beauty, natural treatments
  | 'precision'     // Brow shaping, technical procedures
  | 'dramatic'      // Bold transformations, statement looks
  | 'natural';      // Subtle enhancements, everyday beauty

export type VisualComplexityLevel = 'minimal' | 'simple' | 'balanced' | 'rich' | 'sophisticated';

export type ContentType = 
  | 'decision'      // Requires cognitive processing
  | 'information'   // Educational content
  | 'confirmation'  // Simple acknowledgment
  | 'instruction'   // Step-by-step guidance
  | 'selection'     // Choice between options
  | 'input'         // User data entry
  | 'result'        // Outcome presentation
  | 'celebration';  // Achievement or completion

/**
 * Cognitive Load Assessment
 * Measures content complexity to inform visual adaptation decisions
 */
export interface CognitiveLoadAssessment {
  contentComplexity: CognitiveLoadLevel;
  decisionWeight: 'low' | 'medium' | 'high' | 'critical';
  informationDensity: number; // 0-1 scale
  userExperienceLevel: 'beginner' | 'intermediate' | 'expert';
  timeConstraint: 'relaxed' | 'moderate' | 'urgent';
  emotionalStake: 'low' | 'medium' | 'high' | 'transformative';
}

/**
 * Visual Hierarchy Configuration
 * Defines how visual weight and emphasis should be distributed
 */
export interface VisualHierarchy {
  primaryFocus: 'content' | 'action' | 'navigation' | 'feedback';
  emphasisLevel: 'subtle' | 'moderate' | 'strong' | 'dominant';
  contrastRatio: number; // WCAG-compliant contrast levels
  visualWeight: 'light' | 'medium' | 'heavy' | 'bold';
  informationLayering: 'flat' | 'grouped' | 'hierarchical' | 'progressive';
}

/**
 * Contextual Visual Language
 * Professional vocabulary that matches beauty service contexts
 */
export interface ContextualVisualLanguage {
  context: ProfessionalContext;
  visualVocabulary: {
    shapes: 'geometric' | 'organic' | 'flowing' | 'structured' | 'minimal';
    textures: 'smooth' | 'textured' | 'matte' | 'glossy' | 'natural';
    rhythm: 'steady' | 'flowing' | 'dynamic' | 'calm' | 'energetic';
    precision: 'exact' | 'refined' | 'organic' | 'loose' | 'structured';
  };
  semanticReinforcement: {
    trustIndicators: string[];
    expertiseMarkers: string[];
    qualitySignals: string[];
    contextualCues: string[];
  };
}

/**
 * Progressive Disclosure Configuration
 * Intelligent information revelation based on user readiness
 */
export interface ProgressiveDisclosure {
  revealStrategy: 'immediate' | 'on-demand' | 'progressive' | 'contextual';
  informationLayers: {
    essential: string[];
    helpful: string[];
    detailed: string[];
    expert: string[];
  };
  triggerConditions: {
    engagementThreshold: number;
    confidenceLevel: number;
    timeSpent: number;
    interactionDepth: number;
  };
  revealAnimations: {
    timing: 'instant' | 'quick' | 'smooth' | 'deliberate';
    direction: 'fade' | 'slide' | 'expand' | 'unfold';
    easing: string;
  };
}

/**
 * Micro-Interaction Specification
 * Functional interaction behaviors that enhance usability
 */
export interface MicroInteractionSpec {
  trigger: 'hover' | 'focus' | 'click' | 'scroll' | 'proximity' | 'time';
  purpose: 'feedback' | 'guidance' | 'affordance' | 'confirmation' | 'prevention';
  intensity: 'subtle' | 'noticeable' | 'clear' | 'prominent';
  timing: {
    delay: number;
    duration: number;
    easing: string;
  };
  visualChanges: {
    property: string;
    fromValue: string;
    toValue: string;
    respectsReducedMotion: boolean;
  }[];
  functionalBenefit: string; // Required: must explain how this improves UX
}

/**
 * Content-Responsive Layout
 * Adaptive spacing and organization based on content characteristics
 */
export interface ContentResponsiveLayout {
  contentAnalysis: {
    type: ContentType;
    complexity: CognitiveLoadLevel;
    scanningPattern: 'linear' | 'scanning' | 'focused' | 'exploratory';
    readingDepth: 'skim' | 'scan' | 'read' | 'study';
  };
  layoutAdaptation: {
    density: 'sparse' | 'comfortable' | 'compact' | 'dense';
    grouping: 'loose' | 'related' | 'tight' | 'unified';
    breathing: 'generous' | 'adequate' | 'minimal' | 'tight';
    flow: 'linear' | 'grid' | 'organic' | 'structured';
  };
  spacingCalculation: {
    baseUnit: number;
    multiplier: number;
    contextualAdjustment: number;
    cognitiveLoadFactor: number;
  };
}

/**
 * Visual Evolution State
 * Complete specification for sophisticated visual adaptation
 */
export interface VisualEvolutionState {
  cognitiveLoad: CognitiveLoadAssessment;
  visualHierarchy: VisualHierarchy;
  contextualLanguage: ContextualVisualLanguage;
  progressiveDisclosure: ProgressiveDisclosure;
  microInteractions: MicroInteractionSpec[];
  responsiveLayout: ContentResponsiveLayout;
  
  // Integration with existing aesthetic system
  emotionalState: 'uncertain' | 'exploring' | 'engaged' | 'confident' | 'celebratory';
  serviceContext?: string;
  userMood?: string;
  
  // Quality assurance
  functionalPurpose: string; // Required: must explain why this visual state serves user needs
  charterCompliance: {
    functionalPurposeTest: boolean;
    contextAppropriateTest: boolean;
    cognitiveLoadTest: boolean;
    progressiveEnhancementTest: boolean;
    semanticReinforcementTest: boolean;
  };
}

/**
 * Visual Evolution Engine Configuration
 * Controls how visual states transition and adapt
 */
export interface VisualEvolutionConfig {
  adaptationSpeed: 'immediate' | 'quick' | 'smooth' | 'gradual';
  transitionEasing: string;
  respectsReducedMotion: boolean;
  fallbackBehavior: 'graceful' | 'minimal' | 'static';
  
  // Quality gates
  requiresCharterCompliance: boolean;
  autoRejectDecorative: boolean;
  enforcesFunctionalPurpose: boolean;
  
  // Coordination with other agents
  integratesWithAestheticEvolution: boolean;
  respondsToSmartSearch: boolean;
  coordinatesWithDecisionTree: boolean;
}

/**
 * Visual Quality Assessment
 * Framework for evaluating visual changes against charter principles
 */
export interface VisualQualityAssessment {
  functionalPurpose: {
    identified: boolean;
    description: string;
    userBenefit: string;
    measurable: boolean;
  };
  contextualAppropriateness: {
    matchesProfessionalContext: boolean;
    reinforcesSemanticMeaning: boolean;
    respectsUserExpectations: boolean;
  };
  cognitiveImpact: {
    reducesLoad: boolean;
    enhancesComprehension: boolean;
    supportsTaskCompletion: boolean;
    avoidsOverwhelm: boolean;
  };
  progressiveEnhancement: {
    matchesEngagementLevel: boolean;
    growsWithConfidence: boolean;
    respectsUserState: boolean;
  };
  overallScore: number; // 0-100, must be >80 to pass
  recommendation: 'approve' | 'revise' | 'reject';
  improvementSuggestions: string[];
}

/**
 * Agent Coordination Types
 * Interfaces for seamless collaboration between agents
 */
export interface AgentCoordinationHandoff {
  fromAgent: 'A' | 'B' | 'C';
  toAgent: 'A' | 'B' | 'C';
  handoffType: 'architecture' | 'implementation' | 'review' | 'integration';
  requirements: string[];
  qualityGates: string[];
  expectedDeliverables: string[];
  coordinationNotes: string;
}

export interface VisualEvolutionHandoff extends AgentCoordinationHandoff {
  visualEvolutionState: VisualEvolutionState;
  implementationPriority: 'critical' | 'high' | 'medium' | 'low';
  technicalConstraints: string[];
  designConstraints: string[];
  userExperienceGoals: string[];
}

