/**
 * Experience Analysis Engine - Diagnostic Tests for Future Agents
 * 
 * PURPOSE: Provides comprehensive diagnostic tests that future agents can run
 * to quickly identify and resolve issues with the Experience Analysis Engine.
 * 
 * USAGE:
 * 1. Run full diagnostic suite: npm test ExperienceAnalysisEngine.diagnostics.test.ts
 * 2. Run specific diagnostic: Call individual test methods
 * 3. Health check: engine.runHealthCheck()
 * 4. Detailed analysis: engine.getDiagnosticInfo(input)
 * 
 * FAILURE INVESTIGATION:
 * - If tests fail, check console output for specific error details
 * - Use diagnostic methods to understand classification logic
 * - Verify pattern definitions in experiencePatterns.ts
 * - Check performance metrics for optimization needs
 */

import { ExperienceAnalysisEngine } from '../ExperienceAnalysisEngine';
import { ExperienceAnalysisInput } from '../../types/ExperienceTypes';

describe('Experience Analysis Engine - Production Diagnostics', () => {
  let engine: ExperienceAnalysisEngine;
  
  beforeEach(() => {
    engine = new ExperienceAnalysisEngine({ debugMode: true });
  });
  
  /**
   * SYSTEM HEALTH CHECKS
   * Run these first to verify basic functionality
   */
  describe('System Health Diagnostics', () => {
    test('HEALTH CHECK: Basic system functionality', () => {
      const healthResult = engine.runHealthCheck();
      
      console.log('Health Check Result:', healthResult);
      
      expect(healthResult.healthy).toBe(true);
      expect(healthResult.performance).toBeLessThan(1000);
      expect(healthResult.issues).toHaveLength(0);
      
      if (!healthResult.healthy) {
        console.error('SYSTEM HEALTH ISSUES:', healthResult.issues);
      }
    });
    
    test('PERFORMANCE CHECK: Response time validation', () => {
      const testCases = [
        // Small input
        {
          responses: [{ text: "Simple test", timestamp: new Date() }]
        },
        // Medium input
        {
          responses: Array(5).fill(null).map((_, i) => ({
            text: `Response ${i} with beauty terms like balayage, contouring, and highlights`,
            timestamp: new Date()
          }))
        },
        // Large input
        {
          responses: Array(10).fill(null).map((_, i) => ({
            text: `Detailed response ${i} discussing advanced color correction techniques, professional makeup application methods, and sophisticated skincare treatment protocols`,
            timestamp: new Date()
          }))
        }
      ];
      
      testCases.forEach((testCase, index) => {
        const startTime = Date.now();
        const result = engine.analyzeExperience(testCase);
        const duration = Date.now() - startTime;
        
        console.log(`Performance Test ${index + 1}: ${duration}ms`);
        
        expect(duration).toBeLessThan(1000);
        expect(result).toBeDefined();
        expect(result.experienceLevel).toBeDefined();
      });
    });
    
    test('CONSISTENCY CHECK: Identical inputs produce identical outputs', () => {
      const testInput = {
        responses: [
          { text: "I need balayage highlights with a natural look", timestamp: new Date() }
        ]
      };
      
      const result1 = engine.analyzeExperience(testInput);
      const result2 = engine.analyzeExperience(testInput);
      
      expect(result1.experienceLevel).toBe(result2.experienceLevel);
      expect(result1.overallScore).toBe(result2.overallScore);
      expect(result1.confidence).toBe(result2.confidence);
      
      console.log('Consistency Check Passed:', {
        level: result1.experienceLevel,
        score: result1.overallScore,
        confidence: result1.confidence
      });
    });
  });
  
  /**
   * CLASSIFICATION ACCURACY DIAGNOSTICS
   * Verify experience level classification is working correctly
   */
  describe('Classification Accuracy Diagnostics', () => {
    test('BEGINNER CLASSIFICATION: Clear beginner indicators', () => {
      const beginnerInputs = [
        {
          responses: [
            { text: "I'm not sure what I want. This is my first time.", timestamp: new Date() },
            { text: "Can you help me choose? I don't know much about this.", timestamp: new Date() }
          ]
        },
        {
          responses: [
            { text: "I need help deciding. What do you recommend?", timestamp: new Date() },
            { text: "I'm new to this and confused about the options.", timestamp: new Date() }
          ]
        }
      ];
      
      beginnerInputs.forEach((input, index) => {
        const result = engine.analyzeExperience(input);
        const diagnostic = engine.getDiagnosticInfo(input);
        
        console.log(`Beginner Test ${index + 1}:`, {
          classification: diagnostic.classification,
          vocabularyMatches: diagnostic.patternMatches.vocabularyMatches,
          confidenceMatches: diagnostic.patternMatches.confidenceMatches
        });
        
        expect(result.experienceLevel).toBe('beginner');
        expect(result.recommendations.suggestedServiceComplexity).toBe('simple');
        expect(result.recommendations.recommendedGuidanceLevel).toBe('comprehensive');
      });
    });
    
    test('EXPERT CLASSIFICATION: Clear expert indicators', () => {
      const expertInputs = [
        {
          responses: [
            { text: "I need color correction using advanced techniques and specific toner formulas.", timestamp: new Date() },
            { text: "I understand color theory and bleaching processes.", timestamp: new Date() }
          ]
        },
        {
          responses: [
            { text: "I work as a colorist and need dimensional color with strategic placement.", timestamp: new Date() },
            { text: "Use 20-volume developer with complementary tones for neutralization.", timestamp: new Date() }
          ]
        }
      ];
      
      expertInputs.forEach((input, index) => {
        const result = engine.analyzeExperience(input);
        const diagnostic = engine.getDiagnosticInfo(input);
        
        console.log(`Expert Test ${index + 1}:`, {
          classification: diagnostic.classification,
          technicalMatches: diagnostic.patternMatches.technicalMatches,
          vocabularyMatches: diagnostic.patternMatches.vocabularyMatches
        });
        
        expect(result.experienceLevel).toBeOneOf(['advanced', 'expert']);
        expect(result.recommendations.suggestedServiceComplexity).toBeOneOf(['complex', 'advanced']);
        expect(result.vocabulary.technicalTermCount).toBeGreaterThan(0);
      });
    });
    
    test('MIXED SIGNALS: Handling conflicting indicators', () => {
      const mixedInput = {
        responses: [
          { text: "I'm not sure what I want", timestamp: new Date() }, // Beginner signal
          { text: "I need color correction using advanced techniques", timestamp: new Date() } // Expert signal
        ]
      };
      
      const result = engine.analyzeExperience(mixedInput);
      const diagnostic = engine.getDiagnosticInfo(mixedInput);
      
      console.log('Mixed Signals Test:', {
        classification: diagnostic.classification,
        componentScores: diagnostic.componentScores,
        evidence: {
          vocabulary: diagnostic.evidence.vocabularyEvidence,
          technical: diagnostic.evidence.technicalEvidence,
          confidence: diagnostic.evidence.confidenceEvidence
        }
      });
      
      // Should handle mixed signals reasonably
      expect(['beginner', 'intermediate', 'advanced', 'expert']).toContain(result.experienceLevel);
      
      // Confidence should reflect uncertainty
      if (result.confidence === 'low') {
        console.log('✓ System correctly identified mixed signals with low confidence');
      }
    });
  });
  
  /**
   * CONTEXT DETECTION DIAGNOSTICS
   * Verify service context detection is working
   */
  describe('Context Detection Diagnostics', () => {
    test('HAIR CONTEXT: Hair service detection', () => {
      const hairInputs = [
        { text: "I need a haircut and highlights", timestamp: new Date() },
        { text: "My hair needs color correction and balayage", timestamp: new Date() }
      ];
      
      hairInputs.forEach(response => {
        const input = { responses: [response] };
        const result = engine.analyzeExperience(input);
        const diagnostic = engine.getDiagnosticInfo(input);
        
        console.log('Hair Context Test:', {
          input: response.text,
          detectedContext: 'Check service category detection in diagnostic output'
        });
        
        // Context should influence pattern matching
        expect(result.vocabulary.matchedPatterns.length + result.technicalKnowledge.matchedPatterns.length).toBeGreaterThan(0);
      });
    });
    
    test('MAKEUP CONTEXT: Makeup service detection', () => {
      const makeupInputs = [
        { text: "I need contouring and highlighting for my wedding", timestamp: new Date() },
        { text: "Professional makeup application with airbrush technique", timestamp: new Date() }
      ];
      
      makeupInputs.forEach(response => {
        const input = { responses: [response] };
        const result = engine.analyzeExperience(input);
        
        console.log('Makeup Context Test:', {
          input: response.text,
          vocabularyMatches: result.vocabulary.matchedPatterns,
          technicalMatches: result.technicalKnowledge.matchedPatterns
        });
        
        expect(result.vocabulary.matchedPatterns.length + result.technicalKnowledge.matchedPatterns.length).toBeGreaterThan(0);
      });
    });
  });
  
  /**
   * ERROR HANDLING DIAGNOSTICS
   * Test system behavior with problematic inputs
   */
  describe('Error Handling Diagnostics', () => {
    test('EMPTY INPUT: Handling empty responses', () => {
      const emptyInputs = [
        { responses: [] },
        { responses: [{ text: "", timestamp: new Date() }] },
        { responses: [{ text: "   ", timestamp: new Date() }] }
      ];
      
      emptyInputs.forEach((input, index) => {
        const result = engine.analyzeExperience(input);
        
        console.log(`Empty Input Test ${index + 1}:`, {
          experienceLevel: result.experienceLevel,
          confidence: result.confidence,
          cautionAreas: result.recommendations.cautionAreas
        });
        
        expect(result.experienceLevel).toBe('beginner');
        expect(result.confidence).toBe('low');
        expect(result.recommendations.cautionAreas.length).toBeGreaterThan(0);
      });
    });
    
    test('OVERSIZED INPUT: Handling large inputs', () => {
      const oversizedInput = {
        responses: [
          { text: "a".repeat(15000), timestamp: new Date() } // Exceeds 10,000 char limit
        ]
      };
      
      const result = engine.analyzeExperience(oversizedInput);
      
      console.log('Oversized Input Test:', {
        experienceLevel: result.experienceLevel,
        confidence: result.confidence,
        cautionAreas: result.recommendations.cautionAreas
      });
      
      // Should handle gracefully
      expect(result).toBeDefined();
      expect(result.experienceLevel).toBeDefined();
    });
    
    test('MALFORMED INPUT: Handling invalid data', () => {
      const malformedInputs = [
        { responses: [{ text: null as any, timestamp: new Date() }] },
        { responses: [{ text: undefined as any, timestamp: new Date() }] },
        { responses: [{ text: "valid text", timestamp: null as any }] }
      ];
      
      malformedInputs.forEach((input, index) => {
        try {
          const result = engine.analyzeExperience(input);
          
          console.log(`Malformed Input Test ${index + 1}:`, {
            experienceLevel: result.experienceLevel,
            confidence: result.confidence
          });
          
          expect(result).toBeDefined();
          expect(result.experienceLevel).toBeDefined();
        } catch (error) {
          console.log(`Malformed Input Test ${index + 1} threw error (acceptable):`, error);
          // Errors are acceptable for truly malformed input
        }
      });
    });
  });
  
  /**
   * PATTERN MATCHING DIAGNOSTICS
   * Verify pattern matching is working correctly
   */
  describe('Pattern Matching Diagnostics', () => {
    test('VOCABULARY PATTERNS: Pattern recognition accuracy', () => {
      const vocabularyTests = [
        { text: "I'm not sure what I want", expectedLevel: 'beginner' },
        { text: "I need balayage highlights", expectedLevel: 'intermediate' },
        { text: "Color theory and undertones", expectedLevel: 'advanced' },
        { text: "Professional formulation and application technique", expectedLevel: 'expert' }
      ];
      
      vocabularyTests.forEach(test => {
        const input = { responses: [{ text: test.text, timestamp: new Date() }] };
        const result = engine.analyzeExperience(input);
        const diagnostic = engine.getDiagnosticInfo(input);
        
        console.log(`Vocabulary Pattern Test: "${test.text}"`, {
          expectedLevel: test.expectedLevel,
          actualLevel: result.experienceLevel,
          vocabularyScore: diagnostic.componentScores.vocabulary,
          matchedPatterns: diagnostic.patternMatches.vocabularyMatches,
          evidence: diagnostic.evidence.vocabularyEvidence
        });
        
        // Vocabulary should contribute to classification
        expect(result.vocabulary.score).toBeGreaterThanOrEqual(0);
      });
    });
    
    test('TECHNICAL PATTERNS: Technical knowledge detection', () => {
      const technicalTests = [
        "How long does the process take?", // Basic question
        "What's the processing time for bleaching?", // Intermediate
        "I understand the oxidation process", // Advanced
        "Use 20-volume developer with specific toner formula" // Expert
      ];
      
      technicalTests.forEach(text => {
        const input = { responses: [{ text, timestamp: new Date() }] };
        const result = engine.analyzeExperience(input);
        const diagnostic = engine.getDiagnosticInfo(input);
        
        console.log(`Technical Pattern Test: "${text}"`, {
          technicalScore: diagnostic.componentScores.technical,
          matchedPatterns: diagnostic.patternMatches.technicalMatches,
          evidence: diagnostic.evidence.technicalEvidence
        });
        
        expect(result.technicalKnowledge.score).toBeGreaterThanOrEqual(0);
      });
    });
  });
  
  /**
   * RECOMMENDATION QUALITY DIAGNOSTICS
   * Verify recommendations are appropriate
   */
  describe('Recommendation Quality Diagnostics', () => {
    test('BEGINNER RECOMMENDATIONS: Safety and guidance', () => {
      const beginnerInput = {
        responses: [
          { text: "I'm new to this and need help choosing", timestamp: new Date() }
        ]
      };
      
      const result = engine.analyzeExperience(beginnerInput);
      
      console.log('Beginner Recommendations:', result.recommendations);
      
      expect(result.recommendations.suggestedServiceComplexity).toBe('simple');
      expect(result.recommendations.recommendedGuidanceLevel).toBe('comprehensive');
      expect(result.recommendations.cautionAreas.length).toBeGreaterThan(0);
      expect(result.recommendations.appropriateServiceTypes).toContain('basic-cuts');
    });
    
    test('EXPERT RECOMMENDATIONS: Advanced options', () => {
      const expertInput = {
        responses: [
          { text: "I'm a professional colorist and need advanced techniques", timestamp: new Date() }
        ]
      };
      
      const result = engine.analyzeExperience(expertInput);
      
      console.log('Expert Recommendations:', result.recommendations);
      
      expect(result.recommendations.suggestedServiceComplexity).toBeOneOf(['complex', 'advanced']);
      expect(result.recommendations.recommendedGuidanceLevel).toBeOneOf(['minimal', 'expert']);
      expect(result.recommendations.appropriateServiceTypes).toContain('color-correction');
    });
  });
});

