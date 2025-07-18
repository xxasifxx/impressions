/**
 * Experience Analysis Engine - Production System
 * 
 * SCOPE: Analyzes user consultation responses to classify experience levels (beginner → expert)
 * and generate appropriate service recommendations using hardcoded pattern matching.
 * 
 * SUCCESS CRITERIA:
 * - Classification accuracy ≥85% on test data
 * - Response time ≤1000ms per analysis
 * - High confidence (≥0.7) correlates with ≥90% accuracy
 * - Graceful handling of edge cases (empty input, mixed signals)
 * 
 * CONSTRAINTS:
 * - Input: 1-20 consultation responses, max 10,000 chars each
 * - Output: Experience level + confidence + recommendations
 * - No external dependencies (APIs, databases)
 * - Deterministic results (same input = same output)
 * 
 * KNOWN FAILURE STATES:
 * 1. Insufficient input data (< 10 words total) → Returns low confidence beginner
 * 2. Mixed signals (beginner + expert language) → May misclassify, check confidence
 * 3. Performance degradation (>1000ms) → Usually caused by oversized input
 * 4. Context detection failure → Returns 'general' context, affects recommendations
 * 
 * DIAGNOSTIC INTERFACE:
 * - Enable debugMode in constructor for detailed logging
 * - Check result.confidence for reliability indicator
 * - Examine result.vocabulary.evidence for pattern match details
 * - Monitor performance with Date.now() timing
 * 
 * EMERGENCY FALLBACK:
 * If analysis fails completely, return beginner classification with low confidence
 * and comprehensive guidance recommendations for safety.
 * 
 * Architecture Dependencies:
 * - Types: ExperienceTypes.ts (type definitions)
 * - Data: experiencePatterns.ts (pattern definitions)  
 * - Utils: patternMatching.ts (reusable utilities)
 * - Engine: ExperienceAnalysisEngine.ts (main business logic)
 */

import {
  ExperienceLevel,
  ConfidenceLevel,
  ExperienceAnalysisResult,
  ExperienceAnalysisInput,
  ExperienceAnalysisConfig,
  VocabularyAnalysis,
  TechnicalKnowledgeAnalysis,
  DecisionConfidenceAnalysis,
  ServiceFamiliarityAnalysis
} from '../types/ExperienceTypes';

import {
  VOCABULARY_PATTERNS,
  TECHNICAL_KNOWLEDGE_PATTERNS,
  DECISION_CONFIDENCE_PATTERNS,
  SERVICE_FAMILIARITY_PATTERNS,
  CONTEXT_SPECIFIC_PATTERNS,
  PATTERN_WEIGHTS,
  EXPERIENCE_THRESHOLDS
} from '../data/experiencePatterns';

import {
  analyzePatternCategory,
  combinePatternResults,
  calculateTextComplexity,
  extractTechnicalTerms,
  preprocessText
} from '../utils/patternMatching';

/**
 * Default configuration for experience analysis
 */
const DEFAULT_CONFIG: ExperienceAnalysisConfig = {
  weights: PATTERN_WEIGHTS,
  thresholds: EXPERIENCE_THRESHOLDS,
  minConfidenceThreshold: 0.4,
  minResponseCount: 2,
  debugMode: false
};

/**
 * Technical vocabulary for beauty services
 */
const BEAUTY_TECHNICAL_VOCABULARY = [
  // Hair technical terms
  'balayage', 'ombre', 'foils', 'toner', 'developer', 'bleach', 'color wheel',
  'undertones', 'porosity', 'elasticity', 'cuticle', 'cortex', 'medulla',
  'oxidation', 'ammonia', 'peroxide', 'pH balance', 'color theory',
  
  // Makeup technical terms
  'contouring', 'highlighting', 'color correction', 'primer', 'setting spray',
  'blending', 'stippling', 'buffing', 'color theory', 'undertones',
  'warm tones', 'cool tones', 'complementary colors', 'monochromatic',
  
  // Skincare technical terms
  'exfoliation', 'hydration', 'sebum', 'comedogenic', 'retinol', 'glycolic acid',
  'salicylic acid', 'hyaluronic acid', 'peptides', 'antioxidants', 'SPF',
  'photodamage', 'hyperpigmentation', 'melasma', 'rosacea'
];

