/**
 * Cognitive Load Assessment Engine
 * 
 * Analyzes content complexity and user context to inform visual adaptation decisions.
 * Core principle: Visual complexity should inversely relate to cognitive load.
 */

import { 
  CognitiveLoadLevel, 
  CognitiveLoadAssessment, 
  ContentType,
  VisualComplexityLevel 
} from '../types/VisualEvolutionTypes';

export interface ContentAnalysis {
  wordCount: number;
  decisionPoints: number;
  technicalTerms: number;
  instructionSteps: number;
  choiceComplexity: 'simple' | 'moderate' | 'complex' | 'overwhelming';
  timeConstraint?: 'relaxed' | 'moderate' | 'urgent';
  emotionalWeight?: 'low' | 'medium' | 'high' | 'transformative';
}

export interface UserContext {
  experienceLevel: 'beginner' | 'intermediate' | 'expert';
  currentEmotionalState: 'uncertain' | 'exploring' | 'engaged' | 'confident' | 'celebratory';
  sessionProgress: number; // 0-1
  previousDecisions: number;
  engagementDepth: number; // 0-1
}

export class CognitiveLoadEngine {
  private static instance: CognitiveLoadEngine;
  
  public static getInstance(): CognitiveLoadEngine {
    if (!CognitiveLoadEngine.instance) {
      CognitiveLoadEngine.instance = new CognitiveLoadEngine();
    }
    return CognitiveLoadEngine.instance;
  }

  /**
   * Assess cognitive load for given content and user context
   */
  public assessCognitiveLoad(
    content: ContentAnalysis,
    userContext: UserContext,
    contentType: ContentType
  ): CognitiveLoadAssessment {
    const contentComplexity = this.calculateContentComplexity(content, contentType);
    const decisionWeight = this.calculateDecisionWeight(content, userContext);
    const informationDensity = this.calculateInformationDensity(content);
    
    return {
      contentComplexity,
      decisionWeight,
      informationDensity,
      userExperienceLevel: userContext.experienceLevel,
      timeConstraint: content.timeConstraint || 'moderate',
      emotionalStake: content.emotionalWeight || 'medium'
    };
  }

  /**
   * Determine appropriate visual complexity based on cognitive load
   * Core principle: Higher cognitive load = Lower visual complexity
   */
  public determineVisualComplexity(assessment: CognitiveLoadAssessment): VisualComplexityLevel {
    const complexityScore = this.calculateComplexityScore(assessment);
    
    // Inverse relationship: high cognitive load = minimal visual complexity
    if (complexityScore >= 0.8) return 'minimal';    // Very high cognitive load
    if (complexityScore >= 0.6) return 'simple';     // High cognitive load
    if (complexityScore >= 0.4) return 'balanced';   // Moderate cognitive load
    if (complexityScore >= 0.2) return 'rich';       // Low cognitive load
    return 'sophisticated';                          // Minimal cognitive load
  }

  /**
   * Calculate content complexity level
   */
  private calculateContentComplexity(content: ContentAnalysis, contentType: ContentType): CognitiveLoadLevel {
    let complexityScore = 0;

    // Word count impact
    if (content.wordCount > 200) complexityScore += 0.3;
    else if (content.wordCount > 100) complexityScore += 0.2;
    else if (content.wordCount > 50) complexityScore += 0.1;

    // Decision points impact
    if (content.decisionPoints > 5) complexityScore += 0.4;
    else if (content.decisionPoints > 3) complexityScore += 0.3;
    else if (content.decisionPoints > 1) complexityScore += 0.2;

    // Technical terms impact
    if (content.technicalTerms > 3) complexityScore += 0.3;
    else if (content.technicalTerms > 1) complexityScore += 0.2;

    // Instruction steps impact
    if (content.instructionSteps > 5) complexityScore += 0.3;
    else if (content.instructionSteps > 3) complexityScore += 0.2;

    // Choice complexity impact
    switch (content.choiceComplexity) {
      case 'overwhelming': complexityScore += 0.4; break;
      case 'complex': complexityScore += 0.3; break;
      case 'moderate': complexityScore += 0.2; break;
      case 'simple': complexityScore += 0.1; break;
    }

    // Content type modifiers
    switch (contentType) {
      case 'decision': complexityScore += 0.2; break;
      case 'instruction': complexityScore += 0.15; break;
      case 'information': complexityScore += 0.1; break;
      case 'confirmation': complexityScore -= 0.1; break;
      case 'celebration': complexityScore -= 0.2; break;
    }

    // Convert to cognitive load level
    if (complexityScore >= 0.8) return 'complex';
    if (complexityScore >= 0.6) return 'high';
    if (complexityScore >= 0.4) return 'moderate';
    if (complexityScore >= 0.2) return 'low';
    return 'minimal';
  }

