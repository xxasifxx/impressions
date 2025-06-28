/**
 * Pattern Matching Utilities
 * 
 * Reusable utilities for pattern matching and text analysis.
 * These functions can be used across different analysis engines.
 */

import { ExperiencePattern, PatternMatchResult, ConfidenceLevel } from '../types/ExperienceTypes';

/**
 * Text preprocessing for consistent pattern matching
 */
export function preprocessText(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s]/g, ' ') // Replace punctuation with spaces
    .replace(/\s+/g, ' ')     // Normalize whitespace
    .trim();
}

/**
 * Extract meaningful words from text (remove stop words)
 */
export function extractMeaningfulWords(text: string): string[] {
  const stopWords = new Set([
    'a', 'an', 'and', 'are', 'as', 'at', 'be', 'by', 'for', 'from',
    'has', 'he', 'in', 'is', 'it', 'its', 'of', 'on', 'that', 'the',
    'to', 'was', 'will', 'with', 'i', 'me', 'my', 'you', 'your'
  ]);
  
  return preprocessText(text)
    .split(' ')
    .filter(word => word.length > 2 && !stopWords.has(word));
}

/**
 * Calculate word complexity score based on length and syllables
 */
export function calculateWordComplexity(word: string): number {
  // Simple complexity heuristic: longer words and more syllables = higher complexity
  const lengthScore = Math.min(word.length / 10, 1); // Normalize to 0-1
  const syllableScore = Math.min(countSyllables(word) / 4, 1); // Normalize to 0-1
  
  return (lengthScore + syllableScore) / 2;
}

/**
 * Estimate syllable count in a word
 */
function countSyllables(word: string): number {
  word = word.toLowerCase();
  if (word.length <= 3) return 1;
  
  // Count vowel groups
  const vowelGroups = word.match(/[aeiouy]+/g);
  let syllables = vowelGroups ? vowelGroups.length : 1;
  
  // Adjust for silent e
  if (word.endsWith('e')) syllables--;
  
  // Ensure at least 1 syllable
  return Math.max(syllables, 1);
}

/**
 * Match patterns in text with fuzzy matching
 */
export function matchPatterns(
  text: string, 
  patterns: string[], 
  fuzzyThreshold: number = 0.8
): { matches: string[]; score: number; evidence: string[] } {
  const processedText = preprocessText(text);
  const words = processedText.split(' ');
  
  const matches: string[] = [];
  const evidence: string[] = [];
  let totalScore = 0;
  
  for (const pattern of patterns) {
    const processedPattern = preprocessText(pattern);
    
    // Exact phrase matching
    if (processedText.includes(processedPattern)) {
      matches.push(pattern);
      evidence.push(pattern);
      totalScore += 1.0;
      continue;
    }
    
    // Fuzzy word matching
    const patternWords = processedPattern.split(' ');
    let patternMatchScore = 0;
    
    for (const patternWord of patternWords) {
      let bestWordMatch = 0;
      
      for (const word of words) {
        const similarity = calculateStringSimilarity(word, patternWord);
        if (similarity > fuzzyThreshold) {
          bestWordMatch = Math.max(bestWordMatch, similarity);
        }
      }
      
      patternMatchScore += bestWordMatch;
    }
    
    // If enough pattern words matched, consider it a match
    const avgPatternScore = patternMatchScore / patternWords.length;
    if (avgPatternScore > fuzzyThreshold) {
      matches.push(pattern);
      evidence.push(`~${pattern} (${Math.round(avgPatternScore * 100)}% match)`);
      totalScore += avgPatternScore;
    }
  }
  
  return {
    matches,
    score: patterns.length > 0 ? totalScore / patterns.length : 0,
    evidence
  };
}

/**
 * Calculate string similarity using Levenshtein distance
 */
function calculateStringSimilarity(str1: string, str2: string): number {
  const matrix = Array(str2.length + 1).fill(null).map(() => Array(str1.length + 1).fill(null));
  
  for (let i = 0; i <= str1.length; i++) matrix[0][i] = i;
  for (let j = 0; j <= str2.length; j++) matrix[j][0] = j;
  
  for (let j = 1; j <= str2.length; j++) {
    for (let i = 1; i <= str1.length; i++) {
      const indicator = str1[i - 1] === str2[j - 1] ? 0 : 1;
      matrix[j][i] = Math.min(
        matrix[j][i - 1] + 1,     // deletion
        matrix[j - 1][i] + 1,     // insertion
        matrix[j - 1][i - 1] + indicator // substitution
      );
    }
  }
  
  const maxLength = Math.max(str1.length, str2.length);
  return maxLength === 0 ? 1 : (maxLength - matrix[str2.length][str1.length]) / maxLength;
}

/**
 * Analyze patterns for a specific category
 */