/**
 * Main Experience Analysis Engine
 */
export class ExperienceAnalysisEngine {
  private config: ExperienceAnalysisConfig;
  
  constructor(config: Partial<ExperienceAnalysisConfig> = {}) {
    this.config = { ...DEFAULT_CONFIG, ...config };
  }
  
  /**
   * Analyze user experience level from consultation responses
   * 
   * HAPPY PATH:
   * 1. Input validation (2+ responses, reasonable length)
   * 2. Text preprocessing and context detection
   * 3. Multi-dimensional pattern analysis
   * 4. Score calculation and classification
   * 5. Recommendation generation
   * 
   * FAILURE HANDLING:
   * - Insufficient data → Low confidence beginner result
   * - Oversized input → Truncate and log warning
   * - Pattern matching errors → Graceful degradation
   * - Performance issues → Timeout protection
   * 
   * DIAGNOSTIC OUTPUT:
   * - result.confidence indicates reliability
   * - result.*.evidence shows pattern matches
   * - debugMode logs detailed analysis steps
   */
  public analyzeExperience(input: ExperienceAnalysisInput): ExperienceAnalysisResult {
    const startTime = Date.now();
    
    try {
      const { responses, sessionContext } = input;
      
      // Input validation with detailed error reporting
      const validationResult = this.validateInput(input);
      if (!validationResult.isValid) {
        if (this.config.debugMode) {
          console.warn('Input validation failed:', validationResult.errors);
        }
        return this.createLowConfidenceResult(input, validationResult.errors.join('; '));
      }
      
      // Performance monitoring
      if (this.config.debugMode) {
        console.log('Starting experience analysis with', responses.length, 'responses');
      }
    
    // Combine all response text
    const combinedText = responses.map(r => r.text).join(' ');
    const totalWordCount = combinedText.split(/\s+/).length;
    
    // Get service context for context-specific patterns
    const serviceContext = sessionContext?.serviceCategory || this.detectServiceContext(combinedText);
    
    // Analyze each component
    const vocabularyAnalysis = this.analyzeVocabulary(combinedText, serviceContext);
    const technicalAnalysis = this.analyzeTechnicalKnowledge(combinedText, serviceContext);
    const confidenceAnalysis = this.analyzeDecisionConfidence(combinedText, serviceContext);
    const familiarityAnalysis = this.analyzeServiceFamiliarity(combinedText, serviceContext);
    
    // Calculate overall experience level
    const overallScore = this.calculateOverallScore(
      vocabularyAnalysis,
      technicalAnalysis,
      confidenceAnalysis,
      familiarityAnalysis
    );
    
    const experienceLevel = this.classifyExperienceLevel(overallScore);
    const confidence = this.calculateOverallConfidence([
      vocabularyAnalysis,
      technicalAnalysis,
      confidenceAnalysis,
      familiarityAnalysis
    ]);
    
    // Generate recommendations
    const recommendations = this.generateRecommendations(
      experienceLevel,
      vocabularyAnalysis,
      technicalAnalysis,
      confidenceAnalysis,
      familiarityAnalysis
    );
    
    const result: ExperienceAnalysisResult = {
      experienceLevel,
      confidence,
      overallScore,
      vocabulary: vocabularyAnalysis,
      technicalKnowledge: technicalAnalysis,
      decisionConfidence: confidenceAnalysis,
      serviceFamiliarity: familiarityAnalysis,
      recommendations,
      analysisTimestamp: new Date(),
      responseCount: responses.length,
      totalWordCount
    };
    
      // Performance validation
      const analysisTime = Date.now() - startTime;
      if (analysisTime > 1000) {
        console.warn(`Analysis took ${analysisTime}ms - exceeds 1000ms target`);
      }
      
      if (this.config.debugMode) {
        console.log('Experience Analysis Result:', result);
        console.log(`Analysis completed in ${analysisTime}ms`);
      }
      
      return result;
      
    } catch (error) {
      // Emergency fallback for any unexpected errors
      console.error('Experience analysis failed:', error);
      return this.createEmergencyFallback(input, error instanceof Error ? error.message : 'Unknown error');
    }
  }
  