  /**
   * Calculate decision weight based on content and user context
   */
  private calculateDecisionWeight(
    content: ContentAnalysis, 
    userContext: UserContext
  ): 'low' | 'medium' | 'high' | 'critical' {
    let weightScore = 0;

    // Content factors
    if (content.decisionPoints > 3) weightScore += 0.3;
    if (content.emotionalWeight === 'transformative') weightScore += 0.4;
    else if (content.emotionalWeight === 'high') weightScore += 0.3;
    else if (content.emotionalWeight === 'medium') weightScore += 0.2;

    if (content.timeConstraint === 'urgent') weightScore += 0.3;
    else if (content.timeConstraint === 'moderate') weightScore += 0.1;

    // User context factors
    if (userContext.experienceLevel === 'beginner') weightScore += 0.2;
    if (userContext.currentEmotionalState === 'uncertain') weightScore += 0.2;
    if (userContext.sessionProgress < 0.3) weightScore += 0.1; // Early in session

    if (weightScore >= 0.7) return 'critical';
    if (weightScore >= 0.5) return 'high';
    if (weightScore >= 0.3) return 'medium';
    return 'low';
  }

  /**
   * Calculate information density (0-1 scale)
   */
  private calculateInformationDensity(content: ContentAnalysis): number {
    const factors = [
      Math.min(content.wordCount / 300, 1),           // Word density
      Math.min(content.decisionPoints / 5, 1),        // Decision density
      Math.min(content.technicalTerms / 5, 1),        // Technical density
      Math.min(content.instructionSteps / 8, 1)       // Instruction density
    ];

    return factors.reduce((sum, factor) => sum + factor, 0) / factors.length;
  }

  /**
   * Calculate overall complexity score for visual adaptation
   */
  private calculateComplexityScore(assessment: CognitiveLoadAssessment): number {
    const weights = {
      contentComplexity: 0.3,
      decisionWeight: 0.25,
      informationDensity: 0.2,
      experienceLevel: 0.15,
      timeConstraint: 0.1
    };

    let score = 0;

    // Content complexity contribution
    const complexityValues = { minimal: 0, low: 0.25, moderate: 0.5, high: 0.75, complex: 1 };
    score += complexityValues[assessment.contentComplexity] * weights.contentComplexity;

    // Decision weight contribution
    const decisionValues = { low: 0, medium: 0.33, high: 0.66, critical: 1 };
    score += decisionValues[assessment.decisionWeight] * weights.decisionWeight;

    // Information density contribution
    score += assessment.informationDensity * weights.informationDensity;

    // Experience level contribution (beginners need simpler visuals)
    const experienceValues = { expert: 0, intermediate: 0.33, beginner: 1 };
    score += experienceValues[assessment.userExperienceLevel] * weights.experienceLevel;

    // Time constraint contribution (urgent = simpler visuals)
    const timeValues = { relaxed: 0, moderate: 0.33, urgent: 1 };
    score += timeValues[assessment.timeConstraint] * weights.timeConstraint;

    return Math.min(score, 1); // Cap at 1.0
  }