export function analyzePatternCategory(
  text: string,
  patterns: ExperiencePattern[],
  category: string,
  context?: string
): PatternMatchResult {
  const relevantPatterns = patterns.filter(p => 
    p.category === category && 
    (!context || !p.context || p.context.includes(context))
  );
  
  let totalScore = 0;
  let totalWeight = 0;
  const allMatches: string[] = [];
  const allEvidence: string[] = [];
  
  for (const pattern of relevantPatterns) {
    const matchResult = matchPatterns(text, pattern.patterns);
    
    if (matchResult.matches.length > 0) {
      // Weight the score by pattern importance
      const weightedScore = matchResult.score * pattern.weight;
      totalScore += weightedScore;
      totalWeight += pattern.weight;
      
      allMatches.push(...matchResult.matches);
      allEvidence.push(...matchResult.evidence.map(e => `${pattern.name}: ${e}`));
      
      // Check for negative patterns that contradict this match
      if (pattern.negativePatterns) {
        const negativeResult = matchPatterns(text, pattern.negativePatterns);
        if (negativeResult.matches.length > 0) {
          // Reduce score if negative patterns are found
          totalScore *= 0.5;
          allEvidence.push(`Contradicted by: ${negativeResult.matches.join(', ')}`);
        }
      }
    }
  }
  
  const finalScore = totalWeight > 0 ? totalScore / totalWeight : 0;
  const confidence = calculateConfidence(finalScore, allMatches.length, relevantPatterns.length);
  
  return {
    score: finalScore,
    confidence,
    matchedPatterns: [...new Set(allMatches)], // Remove duplicates
    evidence: allEvidence
  };
}

/**
 * Calculate confidence level based on score and match quality
 */
function calculateConfidence(
  score: number, 
  matchCount: number, 
  totalPatterns: number
): ConfidenceLevel {
  // Consider both score magnitude and match coverage
  const coverage = totalPatterns > 0 ? matchCount / totalPatterns : 0;
  const combinedMetric = (score * 0.7) + (coverage * 0.3);
  
  if (combinedMetric >= 0.8) return 'very-high';
  if (combinedMetric >= 0.6) return 'high';
  if (combinedMetric >= 0.4) return 'medium';
  return 'low';
}

/**
 * Combine multiple pattern analysis results
 */
export function combinePatternResults(
  results: PatternMatchResult[],
  weights: number[]
): PatternMatchResult {
  if (results.length !== weights.length) {
    throw new Error('Results and weights arrays must have the same length');
  }
  
  let totalScore = 0;
  let totalWeight = 0;
  const allMatches: string[] = [];
  const allEvidence: string[] = [];
  
  for (let i = 0; i < results.length; i++) {
    const result = results[i];
    const weight = weights[i];
    
    totalScore += result.score * weight;
    totalWeight += weight;
    
    allMatches.push(...result.matchedPatterns);
    allEvidence.push(...result.evidence);
  }
  
  const finalScore = totalWeight > 0 ? totalScore / totalWeight : 0;
  const avgConfidence = calculateAverageConfidence(results.map(r => r.confidence));
  
  return {
    score: finalScore,
    confidence: avgConfidence,
    matchedPatterns: [...new Set(allMatches)],
    evidence: allEvidence
  };
}

/**
 * Calculate average confidence level
 */
function calculateAverageConfidence(confidences: ConfidenceLevel[]): ConfidenceLevel {
  const confidenceValues = {
    'low': 1,
    'medium': 2,
    'high': 3,
    'very-high': 4
  };
  
  const reverseMap = ['low', 'medium', 'high', 'very-high'] as const;
  
  const avgValue = confidences.reduce((sum, conf) => sum + confidenceValues[conf], 0) / confidences.length;
  const roundedValue = Math.round(avgValue) - 1; // Convert back to 0-based index
  
  return reverseMap[Math.max(0, Math.min(3, roundedValue))];
}

/**
 * Extract technical terms from text
 */
export function extractTechnicalTerms(text: string, technicalVocabulary: string[]): string[] {
  const processedText = preprocessText(text);
  const foundTerms: string[] = [];
  
  for (const term of technicalVocabulary) {
    const processedTerm = preprocessText(term);
    if (processedText.includes(processedTerm)) {
      foundTerms.push(term);
    }
  }
  
  return foundTerms;
}

/**
 * Calculate text complexity metrics
 */
export interface TextComplexityMetrics {
  averageWordLength: number;
  averageSentenceLength: number;
  complexWordRatio: number;
  technicalTermRatio: number;
  overallComplexity: number;
}

export function calculateTextComplexity(
  text: string, 
  technicalVocabulary: string[] = []
): TextComplexityMetrics {
  const words = extractMeaningfulWords(text);
  const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0);
  
  // Average word length
  const averageWordLength = words.length > 0 
    ? words.reduce((sum, word) => sum + word.length, 0) / words.length 
    : 0;
  
  // Average sentence length
  const averageSentenceLength = sentences.length > 0 
    ? words.length / sentences.length 
    : 0;
  
  // Complex word ratio (words with 3+ syllables)
  const complexWords = words.filter(word => countSyllables(word) >= 3);
  const complexWordRatio = words.length > 0 ? complexWords.length / words.length : 0;
  
  // Technical term ratio
  const technicalTerms = extractTechnicalTerms(text, technicalVocabulary);
  const technicalTermRatio = words.length > 0 ? technicalTerms.length / words.length : 0;
  
  // Overall complexity score
  const overallComplexity = (
    (averageWordLength / 10) * 0.3 +
    (averageSentenceLength / 20) * 0.2 +
    complexWordRatio * 0.3 +
    technicalTermRatio * 0.2
  );
  
  return {
    averageWordLength,
    averageSentenceLength,
    complexWordRatio,
    technicalTermRatio,
    overallComplexity: Math.min(overallComplexity, 1) // Cap at 1.0
  };
}