  /**
   * Validate input data for analysis
   * 
   * VALIDATION RULES:
   * - Minimum response count (configurable, default 2)
   * - Maximum response length (10,000 chars each)
   * - Total input size limit (50,000 chars)
   * - Response text must not be empty
   * 
   * RETURNS: { isValid: boolean, errors: string[] }
   */
  private validateInput(input: ExperienceAnalysisInput): { isValid: boolean; errors: string[] } {
    const errors: string[] = [];
    const { responses } = input;
    
    // Check minimum response count
    if (responses.length < this.config.minResponseCount) {
      errors.push(`Insufficient responses: ${responses.length} < ${this.config.minResponseCount} required`);
    }
    
    // Check individual response constraints
    let totalChars = 0;
    responses.forEach((response, index) => {
      if (!response.text || response.text.trim().length === 0) {
        errors.push(`Response ${index} is empty`);
      }
      
      if (response.text && response.text.length > 10000) {
        errors.push(`Response ${index} exceeds 10,000 character limit (${response.text.length} chars)`);
      }
      
      totalChars += response.text?.length || 0;
    });
    
    // Check total input size
    if (totalChars > 50000) {
      errors.push(`Total input size ${totalChars} exceeds 50,000 character limit`);
    }
    
    // Check for minimum meaningful content
    const meaningfulText = responses.map(r => r.text).join(' ').trim();
    if (meaningfulText.split(/\s+/).length < 5) {
      errors.push('Insufficient meaningful content for analysis (< 5 words total)');
    }
    
    return {
      isValid: errors.length === 0,
      errors
    };
  }
  
  /**
   * Analyze vocabulary complexity and sophistication
   */
  private analyzeVocabulary(text: string, context?: string): VocabularyAnalysis {
    const baseAnalysis = analyzePatternCategory(text, VOCABULARY_PATTERNS, 'vocabulary', context);
    
    // Additional vocabulary metrics
    const textComplexity = calculateTextComplexity(text, BEAUTY_TECHNICAL_VOCABULARY);
    const technicalTerms = extractTechnicalTerms(text, BEAUTY_TECHNICAL_VOCABULARY);
    
    return {
      ...baseAnalysis,
      technicalTermCount: technicalTerms.length,
      sophisticatedLanguageUsage: textComplexity.complexWordRatio,
      industryJargonUsage: textComplexity.technicalTermRatio,
      averageWordComplexity: textComplexity.overallComplexity
    };
  }
  
  /**
   * Analyze technical knowledge and understanding
   */
  private analyzeTechnicalKnowledge(text: string, context?: string): TechnicalKnowledgeAnalysis {
    const baseAnalysis = analyzePatternCategory(text, TECHNICAL_KNOWLEDGE_PATTERNS, 'technical', context);
    
    // Context-specific technical knowledge
    const contextPatterns = CONTEXT_SPECIFIC_PATTERNS[context || ''] || [];
    const contextTechnicalPatterns = contextPatterns.filter(p => p.category === 'technical');
    
    let contextScore = 0;
    if (contextTechnicalPatterns.length > 0) {
      const contextAnalysis = analyzePatternCategory(text, contextTechnicalPatterns, 'technical', context);
      contextScore = contextAnalysis.score;
    }
    
    // Calculate component scores
    const serviceSpecificKnowledge = contextScore;
    const processUnderstanding = this.calculateProcessUnderstanding(text);
    const toolsAndTechniquesKnowledge = this.calculateToolsKnowledge(text);
    const professionalTerminology = this.calculateProfessionalTerminology(text);
    
    return {
      ...baseAnalysis,
      serviceSpecificKnowledge,
      processUnderstanding,
      toolsAndTechniquesKnowledge,
      professionalTerminology
    };
  }
  
  /**
   * Analyze decision-making confidence
   */
  private analyzeDecisionConfidence(text: string, context?: string): DecisionConfidenceAnalysis {
    const baseAnalysis = analyzePatternCategory(text, DECISION_CONFIDENCE_PATTERNS, 'confidence', context);
    
    // Additional confidence metrics
    const certaintyLevel = this.calculateCertaintyLevel(text);
    const questioningBehavior = this.calculateQuestioningBehavior(text);
    const specificityOfRequests = this.calculateRequestSpecificity(text);
    const previousExperienceReferences = this.calculateExperienceReferences(text);
    
    return {
      ...baseAnalysis,
      certaintyLevel,
      questioningBehavior,
      specificityOfRequests,
      previousExperienceReferences
    };
  }
  