  /**
   * Analyze content from text input (for smart search integration)
   */
  public analyzeTextContent(text: string): ContentAnalysis {
    const words = text.trim().split(/\s+/);
    const wordCount = words.length;

    // Detect decision indicators
    const decisionIndicators = ['or', 'either', 'choose', 'decide', 'option', 'vs', 'versus'];
    const decisionPoints = decisionIndicators.reduce((count, indicator) => {
      return count + (text.toLowerCase().includes(indicator) ? 1 : 0);
    }, 0);

    // Detect technical terms (beauty industry specific)
    const technicalTerms = [
      'balayage', 'ombre', 'highlights', 'lowlights', 'toner', 'gloss',
      'microdermabrasion', 'chemical peel', 'retinol', 'hyaluronic',
      'contouring', 'highlighting', 'primer', 'setting spray',
      'threading', 'waxing', 'tinting', 'lamination',
      'extensions', 'volume', 'length', 'curl'
    ].filter(term => text.toLowerCase().includes(term)).length;

    // Detect instruction steps
    const stepIndicators = ['first', 'then', 'next', 'after', 'finally', 'step'];
    const instructionSteps = stepIndicators.reduce((count, indicator) => {
      return count + (text.toLowerCase().includes(indicator) ? 1 : 0);
    }, 0);

    // Determine choice complexity
    let choiceComplexity: 'simple' | 'moderate' | 'complex' | 'overwhelming' = 'simple';
    if (decisionPoints > 3 || technicalTerms > 3) choiceComplexity = 'overwhelming';
    else if (decisionPoints > 2 || technicalTerms > 2) choiceComplexity = 'complex';
    else if (decisionPoints > 1 || technicalTerms > 1) choiceComplexity = 'moderate';

    // Detect urgency
    const urgencyIndicators = ['urgent', 'asap', 'today', 'tomorrow', 'soon', 'quickly', 'fast'];
    const timeConstraint = urgencyIndicators.some(indicator => 
      text.toLowerCase().includes(indicator)
    ) ? 'urgent' : 'moderate';

    // Detect emotional weight
    const highEmotionIndicators = ['wedding', 'interview', 'date', 'special', 'important', 'transformation'];
    const lowEmotionIndicators = ['touch up', 'maintenance', 'trim', 'quick'];
    
    let emotionalWeight: 'low' | 'medium' | 'high' | 'transformative' = 'medium';
    if (highEmotionIndicators.some(indicator => text.toLowerCase().includes(indicator))) {
      emotionalWeight = text.toLowerCase().includes('wedding') ? 'transformative' : 'high';
    } else if (lowEmotionIndicators.some(indicator => text.toLowerCase().includes(indicator))) {
      emotionalWeight = 'low';
    }

    return {
      wordCount,
      decisionPoints,
      technicalTerms,
      instructionSteps,
      choiceComplexity,
      timeConstraint,
      emotionalWeight
    };
  }

  /**
   * Get visual adaptation recommendations based on cognitive load
   */
  public getVisualAdaptationRecommendations(assessment: CognitiveLoadAssessment): {
    layout: string;
    spacing: string;
    typography: string;
    interactions: string;
    disclosure: string;
  } {
    const visualComplexity = this.determineVisualComplexity(assessment);

    const recommendations = {
      minimal: {
        layout: 'Single column, generous white space, minimal elements',
        spacing: 'Extra generous padding, wide margins, breathing room',
        typography: 'Large, clear fonts, high contrast, simple hierarchy',
        interactions: 'Obvious buttons, clear affordances, minimal hover effects',
        disclosure: 'Show only essential information, hide complexity'
      },
      simple: {
        layout: 'Clean structure, clear sections, limited choices',
        spacing: 'Comfortable padding, adequate margins, organized grouping',
        typography: 'Readable fonts, good contrast, clear hierarchy',
        interactions: 'Clear buttons, subtle hover effects, obvious focus states',
        disclosure: 'Progressive revelation, contextual help available'
      },
      balanced: {
        layout: 'Structured grid, logical grouping, moderate density',
        spacing: 'Standard padding, balanced margins, visual rhythm',
        typography: 'Professional fonts, appropriate contrast, clear hierarchy',
        interactions: 'Refined buttons, smooth hover effects, clear feedback',
        disclosure: 'Layered information, expandable sections, contextual details'
      },
      rich: {
        layout: 'Sophisticated grid, rich content areas, higher density',
        spacing: 'Efficient padding, optimized margins, tight grouping',
        typography: 'Elegant fonts, nuanced contrast, sophisticated hierarchy',
        interactions: 'Polished buttons, refined hover effects, subtle feedback',
        disclosure: 'Rich information layers, detailed options, expert controls'
      },
      sophisticated: {
        layout: 'Complex grid, premium content areas, maximum density',
        spacing: 'Minimal padding, tight margins, premium grouping',
        typography: 'Luxury fonts, premium contrast, complex hierarchy',
        interactions: 'Premium buttons, sophisticated effects, nuanced feedback',
        disclosure: 'Full information access, expert-level details, advanced controls'
      }
    };

    return recommendations[visualComplexity];
  }
}