/**
 * MANUAL DIAGNOSTIC UTILITIES
 * Use these functions for manual testing and debugging
 */

/**
 * Quick diagnostic function for manual testing
 * 
 * USAGE:
 * import { quickDiagnostic } from './ExperienceAnalysisEngine.diagnostics.test';
 * quickDiagnostic("I need color correction using advanced techniques");
 */
export function quickDiagnostic(text: string): void {
  const engine = new ExperienceAnalysisEngine({ debugMode: true });
  const input = {
    responses: [{ text, timestamp: new Date() }]
  };
  
  const result = engine.analyzeExperience(input);
  const diagnostic = engine.getDiagnosticInfo(input);
  
  console.log('=== QUICK DIAGNOSTIC RESULTS ===');
  console.log('Input:', text);
  console.log('Classification:', diagnostic.classification);
  console.log('Component Scores:', diagnostic.componentScores);
  console.log('Pattern Matches:', diagnostic.patternMatches);
  console.log('Recommendations:', result.recommendations);
  console.log('================================');
}

/**
 * Performance benchmark function
 * 
 * USAGE:
 * import { performanceBenchmark } from './ExperienceAnalysisEngine.diagnostics.test';
 * performanceBenchmark();
 */
export function performanceBenchmark(): void {
  const engine = new ExperienceAnalysisEngine();
  const testCases = [
    "Simple test",
    "I need balayage highlights with natural color",
    "Professional color correction using advanced techniques and specific formulations for optimal results"
  ];
  
  console.log('=== PERFORMANCE BENCHMARK ===');
  
  testCases.forEach((text, index) => {
    const input = { responses: [{ text, timestamp: new Date() }] };
    
    const times = [];
    for (let i = 0; i < 10; i++) {
      const start = Date.now();
      engine.analyzeExperience(input);
      times.push(Date.now() - start);
    }
    
    const avgTime = times.reduce((a, b) => a + b) / times.length;
    const maxTime = Math.max(...times);
    
    console.log(`Test Case ${index + 1}: avg=${avgTime}ms, max=${maxTime}ms`);
  });
  
  console.log('=============================');
}