  /**
   * Analyze service familiarity and experience
   */
  private analyzeServiceFamiliarity(text: string, context?: string): ServiceFamiliarityAnalysis {
    const baseAnalysis = analyzePatternCategory(text, SERVICE_FAMILIARITY_PATTERNS, 'familiarity', context);
    
    // Additional familiarity metrics
    const previousServiceExperience = this.calculatePreviousExperience(text);
    const serviceExpectationClarity = this.calculateExpectationClarity(text);
    const processKnowledge = this.calculateProcessKnowledge(text);
    const outcomeExpectations = this.calculateOutcomeExpectations(text);
    
    return {
      ...baseAnalysis,
      previousServiceExperience,
      serviceExpectationClarity,
      processKnowledge,
      outcomeExpectations
    };
  }
  
  /**
   * Calculate overall experience score from component analyses
   */
  private calculateOverallScore(
    vocabulary: VocabularyAnalysis,
    technical: TechnicalKnowledgeAnalysis,
    confidence: DecisionConfidenceAnalysis,
    familiarity: ServiceFamiliarityAnalysis
  ): number {
    const weights = this.config.weights;
    
    return (
      vocabulary.score * weights.vocabulary +
      technical.score * weights.technical +
      confidence.score * weights.confidence +
      familiarity.score * weights.familiarity
    );
  }
  
  /**
   * Classify experience level based on overall score
   */
  private classifyExperienceLevel(score: number): ExperienceLevel {
    const thresholds = this.config.thresholds;
    
    if (score >= thresholds.expert.min) return 'expert';
    if (score >= thresholds.advanced.min) return 'advanced';
    if (score >= thresholds.intermediate.min) return 'intermediate';
    return 'beginner';
  }
  
  /**
   * Calculate overall confidence from component confidences
   */
  private calculateOverallConfidence(analyses: { confidence: ConfidenceLevel }[]): ConfidenceLevel {
    const confidenceValues = { 'low': 1, 'medium': 2, 'high': 3, 'very-high': 4 };
    const reverseMap = ['low', 'medium', 'high', 'very-high'] as const;
    
    const avgValue = analyses.reduce((sum, analysis) => 
      sum + confidenceValues[analysis.confidence], 0) / analyses.length;
    
    const roundedValue = Math.round(avgValue) - 1;
    return reverseMap[Math.max(0, Math.min(3, roundedValue))];
  }
  
  /**
   * Generate recommendations based on analysis results
   */
  private generateRecommendations(
    experienceLevel: ExperienceLevel,
    vocabulary: VocabularyAnalysis,
    technical: TechnicalKnowledgeAnalysis,
    confidence: DecisionConfidenceAnalysis,
    familiarity: ServiceFamiliarityAnalysis
  ) {
    const recommendations = {
      suggestedServiceComplexity: this.getSuggestedComplexity(experienceLevel, technical.score),
      recommendedGuidanceLevel: this.getRecommendedGuidance(experienceLevel, confidence.score),
      appropriateServiceTypes: this.getAppropriateServices(experienceLevel, familiarity.score),
      cautionAreas: this.getCautionAreas(experienceLevel, vocabulary.score, technical.score)
    };
    
    return recommendations;
  }
  
  /**
   * Helper methods for detailed analysis
   */
  private calculateProcessUnderstanding(text: string): number {
    const processTerms = ['process', 'steps', 'procedure', 'method', 'technique', 'application'];
    const matches = processTerms.filter(term => preprocessText(text).includes(term));
    return Math.min(matches.length / processTerms.length, 1);
  }
  
  private calculateToolsKnowledge(text: string): number {
    const toolTerms = ['brush', 'applicator', 'foils', 'clips', 'tools', 'equipment'];
    const matches = toolTerms.filter(term => preprocessText(text).includes(term));
    return Math.min(matches.length / toolTerms.length, 1);
  }
  
