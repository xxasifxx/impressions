/**
 * Experience Analysis Types
 * 
 * Type definitions for user experience level detection and analysis.
 * These types ensure consistency across the experience analysis system.
 */

export type ExperienceLevel = 'beginner' | 'intermediate' | 'advanced' | 'expert';

export type ConfidenceLevel = 'low' | 'medium' | 'high' | 'very-high';

/**
 * Pattern matching results for different aspects of user responses
 */
export interface PatternMatchResult {
  score: number;           // 0-1 scale
  confidence: ConfidenceLevel;
  matchedPatterns: string[];
  evidence: string[];      // Specific text that matched
}

/**
 * Vocabulary complexity analysis
 */
export interface VocabularyAnalysis extends PatternMatchResult {
  technicalTermCount: number;
  sophisticatedLanguageUsage: number;
  industryJargonUsage: number;
  averageWordComplexity: number;
}

/**
 * Technical knowledge assessment
 */
export interface TechnicalKnowledgeAnalysis extends PatternMatchResult {
  serviceSpecificKnowledge: number;
  processUnderstanding: number;
  toolsAndTechniquesKnowledge: number;
  professionalTerminology: number;
}

/**
 * Decision confidence evaluation
 */
export interface DecisionConfidenceAnalysis extends PatternMatchResult {
  certaintyLevel: number;
  questioningBehavior: number;
  specificityOfRequests: number;
  previousExperienceReferences: number;
}

/**
 * Service familiarity indicators
 */
export interface ServiceFamiliarityAnalysis extends PatternMatchResult {
  previousServiceExperience: number;
  serviceExpectationClarity: number;
  processKnowledge: number;
  outcomeExpectations: number;
}

/**
 * Comprehensive experience analysis result
 */
export interface ExperienceAnalysisResult {
  experienceLevel: ExperienceLevel;
  confidence: ConfidenceLevel;
  overallScore: number; // 0-1 scale
  
  // Component analyses
  vocabulary: VocabularyAnalysis;
  technicalKnowledge: TechnicalKnowledgeAnalysis;
  decisionConfidence: DecisionConfidenceAnalysis;
  serviceFamiliarity: ServiceFamiliarityAnalysis;
  
  // Recommendations
  recommendations: {
    suggestedServiceComplexity: 'simple' | 'moderate' | 'complex' | 'advanced';
    recommendedGuidanceLevel: 'minimal' | 'moderate' | 'comprehensive' | 'expert';
    appropriateServiceTypes: string[];
    cautionAreas: string[];
  };
  
  // Metadata
  analysisTimestamp: Date;
  responseCount: number;
  totalWordCount: number;
}

/**
 * Input data for experience analysis
 */
export interface ExperienceAnalysisInput {
  responses: Array<{
    text: string;
    timestamp: Date;
    context?: string;
    metadata?: Record<string, any>;
  }>;
  sessionContext?: {
    serviceCategory?: string;
    previousSessions?: number;
    userAge?: number;
    location?: string;
  };
}

/**
 * Pattern definition structure for experience detection
 */
export interface ExperiencePattern {
  id: string;
  name: string;
  category: 'vocabulary' | 'technical' | 'confidence' | 'familiarity';
  experienceLevel: ExperienceLevel;
  patterns: string[];
  weight: number;        // Importance of this pattern (0-1)
  context?: string[];    // Optional context where pattern applies
  negativePatterns?: string[]; // Patterns that contradict this experience level
}

/**
 * Configuration for experience analysis engine
 */
export interface ExperienceAnalysisConfig {
  // Scoring weights for different components
  weights: {
    vocabulary: number;
    technicalKnowledge: number;
    decisionConfidence: number;
    serviceFamiliarity: number;
  };
  
  // Thresholds for experience level classification
  thresholds: {
    beginner: { min: number; max: number };
    intermediate: { min: number; max: number };
    advanced: { min: number; max: number };
    expert: { min: number; max: number };
  };
  
  // Minimum confidence required for classification
  minConfidenceThreshold: number;
  
  // Minimum number of responses required for reliable analysis
  minResponseCount: number;
  
  // Enable debug logging
  debugMode: boolean;
}