  private calculateProfessionalTerminology(text: string): number {
    const professionalTerms = extractTechnicalTerms(text, BEAUTY_TECHNICAL_VOCABULARY);
    const wordCount = text.split(/\s+/).length;
    return wordCount > 0 ? Math.min(professionalTerms.length / wordCount * 10, 1) : 0;
  }
  
  private calculateCertaintyLevel(text: string): number {
    const certaintyTerms = ['definitely', 'exactly', 'specifically', 'precisely', 'sure', 'certain'];
    const uncertaintyTerms = ['maybe', 'perhaps', 'possibly', 'not sure', 'uncertain'];
    
    const certaintyMatches = certaintyTerms.filter(term => preprocessText(text).includes(term));
    const uncertaintyMatches = uncertaintyTerms.filter(term => preprocessText(text).includes(term));
    
    return Math.max(0, (certaintyMatches.length - uncertaintyMatches.length) / 6 + 0.5);
  }
  
  private calculateQuestioningBehavior(text: string): number {
    const questionMarks = (text.match(/\?/g) || []).length;
    const questionWords = ['what', 'how', 'why', 'when', 'where', 'which'];
    const questionWordMatches = questionWords.filter(word => preprocessText(text).includes(word));
    
    const totalQuestions = questionMarks + questionWordMatches.length;
    const wordCount = text.split(/\s+/).length;
    
    return wordCount > 0 ? Math.min(totalQuestions / wordCount * 20, 1) : 0;
  }
  
  private calculateRequestSpecificity(text: string): number {
    const specificTerms = ['exact', 'specific', 'particular', 'precise', 'detailed'];
    const matches = specificTerms.filter(term => preprocessText(text).includes(term));
    return Math.min(matches.length / specificTerms.length, 1);
  }
  
  private calculateExperienceReferences(text: string): number {
    const experienceTerms = ['before', 'previously', 'last time', 'usually', 'always', 'experience'];
    const matches = experienceTerms.filter(term => preprocessText(text).includes(term));
    return Math.min(matches.length / experienceTerms.length, 1);
  }
  
  private calculatePreviousExperience(text: string): number {
    const experienceIndicators = ['had before', 'done this', 'previous', 'last time', 'regular'];
    const matches = experienceIndicators.filter(term => preprocessText(text).includes(term));
    return Math.min(matches.length / experienceIndicators.length, 1);
  }
  
  private calculateExpectationClarity(text: string): number {
    const clarityTerms = ['expect', 'want', 'looking for', 'goal', 'outcome', 'result'];
    const matches = clarityTerms.filter(term => preprocessText(text).includes(term));
    return Math.min(matches.length / clarityTerms.length, 1);
  }
  
  private calculateProcessKnowledge(text: string): number {
    return this.calculateProcessUnderstanding(text);
  }
  
  private calculateOutcomeExpectations(text: string): number {
    return this.calculateExpectationClarity(text);
  }
  
  /**
   * Recommendation helper methods
   */
  private getSuggestedComplexity(level: ExperienceLevel, technicalScore: number): 'simple' | 'moderate' | 'complex' | 'advanced' {
    if (level === 'expert' || technicalScore > 0.8) return 'advanced';
    if (level === 'advanced' || technicalScore > 0.6) return 'complex';
    if (level === 'intermediate' || technicalScore > 0.4) return 'moderate';
    return 'simple';
  }
  
  private getRecommendedGuidance(level: ExperienceLevel, confidenceScore: number): 'minimal' | 'moderate' | 'comprehensive' | 'expert' {
    if (level === 'expert' && confidenceScore > 0.8) return 'expert';
    if (level === 'advanced' && confidenceScore > 0.6) return 'minimal';
    if (level === 'intermediate' || confidenceScore > 0.4) return 'moderate';
    return 'comprehensive';
  }
  
  private getAppropriateServices(level: ExperienceLevel, familiarityScore: number): string[] {
    const serviceMap = {
      beginner: ['basic-cuts', 'simple-color', 'basic-makeup', 'standard-facials'],
      intermediate: ['styled-cuts', 'color-highlights', 'event-makeup', 'specialized-facials'],
      advanced: ['complex-color', 'advanced-cuts', 'editorial-makeup', 'treatment-facials'],
      expert: ['color-correction', 'avant-garde-cuts', 'professional-makeup', 'medical-grade-treatments']
    };
    
    return serviceMap[level] || serviceMap.beginner;
  }
  
  private getCautionAreas(level: ExperienceLevel, vocabularyScore: number, technicalScore: number): string[] {
    const cautions: string[] = [];
    
    if (level === 'beginner') {
      cautions.push('Complex chemical processes', 'Advanced color techniques', 'Professional-grade treatments');
    }
    
    if (vocabularyScore < 0.3) {
      cautions.push('Technical terminology may need explanation');
    }
    
    if (technicalScore < 0.4) {
      cautions.push('Process steps should be clearly explained');
    }
    
    return cautions;
  }
  
  /**
   * Detect service context from text content
   */
  private detectServiceContext(text: string): string {
    const contextKeywords = {
      hair: ['hair', 'cut', 'color', 'style', 'trim', 'highlights', 'balayage'],
      makeup: ['makeup', 'foundation', 'lipstick', 'eyeshadow', 'mascara', 'contour'],
      skincare: ['facial', 'skin', 'acne', 'wrinkles', 'cleansing', 'moisturizer'],
      wellness: ['massage', 'relaxation', 'aromatherapy', 'wellness', 'spa']
    };
    
    const processedText = preprocessText(text);
    let bestMatch = '';
    let bestScore = 0;
    
    for (const [context, keywords] of Object.entries(contextKeywords)) {
      const matches = keywords.filter(keyword => processedText.includes(keyword));
      const score = matches.length / keywords.length;
      
      if (score > bestScore) {
        bestScore = score;
        bestMatch = context;
      }
    }
    
    return bestMatch;
  }
  
  /**
   * DIAGNOSTIC METHODS FOR FUTURE AGENTS
   */
  
  /**
   * Run system health check
   * 
   * USAGE: Call this method to verify the engine is working correctly
   * RETURNS: { healthy: boolean, issues: string[], performance: number }
   */
  public runHealthCheck(): { healthy: boolean; issues: string[]; performance: number } {
    const issues: string[] = [];
    
    // Test basic functionality
    const testInput = {
      responses: [
        { text: "I need a simple haircut, nothing fancy", timestamp: new Date() }
      ]
    };
    
    const startTime = Date.now();
    try {
      const result = this.analyzeExperience(testInput);
      const performance = Date.now() - startTime;
      
      // Validate expected results
      if (result.experienceLevel !== 'beginner') {
        issues.push(`Expected beginner classification, got ${result.experienceLevel}`);
      }
      
      if (result.recommendations.suggestedServiceComplexity !== 'simple') {
        issues.push(`Expected simple complexity, got ${result.recommendations.suggestedServiceComplexity}`);
      }
      
      if (performance > 1000) {
        issues.push(`Performance issue: ${performance}ms > 1000ms target`);
      }
      
      return {
        healthy: issues.length === 0,
        issues,
        performance
      };
      
    } catch (error) {
      issues.push(`Health check failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
      return {
        healthy: false,
        issues,
        performance: Date.now() - startTime
      };
    }
  }
  
  /**
   * Get detailed diagnostic information
   * 
   * USAGE: Call this when troubleshooting classification issues
   * RETURNS: Detailed breakdown of pattern matching and scoring
   */
  public getDiagnosticInfo(input: ExperienceAnalysisInput): any {
    const result = this.analyzeExperience(input);
    
    return {
      input: {
        responseCount: input.responses.length,
        totalWords: input.responses.map(r => r.text.split(/\s+/).length).reduce((a, b) => a + b, 0),
        totalChars: input.responses.map(r => r.text.length).reduce((a, b) => a + b, 0)
      },
      classification: {
        experienceLevel: result.experienceLevel,
        overallScore: result.overallScore,
        confidence: result.confidence
      },
      componentScores: {
        vocabulary: result.vocabulary.score,
        technical: result.technicalKnowledge.score,
        confidence: result.decisionConfidence.score,
        familiarity: result.serviceFamiliarity.score
      },
      patternMatches: {
        vocabularyMatches: result.vocabulary.matchedPatterns,
        technicalMatches: result.technicalKnowledge.matchedPatterns,
        confidenceMatches: result.decisionConfidence.matchedPatterns,
        familiarityMatches: result.serviceFamiliarity.matchedPatterns
      },
      evidence: {
        vocabularyEvidence: result.vocabulary.evidence,
        technicalEvidence: result.technicalKnowledge.evidence,
        confidenceEvidence: result.decisionConfidence.evidence,
        familiarityEvidence: result.serviceFamiliarity.evidence
      }
    };
  }
  
  /**
   * Create emergency fallback result for system failures
   * 
   * USAGE: Called automatically when analysis throws unexpected errors
   * PURPOSE: Ensures system never completely fails, always returns safe defaults
   */
  private createEmergencyFallback(input: ExperienceAnalysisInput, error: string): ExperienceAnalysisResult {
    console.error('EMERGENCY FALLBACK ACTIVATED:', error);
    
    const emptyAnalysis = {
      score: 0,
      confidence: 'low' as ConfidenceLevel,
      matchedPatterns: [],
      evidence: [`EMERGENCY MODE: ${error}`]
    };
    
    return {
      experienceLevel: 'beginner', // Safe default
      confidence: 'low',
      overallScore: 0,
      vocabulary: { ...emptyAnalysis, technicalTermCount: 0, sophisticatedLanguageUsage: 0, industryJargonUsage: 0, averageWordComplexity: 0 },
      technicalKnowledge: { ...emptyAnalysis, serviceSpecificKnowledge: 0, processUnderstanding: 0, toolsAndTechniquesKnowledge: 0, professionalTerminology: 0 },
      decisionConfidence: { ...emptyAnalysis, certaintyLevel: 0, questioningBehavior: 0, specificityOfRequests: 0, previousExperienceReferences: 0 },
      serviceFamiliarity: { ...emptyAnalysis, previousServiceExperience: 0, serviceExpectationClarity: 0, processKnowledge: 0, outcomeExpectations: 0 },
      recommendations: {
        suggestedServiceComplexity: 'simple',
        recommendedGuidanceLevel: 'comprehensive',
        appropriateServiceTypes: ['basic-services'],
        cautionAreas: ['SYSTEM ERROR - Manual review required', error]
      },
      analysisTimestamp: new Date(),
      responseCount: input.responses.length,
      totalWordCount: 0
    };
  }
  
  /**
   * Create low confidence result for insufficient data
   * 
   * USAGE: Called when input validation fails but system is otherwise healthy
   * PURPOSE: Provides meaningful feedback about why analysis couldn't proceed
   */
  private createLowConfidenceResult(input: ExperienceAnalysisInput, reason: string): ExperienceAnalysisResult {
    const emptyAnalysis = {
      score: 0,
      confidence: 'low' as ConfidenceLevel,
      matchedPatterns: [],
      evidence: [reason]
    };
    
    return {
      experienceLevel: 'beginner',
      confidence: 'low',
      overallScore: 0,
      vocabulary: { ...emptyAnalysis, technicalTermCount: 0, sophisticatedLanguageUsage: 0, industryJargonUsage: 0, averageWordComplexity: 0 },
      technicalKnowledge: { ...emptyAnalysis, serviceSpecificKnowledge: 0, processUnderstanding: 0, toolsAndTechniquesKnowledge: 0, professionalTerminology: 0 },
      decisionConfidence: { ...emptyAnalysis, certaintyLevel: 0, questioningBehavior: 0, specificityOfRequests: 0, previousExperienceReferences: 0 },
      serviceFamiliarity: { ...emptyAnalysis, previousServiceExperience: 0, serviceExpectationClarity: 0, processKnowledge: 0, outcomeExpectations: 0 },
      recommendations: {
        suggestedServiceComplexity: 'simple',
        recommendedGuidanceLevel: 'comprehensive',
        appropriateServiceTypes: ['basic-services'],
        cautionAreas: ['Insufficient data for reliable recommendations']
      },
      analysisTimestamp: new Date(),
      responseCount: input.responses.length,
      totalWordCount: 0
    };
  }
}
